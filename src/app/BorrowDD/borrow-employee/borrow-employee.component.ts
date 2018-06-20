import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-borrow-employee',
  templateUrl: './borrow-employee.component.html',
  styleUrls: ['./borrow-employee.component.css']
})
export class BorrowEmployeeComponent implements OnInit {

  dataEmp = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  statusdetailModal: boolean = false;
  id_emp = '';
  dataBorrow = [];
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
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  //baecode --------------------------------
  Element: Element[];
  dataSource;
  displayedColumns = ['employee_id', 'fullname_th', 'fullname_en', 'dep_name', 'borrow_count', 'status_name', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  search_nf: any;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      numpage: ['1'],
      numrow: ['20'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['al'],
    });
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
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
      search_by: this.form.controls.search_by.value,
    };
    this.http.requestPost('api/Get_Data_emp_br_count', obj).subscribe(res => {
      this.dataEmp = res.data.data;
      this.Element = res.data.data;
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      this.data_page = res.data.page;
      console.log(this.dataEmp);

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

  opendetailModal(data) {
    this.statusdetailModal = true;
    this.id_emp = data.employee_id;
    this.getBorrow();
  }
  Print(e) {
    if (e == false) {
      window.focus();
      print();
    }
  }
  getBorrow() {
    let obj = {
      page_num: 1,
      row_num: 500,
      status: 'br',
      search: this.id_emp,
      search_by: 'emp_id'
    };
    console.log(obj);
    this.http.requestPost('api/Search/GetBorrow', obj).subscribe(res => {
      this.dataBorrow = res.data.data;
      console.log(res);
    });
  }

  closeModal(e) {
    this.statusdetailModal = e;
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
  employee_id: number;
  fullname_th: string;
  fullname_en: string;
  dep_name: string;
  borrow_count: number;
  status_name: string;
}
