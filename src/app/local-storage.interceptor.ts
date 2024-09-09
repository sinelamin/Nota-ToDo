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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET' && request.url.includes('/tasks')) {
      console.log("GET");

      console.log(localStorage.getItem('tasks'));
    };


    if (request.method === 'POST' && request.url.includes('/tasks')) {

      if (localStorage.length) {
        const data = JSON.parse(localStorage['tasks']);
        const newTask = request.body;
        data.push(JSON.parse(`${newTask}`));

        localStorage.setItem('tasks', JSON.stringify(data));
      }

      if (!localStorage.length) {
        localStorage.setItem('tasks', `[${[request.body]}]`);
      }

      this.taskService.updateTasks();
    }

    return of();
  }
}
