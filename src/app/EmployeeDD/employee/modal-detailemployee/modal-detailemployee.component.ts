import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
declare let $;
@Component({
  selector: 'app-modal-detailemployee',
  templateUrl: './modal-detailemployee.component.html',
  styleUrls: ['./modal-detailemployee.component.css']
})
export class ModalDetailemployeeComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() data;
  @Output() close = new EventEmitter;

  stockData = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#employeeDetailModal').modal('show');
    }
  }

  onClose() {
    this.close.emit(false);
    $('#employeeDetailModal').modal('hide');
  }
}