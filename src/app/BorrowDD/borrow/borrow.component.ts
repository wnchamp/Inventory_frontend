import { Component , OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  ELEMENT_DATA: Element[];
  displayedColumns = ['st_name', 'fullname', 'employee_id', 'serial_no', 'sta_br_name', 'borrow_dt', 'action'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  rState = false;
  eState = false;
  dState = false;
  data = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  borrowID;
  detailData: any;
  detailModalState = false;
  mConReStat = false;
  returnData: any;
  search_nf: any;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-zก-์] *$';

  constructor(private http: HttpService, private fBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = fBuilder.group({
      row: ['10'],
      tBox: ['', [Validators.pattern(this.regex_search)]],
      filter: ['type_name'],
      search_by: ['all'],
      status: ['br']
    });
  }

  ngOnInit() {
    this.getBorrow();
  }

  getBorrow() {
    this.setPage = 1;
    this.getData();
  }
  selectPage(e) {
    this.setPage = e;
    this.getData();
  }
  getData() {
    this.search_nf = this.form.controls.tBox.value;
    let reqData = {
      page_num: this.setPage,
      row_num: this.form.controls.row.value,
      status: this.form.controls.status.value,
      search: this.form.controls.tBox.value,
      search_by: this.form.controls.search_by.value
    };
    this.http.requestPost('api/Search/GetBorrow', reqData).subscribe(res => {
      this.data = res.data.data;
      this.data_page = res.data.page;
      console.log(this.data);

      this.ELEMENT_DATA = this.data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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

  openDetailModal(data) {
    this.detailModalState = true;
    this.detailData = data;
  }

  return(data) {
    this.mConReStat = true;
    this.returnData = data;
  }

  edit() {
    this.eState = true;
  }

  delete() {
    this.dState = true;
  }

  close(e) {
    this.eState = e;
    this.dState = e;
    this.detailModalState = e;
    this.mConReStat = e;
    this.getData();
  }

  checkEmpty() {
    if (this.form.controls.tBox.value === '') {
      this.getData();
    }
  }

  checkErrors() {
    if (!this.form.controls.tBox.errors) this.getData();
  }
}

export interface Element {
  borrow_dt: string;
  employee_id: number;
  fullname: string;
  serial_no: string;
  st_name: string;
  sta_br_name: string;
  status_borrow: string;
}
