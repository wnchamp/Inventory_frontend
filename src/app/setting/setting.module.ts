import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SetAccountComponent } from './set-account/set-account.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SettingProfileComponent } from './setting-profile/setting-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SettingComponent,
    SetAccountComponent,
    SetPasswordComponent,
    SettingProfileComponent,
]
})
export class SettingModule { }
