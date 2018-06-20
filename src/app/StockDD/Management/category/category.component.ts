import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns = ['category_name', 'action'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  editstatusModal: any = false;
  delstatusModal: any = false;
  id_cate: any;
  name_cate: any;

  category_data = [];
  status: any;
  search: any;

  data_page: any;
  setPage: any;

  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;

  search_nf: any;
  form: FormGroup;

  regex_search = '^[0-9a-zA-Z ]*[0-9a-zA-Z] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      numpage: ['1'],
      numrow: ['20'],
      search: ['', [Validators.pattern(this.regex_search)]],
      status: ['ac'],
      search_by: ['all']
    })
  }

  ngOnInit() {
    this.getCategory();

  }

  getCategory() {
    this.setPage = this.form.controls.numpage.value;
    this.getData();
  }
  selectPage(i) {
    this.setPage = i;
    this.getData();
  }
  getData() {
    this.search_nf = this.form.controls.search.value;
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.numrow.value,
      search: this.form.controls.search.value,
      sta_id: this.form.controls.status.value,
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/GetAll/category', obj).subscribe(res => {
      this.category_data = res.data.data;
      this.data_page = res.data.page;
      console.log(this.category_data);
      this.dataSource = new MatTableDataSource(this.category_data);
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

  onEdit(id, name) {
    this.editstatusModal = true;
    this.id_cate = id;
    this.name_cate = name;
  }
  onDel(id, name) {
    this.delstatusModal = true;
    this.id_cate = id;
    this.name_cate = name;
  }
  onClose(e) {
    this.delstatusModal = e;
    this.editstatusModal = e;
    if (e != true) {
      this.getData();
    }
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
  category_name: string;
}