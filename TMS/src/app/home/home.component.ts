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

  deleteTasks: any[] = [];


  constructor(private dialogRef: MatDialog, private taskService: TaskService) {



  }

  ngOnInit(): void {

    this.taskService.currentList.subscribe(list => {

      this.tasks = list;

    })

    this.taskService.getTasks().subscribe(data => {
      this.tasks = data
    });

    this.taskService.getActiveTasks().subscribe(data => {
      this.tasksActive = data
    });

    this.taskService.getDoneTasks().subscribe(data => {
      this.tasksDone = data
    });




  }



  openPopUp() {

    this.dialogRef.open(PopUpComponent, {
      height: '400px',
      width: '600px'

    })

  }

  drop(event: CdkDragDrop<string[]>) {



    if (event.previousContainer === event.container) {



      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)



    } else {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)


      let text = event.item.element.nativeElement.innerText

      if (event.container.id === 'cdk-drop-list-2') {

        let switchTask: any[] = []

       

        this.tasksActive.forEach(data => {

          if(data.task == text){

            switchTask.push(data)

          }
        })



        this.taskService.transferToActive(switchTask);

        this.taskService.deleteTask('tasks', switchTask)

        this.taskService.deleteTask('doneTasks', switchTask)

        
      }

      if (event.container.id === 'cdk-drop-list-3') {

        let switchTask: any[] = []

       

        this.tasksDone.forEach(data => {

          if(data.task == text){

            switchTask.push(data)

          }
        })



        this.taskService.transferToDone(switchTask);

        this.taskService.deleteTask('tasks', switchTask)

        this.taskService.deleteTask('activeTasks', switchTask)

        
      }

      if (event.container.id === 'cdk-drop-list-1') {

        let switchTask: any[] = []

       

        this.tasks.forEach(data => {

          if(data.task == text){

            switchTask.push(data)

          }
        })



        this.taskService.transferToTodo(switchTask);

        this.taskService.deleteTask('doneTasks', switchTask)

        this.taskService.deleteTask('activeTasks', switchTask)

        
      }


    }



  }

  delete(event: CdkDragDrop<string[]>) {

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)

    let element = event.item.element.nativeElement.innerText

    console.log(this.deleteTasks)

    this.taskService.deleteTask('doneTasks', this.deleteTasks)

    this.taskService.deleteTask('activeTasks', this.deleteTasks)

    this.taskService.deleteTask('tasks', this.deleteTasks)

    this.deleteTasks.pop()

  


   



  }








}
