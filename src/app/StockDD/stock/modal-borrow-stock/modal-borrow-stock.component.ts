import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { FormatBarcodeService } from '../../../formatBarcode.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-borrow-stock',
  templateUrl: './modal-borrow-stock.component.html',
  styleUrls: ['./modal-borrow-stock.component.css']
})
export class ModalBorrowStockComponent implements OnInit, OnChanges {

  @Input() modalState;
  @Output() c = new EventEmitter;

  empData = [];
  empID: any;

  sData = [];
  stockData = [];
  stockID = [];
  dataformat: any;
  mDetailStat = false;
  st_detail = [];

  form: FormGroup;
  regex_search = '^[0-9a-zก-์+\\s]+$';
  regex_barcode = '^[0-9]*[0-9].\\d$';

  constructor(
    private fBuilder: FormBuilder,
    private http: HttpService,
    private format: FormatBarcodeService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fBuilder.group({
      emp_id: ['', [Validators.pattern(this.regex_search), Validators.required]],
      barID: ['', [Validators.pattern(this.regex_barcode), Validators.minLength(9)]],
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.modalState) {
      $('#borrowModal').modal('show');
    }
  }

  searchEmp() {
    if (this.form.controls.emp_id.valid) {
      let id = this.form.controls.emp_id.value
      this.http.requestGet('api/auto/employee?search=' + id).subscribe(res => {
        this.empData = res.data;
        console.log(this.empData);
      })
    } else {
      console.error('input search');
    }
  }
  selectEmp(id) {
    this.empID = id;
  }

  addBarcode() {
    if (this.form.controls.barID.valid) {
      this.format.FormatTHtoEN(this.form.controls.barID.value);
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
      )
      this.form.controls.barID.setValue('');
      this.getData();
    }
    else {
      console.error('input barcode At least 9 characters ');
    }
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
    this.http.requestPost('api/Multi_GetData', { barcode: this.sData }).subscribe(res => {
      this.stockData = res.data;
      console.log(this.sData);
      console.log(this.stockData);

      if (this.stockData.length < this.sData.length) {
        console.error('not found this stock');
      };

      this.sData.length = this.stockData.length;
    });
  }
  addRowData(stock_id, barcode) {
    // for save data this row
    console.log(stock_id);
    let obj = {
      emp_id: this.empID,
      st_id: [stock_id]
    };
    this.http.requestPost('api/insert_Multi_borrow', obj).subscribe(res => {
      console.log(res);
    });

    // for remove row
    this.removeRow(barcode);
    console.log(barcode);
  }

  onSave() {
    this.stockID = [];
    for (var i = 0; i < this.stockData.length; i++) {
      this.stockID.push(this.stockData[i].st_id);
    };
    let obj = {
      emp_id: this.empID,
      st_id: this.stockID
    };
    this.http.requestPost('api/insert_Multi_borrow', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    });
  }

  openDetailModal(data) {
    this.mDetailStat = true;
    this.st_detail = data;
  }

  closeModal() {
    this.c.emit(false);
    $('#borrowModal').modal('hide');
    //// reset data-----
    this.empID = '';
    this.empData = [];
    this.sData = [];
    this.stockData = [];
    this.form.reset();
  }

  closeModal2(e) {
    this.mDetailStat = e;
    this.st_detail = [];
  }
}
