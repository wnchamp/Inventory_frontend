import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-brand-deleteModal',
  templateUrl: './brand-deleteModal.component.html',
  styleUrls: ['./brand-deleteModal.component.css']
})

export class BrandDeleteModalComponent implements OnInit, OnChanges {

  @Input() ModalState;
  @Input() id;
  @Input() brandName;
  @Output() c = new EventEmitter;

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.ModalState) {
      $('#brandDeleteModal').modal('show');
    };
  }

  delete() {
    let obj = {
      brand_id: this.id,
      sta_id: 'rm'
    };
    this.http.requestPut('api/Delete_brand', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.close();
    }, (err) => {
      if (err.data.Message == 'Brand ID is used.') {
        this.alertalready = true;
      };
    });
  }
  close() {
    this.c.emit(false);
    $('#brandDeleteModal').modal('hide');
    this.alertalready = false;
  };
}
