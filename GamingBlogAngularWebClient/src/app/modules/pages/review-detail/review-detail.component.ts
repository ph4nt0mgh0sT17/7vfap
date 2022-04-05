import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPostService} from "../../../core/services/interface-post.service";
import {PostResponse} from "../../../core/models/post-response";
import {HttpErrorResponse} from "@angular/common/http";
import {IPostReactionService} from "../../../core/services/interface-post-reaction.service";
import {PostReactionResponse} from "../../../core/models/post-reaction-response";
import {faArrowUp, faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {PostReactionItem} from "../../../core/models/post-reaction-item";
import {IPostCommentService} from "../../../core/services/interfaces/post-comment.service";
import {PostCommentResponse} from "../../../core/models/post-comment-response";
import {IApplicationService} from "../../../core/services/interfaces/application.service";
import {LoginDialogComponent} from "../../dialogs/login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {PostCommentRequest} from "../../../core/models/post-comment-request";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PostReactionRequest} from "../../../core/models/post-reaction-request";
import 'moment/locale/cs';
import * as moment from "moment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({opacity: 0})))
    ])
  ]
})
export class ReviewDetailComponent implements OnInit {

  isLoading: boolean = true;
  currentPost: PostResponse | undefined;
  currentPostReactions: PostReactionResponse[] | undefined;
  currentPostComments: PostCommentResponse[] | undefined;

  thumbsUpIcon: IconDefinition = faThumbsUp;
  thumbsDownIcon: IconDefinition = faThumbsDown;
  arrowUpIcon: IconDefinition = faArrowUp;

  commentForm: FormGroup | undefined;

  isCommentSectionLoading: boolean = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
              private postService: IPostService,
              private postReactionService: IPostReactionService,
              private postCommentService: IPostCommentService,
              public applicationService: IApplicationService,
              private _snackBar: MatSnackBar) {

  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.minLength(1)])
    })

    this.route.params.subscribe(async (params) => {
      console.log(params);
      let currentPostId = parseInt(params['postId']);
      try {
        this.currentPost = await this.postService.retrievePostById(currentPostId);
        this.currentPostReactions = await this.postReactionService.retrieveAllPostReactionsForPost(currentPostId);
        this.currentPostComments = await this.postCommentService.retrieveAllCommentsForPost(currentPostId);
        console.log(this.currentPostReactions);
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 404) {
            throw err;
          }
        }
      }
      this.isLoading = false;
    });
  }

  getLikesNumber(): number {
    if (this.currentPostReactions == undefined)
      return 0;

    return this.currentPostReactions.filter(x => x.reaction === PostReactionItem.LIKE).length;
  }

  getDislikesNumber(): number {
    if (this.currentPostReactions == undefined)
      return 0;

    return this.currentPostReactions.filter(x => x.reaction === PostReactionItem.DISLIKE).length;
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '350px',
    });
  }

  public async saveComment(): Promise<void> {
    if (this.commentForm?.invalid) {
      await Swal.fire({
        title: 'Komentář je ve špatném stavu.',
        icon: 'error'
      });

      this.commentForm.markAllAsTouched();
      return;
    }

    let commentRequest: PostCommentRequest = {
      text: this.comment.value
    };

    if (this.currentPost === undefined) {
      throw new Error('Cannot save the comment because the post does not exist.');
    }
    try {
      await this.postCommentService.saveComment(commentRequest, this.currentPost.id);
      await Swal.fire({
        title: 'Komentář je úspěšně přidán.',
        icon: 'success'
      });

      this.isCommentSectionLoading = true;
      this.currentPostComments = await this.postCommentService.retrieveAllCommentsForPost(this.currentPost.id);
      this.isCommentSectionLoading = false;

    } catch (err) {
      await Swal.fire({
        title: 'Komentář nemůže být přidán.',
        icon: 'error'
      });
    }

    this.comment.setValue('');
    this.comment.markAsUntouched();
  }

  public async deleteComment(postComment: PostCommentResponse): Promise<void> {
    try {
      await this.postCommentService.deleteComment(postComment.id);
      await Swal.fire({
        title: 'Komentář je úspěšně smazán.',
        icon: 'success'
      });

      this.currentPostComments = this.currentPostComments?.filter(x => x.id !== postComment.id);

    } catch (err) {
      await Swal.fire({
        title: 'Komentář nemůže být smazán.',
        icon: 'error'
      });
    }
  }

  public async savePostReaction(postReactionItem: PostReactionItem): Promise<void> {
    if (!this.applicationService.isUserLoggedIn()) {
      await Swal.fire({
        icon: 'info',
        titleText: 'Nemůžete reagovat na článek, pokud nejste přihlášení',
        confirmButtonText: 'Ok, chápu'
      });

      return;
    }

    let postReactionRequest: PostReactionRequest = {
      postReactionItem: postReactionItem
    };

    if (this.currentPost === undefined)
      return;

    if (this.doesPostReactionAlreadyExist(postReactionItem)) {
      try {
        await this.postReactionService.deletePostReaction(this.currentPost.id);
        this.currentPostReactions = this.currentPostReactions?.filter(x => x.authorUsername !== this.applicationService.loggedUser.username);
        this._snackBar.open('Vaše reakce byla odstraněna.', 'OK');

      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          await Swal.fire({
            titleText: 'Reakce na článek nemůže být odstraněna. Zkuste znova.',
            icon: 'error',
            confirmButtonText: 'Zavřít'
          });
        }
      }
    } else {
      try {
        await this.postReactionService.savePostReaction(postReactionRequest, this.currentPost.id);
        this.currentPostReactions = this.currentPostReactions?.filter(x => x.authorUsername !== this.applicationService.loggedUser.username);
        this.currentPostReactions?.push({
          authorUsername: this.applicationService.loggedUser.username,
          reaction: postReactionItem
        });

        if (postReactionItem === PostReactionItem.LIKE)
          this._snackBar.open('Ocenil jste tento příspěvek likem.', 'OK');
        if (postReactionItem === PostReactionItem.DISLIKE)
          this._snackBar.open('Ocenil jste tento příspěvek dislikem.', 'OK');
      } catch (err) {
        if (err instanceof HttpErrorResponse && err.status === 400) {
          await Swal.fire({
            titleText: 'Reakce na článek je neplatná. Zkuste znova.',
            icon: 'error',
            confirmButtonText: 'Zavřít'
          });
        }
      }
    }
  }

  private doesPostReactionAlreadyExist(postReactionItem: PostReactionItem): boolean {
    return this.currentPostReactions
      ?.find(x => x.authorUsername === this.applicationService.loggedUser.username && x.reaction === postReactionItem)
      !== undefined
  }

  isLikeActive(): boolean {
    if (!this.applicationService.isUserLoggedIn())
      return false;

    if (this.currentPostReactions === undefined)
      return false;

    return this.currentPostReactions
      .filter(x => x.reaction === PostReactionItem.LIKE)
      .filter(x => x.authorUsername == this.applicationService.loggedUser.username).length === 1;
  }

  isDislikeActive(): boolean {
    if (!this.applicationService.isUserLoggedIn())
      return false;

    if (this.currentPostReactions === undefined)
      return false;

    return this.currentPostReactions
      .filter(x => x.reaction === PostReactionItem.DISLIKE)
      .filter(x => x.authorUsername == this.applicationService.loggedUser.username).length === 1;
  }

  public getCommentDateText(postComment: PostCommentResponse): string {
    let momentLocale = moment.locale('cs');
    return moment(postComment.creationDateTime).format('DD. MMMM yyyy') +  ' ve ' +
      moment(postComment.creationDateTime).format('HH:mm');
  }

  public getCommentAuthorFullName(postComment: PostCommentResponse) {
    if (!postComment.author.firstName || !postComment.author.lastName)
      return 'Neznámé jméno/příjmení';

    return `${postComment.author.firstName} ${postComment.author.lastName}`;
  }

  get comment(): FormControl {
    return <FormControl>this.commentForm?.get('comment');
  }

  get PostReactionItem(): typeof PostReactionItem {
    return PostReactionItem;
  }
}
