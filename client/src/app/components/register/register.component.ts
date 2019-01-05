import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group(
      {
        // Login Input
        login: [
          "",
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(5), // Minimum length is 5 characters
            Validators.maxLength(30), // Maximum length is 30 characters
            this.validateLogin // Custom validation
          ])
        ],
        // Name Input
        name: [
          "",
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(3), // Minimum length is 3 characters
            Validators.maxLength(15), // Maximum length is 15 characters
            this.validateName // Custom validation
          ])
        ],
        // Password Input
        password: [
          "",
          Validators.compose([
            Validators.required, // Field is required
            Validators.minLength(8), // Minimum length is 8 characters
            Validators.maxLength(35), // Maximum length is 35 characters
            this.validatePassword // Custom validation
          ])
        ],
        // Confirm Password Input
        confirm: ["", Validators.required] // Field is required
      },
      { validator: this.matchingPasswords("password", "confirm") }
    ); // Add custom validator to form for matching passwords
  }

  // Function to validate e-mail is proper format
  validateLogin(controls) {
    // Create a regular expression
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // Test login against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid login
    } else {
      return { validateLogin: true }; // Return as invalid login
    }
  }

  // Function to validate name is proper format
  validateName(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test name against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid name
    } else {
      return { validateName: true }; // Return as invalid name
    }
  }

  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^([a-zA-Z0-9]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { validatePassword: true }; // Return as invalid password
    }
  }

  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { matchingPasswords: true }; // Return as error: do not match
      }
    };
  }

  disableForm() {
    this.form.controls["login"].disable();
    this.form.controls["name"].disable();
    this.form.controls["password"].disable();
    this.form.controls["confirm"].disable();
  }
  enableForm() {
    this.form.controls["login"].enable();
    this.form.controls["name"].enable();
    this.form.controls["password"].enable();
    this.form.controls["confirm"].enable();
  }
  // Function to submit form
  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      login: this.form.get("login").value,
      name: this.form.get("name").value,
      password: this.form.get("password").value
    };

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
      }
    });
  }

  ngOnInit() {}
}
