import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { post } from 'selenium-webdriver/http';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-modaldefect-multirepair',
  templateUrl: './modaldefect-multirepair.component.html',
  styleUrls: ['./modaldefect-multirepair.component.css']
})
export class ModaldefectMultirepairComponent implements OnInit, OnChanges {

  d2m: any;
  @Input() openModal
  @Output() close = new EventEmitter
  defectID = [];
  data_barcode = [];
  data_stock = [];
  statusSelectrepairModal: boolean = false;
  defect_id = '';
  checkSuccess: boolean = false;
  dataBarcode = '';
  mDetailStat = false;
  form: FormGroup;
  regex_barcode = '^[0-9]*[0-9] *$';
  regex_description = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      search_user: [''],
      barcode: ['', [Validators.pattern(this.regex_barcode), Validators.required]],
      description: ['', [Validators.pattern(this.regex_description), Validators.required]]
    })
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#defectModalmultirepiar').modal('show')
    }
  }

  onAdd() {
    this.data_barcode.push(
      this.form.controls.barcode.value.trim()
    );
    this.form.controls.barcode.setValue('');
    this.getData();
  }
  onRemove(bc) {
    for (var i = 0; i < this.data_barcode.length; i++) {
      if (this.data_barcode[i] == bc) {
        this.data_barcode.splice(i, 1);
      };
    };
    this.getData();
  }
  getData() {
    this.http.requestPost('api/Get_Data_multi_row/Defect', { barcode: this.data_barcode }).subscribe(res => {
      this.data_stock = res.data;
    });
  }

  onSaverow(id, bc) {
    this.statusSelectrepairModal = true;
    this.defect_id = id;
    this.dataBarcode = bc;
  }
  onSave() {
    for (var i = 0; i < this.data_stock.length; i++) {
      this.defectID.push(this.data_stock[i].de_id);
    };
    let obj = {
      description: this.form.controls.description.value,
      de_id: this.defectID
    };
    this.http.requestPost('api/Insert_multi_row/Repair', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      console.log(res);
      this.onClose();
    });
  }

  onClosemodalAdddes(e) {
    this.statusSelectrepairModal = e;
  }
  onChecksuccess(e) {
    this.checkSuccess = e;

    if (this.checkSuccess) {
      this.onRemove(this.dataBarcode);
    };
  }
  onClose() {
    this.close.emit(false);
    $('#defectModalmultirepiar').modal('hide');
    this.setData();
  }

  setData() {
    this.defectID = [];
    this.data_stock = [];
    this.data_barcode = [];
  }

  openDetailModal(d) {
    this.mDetailStat = true;
    this.d2m = d;
  }

  closeModal(e) {
    this.mDetailStat = e;
  }
}