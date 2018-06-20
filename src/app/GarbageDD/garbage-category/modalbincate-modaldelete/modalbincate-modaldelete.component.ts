import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modalbincate-modaldelete',
  templateUrl: './modalbincate-modaldelete.component.html',
  styleUrls: ['./modalbincate-modaldelete.component.css']
})
export class ModalbincateModaldeleteComponent implements OnInit, OnChanges {

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
      $('#bincateModaldelete').modal('show');
    };
  }

  onDelete() {
    if (this.stockID) {
      let obj = {
        cate_id: this.stockID,
        sta_id: 'dl',
      };
      this.http.requestPut('api/Delete_category', obj).subscribe(res => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.onClose();
      }, (err) => {
        console.log(err);
        if (err.data.Message = 'category is used.') {
          this.alertalready = true;
        };
      });
    };
  }
  onClose() {
    this.close.emit(false);
    $('#bincateModaldelete').modal('hide');
    this.alertalready = false;
  }
}