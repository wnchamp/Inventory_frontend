import { Component, OnInit, Input, OnChanges, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;

@Component({
  selector: 'app-modal-edituser',
  templateUrl: './modal-edituser.component.html',
  styleUrls: ['./modal-edituser.component.css']
})
export class ModalEdituserComponent implements OnInit, OnChanges {

  @Input() modalEditState;
  @Input() userID;
  @Input() userData;
  @Input() roleData;
  @Output() close = new EventEmitter;
  editForm: FormGroup;
  text_en_only = "^[a-zA-Z0-9._ ]*[a-zA-Z0-9._] *$";
  dataSend: any;
  constructor(private fBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.editForm = this.fBuilder.group({
      username: ['', [Validators.pattern(this.text_en_only), Validators.required]],
      rolename: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.dataSend = {
      user_id: this.userData.user_id,
      emp_id: this.userData.emp_id,
      username: this.editForm.value.username.trim(),
      role_id: this.editForm.value.rolename,
      user_status: this.userData.user_status
    }
    this.http.requestPut('api/super_admin/Users', this.dataSend).subscribe((res) => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.closeModal();
    }, (err) => {
      alert(err.data);
    });


  }
  ngOnInit() { }

  closeModal() {
    this.close.emit(false);
    $('#editUserModal').modal('hide');
    this.editForm.reset();
  }

  ngOnChanges() {
    if (this.modalEditState) {
      $('#editUserModal').modal('show');
      this.editForm.setValue({
        username: this.userData.username,
        rolename: this.userData.role_id
      });
    }
  }
}
