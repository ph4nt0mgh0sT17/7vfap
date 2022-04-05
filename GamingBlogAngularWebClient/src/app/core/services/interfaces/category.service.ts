import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {CategoryResponse} from "../../models/category-response";
import {CreateCategoryRequest} from "../../models/create-category-request";

export abstract class ICategoryService {
  abstract retrieveAll(): Promise<CategoryResponse[]>;
  abstract create(createCategoryRequest: CreateCategoryRequest): Promise<string>;
}
