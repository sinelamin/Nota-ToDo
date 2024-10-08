import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

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

  errorMessage: string = 'Task data is undefined or null';

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    if (!this.task) { return console.error(this.errorMessage) }

    this.inputChangeTaskName = new FormGroup({
      newTaskName: new FormControl(this.task.taskname),
    });
  }

  deleteTask(task: Task | null) {
    if (!task) { return console.error(this.errorMessage) }

    this.taskService.deleteTask(task);
  }

  toggleTaskEdit() {
    this.isTaskEdit = !this.isTaskEdit;

    if (this.isTaskEdit) {
      setTimeout(() => {
        if (!this.inputElement) { return console.error('inputElement not found') };

        this.inputElement.nativeElement.focus();
      }, 0);
    }
  }

  changeNameTask(task: Task | null) {
    if (!task) { return console.error(this.errorMessage) }

    const newTaskName = this.inputChangeTaskName.get('newTaskName')?.value;

    if (newTaskName) {
      this.taskService.changeTask(task, newTaskName);
      this.toggleTaskEdit();
    } else {
      this.taskService.deleteTask(task);
    }
  }

  changeStatusTask(task: Task | null) {
    if (!task) { return console.error(this.errorMessage) }
    this.taskService.changeTask(task);
  }
}
