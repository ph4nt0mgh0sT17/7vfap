import {UserRole} from "./user-role";

export interface AuthorResponse {
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  creationDate: Date;
}
