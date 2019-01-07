import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { routerNgProbeToken } from "@angular/router/src/router_module";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  redirectUrl;
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
