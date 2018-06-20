import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
declare let $;

@Component({
  selector: 'app-rfp-modalrfpdeatails',
  templateUrl: './rfp-modalrfpdeatails.component.html',
  styleUrls: ['./rfp-modalrfpdeatails.component.css']
})
export class RfpModalrfpdeatailsComponent implements OnInit, OnChanges {

  @Input() mDetailStat;
  @Input() detailData;
  @Output() c = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.mDetailStat) {
      $('#detailModal').modal('show');
    }
  }

  close() {
    this.c.emit(false);
    $('#detailModal').modal('hide');
  }

}
