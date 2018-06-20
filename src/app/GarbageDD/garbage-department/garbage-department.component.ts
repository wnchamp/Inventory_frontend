import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-garbage-department',
  templateUrl: './garbage-department.component.html',
  styleUrls: ['./garbage-department.component.css']
})
export class GarbageDepartmentComponent implements OnInit {

  data_dep = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusModalmove: boolean = false;
  id: any;
  num_dep: any;
  name_dep: any;
  statusModaldelete: boolean = false;
  displayedColumns = ['dep_name', 'dep_no', 'create_dt', 'action'];
  Element: Element[];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      pagenum: ['1'],
      rownum: ['20'],
      status: ['rm'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['all']
    })
    this.getDepartmant()
  }

  ngOnInit() {
  }
  getDepartmant() {
    this.setPage = this.form.controls.pagenum.value;
    this.getData();
  }
  selectPage(i) {
    this.setPage = i;
    this.getData();
  }
  getData() {
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.rownum.value,
      sta_id: this.form.controls.status.value,
      search: this.form.controls.search.value.trim(),
      search_by: this.form.controls.search_by.value
    };
    this.http.requestPost('api/Get_department', obj).subscribe(res => {
      this.data_dep = res.data.data;
      console.log(this.data_dep);
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

  openModalreuse(id, no, name) {
    this.statusModalmove = true;
    this.id = id;
    this.num_dep = no;
    this.name_dep = name;
  }
  openModaldelete(id, no, name) {
    this.statusModaldelete = true;
    this.id = id;
    this.num_dep = no;
    this.name_dep = name;
  }
  onClose(e) {
    this.statusModalmove = e;
    this.statusModaldelete = e;
    this.getData()
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getDepartmant();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getDepartmant();
  }

}

export interface Element {
  dep_no: string;
  dep_name: string;
  create_dt: string;
}