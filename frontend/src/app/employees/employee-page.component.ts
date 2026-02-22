import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { EmployeeService } from '../core/employee.service';
import { Employee } from '../core/models';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, EmployeeFormComponent],
  template: `
    <div class="container grid employee-page">
      <div class="card page-header">
        <h2>Employee Management</h2>
        <button class="secondary" (click)="logout()">Logout</button>
      </div>

      <app-employee-form [selectedEmployee]="selectedEmployee" (save)="saveEmployee($event)" (reset)="selectedEmployee = null" />

      <div class="card filter-bar">
        <div>
          <label>Department</label>
          <input [(ngModel)]="department" placeholder="filter by department" />
        </div>
        <div>
          <label>Role</label>
          <input [(ngModel)]="role" placeholder="filter by role" />
        </div>
        <button (click)="fetchEmployees(1)">Apply Filters</button>
        <button class="secondary" (click)="clearFilters()">Reset</button>
      </div>

      <div class="card" *ngIf="error"><p class="error">{{ error }}</p></div>

      <div class="card table-card">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>DOJ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of employees">
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td><span class="chip">{{ employee.department || 'N/A' }}</span></td>
              <td><span class="chip chip-role">{{ employee.role || 'N/A' }}</span></td>
              <td>{{ employee.doj }}</td>
              <td class="row-actions">
                <button class="secondary" (click)="editEmployee(employee)">Edit</button>
                <button class="danger" (click)="deleteEmployee(employee.id!)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button class="secondary" [disabled]="currentPage <= 1" (click)="fetchEmployees(currentPage - 1)">Prev</button>
          <span>Page {{ currentPage }} / {{ numPages }}</span>
          <button class="secondary" [disabled]="currentPage >= numPages" (click)="fetchEmployees(currentPage + 1)">Next</button>
        </div>
      </div>
    </div>
  `
})
export class EmployeePageComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  error = '';
  department = '';
  role = '';
  currentPage = 1;
  numPages = 1;

  constructor(private employeeService: EmployeeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(page = 1): void {
    this.employeeService.getEmployees(page, this.department, this.role).subscribe({
      next: (response) => {
        this.error = '';
        this.employees = response.results;
        this.currentPage = response.current_page;
        this.numPages = response.num_pages;
      },
      error: () => (this.error = 'Could not load employees')
    });
  }

  saveEmployee(payload: Employee): void {
    if (this.selectedEmployee?.id) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, payload).subscribe({
        next: () => {
          this.selectedEmployee = null;
          this.fetchEmployees(this.currentPage);
        },
        error: () => (this.error = 'Failed to update employee')
      });
      return;
    }

    this.employeeService.createEmployee(payload).subscribe({
      next: () => this.fetchEmployees(this.currentPage),
      error: () => (this.error = 'Failed to create employee')
    });
  }

  editEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(this.currentPage),
      error: () => (this.error = 'Failed to delete employee')
    });
  }

  clearFilters(): void {
    this.department = '';
    this.role = '';
    this.fetchEmployees(1);
  }

  logout(): void {
    this.auth.logout();
  }
}
