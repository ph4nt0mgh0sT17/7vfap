import { Component, OnInit } from '@angular/core';
import {PostResponse} from "../../../core/models/post-response";
import {IPostService} from "../../../core/services/interface-post.service";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {UserRole} from "../../../core/models/user-role";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  isLoading: boolean = true;
  articles: PostResponse[] | undefined;
  articleCount: number = 0;

  constructor(private postService: IPostService, private applicationService: IApplicationService) {
  }

  async ngOnInit(): Promise<void> {
    this.applicationService.activePage = 'Articles';
    this.isLoading = true;
    this.articles = await this.postService.retrieveLatestArticles();
    this.articleCount = this.articles.length;
    this.isLoading = false;
  }

  public async loadMoreArticles(): Promise<void> {
    if (this.articles) {
      let anotherPosts = await this.postService.retrieveAnotherLatestArticles(this.articleCount);
      this.articles = this.articles?.concat(anotherPosts);
      this.articleCount = this.articles.length;
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
        title: 'Tento článek byl úspěšně smazán.',
        icon: 'success'
      });
      this.articles = this.articles?.filter(x => x.id !== postId);
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        await Swal.fire({
          title: 'Tento článek nemohl být smazán. Článek zřejmě už neexistuje.',
          icon: 'error'
        });
      }
    }
  }
}
