import {AxiosResponse} from "axios";

import {PostCommentResponse} from "../Responses/PostCommentResponse";
import HttpClient from "../HttpClient";

export class PostCommentService {
    async retrieveAllCommentsForPost(postId: number): Promise<AxiosResponse<PostCommentResponse[]>> {
        return HttpClient.get<PostCommentResponse[]>(`/api/post-comments/${postId}`);
    }
}