import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-typecom',
  templateUrl: './typecom.component.html',
  styleUrls: ['./typecom.component.css']
})
export class TypecomComponent implements OnInit {

  Element: Element[];
  id_cate: any;
  id_type: any;
  dataedit: any;
  statedit_type: boolean = false;
  statdelete_type: boolean = false;
  statcreate_type: boolean = false;
  namedeletetype: any;

  type_data = [];
  data_page: any;
  setPage: any;

  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;

  displayedColumns = ['type_name', 'category_name', 'type_display', 'action'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  search_nf: any;
  form: FormGroup;

  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      numpage: ['1'],
      numrow: ['10'],
      search: ['', Validators.pattern(this.regex_search)],
      status_name: ['ac'],
      search_by: ['all']
    });
    this.getType();
  }

  ngOnInit() {

  }
  switchDisplay(event) {
    this.http.requestGet('api/edit_type_display?type_id=' + event).subscribe((res) => {
      console.log(res);
    })
  }

  getType() {
    this.setPage = this.form.controls.numpage.value
    this.getData();
  }
  selectPage(i) {
    this.setPage = i;
    this.getData();
  }
  getData() {
    this.search_nf = this.form.controls.search.value;
    let objType = {
      page_num: this.setPage,
      row_num: this.form.controls.numrow.value,
      search: this.form.controls.search.value,
      sta_id: this.form.controls.status_name.value,
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/GET_Tpye', objType).subscribe(res => {
      this.type_data = res.data.data;
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

  openEditModal(id_cate, id_type, data) {
    this.statedit_type = true;
    this.id_cate = id_cate;
    this.id_type = id_type;
    this.dataedit = data;
  }
  openCreateodal() {
    this.statcreate_type = true;
  }
  openDeleteModal(type_id, type_name) {
    this.statdelete_type = true;
    this.id_type = type_id;
    this.namedeletetype = type_name;
  }
  closeModal(e) {
    this.statcreate_type = e;
    this.statedit_type = e;
    this.statdelete_type = e;
    if (e != true) {
      this.getData();
    }
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getType();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getType();
  }
}

export interface Element {
  type_name: string;
  category_name: string;
  type_display: number;
}