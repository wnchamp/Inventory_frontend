import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-del-stock',
  templateUrl: './modal-del-stock.component.html',
  styleUrls: ['./modal-del-stock.component.css']
})
export class ModalDelStockComponent implements OnInit, OnChanges {

  @Input() modalState;
  @Input() id;
  @Input() stockName;
  @Output() c = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.modalState) {
      $('#delModal').modal('show');
    }
  }

  delItem() {
    let obj = {
      st_id: this.id,
      status: 'rm'
    }
    this.http.requestPut('api/Delete/Stock', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.data == 'Success' && res.Message == 'OK') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    }, (err) => {
      if (err.data.Message == 'Ststus stock not Empty or Remove') {
        this.alertalready = true;
      };
    });
  }
  closeModal() {
    this.c.emit(false);
    $('#delModal').modal('hide');
    this.alertalready = false;
  }
}
