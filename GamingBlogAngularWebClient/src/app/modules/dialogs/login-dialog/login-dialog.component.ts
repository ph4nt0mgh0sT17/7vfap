import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IAuthenticationService} from "../../../core/services/interface-authentication.service";
import {LoginRequest} from "../../../core/models/login-request";
import {LoginResponse} from "../../../core/models/login-response";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public loginForm: FormGroup | undefined;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
              private authenticationService: IAuthenticationService,
              private applicationService: IApplicationService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  public async login(): Promise<void> {
    const loginRequest: LoginRequest = {
      username: this.username.value,
      password: this.password.value
    };

    try {
      let loginResponse: LoginResponse = await this.authenticationService.login(loginRequest);
      this.applicationService.login(loginResponse);
      await Swal.fire({
        titleText: 'Přihlášení proběhlo úspěšně.',
        icon: 'success',
        confirmButtonText: 'Zavřít'
      });
      this.dialogRef.close();
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 404) {
          await Swal.fire({
            titleText: 'Uživatel \'' + loginRequest.username + '\' neexistuje.',
            icon: 'error',
            confirmButtonText: 'Zavřít'
          });
        } else if (err.status === 400) {
          await Swal.fire({
            titleText: 'Uživatelské údaje jsou nesprávné.',
            icon: 'error',
            confirmButtonText: 'Zavřít'
          });
        }
      }
    }
  }

  get username(): FormControl {
    return <FormControl>this.loginForm?.get('username');
  }

  get password(): FormControl {
    return <FormControl>this.loginForm?.get('password');
  }
}
