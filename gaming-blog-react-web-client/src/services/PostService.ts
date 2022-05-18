import {AxiosResponse} from "axios";
import {PostResponse} from "../Responses/PostResponse";
import HttpClient from "../HttpClient";
import {CreatePostRequest} from "../Models/Requests/CreatePostRequest";

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

    aretrieveAnotherLatestReviews(skip: number): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>(`${this.postApiEndpointUrl}/reviews/latest?skip=${skip}`);
    }

    retrieveAnotherLatestArticles(skip: number): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>(`${this.postApiEndpointUrl}/articles/latest?skip=${skip}`);
    }

    retrieveAnotherLatestFirstFeelings(skip: number): Promise<AxiosResponse<PostResponse[]>> {
        return HttpClient.get<PostResponse[]>(`${this.postApiEndpointUrl}/first-feelings/latest?skip=${skip}`);
    }

    async retrievePostById(postId: number): Promise<AxiosResponse<PostResponse>> {
        return HttpClient.get<PostResponse>(`${this.postApiEndpointUrl}/${postId}`);
    }

    async deletePost(postId: number): Promise<AxiosResponse<string>> {
        return HttpClient
            .delete(`${this.postApiEndpointUrl}/${postId}`, {responseType: 'text'});
    }

    async createPost(createPostRequest: CreatePostRequest): Promise<AxiosResponse<string>> {
        return HttpClient.post(`${this.postApiEndpointUrl}`, createPostRequest, {responseType: 'text'});
    }

    async editPost(createPostRequest: CreatePostRequest, postId: number): Promise<AxiosResponse<string>> {
        return HttpClient.put(`${this.postApiEndpointUrl}/${postId}`, createPostRequest, {responseType: 'text'});
    }
}