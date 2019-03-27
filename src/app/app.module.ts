import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import { AjoutModificationClientComponent } from './ajout-modification-client/ajout-modification-client.component';
import {ClientService} from './services/client.service';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';

const appRoutes: Routes = [
  { path: 'client', component: AjoutModificationClientComponent },
  { path: 'clients', component: DashboardClientComponent },
  { path: '', component: SigninComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    AjoutModificationClientComponent,
    DashboardClientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
