import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Pie
  per_stock_empty: any;
  per_stock_busy: any;
  per_stock_def: any;

  count_stock_empty: any;
  count_stock_busy: any;
  count_stock_def: any;

  total_stock: any;
  //pieChartLabels: string[] = ['Empty', 'Busy', 'Defective'];
  pieChartLabels: string[] = ['ว่าง', 'ยืม', 'ชำรุด'];
  pieChartType: string = 'pie';
  color: Array<any> = [{
    backgroundColor: [
      '#77dd77',
      'rgb(253, 224, 59)',
      'rgb(255, 59, 59)'
    ]
  }
  ];


  user_active: any;
  user_block: any;

  count_user_active: any;
  count_user_block: any;

  total_user: any;
  total_repir:any;

  amount_user_new: number = 0;
  amount_item_new: number = 0;
  date_format = '';
  month: any;

  data_type:any;
  constructor(private http: HttpService) {
    this.getStock_empty();
    this.getUser();
    this.Get_newstock();
    this.GetType();
    var date = new Date();
    this.month = date;
    var date_ = JSON.stringify(date);


    for (var i = 1; i < 8; i++) {
      this.date_format = this.date_format + date_[i];
    }





  }

  ngOnInit() {


  }

  getUser() {
    let objuser = {
      page_num: 1,
      row_num: 100000,
      user_status: 'ac',
      search: '',
      search_by:'al'
    }
    this.http.requestPost('api/get_Users_all', objuser).subscribe((res: any) => {
      this.count_user_active = res.data.data.length;
      this.total_user = this.count_user_active;

      for (var i = 0; i < res.data.data.length; i++) {
        var format_dt = '';
        for (var x = 0; x < 7; x++) {
          format_dt = format_dt + res.data.data[i].create_dt[x];
        }

        if (format_dt == this.date_format) {
          this.amount_user_new = this.amount_user_new + 1;
        }
      }


      let objuser = {
        page_num: 1,
        row_num: 100000,
        user_status: 'bo',
        search: '',
        search_by:'al'
      }
      this.http.requestPost('api/get_Users_all', objuser).subscribe((res: any) => {
        this.count_user_block = res.data.data.length;
        this.total_user = this.total_user + this.count_user_block;

        for (var i = 0; i < res.data.data.length; i++) {
          var format_dt = '';
          for (var x = 0; x < 7; x++) {
            format_dt = format_dt + res.data.data[i].create_dt[x];
          }

          if (format_dt == this.date_format) {
            this.amount_user_new = this.amount_user_new + 1;
          }
        }

        this.user_active = (100 / this.total_user) * this.count_user_active;
        this.user_block = (100 / this.total_user) * this.count_user_block;

        let objrm = {
          page_num: 1,
          row_num: 100000,
          user_status: 'rm',
          search: '',
          search_by:'al'
        }
        this.http.requestPost('api/GetAll/employee', objrm).subscribe(res => {
          for (var i = 0; i < res.data.data.length; i++) {
            var format_dt = '';
            for (var x = 0; x < 7; x++) {
              format_dt = format_dt + res.data.data[i].create_dt[x];
            }

            if (format_dt == this.date_format) {
              this.amount_user_new = this.amount_user_new + 1;
            }
          }

        })

      });
    });
  }

  getStock_empty() {

    this.http.requestGet('api/GetDashboard').subscribe((res: any) => {
      console.log(res);

      this.count_stock_empty = res.data.status_ep;
      this.count_stock_busy = res.data.status_bs;
      this.count_stock_def = res.data.status_df.status_Total;
      this.total_repir = res.data.status_df.status_RP;

      this.total_stock = this.count_stock_empty + this.count_stock_busy + this.count_stock_def;


      this.per_stock_empty = (100 / this.total_stock) * this.count_stock_empty;
      this.per_stock_busy = (100 / this.total_stock) * this.count_stock_busy;
      this.per_stock_def = (100 / this.total_stock) * this.count_stock_def;

    });
  }

  checkdate(e){
    var res = e;
    for (var i = 0; i < res.data.data.length; i++) {
      var format_dt = '';
      for (var x = 0; x < 7; x++) {
        format_dt = format_dt + res.data.data[i].create_dt[x];
      }

      if (format_dt == this.date_format) {
        this.amount_item_new = this.amount_item_new + 1;
      }
    }
  }



  Get_newstock() {
    let obj = {
      page_num: '1',
      row_num: '100000',
      status: 'ep',
      search: '',
      search_by:'al'
    }
    this.http.requestPost('api/GetData_row/Stock', obj).subscribe((res) => {
      this.checkdate(res);

      let obj = {
        page_num: '1',
        row_num: '100000',
        status: 'bs',
        search: '',
        search_by:'al'
      }
      this.http.requestPost('api/GetData_row/Stock', obj).subscribe((res) => {
      this.checkdate(res);

        let obj = {
          page_num: '1',
          row_num: '100000',
          status: 'df',
          search: '',
          search_by:'al'
        }
        this.http.requestPost('api/GetData_row/Stock', obj).subscribe((res) => {
          this.checkdate(res);

          let obj = {
            page_num: '1',
            row_num: '100000',
            status: 'rm',
            search: '',
            search_by:'al'
          }
          this.http.requestPost('api/GetData_row/Stock', obj).subscribe((res) => {
            this.checkdate(res);
            console.log(this.amount_item_new);
          })
        })
      })
    })
  }

  GetType(){
    this.http.requestGet('api/GetDashboard_type').subscribe((res)=>{
      this.data_type = res.data;
      console.log(res);

    })
  }


}

