import {Injectable} from "@angular/core";
import {IUserService} from "./interfaces/user.service";
import {UserResponse} from "../models/user-response";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService implements IUserService {
  private usersApiEndpointUrl: string = '/api/users';

  constructor(private httpClient: HttpClient) {
  }

  retrieveAllUsers(): Promise<UserResponse[]> {
    return this.httpClient
      .get<UserResponse[]>(this.usersApiEndpointUrl)
      .toPromise();
  }
}
