import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-defect',
  templateUrl: './defect.component.html',
  styleUrls: ['./defect.component.css']
})
export class DefectComponent implements OnInit {

  de_id: any;
  data = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  data_detail: any;
  edit_description: any;
  statusrepair: boolean = false;
  statusMultirepair: boolean = false;
  statusdetail: boolean = false;
  eState: boolean = false
  dataSource;
  Element: Element[];
  displayedColumns = ['de_id', 'st_name', 'description', 'status_defect', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  search_nf: string = '';
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-ฮ]*[0-9a-zA-Zก-ฮ] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      numpage: ['1'],
      numrow: ['20'],
      status: ['df'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['al']
    });
  }

  ngOnInit() {
    this.getDefect();
  }

  getDefect() {
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
      status_defect: this.form.controls.status.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value
    };
    this.http.requestPost('api/get/Defect', obj).subscribe(res => {
      this.data = res.data.data;
      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      this.data_page = res.data.page;
      console.log(this.data);

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

  openModalEdit(datas) {
    this.de_id = datas.de_id;
    this.data_detail = datas;
    this.edit_description = datas.description;
    this.eState = true;
  }
  openModalrepair(data) {
    this.statusrepair = true;
    this.data_detail = data;
  }
  openModaldetail(data) {
    this.statusdetail = true;
    this.data_detail = data;
  }
  openMultirepair() {
    this.statusMultirepair = true;
  }
  closeModal(event: any) {
    this.eState = event;
    this.statusrepair = event;
    this.statusMultirepair = event;
    this.statusdetail = event;
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
  de_id: number;
  st_name: string;
  description: string;
  status_defect: string;
}
