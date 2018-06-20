import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { SettingComponent } from './setting.component';
import { SetAccountComponent } from './set-account/set-account.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SettingProfileComponent } from './setting-profile/setting-profile.component';

const routes: Routes = [
  {
    path: '',canActivate:[AuthGuard],  component: SettingComponent,
    children:[
      { path: '', canActivate: [AuthGuard], component:  SettingProfileComponent},
      { path: 'password', canActivate: [AuthGuard], component:  SetPasswordComponent},
      { path: 'profile', canActivate: [AuthGuard], component:  SettingProfileComponent},
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
