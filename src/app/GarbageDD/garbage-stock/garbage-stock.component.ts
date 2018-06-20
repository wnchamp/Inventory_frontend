import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-garbage-stock',
  templateUrl: './garbage-stock.component.html',
  styleUrls: ['./garbage-stock.component.css']
})
export class GarbageStockComponent implements OnInit {

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
  modalState = false;
  stockID;
  stockName;
  modalDelete = false;
  displayedColumns = ['st_name', 'type_name', 'brand_name', 'serial_no', 'location', 'update_dt', 'action'];
  dataSource;
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  regex = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      pagenum: ['1'],
      rownum: ['20'],
      status: ['rm'],
      search: ['', [Validators.pattern(this.regex)]],
      search_by: ['all']
    })
    this.getStock()
  }

  ngOnInit() {
  }

  getStock() {
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
      status: this.form.controls.status.value,
      search: this.form.controls.search.value.trim(),
      search_by: this.form.controls.search_by.value,
    }
    this.http.requestPost('api/GetData_row/Stock', obj).subscribe(res => {
      this.data_dep = res.data.data;
      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      this.data_page = res.data.page;
      console.log(this.data_dep);

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

  openModal(id, stockName) {
    this.modalState = true;
    this.stockID = id;
    this.stockName = stockName;
  }
  openDelete(id, stockname) {
    this.modalDelete = true;
    this.stockID = id;
    this.stockName = stockname;
  }
  closeModal(e) {
    this.modalState = e;
    this.modalDelete = e;
    this.getData();
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getData();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getData();
  }
}

export interface Element {
  st_name: string;
  type_name: string;
  brand_name: string;
  serial_no: string;
  location: string;
  update_dt: string;
}
