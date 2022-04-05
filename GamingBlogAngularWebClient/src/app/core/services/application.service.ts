import {IApplicationService} from "./interfaces/application.service";
import {Injectable} from "@angular/core";
import {LoginResponse} from "../models/login-response";
import {UserRole} from "../models/user-role";

@Injectable()
export class ApplicationService extends IApplicationService {
  _activePage: string = 'Reviews';

  public isUserLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  public login(loginResponse: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(loginResponse));
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  public get loggedUser(): LoginResponse {
    let loggedUserJson: string | null = localStorage.getItem('user');

    if (loggedUserJson !== null)
      return JSON.parse(loggedUserJson);

    throw new Error('The user is not found.');
  }

  public get activePage(): string {
    return this._activePage;
  }

  public set activePage(activePage: string) {
    this._activePage = activePage;
  }
}
