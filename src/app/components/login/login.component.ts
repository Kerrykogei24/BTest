import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginuser } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: any = {
    'username': 'kerrykomar@gmail.com',
    'password': 'dellakomar24',
  }
  passwordInputType: boolean = true;
  errorMessage: string;
  successMsg: string;
  redirectTo: any;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCurrentUser();
    this.redirectTo = this.route.snapshot.queryParams["redirectTo"] || "/";
  }


  togglePasswordInpType(): void {
    this.passwordInputType = !this.passwordInputType;
  }


  loginUser(form: NgForm) {
    this.authService.loginUser(this.formData).subscribe({
      next: res => {
        form.value.authToken = res.access_token;
        delete form.value.password;
        this.authService.saveUserToLocalStorage(form.value);
        this.successMsg = 'Login successful, redirecting...';
        this.errorMessage = null;
        setTimeout(_ => {
          if (this.redirectTo) {
            this.router.navigateByUrl(this.redirectTo);
          } else {
            this.router.navigate(['/'])
          }
        }, 500)
      }, error: e => {
        this.errorMessage = e.error.non_field_errors[0];
        console.log(e);
      }
    })
  }


  getCurrentUser() {
    let currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['/'])
    }
  }



}
