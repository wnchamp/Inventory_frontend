import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor( private router : Router ){}
gettoken:any;
token:any;
  canActivate() {
      
   
    if (localStorage.getItem('Authorization')) {
        this.router.navigate(['/home']);
        return false; 
        
    }else{
        return true;
    }

}
}
