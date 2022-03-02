import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  private allTasks: any[] = []



  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.taskService.getTasks().subscribe(data => { 
      this.allTasks = data
    });


  }

  getTask(taskName: string, taskDescription: string, taskColor: string ){

    taskName = taskName.trim()

    const task = { 
      task: taskName,
      description: taskDescription,
      color: taskColor
    }
  

    this.taskService.newTask(taskName, taskDescription, taskColor, this.allTasks)

    this.taskService.insertTask(task)



  }

}
