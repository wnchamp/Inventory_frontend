import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-createdepartment',
  templateUrl: './modal-createdepartment.component.html',
  styleUrls: ['./modal-createdepartment.component.css']
})
export class ModalCreatedepartmentComponent implements OnInit {
  FormCreate: FormGroup;
  // text_en_only = "^[a-zA-Z+\\s]{4,20}$";
  // text_th_only = "^[ก-์]{4,20}$";
  // text_all_only = "^[a-zA-Zก-์]{4,20}$";
  // text_num_only = "^[0-9]{3,20}$";
  regex_number = '^[0-9 ]*[0-9] *$';
  regex_en = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';
  @Output() close = new EventEmitter();

  constructor(private build: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.FormCreate = this.build.group({
      department_no: ['', [Validators.pattern(this.regex_number), Validators.required]],
      department_name: ['', [Validators.pattern(this.regex_en), Validators.required]],

    });
  }

  ngOnInit() {
  }

  OnCreate() {
    if (this.FormCreate.valid) {
      let data = {
        dep_no: this.FormCreate.value.department_no.trim(),
        dep_name: this.FormCreate.value.department_name.trim()
      }

      // console.log(data.dep_name + ' length: ' + data.dep_name.length);

      this.http.requestPost(`api/Insert_department`, data).subscribe((res: any) => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.OnClose();
      })



      $('#ModalCreateDepartment').modal('hide');
    } else {
      alert('check data!!');
    }
  }

  OnClose() {
    this.FormCreate.reset();
    this.close.emit(false);
    $('#ModalCreateDepartment').modal('hide');
  }


}
