import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modalrepair-edit',
  templateUrl: './modalrepair-edit.component.html',
  styleUrls: ['./modalrepair-edit.component.css']
})
export class ModalrepairEditComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;
  form: FormGroup;
  regex_description = '^[0-9a-zA-Zก-์\n ]*[0-9a-zA-Zก-์\n] *$';

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      description: ['', [Validators.pattern(this.regex_description), Validators.required]]
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#modalEditRepair').modal('show');
      this.form.controls.description.setValue(this.data.description);
    }
  }

  onSave() {
    let obj = {
      re_id: this.data.re_id,
      description: this.form.controls.description.value.trim(),
    };

    this.http.requestPut('api/Update_Repair', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    $('#modalEditRepair').modal('hide');
    this.form.reset();
  }
}
