import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../http.service';
import { Observable } from 'rxjs';

declare let $;
@Component({
  selector: 'app-rfp-modalrfpstatus',
  templateUrl: './rfp-modalrfpstatus.component.html',
  styleUrls: ['./rfp-modalrfpstatus.component.css']
})
export class RfpModalrfpstatusComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;

  statuscanChange: boolean = false;

  select_length = 0;

  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = this.fb.group({
      status_current: ['', Validators.required],
      status_next: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.data) {
      if (this.openModal) {
        this.select_length = 0;
        $('#rfpModalstatus').modal('show');
        this.form.controls.status_current.setValue(this.data.status_name);
        this.form.controls.status_current.disable();

        if (this.data.status_id == 'BYG') {
          this.form.controls.status_next.setValue('PHD');
          console.log(this.statuscanChange);
        }
        if (this.data.status_id == 'CED') {
          this.form.controls.status_next.setValue('BYG');
          console.log(this.statuscanChange);
        }
        if (this.data.status_id == 'PHD') {
          this.form.controls.status_next.setValue('PHD');
          this.form.controls.status_next.disable();
          this.statuscanChange = true;
          console.log(this.statuscanChange);
        }
      }
    }
    Observable.timer(100).subscribe(r => {
      this.select_length = $('#status_next option').length;
    })
  }
  
  onSave() {
    let obj = {
      order_id: this.data.order_id,
      status: this.form.controls.status_next.value
    };
    this.http.requestPost('api/update_status', obj).subscribe(res => {
      console.log(res);
      this.onClose();
    });
  }
  onClose() {
    this.close.emit(false);
    $('#rfpModalstatus').modal('hide');
    this.statuscanChange = false;
    this.form.controls.status_next.enable();
  }

}
