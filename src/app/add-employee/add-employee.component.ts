import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: any = {};
  minDate: Date; // Add minDate property

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.resetForm();
    this.minDate = new Date(); // Set minDate to today's date
  }


  resetForm(): void {
    this.newEmployee = {
      name: '',
      role: '',
      date: ''
    };
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).then(() => {
      this.resetForm();
    });
  }

  cancel(): void {
    // Implement this method to cancel adding an employee and navigate back to the employee list page.
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.newEmployee.date = event.value.toISOString().substring(0, 10);
  }
}
