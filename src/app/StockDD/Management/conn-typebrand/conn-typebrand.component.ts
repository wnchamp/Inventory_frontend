import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-conn-typebrand',
  templateUrl: './conn-typebrand.component.html',
  styleUrls: ['./conn-typebrand.component.css']
})
export class ConnTypebrandComponent implements OnInit {

  data_tb = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusModaldelete: boolean = false;
  id: any;
  typename: any;
  brandname: any;
  Element: Element[];
  dataSource: any;
  displayedColumns = ['type_name', 'brand_name', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  search_nf: any;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      pagenum: ['1'],
      rownum: ['20'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['all']
    })
    this.getTypeBrand()
  }

  ngOnInit() {
  }

  getTypeBrand() {
    this.setPage = this.form.controls.pagenum.value
    this.gettData();
  }
  selectPage(i) {
    this.setPage = i;
    this.gettData();
  }
  gettData() {
    this.search_nf = this.form.controls.search.value;
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.rownum.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/GET_Type_Brand', obj).subscribe(res => {
      this.data_tb = res.data.data;
      console.log(this.data_tb);
      this.data_page = res.data.page;
      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;

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
    })
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

  openModaldelete(id, type, brand) {
    this.statusModaldelete = true;
    this.id = id;
    this.typename = type;
    this.brandname = brand;
  }
  onClose(e) {
    if (e == false) {
      this.statusModaldelete = e
    }
  }
  getData(x) {
    if (x = true) {
      // console.log('geting data...');
      this.gettData()
    }
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      // console.log('geting data...');
      this.getTypeBrand();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getTypeBrand();
  }
}


export interface Element {
  type_name: string;
  brand_name: string;
}