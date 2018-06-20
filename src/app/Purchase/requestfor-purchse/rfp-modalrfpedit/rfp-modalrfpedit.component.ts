import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { Observable } from 'rxjs';
declare let $;
@Component({
  selector: 'app-rfp-modalrfpedit',
  templateUrl: './rfp-modalrfpedit.component.html',
  styleUrls: ['./rfp-modalrfpedit.component.css'],
})
export class RfpModalrfpeditComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Output() close = new EventEmitter;

  amount = [];

  dataOrderlist: any;

  license = '';
  date_license = '';

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService) {
    this.setformGroup();
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#rfpModaledit').modal('show');
      /// reset array getlist 
      this.setformGroup();

      this.http.requestPost('api/get_data_stock_order', { order_id: this.id }).subscribe(res => {
        this.dataOrderlist = res.data;
        // console.log(this.dataOrderlist);

        this.setOrderlistarray();
        this.setOrderby();
        this.setAmount();
      });
    }
  }

  setOrderby() {
    let item_user = JSON.parse(localStorage.getItem('User'));
    this.http.requestGet('api/get/byID?id=' + item_user.user_id).subscribe(res => {
      this.license = res.data.fullname_en;
      this.getListorder.setValue({
        order_by: res.data.fullname_en,
        phone: this.dataOrderlist.data_order.phone,
        address: this.dataOrderlist.data_order.address,
        date: this.dataOrderlist.data_order.order_dt
      });
    });
  }

  setformGroup() {
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
    this.date_license = dd + "-" + mm + "-" + yy;

    this.form = this.fb.group({
      order_info: this.fb.group({
        order_by: '',
        phone: '',
        address: '',
        date: dd + "-" + mm + "-" + yy
      }),
      vendor_info: this.fb.group({
        name: '',
        address: '',
        phone: '',
        attention: ''
      }),
      total: this.fb.group({
        subTotal: 0,
        vat: 0,
        Total: 0
      }),
      Items: this.fb.array([this.createItem()]),
    });
  }
  createItem(): FormGroup {
    return this.fb.group({
      part_no: 'name',
      description: 'description',
      qty: [1, [Validators.required, Validators.pattern('/[^0-9]/gi')]],
      price_unit: 0,
      amount: 0,
    });
  }
  get getList(): FormArray {
    return this.form.controls['Items'] as FormArray;
  }
  get getListtotal(): FormGroup {
    return this.form.controls['total'] as FormGroup;
  }
  get getListvendor(): FormGroup {
    return this.form.controls['vendor_info'] as FormGroup;
  }
  get getListorder(): FormGroup {
    return this.form.controls['order_info'] as FormGroup;
  }

  setOrderlistarray() {
    let data_stock = [];
    data_stock = this.dataOrderlist.data_stock;

    for (var i = 0; i < data_stock.length - 1; i++) {
      this.onaddList();
    }
    this.setDatatable();
  }

  onaddList() {
    this.getList.push(this.createItem());
    this.setAmount();
  }
  onremoveList(i) {
    if (this.getList.length > 1) {
      if (this.dataOrderlist.data_stock[i]) {
        let obj = {
          order_id: this.id,
          des_buy_id: this.dataOrderlist.data_stock[i].des_buy_id
        };
        this.http.requestPost('api/Delete_description_stock', obj).subscribe(res => {
          // console.log(res);
          this.getList.removeAt(i);

          this.resetDatatable();
        }, err => {
          if (err.Message = 'Can not delete 1 item is required in purchase order.') {
            console.error(err.Message);
          };
        });
      } else {
        this.getList.removeAt(i);
        console.log('no have in db');

      };
      this.setAmount();
    };
  }

  setAmount() {
    let subTotal = 0;
    let vat = 0;
    let Total = 0;
    let item = this.getList.value;
    for (var i = 0; i < this.getList.length; i++) {
      var qty = parseFloat(item[i].qty)
      var p_u = parseFloat(item[i].price_unit);
      this.amount[i] = p_u * qty;
      this.amount[i] = parseFloat(this.amount[i].toFixed(2));
      if ((this.amount[i]).toString() == 'NaN') {
        this.amount[i] = 0;
      }

      let pu = parseFloat(item[i].price_unit)
      pu = parseFloat(pu.toFixed(2));

      subTotal += (this.amount[i]);
      subTotal = parseFloat(subTotal.toFixed(2));
      vat = parseFloat((subTotal * 0.07).toFixed(2));
      Total = parseFloat((subTotal + vat).toFixed(2));

      this.getList.controls[i].setValue({
        part_no: item[i].part_no,
        description: item[i].description,
        qty: item[i].qty,
        price_unit: pu,
        amount: this.amount[i],
      });
      this.getListtotal.setValue({
        subTotal: subTotal,
        vat: vat,
        Total: Total
      });
    }
  }
  onInputnumOnly(id, e) {
    var element = document.getElementById(id) as HTMLInputElement;
    var regex = /[^0-9]/gi;
    element.value = element.value.replace(regex, '');

    if (e.type == 'change') {
      // console.log(id.replace(/[0-9]/gi, ''));
      if (!element.value) {
        if (id.replace(/[0-9]/gi, '') == 'quty') {
          // (id.replace(/[^0-9]/gi, '')) == (id[0]);
          this.getList.controls[id[0]].setValue({
            part_no: this.getList.value[id[0]].part_no,
            description: this.getList.value[id[0]].description,
            amount: this.getList.value[id[0]].amount,
            price_unit: this.getList.value[id[0]].price_unit,
            qty: 1,
          });
        };
        if (id.replace(/[0-9]/gi, '') == 'pric_unit') {
          this.getList.controls[id[0]].setValue({
            part_no: this.getList.value[id[0]].part_no,
            description: this.getList.value[id[0]].description,
            amount: this.getList.value[id[0]].amount,
            price_unit: 0,
            qty: this.getList.value[id[0]].qty,
          });
        };
        this.setAmount();
      }
    }
  }

  onSelectpriceunit(id) {
    let s = document.getElementById(id) as HTMLInputElement;
    s.select();
  }

  onEdit() {
    // console.log(this.dataOrderlist.data_stock);
    // console.log(this.getList.value);
    // console.log(this.getListorder.value);
    let obj_stock = [];
    let array_stock;
    for (let i = 0; i < this.dataOrderlist.data_stock.length; i++) {
      array_stock = {
        des_buy_id: this.dataOrderlist.data_stock[i].des_buy_id,
        des_buy_name: this.getList.value[i].part_no,
        description: this.getList.value[i].description,
        price: this.getList.value[i].price_unit,
        quantity: this.getList.value[i].qty
      }
      obj_stock.push(array_stock);
    }
    for (let i = this.dataOrderlist.data_stock.length; i < this.getList.value.length; i++) {
      array_stock = {
        des_buy_id: 0,
        des_buy_name: this.getList.value[i].part_no,
        description: this.getList.value[i].description,
        price: this.getList.value[i].price_unit,
        quantity: this.getList.value[i].qty
      }
      obj_stock.push(array_stock);
    }

    let obj = {
      order_id: this.id,
      address: this.getListorder.value.address,
      phone: this.getListorder.value.phone,
      my_tax_no: "123456789",
      status: this.dataOrderlist.data_order.status_id,
      data_stock: obj_stock
    }
    this.http.requestPut('api/edit_order', obj).subscribe(res => {
      console.log(res);
      this.resetDatatable();
    })
  }

  resetDatatable() {
    this.http.requestPost('api/get_data_stock_order', { order_id: this.id }).subscribe(res => {
      this.dataOrderlist = res.data;
      console.log(this.dataOrderlist);
      this.setDatatable();
      this.setAmount();
    });
  }
  setDatatable() {
    let data_stock = [];
    data_stock = this.dataOrderlist.data_stock;
    // console.log(data_stock);
    for (var i = 0; i < data_stock.length; i++) {
      this.getList.controls[i].setValue({
        part_no: data_stock[i].des_buy_name + '',
        description: data_stock[i].description + '',
        qty: data_stock[i].quantity + '',
        price_unit: data_stock[i].price + '',
        amount: 0,
      });
    };
  }

  onClose() {
    this.close.emit(false);
    $('#rfpModaledit').modal('hide');
    this.form.reset();

    /// reset array getlist 
    this.setformGroup();
  }

}