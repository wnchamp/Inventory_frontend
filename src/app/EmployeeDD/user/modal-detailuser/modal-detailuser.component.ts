import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';


declare let $;
@Component({
  selector: 'app-modal-detailuser',
  templateUrl: './modal-detailuser.component.html',
  styleUrls: ['./modal-detailuser.component.css']
})
export class ModalDetailuserComponent implements OnInit, OnChanges {

  @Input() ModalDetails;
  @Input() username;
  @Output() close = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.ModalDetails) {
      $('#detailuserModal').modal('toggle');
    }
  }



  onClose() {
    this.close.emit(false);
    $('#detailuserModal').modal('hide');
  }
}
