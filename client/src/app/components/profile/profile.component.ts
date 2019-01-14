import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user;
  login;
  name;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.login = this.user.login;
      this.name = this.user.name;
    });
  }
}
