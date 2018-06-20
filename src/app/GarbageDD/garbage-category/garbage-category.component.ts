import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-garbage-category',
  templateUrl: './garbage-category.component.html',
  styleUrls: ['./garbage-category.component.css']
})
export class GarbageCategoryComponent implements OnInit {

  data_cate = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusModalmove: boolean = false;
  id_cate: any;
  name_cate: any;
  status: any;
  statusModaldelete: boolean = false;
  displayedColumns = ['category_name', 'action'];
  dataSource;
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      numpage: ['1'],
      numrow: ['20'],
      search: ['', [Validators.pattern(this.regex_search)]],
      status: ['rm'],
      search_by: ['all']
    })
  }

  ngOnInit() {
    this.getCate()
  }

  getCate() {
    this.setPage = this.form.controls.numpage.value;
    this.getNewCate();
  }
  selectPage(i) {
    this.setPage = i;
    this.getNewCate();
  }
  getNewCate() {
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.numrow.value,
      search: this.form.controls.search.value.trim(),
      sta_id: this.form.controls.status.value,
      search_by: this.form.controls.search_by.value
    };
    this.http.requestPost('api/GetAll/category', obj).subscribe(res => {
      this.data_cate = res.data.data;
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

  onModal(id, name) {
    this.statusModalmove = true;
    this.id_cate = id;
    this.name_cate = name;
  }
  openModaldelete(id, name) {
    this.statusModaldelete = true;
    this.id_cate = id;
    this.name_cate = name;
  }
  onClose(e) {
    this.statusModalmove = e;
    this.statusModaldelete = e;
    this.getNewCate();
  }

  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getCate();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getCate();
  }
}

export interface Element {
  category_name: string;
}