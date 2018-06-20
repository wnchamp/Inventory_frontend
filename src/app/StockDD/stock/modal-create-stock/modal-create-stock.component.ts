import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-create-stock',
  templateUrl: './modal-create-stock.component.html',
  styleUrls: ['./modal-create-stock.component.css']
})
export class ModalCreateStockComponent implements OnInit {
  url = 'api/insert/Stock';
  @Input() modalState;
  urlGetType = 'api/GET_Tpye';
  @Output() c = new EventEmitter;
  form: FormGroup;
  typeData: any;
  urlGetBrand = 'api/GET_Type_Brand';
  brandData: any;
  length_brand: any;
  text_en_th_number_only = "^[0-9a-zA-Zก-์+\\s]+$";
  regex_serial = "^[0-9a-zA-Z+\\s]+$";

  constructor(private http: HttpService, private fBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.initForm();
    this.getType();

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.modalState) {
      $('#createStockModal').modal('show');
      this.initForm();
    }
  }

  closeModal() {
    this.c.emit(false);
    $('#createStockModal').modal('hide');
    this.form.reset();
  }

  Save() {
    let data = {
      "st_name": this.form.controls.stockName.value.trim(),
      "description": this.form.controls.description.value.trim(),
      "type_id": this.form.controls.type.value,
      "brand_id": this.form.controls.brand.value,
      "serial_no": this.form.controls.serialNumber.value.trim(),
      "location": this.form.controls.location.value.trim()
    }

    this.http.requestPost(this.url, data).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    },(err)=>{
      alert(err.Message)
    });

  }

  initForm() {
    this.form = this.fBuilder.group({
      stockName: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]],
      description: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]],
      type: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      serialNumber: ['', [Validators.pattern(this.regex_serial), Validators.required]],
      location: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]]
    });
  }

  getType() {
    this.http.requestPost(this.urlGetType, {
      page_num: 1,
      row_num: 100000,
      sta_id: 'ac',
      search: '',
      search_by: 'all'
    }).subscribe(res => {
      this.typeData = res.data.data;
    });
  }

  getBrand() {
    this.http.requestPost(this.urlGetBrand, {
      page_num: 1,
      row_num: 100000,
      search: this.form.controls.type.value,
      search_by: 'type_id'
    }).subscribe(res => {
      console.log(res);
      this.length_brand = res.data.data.length
      this.brandData = res.data.data;
    });
  }

}
