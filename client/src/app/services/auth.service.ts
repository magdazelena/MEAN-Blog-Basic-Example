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

@Injectable({
  providedIn: "root"
})
export class AuthService {
  domain = "http://localhost:8080";
  authToken;
  user;
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this.domain + "/authentication/register", user);
  }
  login(user) {
    return this.http.post<any>(this.domain + "/authentication/login", user);
  }
  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
