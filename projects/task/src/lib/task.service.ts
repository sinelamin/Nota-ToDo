import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private hasCompletedTasksSubject = new BehaviorSubject<boolean>(false);
  private localStorageSubject = new BehaviorSubject<string>(localStorage.getItem('tasks') || '');

  tasks$ = this.tasksSubject.pipe(
    map(items => items.map(item => ({ ...item })))
  );

  localStorage$ = this.localStorageSubject.pipe(
    map(value => JSON.parse(value))
  )

  hasCompletedTasks$ = this.hasCompletedTasksSubject.asObservable();

  testUrl = 'https://url.com/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.testUrl);
  }

  // addTask(task: Task): void {
  //   const currentTasks = this.tasksSubject.getValue();

  //   this.tasksSubject.next([...currentTasks, task]);
  //   console.log(this.tasksSubject.getValue());
  // }

  addTask2(task: Task): Observable<any> {
    return this.http.post<any>(this.testUrl, JSON.stringify(task));
  }

  updateTasks() {
    const updateTasks = JSON.parse(localStorage['tasks']);
    this.tasksSubject.next(updateTasks);
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


  changeTask(task: Task, newTaskName?: string): void {
    const currentTasks = this.tasksSubject.getValue();

    currentTasks.forEach(item => {
      if (item.id === task.id) {
        if (newTaskName) {
          item.taskname = newTaskName;
        }

        if (!newTaskName) {
          item.completed = !item.completed;
        }
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