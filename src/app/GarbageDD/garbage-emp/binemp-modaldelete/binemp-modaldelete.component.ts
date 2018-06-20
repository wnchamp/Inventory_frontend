import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-binemp-modaldelete',
  templateUrl: './binemp-modaldelete.component.html',
  styleUrls: ['./binemp-modaldelete.component.css']
})
export class BinempModaldeleteComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Input() name_en;
  @Input() name_th;
  @Output() close = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#binempModaldelete').modal('show');
    };
  }

  onDelete() {
    let obj = {
      emp_id: this.id,
      user_status: 'dl'
    };
    this.http.requestPut('api/Delete/employee', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      if (err.data.Message == 'Employye ID is Used') {
        this.alertalready = true;
      };
    });
  }
  onClose() {
    this.close.emit(false);
    $('#binempModaldelete').modal('hide');
    this.alertalready = false;
  }
}
