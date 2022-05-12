import {AxiosResponse} from "axios";
import HttpClient from "../HttpClient";
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {LoginRequest} from "../Models/Requests/LoginRequest";

export class AuthenticationService {
    async login(loginRequest: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        return HttpClient.post<LoginResponse>('/api/authentication/login', loginRequest);
    }
}