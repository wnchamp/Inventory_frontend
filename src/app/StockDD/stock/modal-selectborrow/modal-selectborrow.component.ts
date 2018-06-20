import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modal-selectborrow',
  templateUrl: './modal-selectborrow.component.html',
  styleUrls: ['./modal-selectborrow.component.css']
})
export class ModalSelectborrowComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() stockID;
  @Input() stockStatus;
  @Output() close = new EventEmitter;

  data = [];
  data_emp = [];
  data_empID = '';

  name_emp: any;
  nickname: any;
  department: any;
  status: any;

  confirmStatus: boolean = false;

  form: FormGroup;

  regex_search = '^[0-9a-zA-zก-์+\\s]+$';

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      search: ['', [Validators.pattern(this.regex_search), Validators.required]],
    })
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#borrowModalselect').modal('show');

      if (this.stockStatus != 'bs') {
        this.confirmStatus = true;
      }
    }
  }

  getEmp() {
    this.http.requestGet('api/auto/employee?search=' + this.form.controls.search.value).subscribe(res => {
      this.data = res.data;
      console.log(this.data);
    });
  }

  onConfirm() {
    this.confirmStatus = true;
  }

  onSelect(emp) {
    if (emp) {
      this.data_empID = emp.emp_id;
      this.name_emp = emp.fullname_en;
      this.nickname = emp.emp_nickname;
      this.department = emp.dep_name;
      this.status = emp.status_name;
    }

  }
  onRemove() {
    this.setData();
  }

  onSave() {
    let obj = {
      emp_id: this.data_empID,
      st_id: [this.stockID]
    }
    this.http.requestPost('api/insert_Multi_borrow', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    })
  }

  onClose() {
    this.close.emit(false);
    $('#borrowModalselect').modal('hide');
    this.setData();
  }
  setData() {
    this.data = [];
    this.data_emp = [];
    this.data_empID = '';
    this.confirmStatus = false;
    this.form.controls.search.setValue('');
  }
}
