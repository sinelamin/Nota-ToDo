import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Task } from 'src/app/core/task';
import { TaskService } from 'src/app/core//task.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task | null = null;
  @ViewChild('inputElement') inputElement: ElementRef | undefined;

  isTaskEdit: boolean = false;
  inputChangeTaskName: FormGroup = new FormGroup({});

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    if (!this.task) {
      return console.error('Task data is undefined or null');
    }

    this.inputChangeTaskName = new FormGroup({
      newTaskName: new FormControl(this.task.taskname),
    });
  }

  deleteTask(task: Task | null) {
    if (!task) { return console.error('Task data is undefined or null') }

    this.taskService.deleteTask(task);
  }

  editTask() {
    this.isTaskEdit = !this.isTaskEdit;

    if (this.isTaskEdit) {
      setTimeout(() => {
        if (!this.inputElement) { return console.error('inputElement not found') };

        this.inputElement.nativeElement.focus();
      }, 0);
    }
  }

  changeNameTask(task: Task | null) {
    if (!task) { return console.error('Task data is undefined or null') }

    const newTaskName = this.inputChangeTaskName.get('newTaskName')!.value!;

    if (newTaskName) {
      this.taskService.changeNameTask(task, newTaskName);
      this.editTask();
    } else {
      this.taskService.deleteTask(task);
    }
  }

  changeStatusTask(task: Task | null) {
    if (!task) { return console.error('Task data is undefined or null') }
    this.taskService.changeStatusTask(task);
  }
}
