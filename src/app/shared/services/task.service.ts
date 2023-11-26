import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get('http://localhost:3000/api/tasks')
  }

  addTask(taskData: Task): Observable<any> {
    // const taskData = new FormData();
   
    console.log(taskData)
    return this.http.post('http://localhost:3000/api/tasks', taskData)
  }

  updateTask(taskData: Task): Observable<{message: string}>{
    return this.http.put<{message: string}>('http://localhost:3000/api/tasks', taskData)
  }

  getTaskById(id: string){
    return this.http.get<{message: string, task: any}>('http://localhost:3000/api/tasks/' + id);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/tasks/' + id);
  }
}
