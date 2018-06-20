
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_spinner = false;
  submited: boolean;
  Formlogin: FormGroup;
  constructor(private build: FormBuilder, private route: Router, private http: HttpService, ) {
    this.Formlogin = this.build.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  //method perform after user click login button 
  Onlogin() {
    //check form is valid or not
    if (this.Formlogin.valid) {
      this.login_spinner = true;
      //create data login  object
      let obj = {
        password: this.Formlogin.value.password,
        username: this.Formlogin.value.username
      };
      //send login request to server
      this.http.requestPost(`api/Sing-In`, obj).subscribe((res: any) => {
        //timer 1 second for hide login spinner
        const t = Observable.timer(500).subscribe(r => {
          swal({ title: 'เข้าสู่ระบบสำเร็จ', text: 'ชื่อผู้ใช้งาน: ' + res.Users.username, timer: 2000, type: "success", showConfirmButton: false, position: 'top' });
          res.Message == "OK" ? this.login_spinner = false : this.login_spinner = true;
        });
        //timer 1 second for redirect to home path
        const t2 = Observable.timer(1000).subscribe(r => {
          this.route.navigate(['/', 'home']);
        });
        //save login data in localstorage
        localStorage.setItem('Authorization', res.data.Token);
      },
        (err) => { //handle if have an errors
          console.log(err);
          //check errors response data from api
          if (err.status == 400 && err.data.Message == "Password is incorrent") {
            const t = Observable.timer(1000);
            t.subscribe(r => {
              swal({ title: 'รหัสผ่านไม่ถูกต้อง!', type: 'error', timer: 2000, showConfirmButton: false, position: 'top' });
              this.login_spinner = false;
            });
          }
          //check errors response data from api
          if (err.status == 400 && err.data.Message == "Don't have this user. Or Username blocked.") {
            const t = Observable.timer(1000);
            t.subscribe(r => {
              swal({ title: 'ไม่มีชื่อผู้ใช้นี้ หรือ ถูกระงับการใช้งาน!', type: 'error', timer: 2000, showConfirmButton: false, position: 'top' });
              this.login_spinner = false;
            });
          }
          //check if status equal 0 meant internet connaction is lose
          if (err.status == 0) {
            const t = Observable.timer(3000);
            t.subscribe(r => {
              swal({ title: 'ไม่สามารถติดต่อกับเซิฟเวอร์ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เนต!', type: 'error', timer: 3000, showConfirmButton: false, position: 'top' });
              this.login_spinner = false;
            });
          }
        }
      );
    } else {
      this.submited = true;
    }
  }
}
