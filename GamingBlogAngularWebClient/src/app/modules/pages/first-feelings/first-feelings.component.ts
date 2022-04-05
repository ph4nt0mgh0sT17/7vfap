import { Component, OnInit } from '@angular/core';
import {PostResponse} from "../../../core/models/post-response";
import {IPostService} from "../../../core/services/interface-post.service";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {UserRole} from "../../../core/models/user-role";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-first-feelings',
  templateUrl: './first-feelings.component.html',
  styleUrls: ['./first-feelings.component.scss']
})
export class FirstFeelingsComponent implements OnInit {
  isLoading: boolean = true;
  firstFeelings: PostResponse[] | undefined;
  articleCount: number = 0;

  constructor(private postService: IPostService, private applicationService: IApplicationService) {
  }

  async ngOnInit(): Promise<void> {
    this.applicationService.activePage = 'First Feelings';
    this.isLoading = true;
    this.firstFeelings = await this.postService.retrieveLatestFirstFeelings();
    this.articleCount = this.firstFeelings.length;
    this.isLoading = false;
  }

  public async loadMoreFirstFeelings(): Promise<void> {
    if (this.firstFeelings) {
      let anotherPosts = await this.postService.retrieveAnotherLatestFirstFeelings(this.articleCount);
      this.firstFeelings = this.firstFeelings?.concat(anotherPosts);
      this.articleCount = this.firstFeelings.length;
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
        title: 'Tyto první dojmy byly úspěšně smazány.',
        icon: 'success'
      });
      this.firstFeelings = this.firstFeelings?.filter(x => x.id !== postId);
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        await Swal.fire({
          title: 'Tyto první dojmy nemohly být smazány. Tyto první dojmy zřejmě už neexistují.',
          icon: 'error'
        });
      }
    }
  }
}
