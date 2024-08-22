import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasksSubject = new BehaviorSubject<Task[]>([]);

  tasks$ = this.tasksSubject.asObservable();
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

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.getValue();

    this.tasksSubject.next([...currentTasks, task]);
    console.log(this.tasksSubject.getValue());
  }

  deleteTask(task: Task) {
    const currentTasks = this.tasksSubject.getValue();
    const updateTasks = currentTasks.filter(item => item.id !== task.id);

    this.tasksSubject.next(updateTasks);
    console.log(updateTasks);
  }

  changeStatusTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();

    currentTasks.forEach(item => {
      if (item.id === task.id) {
        item.complited = !item.complited;
      }
    });

    this.tasksSubject.next(currentTasks);
  }

  changeStatusAllTasks(): void {
    const currentTasks = this.tasksSubject.getValue();

    currentTasks.forEach(item => {
      item.complited = !item.complited;
    });

    this.tasksSubject.next(currentTasks);
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
}