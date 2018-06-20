import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-bintype-modaldelete',
  templateUrl: './bintype-modaldelete.component.html',
  styleUrls: ['./bintype-modaldelete.component.css']
})
export class BintypeModaldeleteComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() typeID;
  @Input() typeName;
  @Output() close = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#typebinModaldelete').modal('show');
    };
  }

  onDelete() {
    let obj = {
      type_id: this.typeID,
      sta_id: 'dl'
    };
    this.http.requestPut('api/Delete_Type', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      if (err.data.Message = 'type ID is used.') {
        this.alertalready = true;
      };
    });
  }
  onClose() {
    this.close.emit(false);
    $('#typebinModaldelete').modal('hide');
    this.alertalready = false;
  }
}
