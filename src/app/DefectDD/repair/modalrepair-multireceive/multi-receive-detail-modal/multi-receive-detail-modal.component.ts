import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
declare let $;

@Component({
  selector: 'app-multi-receive-detail-modal',
  templateUrl: './multi-receive-detail-modal.component.html',
  styleUrls: ['./multi-receive-detail-modal.component.css']
})
export class MultiReceiveDetailModalComponent implements OnInit, OnChanges {
 data_detail:any;
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
      this.data_detail = this.sData;
      $('#multiReceiveDetailModal').modal('show');
    }
  }

  closeModal() {
    this.c.emit(false);
    $('#multiReceiveDetailModal').modal('hide');
  }
}
