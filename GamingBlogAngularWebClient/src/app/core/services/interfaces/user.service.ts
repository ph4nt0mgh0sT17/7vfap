import {PostCommentResponse} from "../../models/post-comment-response";
import {PostCommentRequest} from "../../models/post-comment-request";
import {UserResponse} from "../../models/user-response";

export abstract class IUserService {
  abstract retrieveAllUsers(): Promise<UserResponse[]>;
}
