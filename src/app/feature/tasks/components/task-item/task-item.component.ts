import { Component, OnInit, Input } from '@angular/core';


import { TaskInterface } from 'src/app/core/models/TaskInterface';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: TaskInterface;

  constructor(private TaskService: TaskService) { }

  ngOnInit(): void {
  }

  checked: boolean = false;
}
