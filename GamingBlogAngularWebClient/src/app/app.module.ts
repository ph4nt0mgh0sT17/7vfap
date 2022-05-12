import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {INTERCEPTOR_PROVIDERS} from "./core/interceptors/interceptor";
import {DefaultLayoutComponent} from './core/layout/default-layout/default-layout.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IApplicationService} from "./core/services/interfaces/application.service";
import {ApplicationService} from "./core/services/application.service";
import {LoginDialogComponent} from './modules/dialogs/login-dialog/login-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {IAuthenticationService} from "./core/services/interface-authentication.service";
import {AuthenticationService} from "./core/services/authentication.service";
import { RegisterDialogComponent } from './modules/dialogs/register-dialog/register-dialog.component';
import {IImageService} from "./core/services/interfaces/image.service";
import {ImageService} from "./core/services/image.service";
import {ICategoryService} from "./core/services/interfaces/category.service";
import {CategoryService} from "./core/services/category.service";
import {IPostService} from "./core/services/interface-post.service";
import {PostService} from "./core/services/post.service";
import { CreateCategoryDialogComponent } from './modules/dialogs/create-category-dialog/create-category-dialog.component';
import {IUserService} from "./core/services/interfaces/user.service";
import {UserService} from "./core/services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    CreateCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: IApplicationService,
      useClass: ApplicationService
    },
    {
      provide: IAuthenticationService,
      useClass: AuthenticationService
    },
    {
      provide: IImageService,
      useClass: ImageService
    },
    {
      provide: ICategoryService,
      useClass: CategoryService
    },
    {
      provide: IPostService,
      useClass: PostService
    },
    {
      provide: IUserService,
      useClass: UserService
    },

    INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
