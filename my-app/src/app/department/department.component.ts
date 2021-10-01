import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  constructor(private http: HttpClient) {}

  departments: any = [];
  modalTitle = '';
  DepartmentId = 0;
  DepartmentName = '';

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http.get<any>(environment.API_URL + 'department').subscribe((data) => {
      this.departments = data;
    });
  }

  addClick() {
    this.modalTitle = 'Add Department';
    this.DepartmentId = 0;
    this.DepartmentName = '';
  }

  editClick(dep: { DepartmentId: number; DepartmentName: string }) {
    this.modalTitle = 'Edit Department';
    this.DepartmentId = dep.DepartmentId;
    this.DepartmentName = dep.DepartmentName;
  }

  createClick() {
    const body = { DepartmentName: this.DepartmentName };

    this.http
      .post(environment.API_URL + 'department', body)
      .subscribe((res) => {
        alert(res.toString());
        this.refreshList();
      });
  }

  updateClick() {
    const body = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,
    };

    this.http.put(environment.API_URL + 'department', body).subscribe((res) => {
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id: number) {
    if (confirm('Are you sure?')) {
      this.http
        .delete(environment.API_URL + 'department/' + id)
        .subscribe((res) => {
          alert(res.toString());
          this.refreshList();
        });
    }
  }
}
