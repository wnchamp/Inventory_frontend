import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';

declare let $;
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  myControl: FormControl = new FormControl();

  filteredOptions: Observable<any[]>;

  textid: any;
  textstr: any;

  typeData = [];

  status_bs: any;
  status_dfall: any;
  status_ep: any;

  oclock: any;

  date: any;
  time: any;

  inpu;

  constructor(private http: HttpService) {
    let obj = {
      page_num: 1,
      row_num: 500,
      sta_id: 'ac',
      search: '',
      search_by: 'al'
    }
    http.requestPost('api/GET_Tpye', obj).subscribe(res => {
      this.typeData = res.data.data;
      // console.log(this.typeData);
    });
    http.requestGet('api/GetDashboard').subscribe(res => {
      this.status_bs = res.data.status_bs;
      this.status_dfall = res.data.status_df.status_Total;
      this.status_ep = res.data.status_ep;
      // console.log(res.data);
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith<any>(''),
      map(val => this.filter(val))
    );
  }

  filter(val) {
    let data = this.typeData.filter(option => option.type_name.includes(val));
    if (data.length > 0) {
      console.log(data);
      this.textid = data[0].type_id;
      this.textstr = data[0].type_name;
    } else {
      this.textid = '';
      this.textstr = '';
    };
    return data;
  }

  Time() {
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;

    var d = new Date();
    console.log(d);

    this.oclock = d.getTime();
    console.log(parseFloat(this.oclock));

  }

  onClick() {
    var ctx = ('myChart');
    var chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
          ],
        }, {
          label: '9 of Votes',
          data: [3, 15, 9, 8, 5, 19],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
        }]
        // labels: ["stock ep", "stock bs", "status df all"],
        // datasets: [
        //   {
        //     data: [this.status_ep, this.status_bs, this.status_dfall],
        //     backgroundColor: ['#1de9b6', '#ffff00', '#ff1744'],
        //     borderColor: ['#ffffff'],
        //   },
        // ]
      },
      options: {
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   }]
        // }
        // legend: {
        //   display: false
        // },
        // scales: {
        //   xAxes: [{
        //     display: true,
        //     stacked: true
        //   }],
        //   yAxes: [{
        //     display: true,
        //     stacked: true
        //   }],
        // }
      }
    });
  }

  onnewChart() {
    let stockData = [];

    let objep = {
      page_num: 1,
      row_num: 500,
      status: "ep",
      search: "",
      search_by: "al"
    }
    this.http.requestPost('api/GetData_row/Stock', objep).subscribe(res_ep => {
      stockData = res_ep.data.data;
      let objbs = {
        page_num: 1,
        row_num: 500,
        status: "bs",
        search: "",
        search_by: "al"
      }
      this.http.requestPost('api/GetData_row/Stock', objbs).subscribe(res_bs => {
        for (var i = 0; i < res_bs.data.data.length; i++) {
          stockData.push(res_bs.data.data[i])
        }
        let objdf = {
          page_num: 1,
          row_num: 500,
          status: "df",
          search: "",
          search_by: "al"
        }
        this.http.requestPost('api/GetData_row/Stock', objdf).subscribe(res_df => {
          for (var i = 0; i < res_bs.data.data.length; i++) {
            stockData.push(res_bs.data.data[i])
          }
          // console.log(stockData);
          this.getDate(stockData);
        })
      })
    })
  }

  getDate(data) {
    let date;
    let May = 0;
    let June = 0;
    for (var i = 0; i < data.length; i++) {
      date = '';
      for (var x = 0; x < 7; x++) {
        date += data[i].create_dt[x];
      }
      if (date == '2018-05') {
        May += 1;
      }
      if (date == '2018-06') {
        June += 1;
      }
    }
    console.log(May);
    console.log(June);

    var ctx = ('newChart');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["May", "June", "July", "August", "September"],
        datasets: [
          {
            label: 'Stock',
            data: [May, June, 15, 6, 8, 6],
            backgroundColor: 'rgb(0,0,0,0)',
            borderColor: 'rgb(255, 30, 30)',
          },
          {
            label: 'User',
            data: [9, 3, 9, 15, 5, 10],
            backgroundColor: 'rgb(255,0,255,0)',
            borderColor: 'rgb(30, 255, 30)'
          }
        ]
      },
      options: {
        legend: {
          // display: false
        },
        scales: {
          xAxes: [{
            display: true,
            // stacked: true
          }],
          yAxes: [{
            display: true,
            stacked: true
          }],
        },
        elements: {
          line: {
            tension: 0,
          }
        }
      }
    });
  }

}