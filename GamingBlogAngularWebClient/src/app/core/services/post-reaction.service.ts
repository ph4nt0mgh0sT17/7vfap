import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IPostReactionService} from "./interface-post-reaction.service";
import {PostReactionResponse} from "../models/post-reaction-response";
import {PostReactionItem} from "../models/post-reaction-item";
import {PostReactionRequest} from "../models/post-reaction-request";

@Injectable()
export class PostReactionService implements IPostReactionService {
  private postReactionsApiEndpointUrl: string = '/api/post-reactions';
  constructor(private httpClient: HttpClient) {
  }

  retrieveAllPostReactionsForPost(postId: number): Promise<PostReactionResponse[]> {
    return this.httpClient.get<PostReactionResponse[]>(`${this.postReactionsApiEndpointUrl}/${postId}`).toPromise();
  }

  savePostReaction(postReactionRequest: PostReactionRequest, postId: number): Promise<string> {
    return this.httpClient
      .post(`${this.postReactionsApiEndpointUrl}/${postId}`, postReactionRequest, { responseType: 'text' })
      .toPromise();
  }

  deletePostReaction(postId: number): Promise<string> {
    return this.httpClient
      .delete(`${this.postReactionsApiEndpointUrl}/${postId}`, { responseType: 'text' })
      .toPromise();
  }
}
