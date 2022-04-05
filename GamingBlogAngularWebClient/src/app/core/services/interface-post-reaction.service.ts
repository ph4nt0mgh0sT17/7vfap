import {PostReactionResponse} from "../models/post-reaction-response";
import {PostReactionItem} from "../models/post-reaction-item";
import {PostReactionRequest} from "../models/post-reaction-request";

export abstract class IPostReactionService {
  abstract retrieveAllPostReactionsForPost(postId: number): Promise<PostReactionResponse[]>;
  abstract savePostReaction(postReactionRequest: PostReactionRequest, postId: number): Promise<string>;
  abstract deletePostReaction(postId: number): Promise<string>;
}
