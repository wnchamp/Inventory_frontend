import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
declare let $;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { FormatBarcodeService } from '../../../formatBarcode.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return-modal.component.html',
  styleUrls: ['./return-modal.component.css']
})

export class ReturnModalComponent implements OnInit, OnChanges {

  detail_data: any;
  mDetailStat: boolean;
  @Input() modalState;
  @Output() c = new EventEmitter;

  sData = [];
  stockData = [];
  BoID = [];
  dataformat: any;
  form: FormGroup;
  regex_barcode = '^[0-9]*[0-9].\\d$';

  constructor(private fBuilder: FormBuilder,
    private http: HttpService,
    private format: FormatBarcodeService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fBuilder.group({
      barcode: ['', [Validators.pattern(this.regex_barcode), Validators.required]]
    });
  }

  ngOnInit() {
    this.setArray();
  }
  ngOnChanges() {
    if (this.modalState) {
      $('#returnModal').modal('show');
      this.setArray();
    }
  }

  addBarcode() {
    this.format.FormatTHtoEN(this.form.controls.barcode.value.trim());
    this.dataformat = this.format.data_format;

    //ตรวจสอบค่าซ้ำ ---------------------------------------------
    for (var i = 0; i < this.sData.length; i++) {
      if (this.dataformat == this.sData[i]) {
        this.sData.splice(i, 1);
      }
    }
    //ตรวจสอบค่าซ้ำ ---------------------------------------------

    this.sData.push(
      this.dataformat
    );
    this.form.controls.barcode.setValue('');
    this.getData();
  }
  removeRow(bc) {
    for (var i = 0; i < this.sData.length; i++) {
      if (this.sData[i] == bc) {
        this.sData.splice(i, 1);
        this.getData();
      };
    };
  }
  getData() {
    this.http.requestPost('api/get_Multi_borrow', { barcode: this.sData }).subscribe(res => {
      this.stockData = res.data;
      this.sData.length = this.stockData.length;
    });
  }
  addRowData(bo_id, barcode) {
    //for add data
    this.http.requestPost('api/insert_Return_Multi', { borrow_id: [bo_id] }).subscribe(res => {
      console.log(res);
    });

    //for remove row
    this.removeRow(barcode);
  }

  onSave() {
    this.BoID = [];
    for (var i = 0; i < this.stockData.length; i++) {
      this.BoID.push(this.stockData[i].bo_id)
    };
    this.http.requestPost('api/insert_Return_Multi', { borrow_id: this.BoID }).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    });
  }

  closeModal() {
    this.c.emit(false);
    this.setArray();
    $('#returnModal').modal('hide');
  }
  setArray() {
    this.sData = []
    this.stockData = []
    this.BoID = []
  }

  close(e) {
    this.detail_data = e;
  }

  openDetailModal(data) {
    this.mDetailStat = true;
    this.detail_data = data;
  }

}
