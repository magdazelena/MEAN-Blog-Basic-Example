import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  previousUrl;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  disableForm() {
    this.form.controls["login"].disable();
    this.form.controls["password"].disable();
  }
  enableForm() {
    this.form.controls["login"].enable();
    this.form.controls["password"].enable();
  }
  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      login: this.form.get("login").value,
      password: this.form.get("password").value
    };
    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = "Successfuly logged in";
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(["/blog"]);
          }
        }, 1000);
      }
    });
  }
  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = "alert alert-danger";
      this.message = "You must be logged in to view that page";
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }
}
