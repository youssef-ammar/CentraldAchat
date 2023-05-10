import { Component } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent {
  user!: User;
  users!: User[];

  public data: string | null = null;
  firstName!: string;
  lastName!: string;

  password!:string;
  PasswordActuelle!:string;
  email:any;
  id!: number;
  mobile!:string;
  curentUser:any;
  token!:any;
  userData: any;
  newData: any;
  updateSuccess: boolean = false;
  confirmPassword!: string;
  not: boolean = false;
  userImage!: string;
  errorMessage!: string;
  passwordMatch!: boolean;
  passwordFieldsModified = false;
  errorMessagepw!: string;



  constructor(private userService: UserService , private authService: AuthService) { }

  ngOnInit(): void {

    this.email =window.localStorage.getItem('currentUser')

    this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
      });

console.log(this.users);

  }


deleteUser(user: User){
    this.authService.supprimerUser(user.id) .subscribe(() => {
      location.reload();
    });

}
  // addUser(){
    // this.authService.ajouterUser()

  // }
}
