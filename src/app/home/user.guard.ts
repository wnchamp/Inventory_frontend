import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class UserGuard implements CanActivate {

  constructor( private router : Router){}
statusdata:any;
status:any;
  canActivate() {
     this.statusdata =  JSON.parse(localStorage.getItem('User'));
    this.status = this.statusdata.role_name  ;

    if (this.status == "Users") {

        return true; 
    }
    this.router.navigate(['/home/dashboard']);
    return false;
}
}
