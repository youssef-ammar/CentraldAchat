import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './FrontOffice/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider} from '@abacritt/angularx-social-login';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilComponent } from './FrontOffice/profil/profil.component';
import { DashboardUserComponent } from './BackOffice/dashboard-user/dashboard-user.component';
import { AccountComponent } from './FrontOffice/account/account.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { NotFoundComponent } from './FrontOffice/not-found/not-found.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './BackOffice/footer/footer.component';
import { HeaderComponent } from './BackOffice/header/header.component';
import { CreateUserComponent } from './BackOffice/create-user/create-user.component';
import { ResetPasswordComponent } from './FrontOffice/reset-password/reset-password.component';
import { NewPasswordComponent } from './FrontOffice/new-password/new-password.component';


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
     ProfilComponent,
     DashboardUserComponent,
     AccountComponent,
     HomeComponent,
     NotFoundComponent,
     FooterComponent,
     HeaderComponent,
     CreateUserComponent,
     ResetPasswordComponent,
     NewPasswordComponent,



  ],
  exports:[
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    SocialLoginModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '194123244591-5tohsblsdtojjkm0odjuij89gk74upfm.apps.googleusercontent.com'
            )
          },

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },

  ],



  bootstrap: [AppComponent],
})
export class AppModule {}
