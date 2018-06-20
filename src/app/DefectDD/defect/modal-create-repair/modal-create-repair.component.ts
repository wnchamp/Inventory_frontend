import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-create-repair',
  templateUrl: './modal-create-repair.component.html',
  styleUrls: ['./modal-create-repair.component.css']
})
export class ModalCreateRepairComponent implements OnInit, OnChanges {

  data_detail: any;
  @Input() data;
  @Output() close = new EventEmitter;
  @Input() modstatus;
  data_user: any;
  description: any;
  //barcode -----------------------------------
  elementType = 'img';
  value = '10002101000';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1;
  height = 20;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  //baecode --------------------------------
  form: FormGroup;
  regex_description = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      de_id: [''],
      description: ['', [Validators.required, Validators.pattern(this.regex_description)]],
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.modstatus) {
      $('#modalCreaterepair').modal('show');
      this.data_detail = this.data;
    }
  }

  onSave() {
    let obj = {
      de_id: this.data.de_id,
      description: this.form.controls.description.value,
    }

    this.http.requestPost('api/Insert/Repair', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    });
  }

  closeModal() {
    this.close.emit(false);
    $('#modalCreaterepair').modal('hide');
    this.setData();
  }
  setData() {
    this.data = [];
    this.form.controls.description.setValue('');
  }
}
