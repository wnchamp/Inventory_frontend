import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-garbage-depmodalmove',
  templateUrl: './garbage-depmodalmove.component.html',
  styleUrls: ['./garbage-depmodalmove.component.css']
})
export class GarbageDepmodalmoveComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Input() dep_no;
  @Input() dep_name;
  @Output() close = new EventEmitter;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.openModal) {
      $('#garbmoveModal').modal('show');
    };
  }

  onConfirm() {
    let obj = {
      dep_id: this.id,
      sta_id: 'ac'
    };
    this.http.requestPut('api/Delete_department', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    $('#garbmoveModal').modal('hide');
  }
}
