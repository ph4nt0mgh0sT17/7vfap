import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReviewsComponent} from "../reviews/reviews.component";
import {ReviewDetailComponent} from "./review-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ReviewDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewDetailRoutingModule { }
