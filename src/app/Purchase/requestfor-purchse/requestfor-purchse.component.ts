import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatSort, MatTableDataSource, MatSortModule } from '@angular/material';

@Component({
  selector: 'app-requestfor-purchse',
  templateUrl: './requestfor-purchse.component.html',
  styleUrls: ['./requestfor-purchse.component.css']
})
export class RequestforPurchseComponent implements OnInit {

  Items = [];
  amount = [];

  subTotal = 0;
  vat = 0;
  Total = 0;

  @ViewChild(MatSort) sort: MatSortModule;
  ElementData = [];
  dataSource;
  displayedColumns = ['order_id', 'fullname_th', 'phone', 'order_dt', 'status_name', 'action'];

  form: FormGroup;
  formpage: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';
  constructor(private fb: FormBuilder, private http: HttpService) {
    this.setformPage();
    this.getDatesetForm();
  }

  ngOnInit() {
    this.getOrder();
  }

  getDatesetForm() {
    var date = new Date();
    var dd = date.getDate().toString();
    var mm = date.getMonth().toString();
    var yy = date.getFullYear() + 543;
    if (parseInt(dd) < 10) {
      dd = '0' + dd;
    }
    if (parseInt(mm) < 10) {
      mm = '0' + (parseInt(mm) + 1);
    }

    this.form = this.fb.group({
      order_info: this.fb.group({
        order_by: '',
        phone: '',
        date: dd + "-" + mm + "-" + yy
      }),
      vendor_info: this.fb.group({
        name: '',
        address: '',
        phone: '',
        attention: ''
      }),
      Items: this.fb.array([this.createItem()]),
    })
    this.setAmount();
  }

  createItem(): FormGroup {
    return this.fb.group({
      part_no: '',
      description: '',
      qty: 1,
      price_unit: 0,
      amount: 0,
    });
  }

  onaddList() {
    if (this.getList.length <= 5 - 1) {
      const item = this.createItem();
      this.getList.push(item);
    }
    this.setAmount();
  }
  onremoveList(i) {
    if (this.getList.length > 1) {
      this.getList.removeAt(i);
    }
    if (this.getList.length == 1) {
      this.getList.reset();
    }
    this.setAmount();
  }
  get getList(): FormArray {
    return this.form.controls['Items'] as FormArray;
  }

  setAmount() {
    this.subTotal = 0;
    let item = this.form.controls.Items.value;
    for (var i = 0; i < this.getList.length; i++) {
      this.amount[i] = (item[i].price_unit) * (item[i].qty);
      this.amount[i] = parseFloat(this.amount[i].toFixed(2));

      this.subTotal += (this.amount[i]);
      this.subTotal = parseFloat(this.subTotal.toFixed(2));
      this.vat = parseFloat((this.subTotal * 0.07).toFixed(2));
      this.Total = parseFloat((this.subTotal + this.vat).toFixed(2));
    }
  }

  onSave() {
    this.setAmount();
    // let obj = {
    //   address: "กทม",
    //   phone: "088-8888888",
    //   my_tax_no: "123456789",
    //   data_stock: [
    //     {
    //       des_buy_name: "LG",
    //       description: "21 inch",
    //       price: 9990,
    //       quantity: 2
    //     }
    //   ]
    // }
    // this.http.requestPost('api/insert_Order', obj).subscribe(res => {
    //   console.log(res);
    // })
    // console.log(this.form.value);
  }

  onSelectpriceunit(id) {
    console.log(id);
    let s = document.getElementById(id) as HTMLInputElement;
    s.select();
  }

  data_page: any;
  setPage: any;

  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;

  statusModalcreate: boolean = false;
  statusModaldetail: boolean = false;
  statusModaledit: boolean = false;
  statusModalstatus: boolean = false;

  orderID;

  detail_data: any;

  setformPage() {
    this.formpage = this.fb.group({
      numpage: [1],
      numrow: [10],
      status: ['al'],
      search: ['', [Validators.pattern(this.regex_search)]],
      search_by: ['al'],
    });
  }

  getOrder() {
    this.setPage = this.formpage.controls.numpage.value;
    this.getData();
  }
  selectPage(i) {
    this.setPage = i;
    this.getData();
  }
  getData() {
    let reqData = {
      page_num: this.setPage,
      row_num: this.formpage.controls.numrow.value,
      status: this.formpage.controls.status.value,
      search: this.formpage.controls.search.value,
      search_by: this.formpage.controls.search_by.value
    }
    this.http.requestPost('api/Get_Order', reqData).subscribe(res => {
      console.log(res.data.data);
      this.ElementData = res.data.data;
      this.dataSource = new MatTableDataSource(this.ElementData);
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

  openModalcreate() {
    this.statusModalcreate = true;
  }
  openModaldetail(data) {
    this.statusModaldetail = true;
    this.detail_data = data;
  }
  openModaledit(id) {
    this.statusModaledit = true;
    this.orderID = id;
  }
  openModalstatus(data) {
    this.statusModalstatus = true;
    this.detail_data = data;
  }
  closeModal(e) {
    this.statusModalcreate = e;
    this.statusModaldetail = e;
    this.statusModaledit = e;
    this.statusModalstatus = e;
    this.getData();
  }

  checkEmpty() {
    if (this.formpage.controls.search.value === '') this.getOrder();
  }

  checkErrors() {
    if (!this.formpage.controls.search.errors) this.getOrder();
  }
}
export interface Element {
  address: string;
  status_name: string;
  emp_id_buy: number;
  fullname_en: string;
  fullname_th: string;
  my_tax_no: string;
  order_dt: string;
  order_id: number;
  phone: string;
  status_id: number;
  user_id: number;
  username: string;
}
