import { Injectable } from '@angular/core';
import { TaskInterface } from '../models/TaskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasks: TaskInterface[] = [
    {
      taskname: 'Complete project report',
      status: false
    },
    {
      taskname: 'Prepare presentation slides',
      status: false
    },
  ];
}
