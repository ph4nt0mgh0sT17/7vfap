import {Component, OnInit} from '@angular/core';
import {PostResponse} from "../../../core/models/post-response";
import {IPostService} from "../../../core/services/interface-post.service";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {UserRole} from "../../../core/models/user-role";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  isLoading: boolean = true;
  reviews: PostResponse[] | undefined;
  reviewCount: number = 0;

  constructor(private postService: IPostService, private applicationService: IApplicationService) {
  }

  async ngOnInit(): Promise<void> {
    this.applicationService.activePage = 'Reviews';
    this.isLoading = true;
    this.reviews = await this.postService.retrieveLatestReviews();
    this.reviewCount = this.reviews.length;
    this.isLoading = false;
  }

  public async loadMoreReviews(): Promise<void> {
    if (this.reviews) {
      let anotherPosts = await this.postService.retrieveAnotherLatestReviews(this.reviewCount);
      this.reviews = this.reviews?.concat(anotherPosts);
      this.reviewCount = this.reviews.length;
    }
  }

  public isUserAdmin(): boolean {
    if (!this.applicationService.isUserLoggedIn())
      return false;

    return this.applicationService.loggedUser.userRole === UserRole.ROLE_ADMIN;
  }

  public async deletePost(postId: number): Promise<void> {
    try {
      await this.postService.deletePost(postId);
      await Swal.fire({
        title: 'Tato recenze byla úspěšně smazána.',
        icon: 'success'
      });
      this.reviews = this.reviews?.filter(x => x.id !== postId);
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        await Swal.fire({
          title: 'Tato recenze nemohla být smazána. Recenze zřejmě už neexistuje.',
          icon: 'error'
        });
      }
    }
  }

}
