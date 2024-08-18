import { Injectable } from '@angular/core';
import { TaskInterface } from '../models/TaskInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasksSubject = new BehaviorSubject<TaskInterface[]>([]);

  tasks$ = this.tasksSubject.asObservable();

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

  addTask(task: TaskInterface) {
    const currentTasks = this.tasksSubject.getValue();

    this.tasksSubject.next([...currentTasks, task]);
    console.log(this.tasksSubject.getValue());
  }

  deleteTask(task: TaskInterface) {
    const currentTasks = this.tasksSubject.getValue();
    const updateTasks = currentTasks.filter(item => item !== task);

    this.tasksSubject.next(updateTasks);
    console.log(updateTasks);
  }

  changeStatusTask(task: TaskInterface): void {
    const currentTasks = this.tasksSubject.getValue();

    currentTasks.forEach(item => {
      if (item === task) {
        item.status = !item.status;
      }
    });

    this.tasksSubject.next(currentTasks);
  }
}