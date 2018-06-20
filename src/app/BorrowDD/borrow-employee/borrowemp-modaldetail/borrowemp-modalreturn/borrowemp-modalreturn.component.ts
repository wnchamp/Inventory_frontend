import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-borrowemp-modalreturn',
  templateUrl: './borrowemp-modalreturn.component.html',
  styleUrls: ['./borrowemp-modalreturn.component.css']
})
export class BorrowempModalreturnComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#borrowempModalreturn').modal('show');
    };
  }

  onReturn() {
    if (this.data) {
      this.http.requestPost('api/insert_Return_Multi', { borrow_id: [this.data.bo_id] }).subscribe(res => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.onClose();
      });
    };
  }
  onClose() {
    this.close.emit(false);
    $('#borrowempModalreturn').modal('hide');
  }
}
