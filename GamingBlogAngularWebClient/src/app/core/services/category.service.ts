import {IPostService} from "./interface-post.service";
import {ICategoryService} from "./interfaces/category.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CategoryResponse} from "../models/category-response";
import {CreateCategoryRequest} from "../models/create-category-request";

@Injectable()
export class CategoryService implements ICategoryService  {
  private categoryApiEndpoint: string = '/api/category';
  constructor(private httpClient: HttpClient) {
  }

  retrieveAll(): Promise<CategoryResponse[]> {
    return this.httpClient
      .get<CategoryResponse[]>(`${this.categoryApiEndpoint}`)
      .toPromise();
  }

  create(createCategoryRequest: CreateCategoryRequest): Promise<string> {
    return this.httpClient
      .post(`${this.categoryApiEndpoint}`, createCategoryRequest, {responseType: 'text'})
      .toPromise();
  }


}
