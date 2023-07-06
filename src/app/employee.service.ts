import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
 providedIn: 'root'
})
export class EmployeeService {
  constructor(private indexedDBService: IndexedDBService) {}

  public addEmployee(employee: any): Promise<number> {
    return this.indexedDBService.addEmployee(employee);
  }

  public getEmployees(): Promise<any[]> {
    return this.indexedDBService.getEmployees();
  }

  public deleteEmployee(id: number): Promise<void> {
    return this.indexedDBService.deleteEmployee(id);
  }
}
