import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
declare let $;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-modal-edit-stock',
  templateUrl: './modal-edit-stock.component.html',
  styleUrls: ['./modal-edit-stock.component.css']
})

export class ModalEditStockComponent implements OnInit, OnChanges {

  @Input() stockData;
  @Input() modalState;
  @Output() c = new EventEmitter;

  url = 'api/update/Stock';
  urlGetType = 'api/GET_Tpye';
  urlUpdateStock = 'api/update/Stock';
  urlGetBrand = 'api/GET_Type_Brand';
  typeData: any;
  brandData: any;

  form: FormGroup;
  text_en_th_number_only = "^[0-9a-zA-Zก-์+\\s]+$";
  regex_serial = "^[0-9a-zA-Z+\\s]+$";

  constructor(private http: HttpService, private fBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fBuilder.group({
      stockName: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]],
      description: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      serialNumber: ['', [Validators.pattern(this.regex_serial), Validators.required]],
      barcode: ['', Validators.required],
      location: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]]
    });
  }

  ngOnInit() {
    this.getType();
    this.getBrand();
  }
  ngOnChanges() {
    if (this.modalState) {
      this.setFormValue();
      $('#eModal').modal('show');
    }
  }

  setFormValue() {
    this.form.setValue({
      stockName: this.stockData.st_name,
      description: this.stockData.description,
      type: this.stockData.type_id,
      brand: this.stockData.brand_id,
      serialNumber: this.stockData.serial_no,
      barcode: this.stockData.barcode,
      location: this.stockData.location
    });
  }

  getType() {
    let obj = {
      page_num: 1,
      row_num: 500,
      sta_id: 'ac',
      search: '',
      search_by: ''
    }
    this.http.requestPost(this.urlGetType, obj).subscribe(res => {
      this.typeData = res.data.data;
    });
  }

  getBrand() {
    let obj = {
      page_num: 1,
      row_num: 500,
      sta_id: 'ac',
      search: this.form.controls.type.value,
      search_by: 'type_id'
    }
    this.http.requestPost(this.urlGetBrand, obj).subscribe(res => {
      this.brandData = res.data.data;
    });
  }

  saveEdit() {
    let data = {
      st_id: this.stockData.st_id,
      st_name: this.form.controls.stockName.value.trim(),
      description: this.form.controls.description.value.trim(),
      type_id: this.form.controls.type.value,
      brand_id: this.form.controls.brand.value,
      serial_no: this.form.controls.serialNumber.value.trim(),
      barcode: this.form.controls.barcode.value,
      location: this.form.controls.location.value.trim()
    }
    this.http.requestPut(this.urlUpdateStock, data).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.data == 'Success' && res.Message == 'OK') {
        this.snackBar.open(res.data, 'OK', {
          duration: 1200,
        });
      }
      this.closeModal();
    });
  }

  closeModal() {
    this.c.emit(false);
    $('#eModal').modal('hide');
  }
}
