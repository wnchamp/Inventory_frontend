import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-cate-createModal',
  templateUrl: './cate-createModal.component.html',
  styleUrls: ['./cate-createModal.component.css']
})
export class CateCreateModalComponent implements OnInit {

  form: FormGroup;

  text_en_th_number_only = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] {0,}$';

  @Output() close = new EventEmitter();
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      category: ['', [Validators.pattern(this.text_en_th_number_only), Validators.required]]
    })
  }

  ngOnInit() {

  }

  onCreate() {
    let objCate = {
      category: this.form.controls.category.value.trim()
    };
    this.http.requestPost('api/insert/category', objCate).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.form.reset();
      this.Close();
    });

  }

  onCheck() {
   if(!this.form.controls.category.value){
     console.log('this work!');
   }
  }

  Close() {
    $('#cateCreateModal').modal('hide');
    this.close.emit(false);
    this.form.reset();
  }

}
