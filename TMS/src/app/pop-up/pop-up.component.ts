import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {



  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

  }

  getTask(taskName: string, taskDescription: string, taskColor: string ){
  

    this.taskService.newTask(taskName, taskDescription, taskColor)



  }

}
