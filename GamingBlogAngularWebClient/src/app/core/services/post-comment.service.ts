import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IPostCommentService} from "./interfaces/post-comment.service";
import {PostCommentResponse} from "../models/post-comment-response";
import {PostCommentRequest} from "../models/post-comment-request";

@Injectable()
export class PostCommentService implements IPostCommentService {
  private authenticationApi: string = '/api/post-comments';
  constructor(private httpClient: HttpClient) {
  }

  retrieveAllCommentsForPost(postId: number): Promise<PostCommentResponse[]> {
    return this.httpClient.get<PostCommentResponse[]>(`${this.authenticationApi}/${postId}`).toPromise();
  }

  saveComment(commentRequest: PostCommentRequest, postId: number): Promise<string> {
    return this.httpClient
      .post(`${this.authenticationApi}/${postId}`, commentRequest, {responseType: 'text'})
      .toPromise();
  }

  deleteComment(postCommentId: number): Promise<string> {
    return this.httpClient
      .delete(`${this.authenticationApi}/${postCommentId}`, {responseType: 'text'})
      .toPromise();
  }
}
