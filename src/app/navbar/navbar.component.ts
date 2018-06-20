import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
islogin:any;
  constructor(private router : Router) { }

  ngOnInit() {
    this.islogin = localStorage.getItem('ac_login');
  }

  OnSignout(){
    localStorage.removeItem('Authorization');
    localStorage.removeItem('User');
    localStorage.removeItem('Role_id');
    this.router.navigate(['/login']);
  }

}
