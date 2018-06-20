import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-deletedepartment',
  templateUrl: './modal-deletedepartment.component.html',
  styleUrls: ['./modal-deletedepartment.component.css']
})
export class ModalDeletedepartmentComponent implements OnInit {

  @Input() openmodal;
  @Input() iddelete;
  @Input() datadep;
  @Output() close = new EventEmitter();

  depname: any;
  alertalready: boolean = false;

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      data_name: [''],
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openmodal) {
      $('#ModalDelDepartment').modal('show');
      this.form.controls.data_name.setValue(this.datadep.dep_name);
      this.depname = this.form.controls.data_name.value;
    }
  }

  OnDelete() {
    let obj = {
      dep_id: this.iddelete,
      sta_id: 'rm'
    }
    this.http.requestPut('api/Delete_department', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.OnClose();
    }, (err) => {
      if (err.data.Message == 'Department ID is used') {
        this.alertalready = true;
      };
    });
  }
  OnClose() {
    this.close.emit(false);
    $('#ModalDelDepartment').modal('hide');
    this.alertalready = false;
  }
}