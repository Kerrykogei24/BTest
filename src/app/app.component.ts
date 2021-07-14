import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'busara';

  formData = {
    username: 'kerry',
    email: 'kerrykomar@gmail.com',
    password: 'dellakomar24'
  }
  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.apiService.getUsers().subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

}
