import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/tokens/tokens';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    protected http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  protected getAll<T>(url?: string, params?: Record<string, any>): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${url ? url : ''}`, {
      withCredentials: true,
      params,
    });
  }

  protected get<T>(url?: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url ? url : ''}`, {
      withCredentials: true,
      params,
    });
  }

  protected getById<T>(id: string, url?: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url ? url : ''}/${id}`, {
      withCredentials: true,
    });
  }

  protected create<T>(url: string = '', data: T, params?: Record<string, any>): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, data, {
      withCredentials: true,
      params
    });
  }

  protected update<T>(
    url: string = '',
    data: Partial<T>,
    id: number | string
  ): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${url ? url : ''}/${id}`, data, {
      withCredentials: true,
    });
  }

  protected delete(url: string = '', id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${url}/${id}`, {
      withCredentials: true,
    });
  }
}
