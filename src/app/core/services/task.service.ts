import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasks = [
    {
      taskname: 'Complete project report',
      status: false
    },
    {
      taskname: 'Prepare presentation slides',
      status: false
    },
    {
      taskname: 'Update website content',
      status: true
    },
    {
      taskname: 'Organize team meeting',
      status: false
    },
    {
      taskname: 'Review budget proposal',
      status: true
    },
    {
      taskname: 'Submit time sheets',
      status: false
    }
  ];

}
