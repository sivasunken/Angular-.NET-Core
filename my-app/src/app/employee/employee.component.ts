import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  employees: any = [];
  departments: any = [];

  modalTitle = '';
  EmployeeId = 0;
  EmployeeName = '';
  Department = '';
  DateOfJoining = '';
  PhotoFileName = 'anonymous.png';
  PhotoPath = environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'employee').subscribe((data) => {
      this.employees = data;
    });

    this.http.get<any>(environment.API_URL + 'department').subscribe((data) => {
      this.departments = data;
    });
  }

  addClick() {
    this.modalTitle = 'Add Employee';
    this.EmployeeId = 0;
    this.EmployeeName = '';
    this.Department = '';
    this.DateOfJoining = '';
    this.PhotoFileName = 'anonymous.png';
  }

  editClick(emp: {
    EmployeeId: number;
    EmployeeName: string;
    Department: string;
    DateOfJoining: string;
    PhotoFileName: string;
  }) {
    this.modalTitle = 'Edit Employee';
    this.EmployeeId = emp.EmployeeId;
    this.EmployeeName = emp.EmployeeName;
    this.Department = emp.Department;
    this.DateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = emp.PhotoFileName;
  }

  createClick() {
    const body = {
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.http.post(environment.API_URL + 'employee', body).subscribe((res) => {
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick() {
    const body = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.http.put(environment.API_URL + 'employee', body).subscribe((res) => {
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id: number) {
    if (confirm('Are you sure?')) {
      this.http
        .delete(environment.API_URL + 'employee/' + id)
        .subscribe((res) => {
          alert(res.toString());
          this.refreshList();
        });
    }
  }
}
