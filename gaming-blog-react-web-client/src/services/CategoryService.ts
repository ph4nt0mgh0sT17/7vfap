import {AxiosResponse} from "axios";
import {CategoryResponse} from "../Responses/CategoryResponse";
import HttpClient from "../HttpClient";

export class CategoryService {
    async retrieveAll(): Promise<AxiosResponse<CategoryResponse[]>> {
        return HttpClient.get<CategoryResponse[]>('/api/category');
    }
}