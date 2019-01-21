import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class PublicService {
  options;
  domain = "http://localhost:8080/";
  constructor(private http: HttpClient) {}
  createHeaders() {
    this.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }
  getBlogOfCat(cat) {
    return this.http.get<any>(this.domain + "blogsPublic/cat/" + cat).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getPost(slug) {
    return this.http.get<any>(this.domain + "blogsPublic/getPost/" + slug).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getAllBlogs() {
    return this.http.get<any>(this.domain + "blogsPublic/allBlogs").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getAllCats() {
    return this.http.get<any>(this.domain + "blogsPublic/categories").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
