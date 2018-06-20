import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { AppPage } from '../../../../e2e/app.po';
declare let $;
@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {

  data = [];
  data2: any;
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusModaldetail = false;
  search_nf: string = '';
  dataSource;
  displayedColumns = ['receiving_id', 'st_name', 'receiving_date', 'status_name', 'action'];
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private http: HttpService, private fBuilder: FormBuilder) {
    this.form = this.fBuilder.group({
      numpage: ['1'],
      numrow: ['10'],
      search: ['', [Validators.required, Validators.pattern(this.regex_search)]],
      search_by: ['al']
    });
  }

  ngOnInit() {
    this.getReceive();
  }

  getReceive() {
    this.setPage = this.form.controls.numpage.value;
    this.search_nf = this.form.controls.search.value;
    this.getData();
  }
  selectPage(i) {
    if (i > 0) {
      this.setPage = i;
      this.getData();
    }
  }
  getData() {
    let reqData = {
      page_num: this.setPage,
      row_num: this.form.controls.numrow.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/get/Receiving', reqData).subscribe(res => {
      this.data = res.data.data;
      this.data_page = res.data.page;
      console.log(this.data);
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

  sModal(d) {
    this.statusModaldetail = true;
    this.data2 = d;
  }

  close(e) {
    this.statusModaldetail = false;
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
  receiving_id: number;
  st_name: string;
  receiving_date: string;
  status_name: string;
}