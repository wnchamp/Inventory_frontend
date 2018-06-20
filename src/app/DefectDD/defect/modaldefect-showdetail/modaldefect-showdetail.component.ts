import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
declare let $;
@Component({
  selector: 'app-modaldefect-showdetail',
  templateUrl: './modaldefect-showdetail.component.html',
  styleUrls: ['./modaldefect-showdetail.component.css']
})
export class ModaldefectShowdetailComponent implements OnInit, OnChanges {
 data_detail:any;
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
  //baecode --------------------------------

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      this.data_detail = this.data;
      $('#defectModaldetail').modal('show');
    }
  }

  onClose() {
    this.close.emit(false);
    $('#defectModaldetail').modal('hide');
  }

}
