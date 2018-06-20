import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../../http.service';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-typecreatemodal',
  templateUrl: './typecreatemodal.component.html',
  styleUrls: ['./typecreatemodal.component.css']
})
export class TypecreatemodalComponent implements OnInit, OnChanges {

  data_cate: any;
  type_data: any;
  num_page: any;
  show_page: any;

  @Input() statusModal;
  @Output() close = new EventEmitter();

  myControl: FormControl = new FormControl();

  form: FormGroup;
  regex_pattern = "^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$";

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      type: ['', [Validators.pattern(this.regex_pattern), Validators.required]],
      cate: ['']
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.statusModal) {
      $('#typeCreateModal').modal('show');
      this.getCate();
    }
  }

  onCreatetype() {
    let objType = {
      cate_id: this.form.controls.cate.value,
      type_name: this.form.controls.type.value.trim(),
    }
    this.http.requestPost('api/Insert_Type', objType).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.Close();
    })
  }

  getCate() {
    let objCate = {
      page_num: '1',
      row_num: '100000',
      search: '',
      sta_id: 'ac',
    }
    this.http.requestPost('api/GetAll/category', objCate).subscribe(res => {
      this.data_cate = res.data.data;
      console.log(this.data_cate);
    })
  }

  Close() {
    this.form.reset();
    $('#typeCreateModal').modal('hide');
    this.close.emit(false);
  }
}