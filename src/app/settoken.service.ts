import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {  Router } from '@angular/router';

@Injectable()
export class SettokenService {
token:any;
constructor( private http : HttpService , private router : Router) {
this.getToken();
    
 }
 getToken(){
    this.http.requestGet('api/Authentication').subscribe((res:any) =>{
        this.token = res.data.Token;
      
            },(err) =>{
                console.log(err);
                localStorage.removeItem('Authorization');
                localStorage.removeItem('User');
                localStorage.removeItem('Role_id');
                
                this.router.navigate(['/login']); 
                
            })
}

}
