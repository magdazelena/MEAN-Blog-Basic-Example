import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent
} from "rxjs";
import { jsonpCallbackContext } from "@angular/common/http/src/module";
import { map, filter, catchError, mergeMap } from "rxjs/operators";
import { getTypeNameForDebugging } from "@angular/core/src/change_detection/differs/iterable_differs";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root"
})
export class BlogService {
  options;
  domain = this.authService.domain;
  constructor(private authService: AuthService, private http: HttpClient) {}
  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.authService.authToken
      })
    };
  }

  newBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http
      .post<any>(this.domain + "blogs/newBlog", blog, this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  editPost(blog) {
    this.createAuthenticationHeaders();
    return this.http
      .put<any>(this.domain + "blogs/editPost", blog, this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deletePost(id) {
    this.createAuthenticationHeaders();
    return this.http
      .delete<any>(this.domain + "blogs/deletePost/" + id, this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getPost(id) {
    this.createAuthenticationHeaders();
    return this.http
      .get<any>(this.domain + "blogs/post/" + id, this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getAllCats() {
    this.createAuthenticationHeaders();
    return this.http
      .get<any>(this.domain + "blogs/categories", this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getAllBlogs() {
    this.createAuthenticationHeaders();
    return this.http
      .get<any>(this.domain + "blogs/allBlogs", this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
