import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { SettokenService } from '../../settoken.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  data_dep = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  idedit: any;
  datadep: any;
  iddelete: any;
  statusedit: any;
  statusdelete: any;
  displayedColumns = ['dep_no', 'dep_name', 'create_dt', 'action'];
  dataSource;
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService, private setToken: SettokenService) {
    this.form = fb.group({
      numpage: ['1'],
      numrow: ['20'],
      depstatus: ['ac'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['al']
    })
  }

  ngOnInit() {
    this.getDep();
  }

  getDep() {
    this.setPage = this.form.controls.numpage.value;
    this.dataDep();
  }
  selectPage(e) {
    this.setPage = e;
    this.dataDep();
  }
  dataDep() {
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.numrow.value,
      sta_id: this.form.controls.depstatus.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value
    };
    this.http.requestPost('api/Get_department', obj).subscribe((res: any) => {
      this.data_dep = res.data.data;
      console.log(res.data.data);
      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      this.data_page = res.data.page;
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

  openedit(e: any, data: any) {
    this.statusedit = true;
    this.idedit = e;
    this.datadep = data;
  }
  opendelete(e: any, data: any) {
    this.statusdelete = true;
    this.iddelete = e;
    this.datadep = data;
  }

  Close(e: any) {
    this.statusedit = e;
    this.statusdelete = e;
    this.dataDep();
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getDep();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getDep();
  }
}

export interface Element {
  dep_no: string;
  dep_name: string;
  create_dt: string;
}