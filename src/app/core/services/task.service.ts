import { Injectable } from '@angular/core';
import { TaskInterface } from '../models/TaskInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasksSubject = new BehaviorSubject<TaskInterface[]>([]);
  private tasksCounterSubject = new BehaviorSubject<number>(0);

  tasks$ = this.tasksSubject.asObservable();

  taskCounter$ = this.tasksCounterSubject.asObservable();

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

  getTasks() {
    return this.tasks$;
  }

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


  // tasksCounter(): void {
  // }
}