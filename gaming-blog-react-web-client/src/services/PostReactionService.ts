import {AxiosResponse} from "axios";
import HttpClient from "../HttpClient";
import {PostReactionResponse} from "../Responses/PostReactionResponse";

export class PostReactionService {
    async retrieveAllPostReactionsForPost(postId: number): Promise<AxiosResponse<PostReactionResponse[]>> {
        return HttpClient.get<PostReactionResponse[]>(`/api/post-reactions/${postId}`);
    }
}