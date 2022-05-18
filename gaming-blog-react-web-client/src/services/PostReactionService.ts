import {AxiosResponse} from "axios";
import HttpClient from "../HttpClient";
import {PostReactionResponse} from "../Responses/PostReactionResponse";
import {PostReactionRequest} from "../Models/Requests/PostReactionRequest";

export class PostReactionService {
    async retrieveAllPostReactionsForPost(postId: number): Promise<AxiosResponse<PostReactionResponse[]>> {
        return HttpClient.get<PostReactionResponse[]>(`/api/post-reactions/${postId}`);
    }

    async savePostReaction(postReactionRequest: PostReactionRequest, postId: number): Promise<AxiosResponse<string>> {
        return HttpClient.post(`/api/post-reactions/${postId}`, postReactionRequest, {responseType: 'text'});
    }

    async deletePostReaction(postId: number): Promise<AxiosResponse<string>> {
        return HttpClient.delete(`/api/post-reactions/${postId}`, {responseType: 'text'});
    }
}