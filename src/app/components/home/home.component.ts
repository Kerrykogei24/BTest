import { Iuser } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[];
  paginator: any[] = [];
  topPost: void;
  survs: any[];
  currentUser;
 

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.getSurv()
    this. getUser()
 
  }


  getPosts(pageInd: number): void {
    this.apiService.getPosts(pageInd).subscribe(response => {
      this.posts = response.results;
      this.topPost = this.posts.sort((a, b) => b.view - a.views)[0]
      this.createPaginator(response.count)
    }, error => {
      console.log(error);
    })
  }

  getSurv(): void {
    this.apiService.getSurveys().subscribe(response => {
      this.survs = response;
      console.log(response);
    }, error => {
      console.log(error);
    })
  }


  createPaginator(length: number) {
    let paginator = [];
    length = Math.ceil(length / 10);
    for (let i = 0; i < length; i++) {
      paginator.push(i + 1);
    }
    this.paginator = paginator;
  }

  getData(pageInd: number) {
    this.getPosts(pageInd)
  }

  getUser() {
    this.apiService.getcurrentUser().subscribe(response => {
      this.currentUser = response;
      console.log(response);
    }, error => {
      console.log(error)
    })
  }




}
