import {AxiosResponse} from "axios";
import HttpClient from "../HttpClient";
import {UserResponse} from "../Models/Responses/UserResponse";

export class UserService {
    async retrieveAllUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return HttpClient.get<UserResponse[]>('/api/users');
    }
}