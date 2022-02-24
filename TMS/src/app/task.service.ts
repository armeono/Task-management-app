import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks: any = []

  private arrayOfTasks = new BehaviorSubject<Array<any>>([])

  currentList = this.arrayOfTasks.asObservable();

  newTask(name: string, description: string, newColor: string){

    let task: any = { 
      task: name,
      description: description,
      color: newColor
    }

    this.tasks.push(task)


    this.arrayOfTasks.next(this.tasks)




  }


  constructor() { }
}
