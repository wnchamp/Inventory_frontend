// Http service [ Created by Loem 21-04-2017 ]

import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class AuthenticationService {
  private authorizationKey: string = 'Authorization';
  private authenticated: string;

  // get realtime authenticated : แสดงข้อมูล authenticated เมื่อมี event เกิดขึ้น
  public getAuthenticatedEvent: EventEmitter<string> = new EventEmitter<string>();

  // set authenticated : เซตข้อมูลใส่ authenticated
  setAuthenticated(name: string, user: any): void {
    this.authenticated = name;
    this.storage.setItem(this.authorizationKey, this.authenticated);
    this.storage.setItem('User', JSON.stringify(user));
    this.storage.setItem('Role_id', user.role_id);
    this.getAuthenticatedEvent.emit(this.authenticated);
  } 

  // remove data authenticated : นำข้อมูลออกจาก  authenticated
  destroyAuthenticated() {
    this.authenticated = null;
    this.storage.removeItem('Authorization');
    this.storage.removeItem('User');
    this.storage.removeItem('Role_id');
    this.getAuthenticatedEvent.emit(this.authenticated);
  }

  // get authenticated : แสดงข้อมูล authenticated
  get getAuthenticated(): string {
    this.authenticated = this.storage.getItem(this.authorizationKey);
    return this.authenticated;
  }

  // Convert localStorage to clien session : แปลงข้อมูล localStorage
  private get storage(): Storage {
    return localStorage;
  }

  
   

}