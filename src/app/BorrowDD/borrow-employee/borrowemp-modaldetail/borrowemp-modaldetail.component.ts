import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HttpService } from '../../../http.service';
declare let $;
@Component({
  selector: 'app-borrowemp-modaldetail',
  templateUrl: './borrowemp-modaldetail.component.html',
  styleUrls: ['./borrowemp-modaldetail.component.css']
})
export class BorrowempModaldetailComponent implements OnInit, OnChanges {

  @Input() openModal;
  @Input() id_emp;
  @Output() close = new EventEmitter;
  @Output() _bypass_print = new EventEmitter;

  dataBorrow = [];

  statusDetailborrow: boolean = false;
  data = [];

  statusReturnstock: boolean = false;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#borrowdetailModal').modal('show');
      this.getBorrow();
    }
  }

  getBorrow() {
    let obj = {
      page_num: 1,
      row_num: 500,
      status: 'br',
      search: this.id_emp,
      search_by: 'emp_id'
    }
    this.http.requestPost('api/Search/GetBorrow', obj).subscribe(res => {
      this.dataBorrow = res.data.data;
      console.log(res);
    })
  }

  onPrint() {
    $('.modal-backdrop').remove();
    this._bypass_print.emit(false);
  }

  openDetail(data) {
    this.statusDetailborrow = true;
    this.data = data;
  }
  openReturn(data) {
    this.statusReturnstock = true;
    this.data = data;
  }
  closeModal(e) {
    this.statusDetailborrow = e;
    this.statusReturnstock = e;
    this.getBorrow();
  }

  onClose() {
    this.close.emit(false);
    $('#borrowdetailModal').modal('hide');
  }
}
