import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-conn-tbmodalcreate',
  templateUrl: './conn-tbmodalcreate.component.html',
  styleUrls: ['./conn-tbmodalcreate.component.css']
})
export class ConnTbmodalcreateComponent implements OnInit {

  @Output() x = new EventEmitter();
  data_type: any;
  data_brand: any;

  obj = {
    page_num: '1',
    row_num: '100000',
    sta_id: 'ac',
    search: '',
    search_by: 'type_name'
  }

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      type: [''],
      brand: [''],
    })
  }

  ngOnInit() {
    this.getType()
    this.getBrand()
  }

  getType() {
    this.http.requestPost('api/GET_Tpye', this.obj).subscribe(res => {
      this.data_type = res.data.data;
    })
  }
  getBrand() {
    this.http.requestPost('api/GET_Brand', this.obj).subscribe(res => {
      this.data_brand = res.data.data;
    })
  }

  onCreate() {
    let obj = {
      type_id: this.form.controls.type.value,
      brand_id: this.form.controls.brand.value
    }
    this.http.requestPost('api/Insert_Type_Brand', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.x.emit(true)
      $('#tbModalcreate').modal('hide')
      this.form.reset()
    })
  }

}
