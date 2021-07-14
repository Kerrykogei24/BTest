import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ipost } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  formData: Ipost = {
    title: null,
    description: null,
    content: null,
  }
  // survs: any[];

  errorMsg: any;
  successMsg: string;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.getSurv()
  }


  // submit form data
  onSubmit(form: NgForm): void {
    if (form.valid) {
      //continue
      this.createPost(form)
    }
  }

  createPost(form: NgForm) {
    this.apiService.createPost(form.value).subscribe(response => {
      //created successfully
      console.log(response);
      this.successMsg = 'Post Published successfully'
      form.resetForm();
      this.errorMsg = null;
    }, error => {
      this.errorMsg = error.statusText;
      this.successMsg = null
    })
  }
  //   getSurv(): void {
  //   this.apiService.getSurveys().subscribe(response => {
  //     this.survs = response;
  //     console.log(response);
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  generateTitleLorem(): void {
    let titleLorem = 'Amet consectetur adipisicing';
    this.formData.title = titleLorem;
  }


  generateContentLorem(): void {
    let contentLorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Officiis sint recusandae debitis? Expedita earum sequi aliquam quas voluptas quos dolor praesentium id, 
    consequatur adipisci quae perspiciatis exercitationem debitis nostrum iste.

    Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Tempore nobis temporibus molestias incidunt esse nesciunt quae? Nihil, mollitia porro autem maiores dolorum quo reiciendis facere ipsa et soluta optio ut!

    `

    this.formData.content = contentLorem;
  }

  generateDescLorem(): void {
    let descriptionLorem = 'Et, modi voluptate reprehenderit rem iure praesentium nulla ad soluta';
    this.formData.description = descriptionLorem;
  }


}
