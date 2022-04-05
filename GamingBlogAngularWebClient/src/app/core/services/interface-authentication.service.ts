import {LoginRequest} from "../models/login-request";
import {LoginResponse} from "../models/login-response";
import {RegistrationRequest} from "../models/registration-request";

export abstract class IAuthenticationService {
  /**
   * Logins into the system using loginRequest.
   * @param loginRequest The object containing the username and password.
   */
  abstract login(loginRequest: LoginRequest): Promise<LoginResponse>;
  abstract register(registerRequest: RegistrationRequest): Promise<string>;
}
