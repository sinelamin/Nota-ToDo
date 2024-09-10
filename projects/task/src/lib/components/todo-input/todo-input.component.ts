import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

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
export class TodoInputComponent implements OnInit, OnDestroy {

  constructor(
    public taskService: TaskService,
  ) { }

  taskList$ = this.taskService.tasks$;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
  }

  taskInput = new FormGroup({
    taskName: new FormControl(''),
  });

  addTask(): void {
    const taskName = this.taskInput.get('taskName')?.value;

    if (taskName) {
      const id = Date.now();
      const newTask: Task = { id: id, taskname: taskName, completed: false };

      // this.taskService.addTask(newTask);

      this.taskService.addTask2(newTask).pipe(
        takeUntil(this.destroy$)
      ).subscribe();

      this.taskInput.reset();
    }
  }

  changeStatusAllTasks(): void {
    this.taskService.changeTask();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
