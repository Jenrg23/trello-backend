import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private apiUrl = 'https://trello-backend-l2vs.onrender.com/tareas';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearTarea(tarea: any): Observable<any> {
    return this.http.post(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, tarea: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
