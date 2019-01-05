import { Injectable } from "@angular/core";
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

@Injectable({
  providedIn: "root"
})
export class AuthService {
  domain = "http://localhost:8080";
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
    return this.http.post<any>(this.domain + "/authentication/register", user);
  }
  login(user) {
    return this.http.post<any>(this.domain + "/authentication/login", user);
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
      .get(this.domain + "/authentication/profile", this.options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  loggedIn() {
    if (this.authToken != null) return false;
    else return true;
  }
}
