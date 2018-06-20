import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf'
declare let $;

// import * as jsPDF from 'jspdf';
// import * as html2canvas from 'html2canvas'
@Component({
  selector: 'app-modal-view-barcode',
  templateUrl: './modal-view-barcode.component.html',
  styleUrls: ['./modal-view-barcode.component.css'],


})
export class ModalViewBarcodeComponent implements OnInit, OnChanges {
  stock_data:any;
  @Input() mStat;
  @Input() stockData;
  @Output() c = new EventEmitter;
 @Output() _bypass_print = new EventEmitter;
  bypass_print = false;

  elementType = 'img';
  value = '10002101000';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1;
  height = 25;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 10;
  background = '#ffffff';
  margin = 0;
  marginTop = 0;
  marginBottom = 0;
  marginLeft = 0;
  marginRight = 0;
  
  constructor( private route : Router) {

   
    

  }



  ngOnInit() {

    
  }
  ngOnChanges() {
    // console.log(this.dataBC);
    if (this.mStat) {
      $('#viewbarcode').modal('show');
      this.stock_data = this.stockData;
    }
    // console.log(this.stockData);
  }

  close() {
    this.c.emit(false);
    $('#viewbarcode').modal('hide');
  }

  print() {
    $('.modal-backdrop').remove()
    this._bypass_print.emit(false);
    
  }

}


