import {UserRole} from "../Models/UserRole";

export interface AuthorResponse {
    username: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    creationDate: Date;
}