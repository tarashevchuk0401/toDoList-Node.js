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

  addTask(description: string, image?: File): Observable<any> {
    const taskData = new FormData();
    taskData.append("description", description);
    // taskData.append("isDOne", false);
    if (image) {
      taskData.append("image", image, description);
    }
    console.log(taskData)
    return this.http.post('http://localhost:3000/api/tasks', taskData)
  }

  getTaskById(id: string){
    return this.http.get<{message: string, task: Task}>('http://localhost:3000/api/tasks/' + id);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/tasks/' + id);
  }
}
