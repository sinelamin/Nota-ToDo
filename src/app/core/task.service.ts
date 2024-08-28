import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private hasCompletedTasksSubject = new BehaviorSubject<boolean>(false);

  tasks$ = this.tasksSubject.asObservable();
  hasCompletedTasks$ = this.hasCompletedTasksSubject.asObservable();

  // hasCompletedTasks: boolean = false;

  // tasks = [
  //   {
  //     taskname: 'Complete project report',
  //     status: false
  //   },
  //   {
  //     taskname: 'Prepare presentation slides',
  //     status: false
  //   },
  // ];

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();

    this.tasksSubject.next([...currentTasks, task]);
    console.log(this.tasksSubject.getValue());
  }

  deleteTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updateTasks = currentTasks.filter(item => item.id !== task.id);

    this.tasksSubject.next(updateTasks);
    console.log(updateTasks);
  }

  deleteAllComplitedTasks(): void {
    const currentTasks = this.tasksSubject.getValue();
    const updateTasks = currentTasks.filter(item => !item.completed);

    this.tasksSubject.next(updateTasks);
    this.checkingUnfinishedTasks();
  }

  changeStatusTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();

    currentTasks.forEach(item => {
      if (item.id === task.id) {
        item.completed = !item.completed;
      }
    });

    this.tasksSubject.next(currentTasks);

    this.checkingUnfinishedTasks();
  }

  changeStatusAllTasks(): void {
    const currentTasks = this.tasksSubject.getValue();

    if (currentTasks.every(item => item.completed === true)) {
      currentTasks.forEach(item => {
        item.completed = false;
      });
    } else {
      currentTasks.forEach(item => {
        item.completed = true;
      });
    }


    this.tasksSubject.next(currentTasks);
    this.checkingUnfinishedTasks();
  }

  changeNameTask(task: Task, newTaskName: string): void {
    const currentTasks = this.tasksSubject.getValue();

    currentTasks.forEach(item => {
      if (item.id === task.id) {
        item.taskname = newTaskName;
      }
    });

    this.tasksSubject.next(currentTasks);
  }

  checkingUnfinishedTasks(): void {
    const currentTasks = this.tasksSubject.getValue();

    if (currentTasks.every(item => !item.completed)) {
      this.hasCompletedTasksSubject.next(false);
    } else {
      this.hasCompletedTasksSubject.next(true);
    }
  }
}