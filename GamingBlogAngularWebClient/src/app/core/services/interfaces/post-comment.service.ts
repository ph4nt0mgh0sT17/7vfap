import {PostCommentResponse} from "../../models/post-comment-response";
import {PostCommentRequest} from "../../models/post-comment-request";

export abstract class IPostCommentService {
  abstract retrieveAllCommentsForPost(postId: number): Promise<PostCommentResponse[]>;

  abstract saveComment(commentRequest: PostCommentRequest, postId: number): Promise<string>;

  abstract deleteComment(postCommentId: number): Promise<string>;
}
