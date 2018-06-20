import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettokenService } from '../../settoken.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  displayedColumns = ['st_id', 'st_name', 'type_name', 'brand_name', 'sta_name', 'action'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  stock_data = [];
  stock_data2: Element[];
  dataBC: any;

  data_page: any;
  setPage: any;

  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;

  stockID: any;
  createModalState = false;

  borrowModalState = false;
  returnModalState = false;
  defectModalState = false;

  delModalState = false;
  detailModalState = false;
  delState = false;
  eModalState = false;

  statusSelectborrow = false;
  stock_status: any;
  statusSelectreturn = false;
  statusSelectdefect = false;
  barViewStat = false;

  statusViewBorrow = false;

  stockName = '';
  stockData: any;

  //barcode -----------------------------------
  elementType = 'img';
  value = '10002101000';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1;
  height = 20;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 15;
  background = '#ffffff';
  margin = 0;
  marginTop = 0;
  marginBottom = 0;
  marginLeft = 0;
  marginRight = 0;
  //barcode --------------------------------

  search_nf: any;
  form: FormGroup;

  regex_search = '^[0-9a-zA-Zก-์+\\s]+$';

  constructor(private fb: FormBuilder, private http: HttpService, private setToken: SettokenService) {
    this.form = fb.group({
      num_page: ['1'],
      num_row: ['20'],
      status: ['al'],
      search: ['', [Validators.pattern(this.regex_search)]],
      filter: ['al']
    });
  }

  ngOnInit() {
    this.getStock();
  }

  getStock() {
    this.setPage = this.form.controls.num_page.value;
    this.getData();
  }
  selectPage(i) {
    if (i > 0) {
      this.setPage = i;
      this.getData();
    }
  }
  getData() {
    this.search_nf = this.form.controls.search.value;
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.num_row.value,
      status: this.form.controls.status.value,
      search: this.form.controls.search.value.trim(),
      search_by: this.form.controls.filter.value,
    };
    this.http.requestPost('api/GetData_row/Stock', obj).subscribe((res: any) => {
      this.data_page = res.data.page;
      this.stock_data = res.data.data;
      this.stock_data2 = res.data.data;
      console.log(this.stock_data);
      this.dataSource = new MatTableDataSource(this.stock_data2);
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

  openModalBarcode() {
    this.barViewStat = true;
    this.stockData = this.stock_data;
  }

  openBorrowModal() {
    this.borrowModalState = true;
  }
  openReturnModal() {
    this.returnModalState = true;
  }
  openDefectModal() {
    this.defectModalState = true;
  }
  openDeleteModal(id, stockName) {
    this.delState = true;
    this.delModalState = true;
    this.stockID = id;
    this.stockName = stockName;
  }

  openEModal(data) {
    this.stockData = data;
    this.eModalState = true;
  }
  openCreateModal() {
    this.createModalState = true;
  }
  openDetailModal(data) {
    this.detailModalState = true;
    this.stockData = data;
  }

  openSelectborrow(id, status) {
    this.statusSelectborrow = true;
    this.stockID = id;
    this.stock_status = status;
  }
  openSelectreturn(data) {
    this.statusSelectreturn = true;
    this.stockData = data;
  }
  openSelectdefect(data) {
    this.statusSelectdefect = true;
    this.stockData = data;
  }

  openViewborrow(id) {
    this.statusViewBorrow = true;
    this.stockID = id;
  }

  closeModal(e) {
    this.delModalState = e;
    this.borrowModalState = e;
    this.defectModalState = e;
    this.returnModalState = e;

    this.createModalState = e;
    this.detailModalState = e;
    this.eModalState = e;

    this.statusSelectborrow = e;
    this.statusSelectreturn = e;
    this.statusSelectdefect = e;

    this.statusViewBorrow = e;

    this.barViewStat = e;
    this.getData();
  }

  printbarcode(event) {
    if (event == false) {
      window.focus();
      print();
    }
  }

  checkEmpty() {
    if (this.form.controls.search.value === "") {
      this.getData();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getStock();
  }
}

export interface Element {
  st_id: number;
  st_name: string;
  type_name: string;
  brand_name: string;
  sta_name: string;
}

