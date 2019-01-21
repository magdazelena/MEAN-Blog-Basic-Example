import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
@Injectable({
  providedIn: "root"
})
export class AuthService {
  domain = "http://localhost:8080/";
  authToken;
  user;
  options;
  constructor(private http: HttpClient) {}
  createAuthenticationHeaders() {
    this.loadToken();
    this.options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.authToken
      })
    };
  }
  loadToken() {
    this.authToken = localStorage.getItem("token");
  }
  registerUser(user) {
    return this.http.post<any>(this.domain + "authentication/register", user);
  }
  login(user) {
    return this.http.post<any>(this.domain + "authentication/login", user);
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getProfile() {
    this.createAuthenticationHeaders();
    return this.http
      .get(this.domain + "authentication/profile", this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  loggedIn() {
    if (this.authToken) {
      if (helper.isTokenExpired(this.authToken)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
