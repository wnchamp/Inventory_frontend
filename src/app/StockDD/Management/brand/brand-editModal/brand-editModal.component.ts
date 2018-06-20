import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;

@Component({
  selector: 'app-brand-editModal',
  templateUrl: './brand-editModal.component.html',
  styleUrls: ['./brand-editModal.component.css']
})

export class BrandEditModalComponent implements OnInit, OnChanges {

  url = 'api/Edit_Brand';
  @Input() ModalState;
  @Output() c = new EventEmitter;
  @Input() brandID;
  @Input() brand_Name;
  formEditBrand: FormGroup;
  regex_edit = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private fBuilder: FormBuilder, private http: HttpService, private snackBar: MatSnackBar) {
    this.formEditBrand = this.fBuilder.group({
      brandName: ['', [Validators.required, Validators.pattern(this.regex_edit)]]
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.ModalState) {
      $('#brandEditModal').modal('show');
      this.formEditBrand.controls.brandName.setValue(this.brand_Name)
    }
  }

  close() {
    this.c.emit(false);
    $('#brandEditModal').modal('hide');
  }

  submitForm() {
    let obj = {
      brand_id: this.brandID,
      brand_name: this.formEditBrand.controls.brandName.value.trim()
    }
    this.http.requestPut(this.url, obj).subscribe((res) => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.formEditBrand.reset()
      this.close()
    })
  }

}
