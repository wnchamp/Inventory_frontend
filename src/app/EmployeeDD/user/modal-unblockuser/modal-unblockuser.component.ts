import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../http.service';

declare let $;
@Component({
  selector: 'app-modal-unblockuser',
  templateUrl: './modal-unblockuser.component.html',
  styleUrls: ['./modal-unblockuser.component.css']
})
export class ModalUnblockuserComponent implements OnInit {

  @Input() openModal;
  @Input() id;
  @Input() username;
  @Input() fname;
  @Output() close = new EventEmitter();
  url = 'api/Users';
  constructor(private http: HttpService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#unblockuserModal').modal('toggle')
    }
  }
  onUnBlock() {
    let obj = {
      user_id: this.id,
      user_status: 'ac'
    }
    this.http.requestPut(this.url, obj).subscribe(res => {
      this.onClose();
    })
  }

  onClose() {
    this.close.emit(false);
    $('#unblockuserModal').modal('hide');
  }
}
