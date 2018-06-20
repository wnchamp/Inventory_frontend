import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-typeeditmodal',
  templateUrl: './typeeditmodal.component.html',
  styleUrls: ['./typeeditmodal.component.css']
})
export class TypeeditmodalComponent implements OnInit, OnChanges{

  @Input() statusModal;
  @Input() id_cate: any;
  @Input() id_type: any;
  @Input() data_type: any;
  @Output() close = new EventEmitter();
  data_cate: any;
  form: FormGroup;

  regex_pattern = "^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$";
  
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      cate: [''],
      type: ['', [Validators.pattern(this.regex_pattern), Validators.required]],
    });
    this.getCate();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.statusModal) {
      $('#typeEditModal').modal('toggle');
      this.form.controls.cate.setValue(this.id_cate);
      this.form.controls.type.setValue(this.data_type.type_name);
    }
  }

  onEdit() {
    let objType = {
      type_id: this.id_type,
      cate_id: this.form.controls.cate.value,
      type_name: this.form.controls.type.value.trim(),
    }
    this.http.requestPut('api/Edit_Type', objType).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
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
    });
  }

  onClose() {
    this.close.emit(false);
    $('#typeEditModal').modal('hide');
  }
}
