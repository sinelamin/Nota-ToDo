import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent implements OnInit {

  constructor(
    public taskService: TaskService,
  ) { }

  taskList$ = this.taskService.tasks$;

  ngOnInit(): void {
  }

  taskInput = new FormGroup({
    taskName: new FormControl(''),
  });

  addTask(): void {
    const taskName = this.taskInput.get('taskName')!.value!;

    if (taskName) {
      const id = Date.now();
      const newTask: Task = { id: id, taskname: taskName, completed: false };

      this.taskService.addTask2(newTask).subscribe();

      this.taskInput.reset();
    }
  }

  changeStatusAllTasks(): void {
    this.taskService.changeStatusAllTasks();
  }
}
