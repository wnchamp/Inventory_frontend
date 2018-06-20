import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-cate-editModal',
  templateUrl: './cate-editModal.component.html',
  styleUrls: ['./cate-editModal.component.css']
})
export class CateEditModalComponent implements OnInit, OnChanges {

  @Input() statModal;
  @Input() id: any;
  @Input() name: any;
  @Output() close = new EventEmitter();

  regex_edit = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      cate_name: ['', [Validators.required, Validators.pattern(this.regex_edit)]],
    })
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.statModal) {
      $('#cateEditModal').modal('show');
      this.form.controls.cate_name.setValue(this.name);
    }
  }

  onEdit() {
    let objCate = {
      cate_id: this.id,
      category: this.form.controls.cate_name.value.trim(),
    }
    this.http.requestPut('api/Edit/category', objCate).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    })
  }

  onClose() {
    this.close.emit(false);
    $('#cateEditModal').modal('hide');
  }

}
