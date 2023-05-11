import { Component } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
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
  role!: string;
  create_at!: string;

  constructor(private userService: UserService , private authService: AuthService) { }

  ngOnInit(): void {

    this.token =window.localStorage.getItem('currentUser')


    this.curentUser = jwt_decode(this.token);
    this.email = this.curentUser.sub;
    this.findUserByEmail()
    this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        console.log(this.users);
      });



  }
  findUserByEmail() {
    this.userService.rechercherParEmail(this.email).subscribe(us => {
      if (us) {
        this.userData = us;
        this.id = this.userData.id;
        this.firstName = this.userData.firstName;
        this.lastName = this.userData.lastName;
        this.mobile = this.userData.mobile;
        this.role=this.userData.role;


      }

    });
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
