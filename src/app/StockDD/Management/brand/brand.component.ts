import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { HttpService } from '../../../http.service';
import { SettokenService } from '../../../settoken.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  dataSource: any;
  brand = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  ModalCreateState = false;
  ModalEditState = false;
  ModalDeleteState = false;
  brandID;
  brandName;
  Element: Element[];
  displayedColumns = ['brand_name', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  search_nf: any;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private http: HttpService, private setToken: SettokenService, private fBuilder: FormBuilder) {
    this.form = this.fBuilder.group({
      pageNumber: ['1'],
      rowNum: ['20'],
      status: ['ac'],
      search: ['', [Validators.pattern(this.regex_search), Validators.required]],
      search_by: ['all']
    })
  }

  ngOnInit() {
    this.getBrand();
  }

  getBrand() {
    this.setPage = this.form.controls.pageNumber.value;
    this.getData();
  }
  selectPage(numPage) {
    this.setPage = numPage;
    this.getData();
  }
  getData() {
    this.search_nf = this.form.controls.search.value;
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.rowNum.value,
      sta_id: this.form.controls.status.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/GET_Brand', obj).subscribe((res) => {
      this.brand = res.data.data;
      console.log(this.brand);
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

  openModalCreate() {
    this.setToken.getToken();
    this.ModalCreateState = true;
  }
  openModalEdit(brandID: any, brand_name: any) {
    this.ModalEditState = true;
    this.brandID = brandID;
    this.brandName = brand_name;
  }
  openModalDelete(id, brand_name) {
    this.ModalDeleteState = true;
    this.brandID = id;
    this.brandName = brand_name;
  }
  close(e) {
    this.ModalCreateState = e
    this.ModalEditState = e;
    this.ModalDeleteState = e;
    this.getBrand();
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
  brand_name: string;
}