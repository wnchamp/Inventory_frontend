import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { FormatBarcodeService } from '../../../formatBarcode.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-defect-stock',
  templateUrl: './modal-defect-stock.component.html',
  styleUrls: ['./modal-defect-stock.component.css']
})
export class ModalDefectStockComponent implements OnInit, OnChanges {

  @Input() id;
  @Input() modalState;
  @Output() c = new EventEmitter;

  data_barcode = [];
  data_stock = [];
  id_stock: any;

  detail_data: any;
  mDetailStat: boolean = false;

  data_add = [];
  statusModaladddes: boolean = false;
  setbarcode: any;
  checkSuccess: boolean = false;

  dataformat = '';

  form: FormGroup;

  regex_barcode = '^[0-9]*[0-9].\\d$';
  regex_description = "^[0-9a-zA-Zก-์+\\s]+$";

  constructor(private fb: FormBuilder,
    private http: HttpService,
    private format: FormatBarcodeService,
    private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      barcode: ['', [Validators.pattern(this.regex_barcode), Validators.required]],
      description: ['', [Validators.pattern(this.regex_description), Validators.required]]
    });
  }

  ngOnInit() {
    this.data_barcode = [];
    this.id_stock = [];
  }
  ngOnChanges() {
    if (this.modalState) {
      $('#defectModal').modal('show');
    }
  }

  addBarcode() {
    this.format.FormatTHtoEN(this.form.value.barcode);
    this.dataformat = this.format.data_format;

    //ตรวจสอบค่าซ้ำ ---------------------------------------------
    for (var i = 0; i < this.data_barcode.length; i++) {
      if (this.dataformat == this.data_barcode[i]) {
        this.data_barcode.splice(i, 1);
      }
    }
    //ตรวจสอบค่าซ้ำ ---------------------------------------------

    this.data_barcode.push(
      this.dataformat
    );
    this.form.controls.barcode.setValue('');
    this.getData();
  }
  removeRow(bc) {
    for (var i = 0; i < this.data_barcode.length; i++) {
      if (this.data_barcode[i] == bc) {
        this.data_barcode.splice(i, 1);
        this.getData();
      }
    }
  }
  getData() {
    this.http.requestPost('api/Multi_GetData', { barcode: this.data_barcode }).subscribe((res) => {
      this.data_stock = res.data;
      console.log(this.data_stock);

      // check status data ---------------
      for (var i = 0; i < this.data_stock.length; i++) {
        if (this.data_stock[i].status == 'df') {
          this.data_stock.splice(i, 1);
        };
      };
      // check status data ---------------

      this.data_barcode.length = this.data_stock.length;
    });
  }
  addRowData(data) {
    // open modal add dess
    this.statusModaladddes = true;

    // for add data
    this.data_add = [];
    this.data_add = data;

    //for remove row
    this.setbarcode = data.barcode;
    this.removeRowData(this.setbarcode);
  }
  removeRowData(barcode) {
    if (this.checkSuccess) {
      this.removeRow(barcode);
    }
  }

  onSave() {
    for (var i = 0; i < this.data_stock.length; i++) {
      this.id_stock.push(this.data_stock[i].st_id)
    };
    let obj = {
      description: this.form.value.description + ' ',
      st_id: this.id_stock
    };
    this.http.requestPost('api/insert_Multi_row_defect', obj).subscribe((res) => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    });
  }

  openDetailModal(data) {
    this.detail_data = data;
    this.mDetailStat = true;
  }

  closeModal() {
    this.c.emit(false);
    $('#defectModal').modal('hide');
    this.data_stock = [];
    this.data_barcode = [];
    this.id_stock = [];
    this.form.reset();
  }

  close(e) {
    this.mDetailStat = e;
    this.statusModaladddes = e;
  }
  closeSuccess(e) {
    this.checkSuccess = e;
    this.removeRowData(this.setbarcode);
  }
}
