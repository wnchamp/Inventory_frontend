import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-set-account',
  templateUrl: './set-account.component.html',
  styleUrls: ['./set-account.component.css']
})
export class SetAccountComponent implements OnInit {
  form : FormGroup;
  text_en_only = "^[a-zA-Z]{4,20}$";
  constructor(private build : FormBuilder , private http : HttpService , private router : Router) { 
    this.form = this.build.group({
      account :['',[Validators.pattern(this.text_en_only)]],
      re_account :['',[Validators.pattern(this.text_en_only)]],
    })
  }

  OnSave(){
    if(this.form.value.account == this.form.value.re_account){
      this.http.requestPut('api/put/username',{username:this.form.controls.account.value}).subscribe((res)=>{
        console.log(res);
        this.form.reset();
        alert('User change "Success' !!)
       this.router.navigate(['/home/setting/profile']);
      })
    }else{
      alert('username does not match')
    }
   
  }

  ngOnInit() {
  }

}
