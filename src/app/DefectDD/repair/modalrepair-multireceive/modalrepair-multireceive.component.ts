import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-modalrepair-multireceive',
  templateUrl: './modalrepair-multireceive.component.html',
  styleUrls: ['./modalrepair-multireceive.component.css']
})
export class ModalrepairMultireceiveComponent implements OnInit {

  d2m: any;
  @Input() openModal
  @Output() close = new EventEmitter
  pData = [];
  data_rp = [];
  rpID = [];
  checkSuccess: boolean = false;
  mDetailStat = false;
  form: FormGroup;
  regex_barcode = '^[0-9]*[0-9] *$';

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      barcode: ['', [Validators.pattern(this.regex_barcode), Validators.required]],
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.openModal) {
      this.setData();
      $('#repairModalmultireceive').modal('show');
    }
  }
  setData() {
    this.pData = [];
    this.data_rp = [];
    this.rpID = [];
  }

  onAddbarcode() {
    this.pData.push(this.form.controls.barcode.value);
    this.form.controls.barcode.setValue('');
    this.getData();
  }
  onRemovebarcode(bc) {
    for (var i = 0; i < this.pData.length; i++) {
      if (this.pData[i] == bc) {
        this.pData.splice(i, 1);
      };
    };
    this.getData();
  }
  getData() {
    this.http.requestPost('api/Get_multi_row/Repair', { barcode: this.pData }).subscribe(res => {
      this.data_rp = res.data;
    });
  }

  onSaverow(id, bc) {
    this.http.requestPost('api/insert/Receiving_multi_row', { re_id: [id] }).subscribe(res => {
      console.log(res);
      // check success for true or false --------
      if (res.data == 'Success') {
        this.checkSuccess = true;
      } else {
        this.checkSuccess = false;
      };
      // if check success true do remove this row
      if (this.checkSuccess) {
        this.onRemovebarcode(bc);
      };
    });
  }

  onSave() {
    this.rpID = [];
    for (var i = 0; i < this.data_rp.length; i++) {
      this.rpID.push(this.data_rp[i].re_id);
    };
    this.http.requestPost('api/insert/Receiving_multi_row', { re_id: this.rpID }).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClosemodal();
    })
  }

  onClosemodal() {
    this.close.emit(false)
    $('#repairModalmultireceive').modal('hide');
    this.form.reset();
  }

  openMultiReceiveDetailModal(d) {
    this.mDetailStat = true;
    this.d2m = d;
  }

  closeModal(e) {
    this.mDetailStat = e;
  }
}
