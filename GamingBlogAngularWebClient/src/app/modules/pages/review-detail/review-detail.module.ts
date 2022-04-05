import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewDetailRoutingModule } from './review-detail-routing.module';
import { ReviewDetailComponent } from './review-detail.component';
import {IPostService} from "../../../core/services/interface-post.service";
import {PostService} from "../../../core/services/post.service";
import {IPostReactionService} from "../../../core/services/interface-post-reaction.service";
import {PostReactionService} from "../../../core/services/post-reaction.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IPostCommentService} from "../../../core/services/interfaces/post-comment.service";
import {PostCommentService} from "../../../core/services/post-comment.service";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    ReviewDetailComponent
  ],
  imports: [
    CommonModule,
    ReviewDetailRoutingModule,
    FontAwesomeModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: IPostReactionService,
      useClass: PostReactionService
    },
    {
      provide: IPostCommentService,
      useClass: PostCommentService
    }
  ]
})
export class ReviewDetailModule { }
