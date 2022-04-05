import {CategoryResponse} from "./category-response";
import {AuthorResponse} from "./author-response";

export interface CreatePostRequest {
  title: string;
  description: string;
  htmlContent: string;
  imageName: string;
  category: string;
  authorUsername: string;
}
