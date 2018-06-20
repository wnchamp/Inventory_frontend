import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../http.service';
declare let $;
@Component({
  selector: 'app-modaldefect-multirepair-adddescription',
  templateUrl: './modaldefect-multirepair-adddescription.component.html',
  styleUrls: ['./modaldefect-multirepair-adddescription.component.css']
})
export class ModaldefectMultirepairAdddescriptionComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() defectID;
  @Output() close = new EventEmitter;
  @Output() success = new EventEmitter
  checkSuccess: boolean = false;
  form: FormGroup;
  regex_description = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = fb.group({
      description: ['', [Validators.pattern(this.regex_description), Validators.required]],
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#modalDefectmultiAdddes').modal('show');
    }
  }

  onSave() {
    let obj = {
      de_id: [this.defectID],
      // description: this.form.controls.description.value + ' ',
      description: this.form.controls.description.value.trim(),

    };
    this.http.requestPost('api/Insert_multi_row/Repair', obj).subscribe(res => {
      console.log(res);
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
    this.success.emit(this.checkSuccess);
    $('#modalDefectmultiAdddes').modal('hide');
  }
}
