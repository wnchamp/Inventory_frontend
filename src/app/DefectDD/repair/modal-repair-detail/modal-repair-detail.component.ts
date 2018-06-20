import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
declare let $;

@Component({
  selector: 'app-modal-repair-detail',
  templateUrl: './modal-repair-detail.component.html',
  styleUrls: ['./modal-repair-detail.component.css']
})
export class ModalRepairDetailComponent implements OnInit, OnChanges {
 data_detail:any;
  @Input() modalState;
  @Input() repairData;
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
    if(this.modalState) {
      this.data_detail = this.repairData;
      $('#detailModal').modal('show');
    }
  }

  closeModal() {
    this.c.emit(false);
    $('#detailModal').modal('hide');
  }

}
