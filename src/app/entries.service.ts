import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EntriesService {
  private apiUrl = 'https://xdiario-backendx.fly.dev/entries';

  constructor(private http: HttpClient) {}

  // Obtener todas las entradas
  getEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar una nueva entrada
  addEntry(texto: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { texto });
  }

  // Dar like
  likeEntry(id: number): Observable<any> {
    return this.http.post<any>(`https://xdiario-backendx.fly.dev/like/${id}`, {});
  }

  // Dar dislike
  dislikeEntry(id: number): Observable<any> {
    return this.http.post<any>(`https://xdiario-backendx.fly.dev/dislike/${id}`, {});
  }
}

