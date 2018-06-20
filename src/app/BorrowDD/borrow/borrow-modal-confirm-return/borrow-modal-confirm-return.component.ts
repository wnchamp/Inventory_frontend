import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-borrow-modal-confirm-return',
  templateUrl: './borrow-modal-confirm-return.component.html',
  styleUrls: ['./borrow-modal-confirm-return.component.css']
})
export class BorrowModalConfirmReturnComponent implements OnInit, OnChanges {

  @Input() mStat;
  @Input() data;
  @Output() c = new EventEmitter;
  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.mStat) {
      $('#modalConfirmReturn').modal('show');
      console.log(this.mStat);
      console.log(this.data);
    }
  }

  close() {
    $('#modalConfirmReturn').modal('hide');
    this.c.emit(false);
    console.log('test');

  }

  returnItem() {
    this.http.requestPost('api/return_stock', { borrow_id: this.data.bo_id }).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.close();
    });

  }
}
