import {UserRole} from "../UserRole";

export interface LoginResponse {
    username: string;
    userRole: UserRole;
    jwtToken: string;
}