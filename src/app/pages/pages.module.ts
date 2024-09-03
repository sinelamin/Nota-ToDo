import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { TodoInputModule } from '../feature/todo-input/todo-input.module';
import { TasksModule } from 'task';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    TodoInputModule,
    TasksModule,
  ],
  exports: [
    MainComponent
  ]
})
export class PagesModule { }
