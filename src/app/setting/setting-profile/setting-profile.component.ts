import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css']
})
export class SettingProfileComponent implements OnInit {
  user_id:any;
  data_user:any;
  constructor(private http :HttpService) {
    
    var user = JSON.parse(localStorage.getItem('User'));
    this.user_id = user.user_id;
    console.log(this.user_id);
    this.getUser();

    
    
   }
   getUser(){
    this.http.requestGet('api/get/byID?id='+this.user_id).subscribe((res)=>{
      console.log(res);
      this.data_user = res.data;
    })
  }

  ngOnInit() {
  }

}
