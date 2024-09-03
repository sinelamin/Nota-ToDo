import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'task';

import { TodoInputComponent } from './todo-input.component';



@NgModule({
  declarations: [
    TodoInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [
    TodoInputComponent,
  ]
})
export class TodoInputModule { }
