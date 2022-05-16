import {AxiosResponse} from "axios";
import {PostResponse} from "../Responses/PostResponse";
import HttpClient from "../HttpClient";

export class PostService {
    postApiEndpointUrl = '/api/posts';

    async retrieveLatestReviews(): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>(`${this.postApiEndpointUrl}/reviews/latest`);
    }

    async retrieveLatestArticles(): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>(`${this.postApiEndpointUrl}/articles/latest`);
    }

    async retrieveLatestFirstFeelings(): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>(`${this.postApiEndpointUrl}/first-feelings/latest`);
    }

    async deletePost(postId: number): Promise<AxiosResponse<string>> {
        return HttpClient
            .delete(`${this.postApiEndpointUrl}/${postId}`, {responseType: 'text'});
    }
}