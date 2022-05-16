import {AuthorResponse} from "./AuthorResponse";

export interface PostCommentResponse {
    id: number;
    postId: number;
    author: AuthorResponse;
    text: string;
    creationDateTime: Date;
}

