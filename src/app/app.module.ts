import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { SettokenService } from './settoken.service';
import { LoginGuard } from './login.guard';
import { MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    LoginComponent,
  ],
  providers: [
    HttpService, AuthenticationService, AuthGuard, SettokenService, LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
