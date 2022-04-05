import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {IAuthenticationService} from "../../../core/services/interface-authentication.service";
import {IApplicationService} from "../../../core/services/interfaces/application.service";

import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {RegistrationRequest} from "../../../core/models/registration-request";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  public registerForm: FormGroup | undefined;

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>,
              private authenticationService: IAuthenticationService,
              private applicationService: IApplicationService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  public async register(): Promise<void> {
    const registerRequest: RegistrationRequest = {
      username: this.username.value,
      password: this.password.value
    };

    try {
      await this.authenticationService.register(registerRequest);
      await Swal.fire({
        titleText: 'Registrace proběhla úspěšně.',
        icon: 'success',
        confirmButtonText: 'Zavřít'
      });
      this.dialogRef.close();
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          await Swal.fire({
            titleText: 'Uživatel \'' + registerRequest.username + '\' nemohl být zaregistrován.',
            icon: 'error',
            confirmButtonText: 'Zavřít'
          });
        }
      }
    }
  }

  get username(): FormControl {
    return <FormControl>this.registerForm?.get('username');
  }

  get password(): FormControl {
    return <FormControl>this.registerForm?.get('password');
  }

}
