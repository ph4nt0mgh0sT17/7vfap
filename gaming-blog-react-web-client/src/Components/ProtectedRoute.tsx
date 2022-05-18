import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {useSelector} from "react-redux";
import {RootState} from "../state/reducers";
import {UserRole} from "../Models/UserRole";

export const ProtectedRoute: FC = () => {
    const loggedUser: LoginResponse | null = useSelector((state: RootState) => state.application);
    if (loggedUser !== null && loggedUser.userRole === UserRole.ROLE_ADMIN) {
        return <Outlet />
    }

    return <Navigate to='/reviews'/>
};