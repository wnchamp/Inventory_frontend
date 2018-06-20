import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-modal-blockuser',
  templateUrl: './modal-blockuser.component.html',
  styleUrls: ['./modal-blockuser.component.css']
})
export class ModalBlockuserComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id;
  @Input() username;
  @Input() fname;
  @Output() close = new EventEmitter();
  url = 'api/Users';

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#blockuserModal').modal('toggle')
    }
  }

  onBlock() {
    let obj = {
      user_id: this.id,
      user_status: 'bo'
    }
    this.http.requestPut(this.url, obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    })
  }

  onClose() {
    this.close.emit(false);
    $('#blockuserModal').modal('hide');
  }
}
