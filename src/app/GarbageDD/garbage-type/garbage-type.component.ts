import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-garbage-type',
  templateUrl: './garbage-type.component.html',
  styleUrls: ['./garbage-type.component.css']
})
export class GarbageTypeComponent implements OnInit {

  data_type = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusModalmove: boolean = false;
  id_type: any;
  name_type: any;
  name_cate: any;
  statusModaldelete: boolean = false;
  displayedColumns = ['category_name', 'type_name', 'action'];
  Element: Element[];
  dataSource;
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
    this.getType();
  }

  getType() {
    this.setPage = this.form.controls.numpage.value;
    this.dataType();
  }
  selectPage(e) {
    this.setPage = e;
    this.dataType();
  }
  dataType() {
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.numrow.value,
      sta_id: this.form.controls.status.value,
      search: this.form.controls.search.value.trim(),
      search_by: this.form.controls.search_by.value
    };
    this.http.requestPost('api/GET_Tpye', obj).subscribe(res => {
      this.data_type = res.data.data;
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
  
  onModal(id, cate, type) {
    this.statusModalmove = true;
    this.id_type = id;
    this.name_cate = cate;
    this.name_type = type;
  }
  openDelete(id, cate, type) {
    this.statusModaldelete = true;
    this.id_type = id;
    this.name_cate = cate;
    this.name_type = type;
  }
  onClose(e) {
    this.statusModalmove = e;
    this.statusModaldelete = e;
    this.dataType()
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
  category_name: string;
  type_name: string;
}