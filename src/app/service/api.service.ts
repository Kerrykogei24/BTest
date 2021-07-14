import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Ipost, Iresult } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;
  private postUrl: string = environment.postUrl;
  private survUrl: string = environment.suervey;
  private usersUrl: string = environment.userUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return <any>this.http.get(this.apiUrl).pipe(
      map((response) => <Response>response)
    )
  }


  getSurveys(): Observable<any[]> {
    return <any>this.http.get(this.survUrl).pipe(
      map((response) => <Response>response)
    )
  }


  createUser(data: any): Observable<any> {
    return <any>this.http.post(this.apiUrl, data).pipe(
      map(r => r),
    )
  }

  //get Posts
  getPosts(page?: number): Observable<Iresult> {
    return <any>this.http.get(this.postUrl + `?page=${page}`).pipe(
      map(response => <Response>response)
    )
  }


  createPost(data:any): Observable<any> { 
    return <any>this.http.post(this.postUrl, data).pipe(
      map(r =>r ),
     
    )
  }

  /**
   * Retrieves a single post
   * @param id post id
   * @returns single post
   */
  getOnePost(id: number): Observable<Ipost> {
    return <any>this.http.get(this.postUrl + id).pipe(
      map(response => <Ipost>response)
    )
  }

  /**
   * updates a single post
   * @param id post id(number)
   * @param data post data
   * @returns upddated record
   */
  updatePost(id: number, data: Ipost): Observable<Ipost> {
    return <any>this.http.put(this.postUrl + id + '/', data).pipe(
      map(response => <Ipost>response)
    )
  }

  /**
   * removes a post from the server
   * @param id post id
   * @returns removed post
   */
  deletePost(id: number): Observable<Ipost> {
    return <any>this.http.delete(this.postUrl + id + '/').pipe(
      map(response => response)
    )
  }


  getcurrentUser(): Observable<any[]> {
    return <any>this.http.get(this.usersUrl).pipe(
      map((response) => <Response>response)
    )
  }
  

}
