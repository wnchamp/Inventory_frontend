import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'barcode'
})
export class BarcodePipe implements PipeTransform {

  transform(value: any, args): any {
    var barcodeformat = "";
    for (var i = 1; i <= 3; i++) {
      if (i == 1) {
        barcodeformat = barcodeformat + value.slice(0,3);
      }
      if (i == 2) {
        barcodeformat = barcodeformat + " " + value.slice(3,7);
      }
      if (i == 3) {
        barcodeformat = barcodeformat + " " + value.slice(7,13)
      }
    }

    return barcodeformat;
  }

}
