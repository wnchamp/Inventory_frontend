import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
    {
        path: 'login',canActivate:[LoginGuard],  component: LoginComponent
    },
    {
        path: 'home',canActivate:[AuthGuard], loadChildren:'app/home/home.module#HomeModule',
     
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
}
)

export class AppRoutingModule { } 