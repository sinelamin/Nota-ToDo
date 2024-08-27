import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskService } from './task.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TaskService,
  ],
  exports: []
})
export class CoreModule { }
