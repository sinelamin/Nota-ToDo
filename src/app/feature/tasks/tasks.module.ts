import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatListModule} from '@angular/material/list';

import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';



@NgModule({
  declarations: [
    TasksListComponent,
    TaskItemComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
  ],
  exports: [
    TasksListComponent,
  ]
})
export class TasksModule { }
