import React, {FC, useEffect, useState} from "react";
import {UserResponse} from "../Models/Responses/UserResponse";
import {UserService} from "../services/UserService";
import {LoadingSpinner} from "./LoadingSpinner";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, Tab, Tabs} from "@mui/material";
import {TabPanel} from "./TabPanel";
import {UserRole} from "../Models/UserRole";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const UserManagement: FC = () => {
    const [originalUsers, setOriginalUsers] = useState<UserResponse[]>([]);
    const [originalAdmins, setOriginalAdmins] = useState<UserResponse[]>([]);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [admins, setAdmins] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [rangeUsersDateError, setRangeUsersDateError] = useState(false);
    const [rangeAdminsDateError, setRangeAdminsDateError] = useState(false);

    const [usersStartDate, setUsersStartDate] = useState<Date | null>(null);
    const [usersEndDate, setUsersEndDate] = useState<Date | null>(null);

    const [adminsStartDate, setAdminsStartDate] = useState<Date | null>(null);
    const [adminsEndDate, setAdminsEndDate] = useState<Date | null>(null);

    const userService = new UserService();

    const columns: GridColDef[] = [
        {field: 'username', headerName: 'Uživatelské jméno', flex: 1},
        {field: 'firstName', headerName: 'Křestní jméno', flex: 1},
        {field: 'lastName', headerName: 'Příjmení', flex: 1},
        {field: 'creationDate', headerName: 'Datum vytvoření', type: 'date', flex: 1}
    ];

    useEffect(() => {
        userService.retrieveAllUsers().then((usersResponse) => {
            let usersData = usersResponse.data;
            let id = 0;
            usersData.forEach(currentUser => {
                // @ts-ignore
                currentUser['id'] = id;
                id++;
            })
            setOriginalUsers(usersData.filter(x => x.role === UserRole.ROLE_USER));
            setOriginalAdmins(usersData.filter(x => x.role === UserRole.ROLE_ADMIN));

            console.log('originalUsers', originalUsers);

            setUsers(usersData.filter(x => x.role === UserRole.ROLE_USER));
            setAdmins(usersData.filter(x => x.role === UserRole.ROLE_ADMIN));

        });
        setIsLoading(false);
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const onChangeUserStartDate = (date: Date) => {
        setUsersStartDate(date);
        console.log(date);

        if (usersEndDate === null)
            return;

        let momentStartDate = moment(date);
        let momentEndDate = moment(usersEndDate);

        if (momentEndDate.isBefore(momentStartDate)) {
            setRangeUsersDateError(true);
            return;
        }

        setRangeUsersDateError(false);

        setUsers(originalUsers.filter(x => moment(x.creationDate).isBetween(momentStartDate, momentEndDate)))
    }

    const onChangeUserEndDate = (date: Date) => {
        setUsersEndDate(date);
        console.log(date);

        if (usersStartDate === null)
            return;

        let momentStartDate = moment(usersStartDate);
        let momentEndDate = moment(date);

        if (momentEndDate.isBefore(momentStartDate)) {
            setRangeUsersDateError(true);
            return;
        }

        setRangeUsersDateError(false);

        setUsers(originalUsers.filter(x => moment(x.creationDate).isBetween(momentStartDate, momentEndDate)));
    }

    const cancelUsersFilter = () => {
        setUsersStartDate(null);
        setUsersEndDate(null);
        setUsers(originalUsers);
    };

    const onChangeAdminStartDate = (date: Date) => {
        setAdminsStartDate(date);

        if (adminsStartDate === null)
            return;

        let momentStartDate = moment(date);
        let momentEndDate = moment(adminsEndDate);

        if (momentEndDate.isBefore(momentStartDate)) {
            setRangeAdminsDateError(true);
            return;
        }

        setRangeAdminsDateError(false);

        setAdmins(originalAdmins.filter(x => moment(x.creationDate).isBetween(momentStartDate, momentEndDate)))
    }

    const onChangeAdminEndDate = (date: Date) => {
        setAdminsEndDate(date);

        if (adminsEndDate === null)
            return;

        let momentStartDate = moment(adminsStartDate);
        let momentEndDate = moment(date);

        if (momentEndDate.isBefore(momentStartDate)) {
            setRangeAdminsDateError(true);
            return;
        }

        setRangeAdminsDateError(false);

        setAdmins(originalAdmins.filter(x => moment(x.creationDate).isBetween(momentStartDate, momentEndDate)));
    }

    const cancelAdminsFilter = () => {
        setAdminsStartDate(null);
        setAdminsEndDate(null);
        setAdmins(originalAdmins);
    };

    return (
        <React.Fragment>
            <h1>Správa uživatelů</h1>
            <hr/>

            <LoadingSpinner title={"Načítám uživatele"} isLoading={isLoading}/>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Uživatelé" {...a11yProps(0)} />
                    <Tab label="Administrátoři" {...a11yProps(1)}  />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <div className="row">
                    <div className="col-3">
                        <p>Začátek hranice data</p>
                        <ReactDatePicker className="mb-3 rounded-2" selected={usersStartDate}
                                         onChange={onChangeUserStartDate}>

                        </ReactDatePicker>
                    </div>

                    <div className="col-3">
                        <p>Konec hranice data</p>
                        <ReactDatePicker className="mb-3 rounded-2" selected={usersEndDate}
                                         onChange={onChangeUserEndDate}>

                        </ReactDatePicker>
                        {rangeUsersDateError &&
                            <div className="alert alert-danger">Konec hranice data nemůže být dřív než jeho začátek.</div>
                        }
                    </div>

                    <div className="col-3">
                        <Button variant={"contained"} color={"primary"} onClick={cancelUsersFilter}>Zrušit
                            filtr</Button>
                    </div>
                </div>
                {!isLoading && users.length > 0 &&
                    <React.Fragment>

                        <DataGrid columns={columns} rows={users} pageSize={5}
                                  rowsPerPageOptions={[5]} autoHeight={true}/>
                    </React.Fragment>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="row">
                    <div className="col-3">
                        <p>Začátek hranice data</p>
                        <ReactDatePicker className="mb-3 rounded-2" selected={adminsStartDate}
                                         onChange={onChangeAdminStartDate}>

                        </ReactDatePicker>
                    </div>

                    <div className="col-3">
                        <p>Konec hranice data</p>
                        <ReactDatePicker className="mb-3 rounded-2" selected={adminsEndDate}
                                         onChange={onChangeAdminEndDate}>

                        </ReactDatePicker>
                        {rangeAdminsDateError &&
                            <div className="alert alert-danger">Konec hranice data nemůže být dřív než jeho začátek.</div>
                        }
                    </div>

                    <div className="col-3">
                        <Button variant={"contained"} color={"primary"} onClick={cancelAdminsFilter}>Zrušit
                            filtr</Button>
                    </div>
                </div>

                {!isLoading && admins.length > 0 &&
                    <React.Fragment>
                        <DataGrid columns={columns} rows={admins} pageSize={5}
                                  rowsPerPageOptions={[5]} autoHeight={true}/>
                    </React.Fragment>
                }
            </TabPanel>

        </React.Fragment>
    );
};