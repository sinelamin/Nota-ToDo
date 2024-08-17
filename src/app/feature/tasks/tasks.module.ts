import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';



@NgModule({
  declarations: [
    TasksListComponent,
    TaskItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    TasksListComponent,
  ]
})
export class TasksModule { }
