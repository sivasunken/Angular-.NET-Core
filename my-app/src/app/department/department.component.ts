import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  constructor(private http: HttpClient, private eventService: EventService) {
    eventService.dbSourceChanged$.subscribe((data) => {
      this.dbSource = data;
      this.refreshList();
    });
  }

  dbSource = 'mssql';
  departments: any = [];

  modalTitle = '';
  DepartmentId = 0;
  DepartmentName = '';

  DepartmentIdFilter = '';
  DepartmentNameFilter = '';
  departmentsWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http
      .get<any>(environment.API_URL + this.dbSource + '/department')
      .subscribe((data) => {
        this.departments = data;
        this.departmentsWithoutFilter = data;
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
      .post(environment.API_URL + this.dbSource + '/department', body)
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

    this.http
      .put(environment.API_URL + this.dbSource + '/department', body)
      .subscribe((res) => {
        alert(res.toString());
        this.refreshList();
      });
  }

  deleteClick(id: number) {
    if (confirm('Are you sure?')) {
      this.http
        .delete(environment.API_URL + this.dbSource + '/department/' + id)
        .subscribe((res) => {
          alert(res.toString());
          this.refreshList();
        });
    }
  }

  FilterFn() {
    const DepartmentIdFilter = this.DepartmentIdFilter;
    const DepartmentNameFilter = this.DepartmentNameFilter;

    this.departments = this.departmentsWithoutFilter.filter(function (el: any) {
      return (
        el.DepartmentId.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(prop: any, asc: any) {
    this.departments = this.departmentsWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (asc) return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      else return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    });
  }
}
