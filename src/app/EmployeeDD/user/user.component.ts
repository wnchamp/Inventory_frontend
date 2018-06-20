import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettokenService } from '../../settoken.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  data_user = [];
  data_page: any;
  setPage: any;
  countPage = [];
  navPage = [];
  initnum = 0;
  itemperPage = 0;
  checkdisBut = 0;
  modalEditState;
  modalEditPassState;
  userID: any;
  userData: any;
  roleData: any;
  ModalDetailsStatus: boolean = false;
  ModalBlockStatus: boolean = false;
  ModalUnblockStatus: boolean = false;
  username: any;
  fname: any;
  displayedColumns = ['fullname_th', 'fullname_en', 'username', 'role_name', 'status_name', 'action'];
  dataSource;
  Element: Element[];
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  regex_search = '^[0-9a-zA-Zก-์ ]*[0-9a-zA-Zก-์] *$';

  constructor(private http: HttpService, private fb: FormBuilder, private setToken: SettokenService) {
    this.form = this.fb.group({
      numpage: ['1'],
      rownumber: ['20'],
      userStat: ['al'],
      search: ['', Validators.pattern(this.regex_search)],
      search_by: ['al']
    });
  }

  ngOnInit() {
    this.getUser();
    this.getRole();
  }

  getRole() {
    this.http.requestGet('/api/get-role').subscribe(res => {
      this.roleData = res;
    });
  }

  getUser() {
    this.setPage = this.form.controls.numpage.value;
    this.dataUser();
  }
  selectPage(e) {
    this.setPage = e;
    this.dataUser();
  }
  dataUser() {
    let obj = {
      page_num: this.setPage,
      row_num: this.form.controls.rownumber.value,
      user_status: this.form.controls.userStat.value,
      search: this.form.controls.search.value,
      search_by: this.form.controls.search_by.value
    }
    this.http.requestPost('api/get_Users_all/', obj).subscribe(res => {
      this.data_user = res.data.data;
      this.Element = res.data.data;
      console.log(this.data_user);
      this.dataSource = new MatTableDataSource(this.Element);
      this.dataSource.sort = this.sort;
      this.data_page = res.data.page;
      this.setToken.getToken();

      this.navPage = [];
      this.checkdisBut = 0;
      this.itemperPage = 10;
      let arrP = [];
      for (var i = 0; i < Math.ceil(this.data_page / this.itemperPage); i++) {
        let ini = 0;
        for (var x = (i * this.itemperPage) + 1; x <= this.itemperPage * (i + 1); x++) {
          if (x <= this.data_page) {
            arrP[ini] = x;
            this.checkdisBut += 1;
            ini++;
          }
        }
        this.navPage[i] = arrP;
        arrP = [];
      }

      if (this.initnum > this.navPage.length - 1) {
        this.initnum = 0;
      }
      this.countPage = this.navPage[this.initnum];

      if (this.setPage > this.data_page) {
        this.setPage = this.data_page;
      }
    })
  }
  nextPage() {
    let num = parseInt(this.setPage) + 1;
    if (num > this.countPage[this.itemperPage - 1]) {
      this.nexttabPage();
    }
    this.selectPage(num);
  }
  previousPage() {
    let num = parseInt(this.setPage) - 1;
    if (num < this.countPage[this.itemperPage - 10]) {
      this.previoustabPage();
    }
    this.selectPage(num);
  }
  nexttabPage() {
    this.initnum += 1;
    if (this.initnum > this.navPage.length - 1) {
      this.initnum = this.navPage.length - 1;
    }
    this.countPage = this.navPage[this.initnum];
  }
  previoustabPage() {
    this.initnum -= 1;
    if (this.initnum < 0) {
      this.initnum = 0;
    }
    this.countPage = this.navPage[this.initnum];
  }

  openModalEdit(userID: any, datas: any) {
    this.modalEditState = true;
    this.userID = userID;
    this.userData = datas;
  }
  openModalEditPass(userID: any, datas: any) {
    this.userID = userID;
    this.modalEditPassState = true;
  }
  openBlock(id, username, fname) {
    this.ModalBlockStatus = true;
    this.userID = id;
    this.username = username;
    this.fname = fname;
  }

  openModalDetails(username) {
    this.ModalDetailsStatus = true;
    this.username = username;
  }

  openUnBlock(id, username, fname) {
    this.ModalUnblockStatus = true;
    this.userID = id;
    this.username = username;
    this.fname = fname;
  }
  Close(e) {
    this.modalEditState = e;
    this.modalEditPassState = e;
    this.ModalBlockStatus = e;
    this.ModalBlockStatus = e;
    this.ModalDetailsStatus = e;
    this.ModalUnblockStatus = e;
    this.dataUser();
  }
  checkEmpty() {
    if (this.form.controls.search.value === '') {
      this.getUser();
    }
  }

  checkErrors() {
    if (!this.form.controls.search.errors) this.getUser();
  }

}

export interface Element {
  username: string;
  fullname_th: string;
  fullname_en: string;
  role_name: string;
  status_name: string;
}
