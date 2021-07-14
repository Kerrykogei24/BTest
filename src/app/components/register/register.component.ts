import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData: Iuser = {
    username: null,
    email: null,
    password1: null,
    password2: null,
    first_name: null,
    phone_number:null,
    location:null,
    authToken:null,
    results: null,
  }

  passwordInputType: boolean = true;
  errorMessage: string;
  successMsg: string;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  togglePasswordInpType(): void {
    this.passwordInputType = !this.passwordInputType;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      //submit data
      this.createUser(form)
    }
  }

  /**
   * submits data to the server through api service
   * @param userData user obj
   */
  createUser(form: NgForm): void {
    this.apiService.createUser(form.value).subscribe(response => {
      //clear form
      form.resetForm();
      this.successMsg = 'Registration completed, Redirecting...'
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1000);

    }, e => {
      this.errorMessage = e.error.detail || 'An error occured please try again';
      this.errorMessage = null;
    })
  }
}
