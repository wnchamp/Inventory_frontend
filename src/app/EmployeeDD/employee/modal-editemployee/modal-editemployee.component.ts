import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-editemployee',
  templateUrl: './modal-editemployee.component.html',
  styleUrls: ['./modal-editemployee.component.css']
})
export class ModalEditemployeeComponent implements OnInit, OnChanges {

  dep_list: any;
  FormEdit: FormGroup;
  @Input() openmodal;
  @Input() data_emp;
  @Input() idedit;
  @Output() close = new EventEmitter();
  // text_en_only = "^[a-zA-Z]{2,20}$";
  // text_th_only = "^[ก-์]{2,20}$";
  // text_all_only = "^[a-zA-Zก-์]{2,20}$";
  reg_ = '^[a-zA-Zก-์ ]*[a-zA-Zก-์] *$';
  regex_en = '^[a-zA-Z ]*[a-zA-Z] *$';
  regex_th = '^[ก-์ ]*[ก-์] *$';
  f_name_th: any;
  l_name_th: any;
  f_name_en: any;
  l_name_en: any;
  n_name: any;
  dep_id: any;

  constructor(private build: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.FormEdit = this.build.group({
      firstname_th: ['', [Validators.pattern(this.regex_th), Validators.required]],
      lastname_th: ['', [Validators.pattern(this.regex_th), Validators.required]],
      firstname_en: ['', [Validators.pattern(this.regex_en), Validators.required]],
      lastname_en: ['', [Validators.pattern(this.regex_en), Validators.required]],
      nickname: ['', [Validators.pattern(this.reg_), Validators.required]],
      department: ['', [Validators.required]],
      statusname: ['']
    });
    this.getDepartmennt();
  }

  getDepartmennt() {
    let obj = {
      page_num: 1,
      row_num: 1000,
      sta_id: 'ac',
      search: '',
      search_by: 'al'
    }
    this.http.requestPost('api/Get_department', obj).subscribe((res: any) => {
      this.dep_list = res.data.data;
    })
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.openmodal) {
      $('#editEmpModal').modal('show');
      this.FormEdit.controls.firstname_en.setValue(this.data_emp.first_name_en);
      this.FormEdit.controls.lastname_en.setValue(this.data_emp.last_name_en);
      this.FormEdit.controls.firstname_th.setValue(this.data_emp.first_name);
      this.FormEdit.controls.lastname_th.setValue(this.data_emp.last_name);
      this.FormEdit.controls.nickname.setValue(this.data_emp.emp_nickname);
      this.FormEdit.controls.department.setValue(this.data_emp.department_id);
      this.FormEdit.controls.statusname.setValue(this.data_emp.user_status);
    }
  }

  OnEdit() {
    if (this.FormEdit.valid) {
      let obj = {
        emp_id: this.idedit,
        f_name: this.FormEdit.controls.firstname_th.value.trim(),
        l_name: this.FormEdit.controls.lastname_th.value.trim(),
        f_name_en: this.FormEdit.controls.firstname_en.value.trim(),
        l_name_en: this.FormEdit.controls.lastname_en.value.trim(),
        n_name: this.FormEdit.controls.nickname.value.trim(),
        dep_id: this.FormEdit.controls.department.value.trim(),
        role_id: this.data_emp.role_id,
        user_status: this.data_emp.user_status
      }
      this.http.requestPut(`api/Edit/employee`, obj).subscribe((res: any) => {
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
    this.close.emit(false);
    $('#editEmpModal').modal('hide');
  }
}