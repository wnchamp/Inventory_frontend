import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-brandbin-modaldelete',
  templateUrl: './brandbin-modaldelete.component.html',
  styleUrls: ['./brandbin-modaldelete.component.css']
})
export class BrandbinModaldeleteComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() brandID;
  @Input() brandName;
  @Output() close = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#brandbinModaldelete').modal('show');
    };
  }

  onDelete() {
    let obj = {
      brand_id: this.brandID,
      sta_id: 'dl'
    };
    this.http.requestPut('api/Delete_brand', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      if (err.data.Message = 'Brand ID is used.') {
        this.alertalready = true;
      }
    });
  }
  onClose() {
    this.close.emit(false);
    $('#brandbinModaldelete').modal('hide');
    this.alertalready = false;
  }
}
