import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaskService } from 'task';

@Injectable()
export class LocalStorageInterceptor implements HttpInterceptor, OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isTargetUrlForTasks = request.url.includes('/tasks');

    if (isTargetUrlForTasks) {
      switch (request.method) {
        case 'GET':
          console.log(localStorage.getItem('tasks'));
          break;

        case 'POST':
          const data = localStorage.length ? JSON.parse(localStorage['tasks']) : [];
          const newTask = JSON.parse(`${request.body}`);

          data.push(newTask);
          localStorage.setItem('tasks', JSON.stringify(data));

          this.taskService.updateTasks();
          break;

        default:
          console.log(`Unhandled request with a method: ${request.method}`);
      }
    }

    return of(JSON.parse(`${request.body}`).id);
  }
}
