import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpService } from '../../../http.service';
declare let $;
@Component({
  selector: 'app-rfp-modalrfpcreate',
  templateUrl: './rfp-modalrfpcreate.component.html',
  styleUrls: ['./rfp-modalrfpcreate.component.css']
})
export class RfpModalrfpcreateComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;

  Items = [];
  amount = [];

  Tax_no = "1234567890";

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService) {
    this.setformGroup();
    this.setOrderby();
  }

  ngOnInit() {
    this.setAmount();
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#rfpModalcreate').modal('show');
      this.setformGroup();
    }
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
      qty: 1,
      price_unit: 0,
      amount: 0,
    });
  }

  setOrderby() {
    let item_user = JSON.parse(localStorage.getItem('User'));
    this.http.requestGet('api/get/byID?id=' + item_user.user_id).subscribe(res => {
      this.getListorder.setValue({
        order_by: res.data.fullname_en,
        phone: this.getListorder.value.phone,
        address: this.getListorder.value.address,
        date: this.getListorder.value.date
      });
    });
  }

  onaddList() {
    const item = this.createItem();
    this.getList.push(item);
    this.setAmount();
  }
  onremoveList(i) {
    if (this.getList.length > 1) {
      this.getList.removeAt(i);
    }
    this.setAmount();
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

  setAmount() {
    let subTotal = 0;
    let vat = 0;
    let Total = 0;
    let item = this.getList.value;
    for (var i = 0; i < this.getList.length; i++) {
      this.amount[i] = (item[i].price_unit) * (item[i].qty);
      this.amount[i] = parseFloat(this.amount[i].toFixed(2));

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
    };
  }

  onSelectpriceunit(id) {
    let s = document.getElementById(id) as HTMLInputElement;
    s.select();
  }

  onSave() {
    let stockObj = []
    for (var i = 0; i < this.getList.length; i++) {
      stockObj[i] = {
        des_buy_name: this.getList.value[i].part_no,
        description: this.getList.value[i].description,
        price: this.getList.value[i].price_unit,
        quantity: this.getList.value[i].qty
      };
    };

    let obj = {
      address: this.form.controls.order_info.value.address,
      phone: this.form.controls.order_info.value.phone,
      my_tax_no: this.Tax_no,
      data_stock: stockObj
    };
    this.http.requestPost('api/insert_Order', obj).subscribe(res => {
      console.log(res);
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    $('#rfpModalcreate').modal('hide');
    this.form.reset();
  }
}
