import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./FrontOffice/login/login.component";
import {ProfilComponent} from "./FrontOffice/profil/profil.component";
import {DashboardUserComponent} from "./BackOffice/dashboard-user/dashboard-user.component";
import {AccountComponent} from "./FrontOffice/account/account.component";
// import {ProfileDetailsComponent} from "./FrontOffice/profile-details/profile-details.component";
import { NotFoundComponent } from './FrontOffice/not-found/not-found.component';
import {HomeComponent} from "./FrontOffice/home/home.component";




const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent , title:"Connexion" },
  { path: 'Signin', component: LoginComponent , title:"Signin" },

  { path: 'Profile', component: ProfilComponent , title:"Profile" },
  { path: 'Account', component: AccountComponent , title:"Account" },
  // { path: 'DetailsProfile', component: ProfileDetailsComponent , title:"Details" },
  { path: 'admin/User', component: DashboardUserComponent , title:"Users" },
  { path: 'Home', component: HomeComponent , title:"Home" },
  { path: '404', component: NotFoundComponent , title:"404" }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {


}
