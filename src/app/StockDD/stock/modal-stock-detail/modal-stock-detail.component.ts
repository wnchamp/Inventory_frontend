import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
declare let $;

@Component({
  selector: 'app-modal-stock-detail',
  templateUrl: './modal-stock-detail.component.html',
  styleUrls: ['./modal-stock-detail.component.css']
})
export class ModalStockDetailComponent implements OnInit, OnChanges {
 data:any;
  @Input() modalState;
  @Input() stockData;
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
      this.data = this.stockData;
      $('#detailModal').modal('show');
    }
  }

  closeModal() {
    this.c.emit(false);
    $('#detailModal').modal('hide');
  }
}
