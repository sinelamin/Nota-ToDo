import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from '../components/main/main.component';
import { TasksModule } from 'task';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    TasksModule,
  ],
  exports: [
    MainComponent
  ]
})
export class PagesModule { }
