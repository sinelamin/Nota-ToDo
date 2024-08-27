import { Component, OnInit } from '@angular/core';
import { map, combineLatest, BehaviorSubject } from 'rxjs';

import { TaskService } from 'src/app/core/task.service';
import { Task } from 'src/app/core/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
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

  filteredTasks$ = combineLatest([this.status$, this.taskService.tasks$]).pipe(
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
    const notCompleteTasks = tasks.filter(item => !item.complited);
    const notCompleteTasksLength = notCompleteTasks.length;

    if (notCompleteTasksLength <= 1) { return `${notCompleteTasksLength} task left` }

    return `${notCompleteTasksLength} tasks left`;
  }

  filterTasks(condition: string, tasks: Task[]): Task[] {
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
