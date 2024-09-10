import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, BehaviorSubject, map } from 'rxjs';
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

  tasks$ = this.tasksSubject.pipe(
    map(items => items.map(item => ({ ...item })))
  );
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

  addTask2(task: Task): Observable<Task> {
    return this.http.post<Task>(this.testUrl, JSON.stringify(task));
  }

  updateTasks() {
    const updateTasks = JSON.parse(localStorage['tasks']);
    this.tasksSubject.next(updateTasks);
  }

  deleteTask(task?: Task): void {
    const currentTasks = this.tasksSubject.getValue();

    const updateTasks = currentTasks.filter(item => {
      if (task) {
        return item.id !== task.id;
      }

      return !item.completed;
    });

    this.tasksSubject.next(updateTasks);
    this.checkingUnfinishedTasks();
  }

  changeTask(task?: Task, newTaskName?: string): void {
    const currentTasks = this.tasksSubject.getValue();
    const completedAllTasks = currentTasks.every(item => item.completed === true);

    currentTasks.forEach(item => {
      const isTargetTask = item.id === task?.id;

      if (isTargetTask) {
        item.taskname = newTaskName ?? item.taskname;

        if (!newTaskName) {
          item.completed = !item.completed;
        }
      }

      if (!task) {
        item.completed = !completedAllTasks;
      }
    });

    this.tasksSubject.next(currentTasks);
    this.checkingUnfinishedTasks();
  }

  checkingUnfinishedTasks(): void {
    const currentTasks = this.tasksSubject.getValue();
    const hasCompletedTasks = currentTasks.every(item => !item.completed);

    this.hasCompletedTasksSubject.next(!hasCompletedTasks);
  }
}