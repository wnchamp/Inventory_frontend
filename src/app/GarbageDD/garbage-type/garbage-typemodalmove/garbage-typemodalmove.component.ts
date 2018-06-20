import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-garbage-typemodalmove',
  templateUrl: './garbage-typemodalmove.component.html',
  styleUrls: ['./garbage-typemodalmove.component.css']
})
export class GarbageTypemodalmoveComponent implements OnInit, OnChanges {

  @Input() openModal
  @Input() id
  @Input() name_cate
  @Input() name_type
  @Output() close = new EventEmitter

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#typegarModalmove').modal('show')
    }
  }

  onConfirm() {
    let obj = {
      type_id: this.id,
      sta_id: 'ac'
    }
    this.http.requestPut('api/Delete_type', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose()
    })
  }

  onClose() {
    this.close.emit(false)
    $('#typegarModalmove').modal('hide')
  }


}
