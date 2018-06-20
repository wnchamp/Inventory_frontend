import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettokenService } from '../../settoken.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empdata = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  idemp: any;
  statusedit: boolean = false;
  statusdelete: boolean = false;
  statuscreate: boolean = false;
  statusdetail: boolean = false;
  name_en: any;
  name_th: any;
  data_emp: any;
  search: string = '';
  dataSource;
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['employee_no', 'fullname_th', 'fullname_en', 'dep_name', 'status_name', 'action'];
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private http: HttpService, private fb: FormBuilder, private setToken: SettokenService) {
    this.form = fb.group({
      numpage: ['1'],
      rownumber: ['20'],
      empstat: ['al'],
      search: ['', [Validators.required, Validators.pattern(this.regex_search)]],
      search_by: ['al']
    });
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.setPage = this.form.controls.numpage.value;
    this.dataEmp();
  }
  selectPage(i) {
    if (i > 0) {
      this.setPage = i;
      this.dataEmp();
    }
  }
  dataEmp() {
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.rownumber.value,
      user_status: this.form.controls.empstat.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value,
    };
    this.http.requestPost(`api/GetAll/employee`, obj).subscribe((res: any) => {
      this.empdata = res.data.data;
      this.data_page = res.data.page;
      console.log(res);

      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      console.log(this.empdata);
      this.setToken.getToken();

      this.navPage = [];
      this.checkdisBut = 0;
      this.itemperPage = 10;
      let arrP = [];
      for (var i = 0; i < Math.ceil(this.data_page / this.itemperPage); i++) {
        let ini = 0;
        for (var x = (i * this.itemperPage) + 1; x <= this.itemperPage * (i + 1); x++) {
          if (x <= this.data_page) {
            arrP[ini] = x;
            this.checkdisBut += 1;
            ini++;
          }
        }
        this.navPage[i] = arrP;
        arrP = [];
      }

      if (this.initnum > this.navPage.length - 1) {
        this.initnum = 0;
      }
      this.countPage = this.navPage[this.initnum];

      if (this.setPage > this.data_page) {
        this.setPage = this.data_page;
      }
    });
  }
  nextPage() {
    let num = parseInt(this.setPage) + 1;
    if (num > this.countPage[this.itemperPage - 1]) {
      this.nexttabPage();
    }
    this.selectPage(num);
  }
  previousPage() {
    let num = parseInt(this.setPage) - 1;
    if (num < this.countPage[this.itemperPage - 10]) {
      this.previoustabPage();
    }
    this.selectPage(num);
  }
  nexttabPage() {
    this.initnum += 1;
    if (this.initnum > this.navPage.length - 1) {
      this.initnum = this.navPage.length - 1;
    }
    this.countPage = this.navPage[this.initnum];
  }
  previoustabPage() {
    this.initnum -= 1;
    if (this.initnum < 0) {
      this.initnum = 0;
    }
    this.countPage = this.navPage[this.initnum];
  }

  openedit(id, data) {
    this.statusedit = true;
    this.idemp = id;
    this.data_emp = data;
  }
  opencreate() {
    this.statuscreate = true;
  }
  opendelete(id, fname_en, lname_en, fname_th, lname_th) {
    this.statusdelete = true;
    this.name_en = fname_en + " " + lname_en;
    this.name_th = fname_th + " " + lname_th;
    this.idemp = id;
  }
  opendetail(data) {
    this.statusdetail = true;
    this.data_emp = data;
  }
  Close(e) {
    this.statuscreate = e;
    this.statusedit = e;
    this.statusdelete = e;
    this.statusdetail = e;
    if (e != true) {
      this.dataEmp();
    }
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getEmployee();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getEmployee();
  }

}

export interface Element {
  employee_no: string;
  fullname_th: string;
  fullname_en: string;
  dep_name: string;
  status_name: string;
}