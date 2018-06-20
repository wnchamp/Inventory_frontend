import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-garbage-emp',
  templateUrl: './garbage-emp.component.html',
  styleUrls: ['./garbage-emp.component.css']
})
export class GarbageEmpComponent implements OnInit {

  data_emp = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  inputSearch: any;
  statusModalmove: boolean = false;
  id_emp: any;
  name_en: any;
  name_th: any;
  statusmodaldelete: boolean = false;
  displayedColumns = ['fullname_th', 'fullname_en', 'dep_name', 'action'];
  Element: Element[];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  search_nf: any;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private http: HttpService, private fb: FormBuilder) {
    this.form = fb.group({
      numpage: ['1'],
      rownumber: ['20'],
      empstat: ['rm'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['all']
    });
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.setPage = this.form.controls.numpage.value
    this.inputSearch = this.form.controls.search.value
    this.dataEmp()
  }
  selectPage(e) {
    this.setPage = e
    this.dataEmp()
  }
  dataEmp() {
    this.search_nf = this.form.controls.search.value;
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.rownumber.value,
      user_status: this.form.controls.empstat.value,
      search: this.form.controls.search.value.trim(),
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/GetAll/employee', obj).subscribe(res => {
      this.data_emp = res.data.data;
      console.log(this.data_emp);
      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      this.data_page = res.data.page;


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

  openModal(id, fname_en, fname_th) {
    this.statusModalmove = true;
    this.id_emp = id;
    this.name_en = fname_en;
    this.name_th = fname_th;
  }
  openDelete(id, fname_en, fname_th) {
    this.statusmodaldelete = true;
    this.id_emp = id;
    this.name_en = fname_en;
    this.name_th = fname_th;
  }
  onClose(e) {
    this.statusModalmove = e;
    this.statusmodaldelete = e;
    this.dataEmp();
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
  fullname_th: string;
  fullname_en: string;
  dep_name: string;
}