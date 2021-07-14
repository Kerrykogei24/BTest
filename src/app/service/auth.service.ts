import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApi: string = environment.apiAuth;
  private clientId: string = environment.client_id;
  private secretCode: string = environment.secret_id;
  constructor(private http: HttpClient) { }

  /**
   * creates an auth token on login
   * @param loginParams username and password
   * @returns auth token
   */

  loginUser(loginParams: any): Observable<any> {
    let form = new FormData()
    form.append("grant_type", "password");
    form.append("client_id", "zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu");
    form.append("client_secret", "Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R");
    form.append('username', loginParams.username);
    form.append('password', loginParams.password);

    return this.http.post(this.authApi, form)
  }

  saveUserToLocalStorage(user: any) {
    localStorage.setItem('axuserIxaver', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('axuserIxaver'));
  }

  //logout user
  logoutUser() {
    localStorage.clear();
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.getCurrentUser().authToken) {
        resolve(this.getCurrentUser())
      } else {
        reject(null)
      }
    })
  }


}
