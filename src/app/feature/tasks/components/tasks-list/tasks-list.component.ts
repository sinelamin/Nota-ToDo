import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  constructor(private TaskService: TaskService) { }

  tasks: Task[] = [];

  ngOnInit(): void {
    this.tasks = this.TaskService.tasks;
    console.log(this.tasks);
  }

}
