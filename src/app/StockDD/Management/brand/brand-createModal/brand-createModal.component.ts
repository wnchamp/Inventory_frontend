import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-brand-createModal',
  templateUrl: './brand-createModal.component.html',
  styleUrls: ['./brand-createModal.component.css']
})
export class BrandCreateModalComponent implements OnInit, OnChanges {

  @Input() ModalState;
  @Output() c = new EventEmitter;
  type_data = [];
  statusOpentypeModal: boolean = false;
  form: FormGroup;
  regex_create = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private http: HttpService, private fBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fBuilder.group({
      type: [''],
      brandName: ['', [Validators.required, Validators.pattern(this.regex_create)]]
    });

  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.ModalState) {
      $('#brandCreateModal').modal('show');
      this.onSearchType();
    }
  }

  onSearchType() {
    let obj = {
      page_num: '1',
      row_num: '10',
      search: '',
      sta_id: 'ac',
      search_by: 'al',
    }
    this.http.requestPost('api/GET_Tpye', obj).subscribe(res => {
      this.type_data = res.data.data;
      console.log(this.type_data);
    });
  }

  createBrand() {
    let obj = {
      type_id: this.form.controls.type.value,
      brand_name: this.form.controls.brandName.value.trim()
    }
    this.http.requestPost('api/Insert_Brand', obj).subscribe((res) => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.close();
      this.form.reset();
    });
  }

  close() {
    this.c.emit(false);
    $('#brandCreateModal').modal('hide');
  }
}
