import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modalrecylebin-delete',
  templateUrl: './modalrecylebin-delete.component.html',
  styleUrls: ['./modalrecylebin-delete.component.css']
})
export class ModalrecylebinDeleteComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() stockID;
  @Input() stockName;
  @Output() close = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#stockRecycleModaldelete').modal('show');
    }
  }

  onDelete() {
    let obj = {
      st_id: this.stockID,
      status: 'dl'
    };
    this.http.requestPut('api/Delete/Stock', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      if (err.data.Message == 'Ststus stock not Empty or Remove') {
        this.alertalready = true;
      };
    });
  }
  onClose() {
    this.close.emit(false);
    $('#stockRecycleModaldelete').modal('hide');
    this.alertalready = false;
  }
}