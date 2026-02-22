import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../core/models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
      <h3>{{ selectedEmployee ? 'Update Employee' : 'Create Employee' }}</h3>
      <form [formGroup]="form" (ngSubmit)="submit()" class="grid" style="grid-template-columns:repeat(2,1fr)">
        <input formControlName="name" placeholder="Name" />
        <input formControlName="email" placeholder="Email" />
        <input formControlName="department" placeholder="Department" />
        <input formControlName="role" placeholder="Role" />
        <input formControlName="doj" type="date" placeholder="Date of joining" />
        <div style="grid-column:1/-1; display:flex; gap:0.5rem;">
          <button type="submit">{{ selectedEmployee ? 'Update' : 'Create' }}</button>
          <button class="secondary" type="button" (click)="clear()">Clear</button>
        </div>
      </form>
    </div>
  `
})
export class EmployeeFormComponent {
  @Input() selectedEmployee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() reset = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: [''],
    role: [''],
    doj: [new Date().toISOString().slice(0, 10), Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployee'] && this.selectedEmployee) {
      this.form.patchValue(this.selectedEmployee);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.save.emit(this.form.getRawValue() as Employee);
  }

  clear(): void {
    this.form.reset({
      name: '',
      email: '',
      department: '',
      role: '',
      doj: new Date().toISOString().slice(0, 10)
    });
    this.reset.emit();
  }
}
