import {AxiosResponse} from "axios";
import HttpClient from "../HttpClient";
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {LoginRequest} from "../Models/Requests/LoginRequest";
import {RegistrationRequest} from "../Models/Requests/RegistrationRequest";

export class AuthenticationService {
    async login(loginRequest: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        return HttpClient.post<LoginResponse>('/api/authentication/login', loginRequest);
    }

    async register(registrationRequest: RegistrationRequest): Promise<AxiosResponse<string>> {
        return HttpClient
            .post(`/api/authentication/register`, registrationRequest, {responseType: 'text'});
    }
}