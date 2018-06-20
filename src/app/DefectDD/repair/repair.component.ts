import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  data = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  detailData: any;
  statusMultirepair: boolean = false;
  statusSelectreceive: boolean = false;
  statusModaledit: boolean = false;
  detailModalState: boolean = false;
  search_nf: string = '';
  form: FormGroup;
  dataSource;
  displayedColumns = ['re_id', 'st_name', 'fullname_th', 'description', 'status_name', 'action'];
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = this.fb.group({
      numpage: ['1'],
      numrow: ['10'],
      search: ['', [Validators.pattern(this.regex_search), Validators.required]],
      status: ['RP'],
      search_by: ['al']
    });
  }

  ngOnInit() {
    this.getRepair();
  }

  getRepair() {
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
    };
    this.http.requestPost('api/GET_Repair', obj).subscribe(res => {
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

  openModalmultirepair() {
    this.statusMultirepair = true;
  }

  openSelectreceiveModal(data) {
    this.statusSelectreceive = true;
    this.detailData = data;
  }
  openEditModal(data) {
    this.statusModaledit = true;
    this.detailData = data;
  }
  openDetailModal(data) {
    this.detailModalState = true;
    this.detailData = data;
  }

  closeModal(e) {
    this.statusSelectreceive = e;
    this.detailModalState = e;
    this.statusMultirepair = e;
    this.statusModaledit = e;
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
  re_id: number;
  st_name: string;
  fullname_th: string;
  description: string;
  status_name: string;
}