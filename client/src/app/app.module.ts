import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthgaurdGuard } from './authgaurd.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonserviceService} from './commonservice.service';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
     {path: '', redirectTo: '/login', pathMatch: 'full'},
     {path: 'login', component: LoginComponent},
     {path: 'signup', component: SignupComponent},
     {path: 'home', component: HomeComponent, canActivate:[AuthgaurdGuard]},
      {path: '**', component: PagenotfoundComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [CommonserviceService, AuthgaurdGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
