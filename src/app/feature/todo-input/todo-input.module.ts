import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

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
