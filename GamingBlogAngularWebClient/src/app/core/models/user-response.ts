import {UserRole} from "./user-role";

export interface UserResponse {
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  creationDate: Date;
}
