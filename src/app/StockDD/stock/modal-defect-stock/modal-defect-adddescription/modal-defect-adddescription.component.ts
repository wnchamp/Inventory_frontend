import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $;
@Component({
  selector: 'app-modal-defect-adddescription',
  templateUrl: './modal-defect-adddescription.component.html',
  styleUrls: ['./modal-defect-adddescription.component.css']
})
export class ModalDefectAdddescriptionComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;
  @Output() success = new EventEmitter;

  checkSuccess: boolean = false;

  form: FormGroup;
  regex_description = "^[0-9a-zA-Zก-์+\\s]+$";


  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      description: ['', [Validators.pattern(this.regex_description), Validators.required]]
    })
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#defectModaladddes').modal('show');
    };
  }

  onSave() {
    let obj = {
      description: this.form.controls.description.value + '',
      st_id: [this.data.st_id]
    };
    this.http.requestPost('api/insert_Multi_row_defect', obj).subscribe(res => {
      console.log(res.data);
      if (res.data == 'Success') {
        this.checkSuccess = true;
      } else {
        this.checkSuccess = false;
      }
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    this.success.emit(this.checkSuccess)
    $('#defectModaladddes').modal('hide');
    this.form.reset();
  }
}
