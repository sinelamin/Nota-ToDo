import { Component, OnInit, Input, ViewChild, ElementRef  } from '@angular/core';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Task } from 'src/app/core/task';
import { TaskService } from 'src/app/core//task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: Task;
  @ViewChild('inputElement') inputElement!: ElementRef;

  isTaskEdit: boolean = false;
  taskChangeInput!: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskChangeInput = new FormGroup({
      newTaskName: new FormControl(`${this.task.taskname}`),
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  editTask() {
    this.isTaskEdit = !this.isTaskEdit;

    if (this.isTaskEdit) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 0);
    }
  }

  changeNameTask(task: Task) {
    const newTaskName = this.taskChangeInput.get('newTaskName')!.value!;

    if (newTaskName) {
      this.taskService.changeNameTask(task, newTaskName);
      this.editTask();
    } else {
      this.taskService.deleteTask(task);
    }
  }

  changeStatusTask(task: Task) {
    this.taskService.changeStatusTask(task);
  }
}
