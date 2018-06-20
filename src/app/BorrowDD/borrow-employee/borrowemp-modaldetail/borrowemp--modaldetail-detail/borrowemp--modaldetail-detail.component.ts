import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
declare let $;
@Component({
  selector: 'app-borrowemp--modaldetail-detail',
  templateUrl: './borrowemp--modaldetail-detail.component.html',
  styleUrls: ['./borrowemp--modaldetail-detail.component.css']
})
export class BorrowempModaldetailDetailComponent implements OnInit, OnChanges {
 br_data: any;
  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;

  // barcode -----------------------------------
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
  // baecode --------------------------------

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#borrowempDetailModal').modal('show');
      this.br_data = this.data;
    }
  }

  onClose() {
    this.close.emit(false);
    $('#borrowempDetailModal').modal('hide');
  }
}
