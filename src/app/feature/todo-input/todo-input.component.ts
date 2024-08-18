import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/services/task.service';
import { TaskInterface } from 'src/app/core/models/TaskInterface';
import { TaskModel } from 'src/app/core/models/taskModel';

import {
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  constructor(private TaskService: TaskService,) { }

  ngOnInit(): void {
  }

  taskInput = new FormGroup({
    taskName: new FormControl(''),
  });

  addTask() {
    const taskName = this.taskInput.get('taskName')!.value!;
    const newTask: TaskInterface = new TaskModel(taskName, false);

    this.TaskService.addTask(newTask);

    this.taskInput.reset();
  }

}
