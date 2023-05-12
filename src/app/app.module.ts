import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './FrontOffice/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider} from '@abacritt/angularx-social-login';
// import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import {ReclamationComponent} from "./BackOffice/reclamation/reclamation.component";
import {ServiceApresVentComponent} from "./BackOffice/service-apres-vent/service-apres-vent.component";
import {SidebarComponent} from "./BackOffice/sidebar/sidebar.component";
import {DashboardComponent} from "./BackOffice/dashboard/dashboard.component";
import {AddProductComponent} from "./BackOffice/add-product/add-product.component";
import {UploadImageComponent} from "./BackOffice/upload-image/upload-image.component";
import {AddCategoryComponent} from "./BackOffice/categories/add-category/add-category.component";
import {PlayProductComponent} from "./BackOffice/play-product/play-product.component";
import {EditCategoryComponent} from "./BackOffice/categories/edit-category/edit-category.component";
import {CategoryComponent} from "./BackOffice/categories/category/category.component";
import {AddPromotionComponent} from "./BackOffice/add-promotion/add-promotion.component";
import {PomotionComponent} from "./BackOffice/pomotion/pomotion.component";
import {EmailSenderComponent} from "./BackOffice/email-sender/email-sender.component";


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    SidebarComponent,
    ReclamationComponent,
    ServiceApresVentComponent,
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
    DashboardComponent,
    UploadImageComponent,
    AddCategoryComponent,
    PlayProductComponent,
    EditCategoryComponent,
    CategoryComponent,
    AddPromotionComponent,
    PomotionComponent,
    EmailSenderComponent,
  ],
  exports:[
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    // NgbModule,
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
