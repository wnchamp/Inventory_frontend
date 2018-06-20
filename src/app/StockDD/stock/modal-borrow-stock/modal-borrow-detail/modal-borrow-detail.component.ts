import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
declare let $;

@Component({
  selector: 'app-modal-borrow-detail',
  templateUrl: './modal-borrow-detail.component.html',
  styleUrls: ['./modal-borrow-detail.component.css']
})
export class ModalBorrowDetailComponent implements OnInit, OnChanges {
 data:any;
  @Input() mStat;
  @Input() sData;
  @Output() c = new EventEmitter;

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
    if (this.mStat) {
      this.data = this.sData;
      console.log(this.sData);
      $('#modalDetail').modal('show');
    }
  }

  closeModal() {
    this.c.emit(false);
    this.sData = [];
    $('#modalDetail').modal('hide');
  }

}
