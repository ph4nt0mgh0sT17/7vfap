import React, {FC, useState} from "react";
import {AuthenticationService} from "../../services/AuthenticationService";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {LoginRequest} from "../../Models/Requests/LoginRequest";
import Swal from "sweetalert2";
import {Button, Container, Dialog, DialogTitle, TextField} from "@mui/material";
import { actionCreators } from "../../state";
import {RegistrationRequest} from "../../Models/Requests/RegistrationRequest";

export interface RegistrationDialogProps {
    open: boolean;
    onClose: () => void;
}

export type ValidationError = {
    name: string;
    errorText: string;
};

export const RegistrationDialog: FC<RegistrationDialogProps> = (props) => {
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authenticationService = new AuthenticationService();

    const dispatch = useDispatch();
    const { login } = bindActionCreators(actionCreators, dispatch);

    const validatePassword = (currentValidationErrors: ValidationError[]) => {
        if (password === '') {
            currentValidationErrors.push({
                name: 'password',
                errorText: 'Uživatelské heslo nemůže být prázdné.'
            });
        } else if (password.length < 4) {
            currentValidationErrors.push({
                name: 'password',
                errorText: 'Uživatelské heslo musí mít délku alespoň 4 znaky dlouhou.'
            });
        }
    };

    const validateUsername = (currentValidationErrors: ValidationError[]) => {
        if (username === '') {
            currentValidationErrors.push({
                name: 'username',
                errorText: 'Uživatelské jméno nemůže být prázdné.'
            });
        }
    };

    const onLogin = async () => {
        let currentValidationErrors: ValidationError[] = [];

        validateUsername(currentValidationErrors);
        validatePassword(currentValidationErrors);

        setValidationErrors(currentValidationErrors);

        if (currentValidationErrors.length > 0) {
            return;
        }

        const registrationRequest: RegistrationRequest = {
            username: username,
            password: password
        };

        try {
            await authenticationService.register(registrationRequest);

            await Swal.fire({
                titleText: 'Registrace proběhla úspěšně.',
                icon: 'success',
                confirmButtonText: 'Zavřít'
            });

            props.onClose();
        } catch (err: any) {
            if (err.response) {
                if (err.response.status === 400 || err.response.status === 404) {
                    await Swal.fire({
                        titleText: 'Uživatel \'' + registrationRequest.username + '\' nemohl být zaregistrován.',
                        icon: 'error',
                        confirmButtonText: 'Zavřít'
                    });
                }
            }
        }
    }

    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <Container>
                <DialogTitle>Registrovací dialogové okno</DialogTitle>

                <div className="row mb-3">
                    <TextField required id="outlined-required"
                               value={username}
                               onChange={(event) => setUsername(event.target.value)}
                               error={validationErrors.find(x => x.name === 'username') !== undefined}
                               helperText={validationErrors.find(x => x.name === 'username') !== undefined ? validationErrors.find(x => x.name === 'username')?.errorText : ''}
                               label="Uživatelské jméno"
                               variant="outlined"/>
                </div>

                <div className="row mb-5">
                    <TextField required id="outlined-required"
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}
                               error={validationErrors.find(x => x.name === 'password') !== undefined}
                               helperText={validationErrors.find(x => x.name === 'password') !== undefined ? validationErrors.find(x => x.name === 'password')?.errorText : ''}
                               label="Uživatelské heslo"
                               type="password"
                               variant="outlined"/>
                </div>

                <div className="row mb-2">
                    <Button variant="contained" onClick={onLogin}>
                        Registrovat se
                    </Button>
                </div>
            </Container>
        </Dialog>
    );
}