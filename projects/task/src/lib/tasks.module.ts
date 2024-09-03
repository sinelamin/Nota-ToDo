import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './shared/angular-material.module';

import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    AngularMaterialModule
  ],
  exports: [
    TasksListComponent,
  ]
})
export class TasksModule { }
