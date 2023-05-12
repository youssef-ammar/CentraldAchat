import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./FrontOffice/login/login.component";
import {ProfilComponent} from "./FrontOffice/profil/profil.component";
import {DashboardUserComponent} from "./BackOffice/dashboard-user/dashboard-user.component";
import {AccountComponent} from "./FrontOffice/account/account.component";
// import {ProfileDetailsComponent} from "./FrontOffice/profile-details/profile-details.component";
import { NotFoundComponent } from './FrontOffice/not-found/not-found.component';
import {HomeComponent} from "./FrontOffice/home/home.component";
import {CreateUserComponent} from "./BackOffice/create-user/create-user.component";
import {ResetPasswordComponent} from "./FrontOffice/reset-password/reset-password.component";
import {NewPasswordComponent} from "./FrontOffice/new-password/new-password.component";
import {ReclamationComponent} from "./BackOffice/reclamation/reclamation.component";
import {ServiceApresVentComponent} from "./BackOffice/service-apres-vent/service-apres-vent.component";
import {DashboardComponent} from "./BackOffice/dashboard/dashboard.component";
import {CategoryComponent} from "./BackOffice/categories/category/category.component";
import {AddCategoryComponent} from "./BackOffice/categories/add-category/add-category.component";
import {EditCategoryComponent} from "./BackOffice/categories/edit-category/edit-category.component";
import {AddProductComponent} from "./BackOffice/add-product/add-product.component";
import {PlayProductComponent} from "./BackOffice/play-product/play-product.component";
import {UploadImageComponent} from "./BackOffice/upload-image/upload-image.component";
import {AddPromotionComponent} from "./BackOffice/add-promotion/add-promotion.component";
import {PomotionComponent} from "./BackOffice/pomotion/pomotion.component";
import {EmailSenderComponent} from "./BackOffice/email-sender/email-sender.component";




const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent , title:"Connexion" },
  { path: 'Signin', component: LoginComponent , title:"Signin" },
  { path: 'reclamation', component:ReclamationComponent},
  {path: 'Admin', component:DashboardComponent},
  {path: 'ServiceApresVent', component:ServiceApresVentComponent},
  { path: 'Profile', component: ProfilComponent , title:"Profile" },
  { path: 'Account', component: AccountComponent , title:"Account" },
  // { path: 'DetailsProfile', component: ProfileDetailsComponent , title:"Details" },
  { path: 'admin/User', component: DashboardUserComponent , title:"Users" },
  { path: 'admin/addUser', component: CreateUserComponent , title:"AddUsers" },
  { path: 'Home', component: HomeComponent , title:"Home" },
  { path: 'ResetPassword', component: ResetPasswordComponent , title:"ResetPassword" },
  { path: 'NewPassword/:token', component: NewPasswordComponent , title:"NewPassword" },
  {path: 'Categories', component: CategoryComponent},
  {path: 'AddCategory', component: AddCategoryComponent},
  {path: 'EditCategory', component: EditCategoryComponent},
  {path: 'AddProduct', component: AddProductComponent},
  {path: 'Product', component: PlayProductComponent},
  {path: 'Upload', component: UploadImageComponent},
  {path: 'AddPromotion', component:AddPromotionComponent},
  {path: 'Promotions', component: PomotionComponent},
  {path: 'Email', component: EmailSenderComponent },

  { path: '404', component: NotFoundComponent , title:"404" }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {


}
