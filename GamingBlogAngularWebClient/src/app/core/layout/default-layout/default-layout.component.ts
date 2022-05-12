import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../../modules/dialogs/login-dialog/login-dialog.component";
import {IApplicationService} from "../../services/interfaces/application.service";
import {UserRole} from "../../models/user-role";
import Swal from "sweetalert2";
import {RegisterDialogComponent} from "../../../modules/dialogs/register-dialog/register-dialog.component";
import {
  CreateCategoryDialogComponent
} from "../../../modules/dialogs/create-category-dialog/create-category-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  userIcon: IconDefinition = faUser;

  isMenuCollapsed = true;

  constructor(private dialog: MatDialog, public applicationService: IApplicationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '350px',
    });
  }

  public openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '400px',
    });
  }

  public openUserManagementPage(): void {
    this.router.navigate(['user-management']);
  }

  public async logout(): Promise<void> {
    let swalResult = await Swal.fire({
      titleText: 'Chcete se skutečně odhlásit?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Ano, chci se odhlásit',
      cancelButtonText: 'Ne, ještě se nechci odhlásit'
    });

    if (swalResult.isDismissed || swalResult.isDenied) {
      return;
    }

    this.applicationService.logout();
  }

  isUserLoggedIn(): boolean {
    return this.applicationService.isUserLoggedIn();
  }

  getRoleText(userRole: UserRole): string {
    if (userRole === UserRole.ROLE_ADMIN)
      return 'Administrátor';

    if (userRole === UserRole.ROLE_USER)
      return 'Uživatel';

    throw new Error(`User role is not expected: ${userRole}`);
  }

  public isAdminLoggedIn(): boolean {
    if (!this.applicationService.isUserLoggedIn())
      return false;

    return this.applicationService.loggedUser.userRole === UserRole.ROLE_ADMIN;
  }

}
