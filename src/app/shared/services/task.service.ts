import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from 'src/environment/environment';

const BACKEND_URL =  environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get(BACKEND_URL + '/tasks');
  }

  addTask(taskData: Task): Observable<any> {
    return this.http.post(BACKEND_URL + '/tasks', taskData);
  }

  updateTask(taskData: Task): Observable<{message: string}>{
    return this.http.put<{message: string}>(BACKEND_URL + '/tasks', taskData);
  }

  getTaskById(id: string){
    return this.http.get<{message: string, task: any}>(BACKEND_URL + '/tasks/' + id);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(BACKEND_URL + '/tasks/' + id);
  }
}
