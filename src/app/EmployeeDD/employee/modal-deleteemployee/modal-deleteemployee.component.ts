import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-deleteemployee',
  templateUrl: './modal-deleteemployee.component.html',
  styleUrls: ['./modal-deleteemployee.component.css']
})
export class ModalDeleteemployeeComponent implements OnInit, OnChanges {

  @Input() openmodal;
  @Input() iddelete;
  @Input() name_en
  @Input() name_th
  @Output() close = new EventEmitter();

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openmodal) {
      $('#deleteEmpModal').modal('show');
    }
  }

  OnDelete() {
    let obj = {
      emp_id: this.iddelete,
      user_status: 'rm'
    };
    this.http.requestPut('api/Delete/employee', obj).subscribe((res) => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.OnClose();
    }, (err) => {
      if (err.data.Message == 'Employye ID is Used') {
        this.alertalready = true;
      };
    });
  }
  OnClose() {
    this.close.emit(false);
    $('#deleteEmpModal').modal('hide');
    this.alertalready = false;
  }
}