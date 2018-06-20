import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent implements OnInit, OnChanges {

  @Input() modalState;
  @Input() id;
  @Input() stockName;
  @Output() c = new EventEmitter;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.modalState) {
      $('#conModal').modal('show');
    }
  }

  closeModal() {
    this.c.emit(false);
    $('#conModal').modal('hide');
  }

  restoreItem() {
    this.http.requestPut('api/Delete/Stock', {
      st_id: this.id,
      status: 'ep'
    }).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    });
  }


}
