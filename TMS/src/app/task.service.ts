import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ITask } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url: string = "http://localhost:8080"

  constructor(private http: HttpClient) {


  }

  public tasks: string[] = []


  private arrayOfTasks = new BehaviorSubject<Array<any>>([])

  currentList = this.arrayOfTasks.asObservable();

  newTask(name: string, description: string, newColor: string, list: string[]) {


    let task: any = {
      task: name,
      description: description,
      color: newColor
    }

    if (this.tasks.length == 0) {
      this.tasks = list
    }


    this.tasks.push(task)


    this.arrayOfTasks.next(this.tasks)


  }

  getTasks(): Observable<ITask[]> {


    return this.http.get<ITask[]>(`${this.url}/getdata/tasks`);


  }

  getActiveTasks(): Observable<ITask[]> {

    return this.http.get<ITask[]>(`${this.url}/getdata/activeTasks`)

  }

  getDoneTasks(): Observable<ITask[]> {

    return this.http.get<ITask[]>(`${this.url}/getdata/doneTasks`)

  }

  insertTask(task: ITask) {

    return this.http.post(`${this.url}/postdata/tasks`, task).subscribe();
  }

  transferToActive(switchTask: any[]) {

    return this.http.post(`${this.url}/transferdata/activeTasks`, switchTask[0]).subscribe()

  }

  transferToDone(switchTask: any[]) {

    return this.http.post(`${this.url}/transferdata/doneTasks`, switchTask[0]).subscribe()

  }

  transferToTodo(switchTask: any[]){

    return this.http.post(`${this.url}/transferdata/tasks`, switchTask[0]).subscribe()


  }

  deleteTask(collectionName: string, switchTask: any[]) {

    let taskName = switchTask[0].task


    return this.http.delete(`${this.url}/delete/${collectionName}/${taskName}`).subscribe()



  }







}
