import {UserRole} from "./user-role";

export interface LoginResponse {
  username: string;
  userRole: UserRole;
  jwtToken: string;
}
