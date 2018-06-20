import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-selectreturn',
  templateUrl: './modal-selectreturn.component.html',
  styleUrls: ['./modal-selectreturn.component.css']
})
export class ModalSelectreturnComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Input() Stockdata;
  @Output() close = new EventEmitter;

  data_br = [];
  borrowID: any;

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      description: [''],
    })
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#returnModalselect').modal('show');

      if (this.Stockdata) {
        let obj = {
          page_num: 1,
          row_num: 1,
          status: 'br',
          search: this.Stockdata.st_id,
          search_by: 'st_id'
        };
        this.http.requestPost('api/Search/GetBorrow', obj).subscribe(res => {
          this.data_br = res.data.data;
          this.borrowID = res.data.data[0].bo_id;
        });
      }
    }
  }

  onSave() {
    let objSave = {
      borrow_id: [this.borrowID]
    };
    this.http.requestPost('api/insert_Return_Multi', objSave).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    $('#returnModalselect').modal('hide');
  }
}
