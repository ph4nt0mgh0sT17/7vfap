import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {IAuthenticationService} from "../../../core/services/interface-authentication.service";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {LoginRequest} from "../../../core/models/login-request";
import {LoginResponse} from "../../../core/models/login-response";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryService} from "../../../core/services/category.service";
import {ICategoryService} from "../../../core/services/interfaces/category.service";
import {CreateCategoryRequest} from "../../../core/models/create-category-request";

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit {
  public categoryForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
              private categoryService: ICategoryService) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnInit(): void {

  }

  public async create(): Promise<void> {
    if (this.categoryForm.invalid)
      return;

    let createCategoryRequest: CreateCategoryRequest = {
      name: this.name.value,
      description: this.description.value
    };

    try {
      await this.categoryService.create(createCategoryRequest);
      await Swal.fire({
        title: 'Tato kategorie byla úspěšně vytvořena.',
        icon: 'success'
      });
      this.dialogRef.close();
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        await Swal.fire({
          title: 'Tato kategorie nemohla být vytvořena. Zřejmě už existuje kategorie se stejným jménem.',
          icon: 'error'
        });
      }
    }
  }

  get name(): FormControl {
    return <FormControl>this.categoryForm?.get('name');
  }

  get description(): FormControl {
    return <FormControl>this.categoryForm?.get('description');
  }

}
