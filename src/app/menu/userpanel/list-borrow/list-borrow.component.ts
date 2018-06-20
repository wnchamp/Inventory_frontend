import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-borrow',
  templateUrl: './list-borrow.component.html',
  styleUrls: ['./list-borrow.component.css']
})
export class ListBorrowComponent implements OnInit {
data_borrow:any;
form:FormGroup;
total_page:any;
page:any;
page_select = 1;
  constructor(private http : HttpService , private  bulid : FormBuilder ) {
    this.form = bulid.group({
      row:['5'],
      search:['']
    })

    this.getBorrow();
   }

  ngOnInit() {
  }

  selectpage(event){
    this.page_select = event
    this.getBorrow();
  }
  selectrow(){
    this.page_select = 1;
    this.getBorrow();
  }


  getBorrow(){
     let obj = {
      page_num:this.page_select,
      row_num:this.form.controls.row.value,
      search:this.form.controls.search.value,
      search_by:''
     }
    this.http.requestPost('api/Search/GetBorrow_users', obj).subscribe((res)=>{
      console.log(res);
      this.data_borrow = res.data.data;
      this.total_page = res.data.page;


  this.page = [];
      for(var i = 1 ; i <= this.total_page ; i++){
        this.page.push(i);
        console.log(this.page);
        
      }

    })
  }


}
