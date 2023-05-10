import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = new User();
  user = new User();
  users!: User[];
  erreur = 0;

  email!: string;
  added: boolean = false;
  vide: boolean = false;
  errorMessage: string = '';
  errorMobile: string = '';
  errorEmail: string = '';
  confirmPassword!: string;
  not: boolean = false;
  password!: string;
  username = '';
  emailT: boolean = false;
  err: boolean = false;
  message: string = '';

  @ViewChild('secondDialog', {static: true}) secondDialog!: TemplateRef<any>;

  constructor(private authService: AuthService, private router: Router,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.translationL();

  }


  openDialogWithoutRef() {
    this.dialog.open(this.secondDialog);
  }

  onSubmit(templateRef: TemplateRef<any>) {

    this.authService.login(this.email, this.password).subscribe((data) => {
      console.log(data.status)
      console.log(data)
      if(data.message=="NOT FOUND"){
        this.message = 'There is no account with this email';

        this.dialog.open(templateRef);
        setTimeout(() => {
          this.dialog.closeAll();

        }, 2000); // Delay for hiding the alert
        return;

      }
      else if(data.message=="BAD_REQUEST"){
        this.message = 'Wrong password';

        this.dialog.open(templateRef);
        setTimeout(() => {
          this.dialog.closeAll();

        }, 2000); // Delay for hiding the alert
        return;

      }
      this.message = 'Welcome again';

      this.dialog.open(templateRef);
      setTimeout(() => {
        this.dialog.closeAll();

      }, 2000); // De
      this.router.navigate(['/Profile']);
    });

  }


  // onLoggedin(): void {
  //   const body = new URLSearchParams();
  //   body.set('grant_type', 'password');
  //   body.set('email', this.email);
  //   body.set('password', this.password);
  //
  //   const headers = {
  //     'Authorization': 'Basic ' + btoa('clientId:clientSecret'),
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   };
  //
  //   this.http.post<any>('http://localhost:8000/oauth/signin', body.toString(), {headers: headers})
  //     .subscribe(
  //       data => {
  //         localStorage.setItem('access_token', data.access_token);
  //
  //         // Redirect the user to the protected route
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }


  userCreate(templateRef: TemplateRef<any>) {
    if (!this.newUser.email || !this.newUser.firstName || !this.newUser.lastName || !this.newUser.password || !this.newUser.mobile) {
      this.message = 'Please fill in all required fields.';

      this.dialog.open(templateRef);
      setTimeout(() => {
        this.dialog.closeAll();

      }, 2000); // Delay for hiding the alert
      return;
    }
    if (this.newUser.password !== this.confirmPassword) {
      this.message = 'retype Password ';

      this.dialog.open(templateRef);

      setTimeout(() => {
        this.dialog.closeAll();
      }, 2000);
      return;
    }

    if (!this.newUser.email.includes('@') || !this.newUser.email.includes('.')) {
      this.message = 'email non valide';


      this.dialog.open(templateRef);
      setTimeout(() => {
        this.dialog.closeAll();
      }, 2000); // hide error message after 3 seconds
      return;
    }


    if (this.newUser.password.length < 8) {
      this.message = '8 caractères requis pour le mot de passe.';
      this.dialog.open(templateRef);
      setTimeout(() => {
        this.dialog.closeAll();
      }, 2000); // hide error message after 3 seconds
      return;
    }


    this.authService.ajouterUser(this.newUser).subscribe((response) => {


        if (response.email == this.newUser.email) {
          this.added = true;


          this.message = "Mail verification Sent"
          this.dialog.open(templateRef);
          this.router.navigate(['/Signin']);
        } else if (response.message == "FOUND") {
          this.message = "User already exists"
          this.dialog.open(templateRef);
          setTimeout(() => {
            this.dialog.closeAll();
          }, 2000);
        }
      },

      error => {
        console.log(error);
      }
    );


  }

  translationL() {


    const signUpButton = document.getElementById('signUp') as HTMLElement;
    const signInButton = document.getElementById('signIn') as HTMLElement;
    const container = document.getElementById('container') as HTMLElement;


    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

  }

  goToRoute() {
    this.router.navigate(['/Profile']);
  }
}




