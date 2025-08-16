import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(filters?: any): Observable<Task[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params = params.append(key, filters[key]);
        }
      });
    }
    return this.http.get<Task[]>(this.apiUrl, { params });
  }

  createTask(taskData: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData);
  }

  updateTask(id: string, taskData: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, taskData);
  }

  deleteTask(id: string): Observable<object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}