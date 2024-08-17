import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/services/task.service';
import { TaskInterface } from 'src/app/core/models/TaskInterface';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  constructor(private TaskService: TaskService) { }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  tasks: TaskInterface[] = [];

  taskCounter!: number;

  ngOnInit(): void {
    this.TaskService.tasks$.subscribe((tasks => {
      this.tasks = tasks;
    }));

    this.TaskService.getTasks().subscribe();

    console.log(this.tasks);
  }
}
