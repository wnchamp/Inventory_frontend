import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-modal-editpass',
  templateUrl: './modal-editpass.component.html',
  styleUrls: ['./modal-editpass.component.css']
})

export class ModalEditpassComponent implements OnInit, OnChanges {

  urlUpdatePass = '/api/super_admin_put/password';
  @Input() modalEditPassState;
  @Input() userID: any;
  @Output() close = new EventEmitter;
  formChangePass: FormGroup
  text_num_only = "^[0-9A-Za-z. ]*[0-9a-zA-Z. ] *$";

  constructor(private http: HttpService, private fbuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.modalEditPassState) {
      $('#editUserPassModal').modal('show');
      console.log(this.userID);
    }

  }

  submitEditPass() {
    if (this.formChangePass.value.password1 == this.formChangePass.value.password2) {
      this.http.requestPut(this.urlUpdatePass, {
        user_id: this.userID,
        password: this.formChangePass.controls.password1.value
      }).subscribe((res) => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.closeModal();
      });
    } else {
      alert('Passwords do not match');
    }
  }

  closeModal() {
    this.close.emit(false);
    $('#editUserPassModal').modal('hide');
    this.formChangePass.reset();
  }

  createForm() {
    this.formChangePass = this.fbuilder.group({
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
      // password1: ['', [Validators.pattern(this.text_num_only), Validators.required]],
      // password2: ['', [Validators.pattern(this.text_num_only), Validators.required]]
    });
  }
}
