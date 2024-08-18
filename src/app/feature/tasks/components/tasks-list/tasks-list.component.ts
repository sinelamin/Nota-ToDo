import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/services/task.service';
import { TaskInterface } from 'src/app/core/models/TaskInterface';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {

  constructor(private TaskService: TaskService) { }

  tasks: TaskInterface[] = [];
  taskCounter: number = 0;

  filteredTasks: TaskInterface[] = [];
  taskStatus: string = '';

  ngOnInit(): void {
    this.TaskService.tasks$.subscribe((tasks => {
      this.tasks = tasks;
      this.filterTasks(this.taskStatus);

      this.taskCounter = this.tasksCounter(this.tasks) ;
      console.log('обновился список задач!');
    }));

    console.log(this.tasks);
    console.log(this.taskStatus);
  }

  tasksCounter(tasks: TaskInterface[]): number {
    const notCompleteTasks = tasks.filter(item => !item.status);
    const notCompleteTasksLength = notCompleteTasks.length;

    return +notCompleteTasksLength;
  }

  filterTasks(condition: string): void {
      if (condition === 'all' || condition === '') {
        this.filteredTasks = this.tasks;
      }
  
      if (condition === 'active') {
        this.filteredTasks = this.tasks.filter(item => !item.status);
      }
  
      if (condition === 'completed') {
        this.filteredTasks = this.tasks.filter(item => item.status);
      }
    }
}
