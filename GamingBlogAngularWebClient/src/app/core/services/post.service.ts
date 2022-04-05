import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {IPostService} from "./interface-post.service";
import {PostResponse} from "../models/post-response";
import {CreatePostRequest} from "../models/create-post-request";
import {Observable} from "rxjs";

@Injectable()
export class PostService implements IPostService {
  private authenticationApi: string = '/api/posts';
  constructor(private httpClient: HttpClient) {
  }

  retrieveLatestReviews(): Promise<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.authenticationApi}/reviews/latest`).toPromise();
  }

  retrieveAnotherLatestReviews(skip: number): Promise<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.authenticationApi}/reviews/latest?skip=${skip}`).toPromise();
  }

  retrieveAnotherLatestArticles(skip: number): Promise<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.authenticationApi}/articles/latest?skip=${skip}`).toPromise();
  }

  retrieveAnotherLatestFirstFeelings(skip: number): Promise<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.authenticationApi}/first-feelings/latest?skip=${skip}`).toPromise();
  }

  retrieveLatestArticles(): Promise<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.authenticationApi}/articles/latest`).toPromise();
  }

  retrieveLatestFirstFeelings(): Promise<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${this.authenticationApi}/first-feelings/latest`).toPromise();
  }

  retrievePostById(postId: number): Promise<PostResponse> {
    return this.httpClient.get<PostResponse>(`${this.authenticationApi}/${postId}`).toPromise();
  }

  createPost(createPostRequest: CreatePostRequest): Promise<string> {
    return this.httpClient
      .post(`${this.authenticationApi}`, createPostRequest, {responseType: 'text'})
      .toPromise();
  }

  editPost(createPostRequest: CreatePostRequest, postId: number): Promise<string> {
    return this.httpClient
      .put(`${this.authenticationApi}/${postId}`, createPostRequest, {responseType: 'text'})
      .toPromise();
  }

  deletePost(postId: number): Promise<string> {
    return this.httpClient
      .delete(`${this.authenticationApi}/${postId}`, {responseType: 'text'})
      .toPromise();
  }




}
