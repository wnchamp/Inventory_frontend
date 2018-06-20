import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-garbage-brand',
  templateUrl: './garbage-brand.component.html',
  styleUrls: ['./garbage-brand.component.css']
})
export class GarbageBrandComponent implements OnInit {

  data_brand = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusModalmove: boolean = false;
  idbrand: any;
  namebrand: any;
  statusmodaldelete: boolean = false;
  displayedColumns = ['brand_name', 'action'];
  Element: Element[];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      pagenum: ['1'],
      rownum: ['20'],
      search: ['', [Validators.pattern(this.regex_search)]],
      status: ['rm'],
      search_by: ['all']
    })
    this.getBrand();
  }

  ngOnInit() {
  }

  getBrand() {
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
      search_by: this.form.controls.search_by.value,
    };
    this.http.requestPost('api/GET_Brand', obj).subscribe(res => {
      this.data_brand = res.data.data;
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

  openMove(id, name) {
    this.statusModalmove = true;
    this.idbrand = id;
    this.namebrand = name;
  }
  openDelete(id, name) {
    this.statusmodaldelete = true;
    this.idbrand = id;
    this.namebrand = name;
  }
  closeModal(e) {
    this.statusModalmove = e;
    this.statusmodaldelete = e;
    this.getData();
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getBrand();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getBrand();
  }
}

export interface Element {
  beand_name: string;
}