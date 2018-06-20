import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
form:FormGroup;
text_num_only = "^[0-9A-Za-z]{6,20}$";
  constructor(private build : FormBuilder , private http : HttpService , private router : Router) { 
    this.form = this.build.group({
      df_password : ['',[Validators.pattern(this.text_num_only)]],
      new_password : ['',[Validators.pattern(this.text_num_only)]],
      confirm_password : ['',[Validators.pattern(this.text_num_only)]],
    })
  }

  OnSave(){
    this.http.requestPut('api/put/password',{
      Old_password : this.form.controls.df_password.value,
      new_password:this.form.controls.new_password.value,
      confirm_password : this.form.controls.confirm_password.value
    }).subscribe((res)=>{
      console.log(res);
      alert('Password change "SUCCESS" !!')
      this.form.reset();
      this.router.navigate(['/home/setting/profile'])
      
    },(err)=>{
      console.log(err);
      
      alert(err.data.Message)
      
    })
  }

  ngOnInit() {
  }

}
