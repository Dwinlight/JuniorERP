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
import { SingleClientComponent } from './dashboard-client/single-client/single-client.component';
import { DashboardColisComponent } from './dashboard-colis/dashboard-colis.component';
import {AjoutModificationColisComponent} from './ajout-modification-colis/ajout-modification-colis.component';
import {ColisService} from './services/colis.service';
import { SingleColisComponent } from './dashboard-colis/single-colis/single-colis.component';
import {AuthGuard} from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'client', canActivate: [AuthGuard], component: AjoutModificationClientComponent },
  { path: 'clients', canActivate: [AuthGuard], component: DashboardClientComponent },
  { path: 'colis', canActivate: [AuthGuard], component: DashboardColisComponent },
  { path: '', component: SigninComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    AjoutModificationClientComponent,
    AjoutModificationColisComponent,
    DashboardClientComponent,
    DashboardColisComponent,
    SingleClientComponent,
    SingleColisComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthService, ClientService, ColisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
