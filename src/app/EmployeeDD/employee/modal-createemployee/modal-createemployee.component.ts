import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-createemployee',
  templateUrl: './modal-createemployee.component.html',
  styleUrls: ['./modal-createemployee.component.css']
})
export class ModalCreateemployeeComponent implements OnInit, OnChanges {
  FormCreate: FormGroup;
  dep_list: any;
  // text_en_only = "^[a-zA-Z]{2,20}$";
  // text_th_only = "^[ก-์]{2,20}$";
  // text_all_only = "^[a-zA-Zก-์]{2,20}$";
  reg_ = '^[a-zA-Zก-์ ]*[a-zA-Zก-์] *$';
  regex_en = '^[a-zA-Z ]*[a-zA-Z] *$';
  regex_th = '^[ก-์ ]*[ก-์] *$';
  @Output() close = new EventEmitter();
  @Input() openmodal;

  constructor(private build: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.formInit();
    this.getDepartmennt();
  }

  formInit() {
    this.FormCreate = this.build.group({
      firstname_th: ['', [Validators.pattern(this.regex_th), Validators.required]],
      lastname_th: ['', [Validators.pattern(this.regex_th), Validators.required]],
      firstname_en: ['', [Validators.pattern(this.regex_en), Validators.required]],
      lastname_en: ['', [Validators.pattern(this.regex_en), Validators.required]],
      nickname: ['', [Validators.pattern(this.reg_), Validators.required]],
      department: ['', [Validators.required]],
      search_by: ['all']
    });
  }

  getDepartmennt() {
    let obj = {
      page_num: 1,
      row_num: 1000,
      sta_id: 'ac',
      search: '',
      search_by: this.FormCreate.controls.search_by.value
    }

    this.http.requestPost('api/Get_department', obj).subscribe((res: any) => {
      // console.log(res.data);
      this.dep_list = res.data.data;
    })
  }
  ngOnChanges() {
    if (this.openmodal) {
      $('#ModalCreateEmployee').modal('show');
      this.formInit();
    }
  }

  OnCreate() {
    if (this.FormCreate.valid) {
      this.http.requestPost(`api/insert/employee`, {
        first_name: this.FormCreate.value.firstname_th.trim(),
        last_name: this.FormCreate.value.lastname_th.trim(),
        f_name_en: this.FormCreate.value.firstname_en.trim(),
        l_name_en: this.FormCreate.value.lastname_en.trim(),
        n_name: this.FormCreate.value.nickname.trim(),
        dep_id: this.FormCreate.value.department,
      }).subscribe((res: any) => {
        // console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.OnClose();

      })

    } else {
      alert('check data!!');
    }
  }

  OnClose() {
    this.FormCreate.reset();
    this.close.emit(false);
    $('#ModalCreateEmployee').modal('hide');
  }
  ngOnInit() {


  }

}
