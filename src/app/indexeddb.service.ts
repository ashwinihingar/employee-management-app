import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private readonly DB_NAME = 'employeeDB';
  private readonly STORE_NAME = 'employees';

  private db!: IDBDatabase;

  constructor() {
    this.openDatabase();
  }

  private openDatabase(): void {
    const request = indexedDB.open(this.DB_NAME, 1);

    request.onerror = (event: any) => {
      console.error('IndexedDB error:', event.target.errorCode);
    };

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;

      if (!this.db.objectStoreNames.contains(this.STORE_NAME)) {
        this.db.createObjectStore(this.STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };
  }

  public addEmployee(employee: any): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);

      const request = store.add(employee);
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  public getEmployees(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  public deleteEmployee(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(this.STORE_NAME, 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }
}
