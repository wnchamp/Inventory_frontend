import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modalrepair-selectreceive',
  templateUrl: './modalrepair-selectreceive.component.html',
  styleUrls: ['./modalrepair-selectreceive.component.css']
})
export class ModalrepairSelectreceiveComponent implements OnInit, OnChanges {
  data_detail: any;
  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;

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
  //barcode --------------------------------

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#repairSelectreceiveModal').modal('show');
      this.data_detail = this.data;
    }
  }

  onSave() {
    if (this.data) {
      this.http.requestPost('api/insert/Receiving_multi_row', { re_id: [this.data.re_id] }).subscribe(res => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.onClose();
      });
    };
  }

  onClose() {
    this.close.emit(false);
    $('#repairSelectreceiveModal').modal('hide');
  }
}
