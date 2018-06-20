import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private router : Router , private http : HttpService){}
gettoken:any;
token:any;
  canActivate() {
      
    this.http.requestGet('api/Authentication').subscribe((res:any) =>{
        this.token = res.data.Token;
      
            },(err) =>{
                console.log(err);
                localStorage.removeItem('Authorization');
                localStorage.removeItem('User');
                localStorage.removeItem('Role_id');
                
                this.router.navigate(['/login']); 
                
            })
    
    if (localStorage.getItem('Authorization')) {
        return true;
    }else{
        
        this.router.navigate(['/login']);
        return false;
    }

}
}
