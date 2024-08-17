import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoInputComponent } from './todo-input.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TodoInputComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    TodoInputComponent,
  ]
})
export class TodoInputModule { }
