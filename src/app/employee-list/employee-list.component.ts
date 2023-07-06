import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  currentEmployees: any[] = [];
  previousEmployees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().then((employees) => {
      this.currentEmployees = employees.filter((employee) => !employee.previous);
      this.previousEmployees = employees.filter((employee) => employee.previous);
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).then(() => {
      this.loadEmployees();
    });
  }

  showAddEmployeeForm(): void {
    // Implement this method to show the add employee form.
  }
}
