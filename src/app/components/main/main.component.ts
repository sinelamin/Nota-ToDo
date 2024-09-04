import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TodoInputComponent } from 'projects/task/src/public-api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
