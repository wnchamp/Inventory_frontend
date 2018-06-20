import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-selectdefect',
  templateUrl: './modal-selectdefect.component.html',
  styleUrls: ['./modal-selectdefect.component.css']
})
export class ModalSelectdefectComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() StockData;
  @Output() close = new EventEmitter;

  borrowID: any;

  form: FormGroup;

  regex_description = "^[0-9a-zA-Zก-์+\\s]+$";

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      description: ['', [Validators.pattern(this.regex_description), Validators.required]],
    })
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#defectModalselect').modal('show');

      if (this.StockData.status == 'bs') {
        let obj = {
          page_num: 1,
          row_num: 1,
          status: 'br',
          search: this.StockData.st_id,
          search_by: 'st_id',
        };
        this.http.requestPost('api/Search/GetBorrow', obj).subscribe(res => {
          this.borrowID = res.data.data[0].bo_id;
        });
      }
    }
  }

  onSave() {
    if (this.StockData.status == 'ep') {
      let objEp = {
        st_id: [this.StockData.st_id],
        description: this.form.controls.description.value,
      };
      this.http.requestPost('api/insert_Multi_row_defect', objEp).subscribe(res => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.onClose();
      });
    }
    if (this.StockData.status == 'bs') {
      let objBs = {
        borrow_id: [this.borrowID],
        description: this.form.controls.description.value,
      };
      this.http.requestPost('api/return_stock_df_Multi', objBs).subscribe(res => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.onClose();
      });
    }
  }

  onClose() {
    this.close.emit(false);
    $('#defectModalselect').modal('hide');
    this.form.reset();
  }
}
