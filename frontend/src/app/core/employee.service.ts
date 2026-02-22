import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee, EmployeeListResponse } from './models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private endpoint = `${environment.apiBaseUrl}/api/employees/`;

  constructor(private http: HttpClient) {}

  getEmployees(page = 1, department = '', role = ''): Observable<EmployeeListResponse> {
    let params = new HttpParams().set('page', page);
    if (department) {
      params = params.set('department', department);
    }
    if (role) {
      params = params.set('role', role);
    }

    return this.http.get<EmployeeListResponse>(this.endpoint, { params });
  }

  createEmployee(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.endpoint, payload);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.endpoint}${id}/`);
  }

  updateEmployee(id: number, payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.endpoint}${id}/`, payload);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${id}/`);
  }
}
