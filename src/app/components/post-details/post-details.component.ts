import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost, Iuser } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Ipost;
  errorMsg: any;
  successMsg: boolean;
 

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private authService:AuthService) { }

  ngOnInit() {
    let id: number = this.route.snapshot.params.id;
    this.getPost(+id);
  }

  //get post
  getPost(id: number) {
    this.apiService.getOnePost(id).subscribe(response => {
      this.post = response;
    }, error => {
      console.log(error)
    })
  }


  deletePost(id: number): void {
    let ok = confirm('Are sure, this action is irreversable');
    if (!ok) { return; }

    this.apiService.deletePost(id).subscribe(response => {
      this.successMsg = true;
      this.errorMsg = null;
      setTimeout(_ => {
        this.router.navigate(['/'])
      }, 1000)
    }, error => {
      this.errorMsg = error.statusText;
      this.successMsg = false;
    })

  }




}
