import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/core/task.service';
import { Task } from 'src/app/core/task';

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

  constructor(private taskService: TaskService,) { }

  ngOnInit(): void {
  }

  taskInput = new FormGroup({
    taskName: new FormControl(''),
  });

  addTask() {
    const taskName = this.taskInput.get('taskName')!.value!;

    if (taskName) {
      const id = Date.now();
      const newTask: Task = {id: id, taskname: taskName, complited: false};

      this.taskService.addTask(newTask);

      this.taskInput.reset();
    }
  }
}
