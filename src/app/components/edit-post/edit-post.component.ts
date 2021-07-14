import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ipost } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  formData: Ipost
  successMsg: string;
  errorMsg: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    let id: number = this.route.snapshot.params.id;
    this.getPost(+id);
  }

  //get post
  getPost(id: number) {
    this.apiService.getOnePost(id).subscribe(response => {
      this.formData = response;
      console.log(response);
    }, error => {
      console.log(error)
    })
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      //update
      this.apiService.updatePost(this.formData.id, this.formData).subscribe(response => {
        this.successMsg = 'Your post was updated and published successfully';
        this.errorMsg = null;
      }, error => {
        this.errorMsg = error.statusText;
        this.successMsg = null;
      })
    }
  }

}
