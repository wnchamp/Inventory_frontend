import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ac_login :any;
  isadminlogin:boolean=false;
  issuperadminlogin:boolean=false;
  isuserlogin:boolean=false;
    constructor() { }
  
    ngOnInit() {
      this.ac_login = JSON.parse(localStorage.getItem('User'));
      
      
      if(this.ac_login.role_name == "Super Admin"){
        this.issuperadminlogin = true;
      }else{
        if (this.ac_login.role_name == "Admin") {
          this.isadminlogin = true;
        } else {
          this.isuserlogin = true ; 
        }
      }
    }
  
  }
