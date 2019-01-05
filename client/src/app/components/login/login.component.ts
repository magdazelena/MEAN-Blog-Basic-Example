import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
        console.log("s");
        this.messageClass = "alert alert-success";
        this.message = "Successfuly logged in";
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          this.router.navigate(["/dashboard"]);
        }, 2000);
      }
    });
  }
  ngOnInit() {}
}
