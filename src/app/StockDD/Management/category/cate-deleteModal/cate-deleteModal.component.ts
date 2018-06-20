import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-cate-deleteModal',
  templateUrl: './cate-deleteModal.component.html',
  styleUrls: ['./cate-deleteModal.component.css']
})
export class CateDeleteModalComponent implements OnInit, OnChanges {

  @Input() statModal;
  @Input() id;
  @Input() name;

  alertalready: boolean = false;

  @Output() close = new EventEmitter();
  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.statModal) {
      $('#cateDeleteModal').modal('toggle');
    };
  }

  onDel() {
    let obj = {
      cate_id: this.id,
      sta_id: 'rm'
    };
    this.http.requestPut('api/Delete_category', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      if (err.data.Message == 'category is used.') {
        this.alertalready = true;
      }
    });
  }

  onClose() {
    this.close.emit(false);
    $('#cateDeleteModal').modal('hide');
    this.alertalready = false;
  };

}
