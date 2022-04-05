import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {IApplicationService} from "../services/interfaces/application.service";
import {UserRole} from "../models/user-role";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private applicationService: IApplicationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    let isAuthenticated = this.applicationService.isUserLoggedIn();

    let isAdmin = this.applicationService.loggedUser.userRole === UserRole.ROLE_ADMIN;

    if (!isAdmin)
      this.router.navigate(['/reviews']);

    return isAdmin;
  }

}
