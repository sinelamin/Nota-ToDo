import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/task.service';
import { Task } from 'src/app/core/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  tasks: Task[] = [];
  taskCounter: string = '';

  filteredTasks: Task[] = [];
  taskStatus: string = '';
  hasCompletedTasks: boolean = false;

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks => {
      this.tasks = tasks;
      this.filterTasks(this.taskStatus);

      this.taskCounter = this.tasksCounter(this.tasks) ;
      console.log('обновился список задач!');
    }));

    this.taskService.hasCompletedTasks$.subscribe((hasCompletedTasks => {
      this.hasCompletedTasks = hasCompletedTasks;
    }))

    console.log(this.tasks);
    console.log(this.taskStatus);
  }

  tasksCounter(tasks: Task[]): string {
    const notCompleteTasks = tasks.filter(item => !item.complited);
    const notCompleteTasksLength = notCompleteTasks.length;

    if (notCompleteTasksLength <= 1) {return `${notCompleteTasksLength} task left`}

    return `${notCompleteTasksLength} tasks left`;
  }

  filterTasks(condition: string): void {
      if (condition === 'all' || condition === '') {
        this.filteredTasks = this.tasks;
      }
  
      if (condition === 'active') {
        this.filteredTasks = this.tasks.filter(item => !item.complited);
      }
  
      if (condition === 'completed') {
        this.filteredTasks = this.tasks.filter(item => item.complited);
      }
    }

    deleteAllComplitedTasks(): void {
      this.taskService.deleteAllComplitedTasks();
    }
}
