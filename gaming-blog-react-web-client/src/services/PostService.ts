import {AxiosResponse} from "axios";
import {PostResponse} from "../Responses/PostResponse";
import HttpClient from "../HttpClient";

export class PostService {
    async retrieveLatestReviews(): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>('/api/posts/reviews/latest');
    }

    async retrieveLatestArticles(): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>('/api/posts/articles/latest');
    }

    async retrieveLatestFirstFeelings(): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>('/api/posts/first-feelings/latest');
    }
}