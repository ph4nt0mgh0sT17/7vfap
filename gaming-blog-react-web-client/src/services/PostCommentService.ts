import {AxiosResponse} from "axios";

import {PostCommentResponse} from "../Responses/PostCommentResponse";
import HttpClient from "../HttpClient";
import {PostCommentRequest} from "../Models/Requests/PostCommentRequest";

export class PostCommentService {
    async retrieveAllCommentsForPost(postId: number): Promise<AxiosResponse<PostCommentResponse[]>> {
        return HttpClient.get<PostCommentResponse[]>(`/api/post-comments/${postId}`);
    }

    async saveComment(commentRequest: PostCommentRequest, postId: number): Promise<AxiosResponse<string>> {
        return HttpClient.post(`/api/post-comments/${postId}`, commentRequest, {responseType: 'text'});
    }

    async deleteComment(postCommentId: number): Promise<AxiosResponse<string>> {
        return HttpClient.delete(`/api/post-comments/${postCommentId}`, {responseType: 'text'});
    }
}