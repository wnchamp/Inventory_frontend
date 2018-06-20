import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-garbage-empmodalmove',
  templateUrl: './garbage-empmodalmove.component.html',
  styleUrls: ['./garbage-empmodalmove.component.css']
})
export class GarbageEmpmodalmoveComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Input() name_en;
  @Input() name_th;
  @Output() close = new EventEmitter;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#garbempModalmove').modal('show');
    };
  }

  onConfirm() {
    let obj = {
      emp_id: this.id,
      user_status: 'ac'
    };
    this.http.requestPut('api/Delete/employee', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    $('#garbempModalmove').modal('hide');
  }

}
