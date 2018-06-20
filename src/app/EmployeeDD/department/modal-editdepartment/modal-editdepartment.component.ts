import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-editdepartment',
  templateUrl: './modal-editdepartment.component.html',
  styleUrls: ['./modal-editdepartment.component.css']
})
export class ModalEditdepartmentComponent implements OnInit {
  FormEdit: FormGroup;
  @Input() openmodal;
  @Input() datadep;
  @Input() idedit;
  @Output() close = new EventEmitter();
  // text_en_only = "^[a-zA-Z+\\s]{4,20}$";
  // text_th_only = "^[ก-์]{4,20}$";
  // text_all_only = "^[a-zA-Zก-์]{4,20}$";
  // text_num_only = "^[0-9-]{8,20}$";
  regex_number = '^[0-9 ]*[0-9] *$';
  regex_en = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';
  constructor(private build: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.FormEdit = this.build.group({
      department_no: ['', [Validators.pattern(this.regex_number), Validators.required]],
      department_name: ['', [Validators.pattern(this.regex_en), Validators.required]],
    });
  }

  ngOnInit() {
  }

  OnEdit() {
    if (this.FormEdit.valid) {
      let data = {
        dep_id: this.idedit,
        dep_name: this.FormEdit.value.department_name.trim(),
        dep_no: this.FormEdit.value.department_no.trim(),
      }

      //trim space from start and end of dep_name, dep_no and display dep_name, dep_no length
      console.log(data.dep_name + 'length: ' + data.dep_name.length);
      console.log(data.dep_no + 'length: ' + data.dep_no.length);

      this.http.requestPut(`api/Edit_department`, data).subscribe((res: any) => {
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.OnClose();
      })

    } else {
      alert('check data!!');
    }
  }

  ngOnChanges() {
    if (this.openmodal) {
      $('#ModalEditDepartment').modal('toggle');
      this.FormEdit.setValue({
        department_no: this.datadep.dep_no,
        department_name: this.datadep.dep_name
      });
    }
  }

  OnClose() {
    this.close.emit(false);
    this.FormEdit.reset();
    $('#ModalEditDepartment').modal('hide');

  }
}
