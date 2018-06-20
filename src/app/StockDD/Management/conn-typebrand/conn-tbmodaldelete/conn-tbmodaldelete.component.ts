import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { MatSnackBar } from '@angular/material';
declare let $;
@Component({
  selector: 'app-conn-tbmodaldelete',
  templateUrl: './conn-tbmodaldelete.component.html',
  styleUrls: ['./conn-tbmodaldelete.component.css']
})
export class ConnTbmodaldeleteComponent implements OnInit, OnChanges {

  @Input() openModal: boolean;
  @Input() id: any;
  @Input() type: any;
  @Input() brand: any;
  @Output() close = new EventEmitter();
  @Output() x = new EventEmitter();
  constructor(private http: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.openModal) {
      $('#tbDeleteModal').modal('show');
    };
  }

  onDelete() {
    this.http.requestDelete('api/Delete_Type_Brand?id=' + this.id).subscribe(res => {
      if (res.status == 200 && res.Message == 'OK' && res.data == 'Success') {
        this.snackBar.open(res.data, res.Message, { duration: 1200 });
      }
      this.x.emit(false);
      this.onClose();
    });
  }

  onClose() {
    this.close.emit(false);
    $('#tbDeleteModal').modal('hide');
  }
}
