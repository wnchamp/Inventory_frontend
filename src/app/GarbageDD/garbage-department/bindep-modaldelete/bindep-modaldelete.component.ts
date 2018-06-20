import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-bindep-modaldelete',
  templateUrl: './bindep-modaldelete.component.html',
  styleUrls: ['./bindep-modaldelete.component.css']
})
export class BindepModaldeleteComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Input() dep_no;
  @Input() dep_name;
  @Output() close = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#bindepModaldelete').modal('show');
    };
  }

  onDelete() {
    let obj = {
      dep_id: this.id,
      sta_id: 'dl'
    };
    this.http.requestPut('api/Delete_department', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      console.log(err);
      if (err.data.Message == 'Department ID is used') {
        this.alertalready = true;
      }
      if (err.data.Message == 'An error has occurred.') {
        this.alertalready = true;
      }
    });
  }
  onClose() {
    this.close.emit(false);
    $('#bindepModaldelete').modal('hide');
    this.alertalready = false;
  }
}