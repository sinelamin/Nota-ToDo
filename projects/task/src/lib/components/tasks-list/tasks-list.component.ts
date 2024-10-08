import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { map, combineLatest, BehaviorSubject } from 'rxjs';

import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  private taskStatusSubject = new BehaviorSubject<string>('');

  taskList$ = this.taskService.tasks$;
  status$ = this.taskStatusSubject.asObservable();
  hasCompletedTasks$ = this.taskService.hasCompletedTasks$;

  taskStatus: string = '';

  taskCounter$ = this.taskService.tasks$.pipe(
    map(items => this.tasksCounter(items))
  );

  filteredTasks$ = combineLatest([this.status$, this.taskList$]).pipe(
    map(([status, tasks]) => {
      this.taskStatus = status;
      return this.filterTasks(status, tasks)
    })
  )

  setStatus(status: string) {
    this.taskStatusSubject.next(status);
  }

  ngOnInit(): void {
  }

  tasksCounter(tasks: Task[]): string {
    const unfinishedTasksNumber = tasks.filter(item => !item.completed).length;

    if (unfinishedTasksNumber <= 1) { return `${unfinishedTasksNumber} task left` }

    return `${unfinishedTasksNumber} tasks left`;
  }

  filterTasks(condition: string, tasks: Task[]): Task[] {
    switch (condition) {
      case 'active':
        return tasks.filter(item => !item.completed);
      case 'completed':
        return tasks.filter(item => item.completed);
      default:
        return tasks;
    }
  }

  deleteAllComplitedTasks(): void {
    this.taskService.deleteTask();
  }
}
