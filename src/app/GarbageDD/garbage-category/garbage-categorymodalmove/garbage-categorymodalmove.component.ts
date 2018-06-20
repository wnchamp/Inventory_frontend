import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $
@Component({
  selector: 'app-garbage-categorymodalmove',
  templateUrl: './garbage-categorymodalmove.component.html',
  styleUrls: ['./garbage-categorymodalmove.component.css']
})
export class GarbageCategorymodalmoveComponent implements OnInit, OnChanges {

  @Input() openModal
  @Input() id
  @Input() name
  @Output() close = new EventEmitter

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#categarModalmove').modal('show')
    }
  }

  onConfirm() {
    let obj = {
      cate_id: this.id,
      sta_id: 'ac'
    }
    this.http.requestPut('api/Delete_category', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose()
    })
  }

  onClose() {
    this.close.emit(false)
    $('#categarModalmove').modal('hide')
  }

}
