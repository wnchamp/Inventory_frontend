import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
declare let $;
@Component({
  selector: 'app-modal-stock-viewborrow',
  templateUrl: './modal-stock-viewborrow.component.html',
  styleUrls: ['./modal-stock-viewborrow.component.css']
})
export class ModalStockViewborrowComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() stockID;
  @Output() close = new EventEmitter;

  borrowData = [];

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

  constructor(private http: HttpService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#stockModalviewborrow').modal('show');
      console.log(this.stockID);
      let obj = {
        page_num: 1,
        row_num: 1,
        status: "br",
        search: this.stockID,
        search_by: "st_id"
      }
      this.http.requestPost('api/Search/GetBorrow', obj).subscribe(res => {
        this.borrowData = res.data.data;
        console.log(this.borrowData);
      })
    };
  }

  onClose() {
    this.close.emit(false);
    $('#stockModalviewborrow').modal('hide');
  }
}
