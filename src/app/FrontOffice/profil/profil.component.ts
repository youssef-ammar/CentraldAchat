import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import jwt_decode from 'jwt-decode';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user!: User;
  users!: User[];

  public data: string | null = null;
  firstName!: string;
  lastName!: string;
  firstNameN!: string;
  lastNameN!: string;
  mobileN!: string;
  password!: string;
  PasswordActuelle!: string;
  email: any;
  id!: number;
  mobile!: string;
  curentUser: any;
  token!: any;
  userData: any;
  newData: any;
  updateSuccess: boolean = false;
  confirmPassword!: string;
  not: boolean = false;
  userImage!: string;
  errorMessage!: string;
  message: string = '';

  passwordMatch!: boolean;
  passwordFieldsModified = false;
  errorMessagepw!: string;
  errorMobile: string = '';
  roles = ['CUSTOMER', 'OPERATOR', 'SUPPLIER'];
  selectedRole!: string;
  role!: string;


  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog,private router: Router) {
  }

  ngOnInit(): void {

    this.token = window.localStorage.getItem('currentUser')

    this.curentUser = jwt_decode(this.token);
    this.email = this.curentUser.sub;
    this.findUserByEmail()


    // this.findUserByEmail();

  }

  getDecodedAccessToken(token: string): any {
    try {
      this.curentUser = jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  goToRouteH(){
    this.router.navigate(['/Home']);

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

  updateUserData(templateRef: TemplateRef<any>) {
    if (this.mobile.length != 8) {
      this.message = 'the length of the phone number must be 8';


      this.dialog.open(templateRef);
      setTimeout(() => {
        this.dialog.closeAll();

      }, 2000); // Delay for hiding the alert
      return;
    }
    if (!/^[0-9]*$/.test(this.mobile)) {
      this.message = 'The telephone number must contain only digits';


      this.dialog.open(templateRef);
      setTimeout(() => {
        this.dialog.closeAll();

      }, 2000); // Delay for hiding the alert
      return;

    }


    const userToUpdate = new User();
    userToUpdate.id = this.id;

    userToUpdate.firstName = this.firstName;
    userToUpdate.email = this.email;
    userToUpdate.role =this.selectedRole;
    console.log( userToUpdate.role)
      userToUpdate.lastName = this.lastName;// set the new username
    userToUpdate.password = this.password; // set the new password
    userToUpdate.mobile = this.mobile; // set the new mobile number

    this.userService.Update(userToUpdate).subscribe(
      updatedUser => {
        if (updatedUser) {
          this.message = 'Successfully updated';

          this.dialog.open(templateRef);
          setTimeout(() => {
            this.dialog.closeAll();

          }, 2000); // Delay for hiding the alert
          return;
        }

      },
      error => {
        console.log(error);
        this.message = error.error.message; // get the error message from the response
        this.dialog.open(templateRef);
        setTimeout(() => {
          this.dialog.closeAll();

        }, 2500); // Delay for hiding the alert
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }


}





