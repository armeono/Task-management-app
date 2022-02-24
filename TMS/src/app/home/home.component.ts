import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: any[] = [];
  tasksActive: any[] = [];
  tasksDone: any[] = [];


  constructor(private dialogRef: MatDialog, private taskService: TaskService) { 

    
    
  }

  ngOnInit(): void {

    this.taskService.currentList.subscribe(list => {
      
     
      this.tasks = list;

      this.tasks.forEach(task => { 
        console.log(task.task)
      })
    })


 


  }



  openPopUp(){

    this.dialogRef.open(PopUpComponent, { 
      height: '400px',
      width: '600px'

    })

  }

  drop(event: CdkDragDrop<string[]>){

    if(event.previousContainer === event.container){

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)



    }else {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)

    }

  
   
  }

  





  

}
