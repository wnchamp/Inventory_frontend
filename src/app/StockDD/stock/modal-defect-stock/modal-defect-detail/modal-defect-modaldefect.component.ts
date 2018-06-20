import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
declare let $;
@Component({
  selector: 'app-modal-defect-modaldefect',
  templateUrl: './modal-defect-modaldefect.component.html',
  styleUrls: ['./modal-defect-modaldefect.component.css']
})
export class ModalDefectModaldefectComponent implements OnInit {

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
      console.log(this.sData);
      $('#modalDetailDefect').modal('show');
    }
  }

  closeModal() {
    this.c.emit(false);
    $('#modalDetailDefect').modal('hide');
  }
}
