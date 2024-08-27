import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/task.service';
import { Task } from 'src/app/core/task';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  tasks$ = this.taskService.tasks$;
  taskCounter: string = '';

  taskCounter2 = this.taskService.tasks$.pipe(
    map(items => this.getTasksCounter(items))
  );

  filteredTasks: Task[] = [];
  filteredTasks2 = this.taskService.tasks$.pipe(
    map(items => this.filterTasks(this.taskStatus, items))
  );
  taskStatus: string = '';
  hasCompletedTasks$ = this.taskService.hasCompletedTasks$;

  ngOnInit(): void {
    // console.log(this.tasks);
    console.log(this.taskStatus);
  }

  setStatus(status: string) {
    this.taskStatus = status
  }

  getTasksCounter(tasks: Task[]): string {
    const notCompleteTasks = tasks.filter(item => !item.complited);
    const notCompleteTasksLength = notCompleteTasks.length;

    if (notCompleteTasksLength <= 1) { return `${notCompleteTasksLength} task left` }

    return `${notCompleteTasksLength} tasks left`;
  }

  filterTasks(condition: string, tasks: Task[]) {
    if (condition === 'active') {
      return tasks.filter(item => !item.complited);
    }

    if (condition === 'completed') {
      return tasks.filter(item => item.complited);
    }

    return tasks;
  }

  deleteAllComplitedTasks(): void {
    this.taskService.deleteAllComplitedTasks();
  }
}
