
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: User[];
  email!:string;
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  GetApi: string='http://127.0.0.1:8000/oauth/Users';

  apilogin: string='https://127.0.0.1:8000/oauth/signin';
  deleteapi: string='https://127.0.0.1:8000/delete';
  findUsername: string='https://127.0.0.1:8000/findByUsername';
  findUserEmail: string='http://localhost:8000/oauth/Users';
  updateUser: string='http://127.0.0.1:8000/oauth/userUpdate/';
  userbyid: string='https://127.0.0.1:8000/findById';
  ResetPass: string='https://127.0.0.1:8000';
  contacter: string="https://127.0.0.1:8000/contactuser";
  listerMess: string="https://127.0.0.1:8000/getallmessages";
  deletemess: string="https://127.0.0.1:8000/deleteMessage";
  uptImage: string='https://127.0.0.1:8000/updateImage';


  constructor(private http : HttpClient, private authService: AuthService
    ) { }
  public data: string | null = null;
  private user: any;

  listeUsers(): Observable<User[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<User[]>(this.GetApi,{headers:httpHeaders});

      }



    consulterUser(id: number): Observable<User> {
      const url = `${this.GetApi}/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<User>(url,{headers:httpHeaders});
      }


      rechercherParUsername(username: string):Observable< User[]> {
        const url = `${this.findUsername}/${username}`;
        return this.http.get<User[]>(url);
        }

getAllUsers():Observable<User[]>{
  return this.http.get<User[]>(this.GetApi);

}
        rechercherParEmail(email: string):Observable< User[]> {
          const url = `  ${this.findUserEmail}/${email}`;
          return this.http.get<User[]>(url);
          }

          Update( updatedUser: User): Observable<any> {
            return this.http.put(`${this.updateUser}`, updatedUser);
          }



          consulterUserById(id: number): Observable<User> {
            const url = `${this.userbyid}/${id}`;
            return this.http.get<User>(url);
          }



          PasswordReset(email: string): Observable<any> {
            const url = `${this.ResetPass}/reset-password`;
            const data = { email };
            return this.http.post(url, data);
          }










      supprimerMessage(id: number): Observable<any> {
        const url = `https://127.0.0.1:8000/deleteMessage/${id}`;
        return this.http.delete<any>(url);
      }







      updateUserRole(id: number) {
        const url = `https://127.0.0.1:8000/updateRole/${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(url, { headers });
      }

      removeRoleAdmin(id: number) {
        const url = `https://127.0.0.1:8000/removeRole/${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(url, { headers });
      }




      UpdateImage(email: string, imageData: FormData): Observable<any> {
        return this.http.post(`${this.uptImage}/${email}`, imageData);
      }





      checkPassword(email: string, password: string): Observable<boolean> {
        const data = { password };
        const url = `https://127.0.0.1:8000/checkpassword/${email}`;
        return this.http.post(url, data).pipe(
          map((response:any) => {
            if (response && response.status) {
              return true;
            } else {
              return false;
            }
          })
        );
      }







      }

