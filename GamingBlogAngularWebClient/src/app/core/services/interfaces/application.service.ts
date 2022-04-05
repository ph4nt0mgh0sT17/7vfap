import {LoginResponse} from "../../models/login-response";

export abstract class IApplicationService {
  /**
   * Checks if the user is logged in.
   */
  abstract isUserLoggedIn(): boolean;

  abstract login(loginResponse: LoginResponse): void

  abstract logout(): void

  abstract get loggedUser(): LoginResponse;

  abstract get activePage(): string;

  abstract set activePage(activePage: string);
}
