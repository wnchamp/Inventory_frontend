import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-modaleditdefect',
  templateUrl: './modaleditdefect.component.html',
  styleUrls: ['./modaleditdefect.component.css']
})
export class ModaleditdefectComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() defectID;
  @Input() description;
  @Output() c = new EventEmitter;
  checkOldtext: any;
  form: FormGroup;
  regex_description = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      description: ['', [Validators.pattern(this.regex_description), Validators.required]]
    });

  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      this.form.controls.description.setValue(this.description);
      this.checkOldtext = this.description;
      console.log(this.checkOldtext);

      $('#modalEditDefect').modal('show');
    }
  }

  onSave() {
    if (this.defectID) {
      let obj = {
        de_id: this.defectID,
        description: this.form.controls.description.value.trim()
      }
      console.log(obj);

      this.http.requestPut('api/update/Defect', obj).subscribe(res => {
        console.log(res);
        if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
          this.snackBar.open(res.data, res.Message, { duration: 1200 });
        }
        this.onClose();
      })
    }
  }

  onClose() {
    this.c.emit(false);
    $('#modalEditDefect').modal('hide');
    this.form.reset();
  }
}
