import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';

declare let $;
@Component({
  selector: 'app-typedeletemodal',
  templateUrl: './typedeletemodal.component.html',
  styleUrls: ['./typedeletemodal.component.css']
})
export class TypedeletemodalComponent implements OnInit, OnChanges {

  @Input() statModal: any;
  @Input() idDelete: any;
  @Input() nametype: any;
  @Output() close = new EventEmitter();

  alertalready: boolean = false;

  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.statModal) {
      $('#typeDeleteModal').modal('toggle');
    }
  }

  onDelete() {
    let obj = {
      type_id: this.idDelete,
      sta_id: 'rm'
    };
    this.http.requestPut('api/Delete_Type', obj).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.onClose();
    }, (err) => {
      if (err.data.Message == 'type ID is used.') {
        this.alertalready = true;
      };
    });
  }

  onClose() {
    this.close.emit(false);
    $('#typeDeleteModal').modal('hide');
    this.alertalready = false;
  }
}
