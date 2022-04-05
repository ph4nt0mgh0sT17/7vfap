import {PostResponse} from "../models/post-response";
import {CreatePostRequest} from "../models/create-post-request";
import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";

export abstract class IPostService {
  abstract retrieveLatestReviews(): Promise<PostResponse[]>;
  abstract retrieveAnotherLatestReviews(skip: number): Promise<PostResponse[]>;
  abstract retrieveLatestArticles(): Promise<PostResponse[]>;
  abstract retrieveAnotherLatestArticles(skip: number): Promise<PostResponse[]>;
  abstract retrieveLatestFirstFeelings(): Promise<PostResponse[]>;
  abstract retrieveAnotherLatestFirstFeelings(skip: number): Promise<PostResponse[]>;
  abstract retrievePostById(postId: number): Promise<PostResponse>;
  abstract createPost(createPostRequest: CreatePostRequest): Promise<string>;
  abstract editPost(createPostRequest: CreatePostRequest, postId: number): Promise<string>;
  abstract deletePost(postId: number): Promise<string>;
}
