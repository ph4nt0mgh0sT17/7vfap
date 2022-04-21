import {CategoryResponse} from "./CategoryResponse";
import {AuthorResponse} from "./AuthorResponse";

export interface PostResponse {
    id: number;
    title: string;
    description: string;
    htmlContent: string;
    thumbnailUrl: string;
    category: CategoryResponse;
    author: AuthorResponse;
}