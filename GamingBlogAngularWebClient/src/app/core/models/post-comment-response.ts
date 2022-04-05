import {AuthorResponse} from "./author-response";

export interface PostCommentResponse {
  id: number;
  postId: number;
  author: AuthorResponse;
  text: string;
  creationDateTime: Date;
}
