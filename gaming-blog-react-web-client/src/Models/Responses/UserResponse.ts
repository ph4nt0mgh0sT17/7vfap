import {UserRole} from "../UserRole";

export interface UserResponse {
    username: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    creationDate: Date;
}