import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../models/login-response";
import {LoginRequest} from "../models/login-request";
import {IAuthenticationService} from "./interface-authentication.service";
import {RegistrationRequest} from "../models/registration-request";

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  private authenticationApi: string = '/api/authentication';
  constructor(private httpClient: HttpClient) {
  }

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.authenticationApi}/login`, loginRequest).toPromise();
  }

  register(registerRequest: RegistrationRequest): Promise<string> {
    return this.httpClient
      .post(`${this.authenticationApi}/register`, registerRequest, {responseType: 'text'})
      .toPromise();
  }


}
