import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoInputComponent } from './todo-input.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    TodoInputComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    // MatButtonModule,
  ],
  exports: [
    TodoInputComponent,
  ]
})
export class TodoInputModule { }
