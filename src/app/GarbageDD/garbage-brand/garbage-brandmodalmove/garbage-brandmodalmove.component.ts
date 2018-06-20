import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-garbage-brandmodalmove',
  templateUrl: './garbage-brandmodalmove.component.html',
  styleUrls: ['./garbage-brandmodalmove.component.css']
})
export class GarbageBrandmodalmoveComponent implements OnInit, OnChanges {

  @Input() openModal
  @Input() id
  @Input() name
  @Output() close = new EventEmitter
  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.openModal) {
      $('#garbmoveModalbrand').modal('toggle')
    }
  }

  onConfirm() {
    let obj = {
      brand_id: this.id,
      sta_id: 'ac',
    }
    this.http.requestPut('api/Delete_brand', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    })
  }

  onClose() {
    this.close.emit(false);
    $('#garbmoveModalbrand').modal('hide')
  }

}
