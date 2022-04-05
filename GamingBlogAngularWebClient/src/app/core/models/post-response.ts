import {CategoryResponse} from "./category-response";
import {AuthorResponse} from "./author-response";

export interface PostResponse {
  id: number;
  title: string;
  description: string;
  htmlContent: string;
  thumbnailUrl: string;
  category: CategoryResponse;
  author: AuthorResponse;
}
