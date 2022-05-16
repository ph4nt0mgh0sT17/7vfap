import React, {FC, useEffect, useState} from "react";
import {UserResponse} from "../Models/Responses/UserResponse";
import {UserService} from "../services/UserService";
import {LoadingSpinner} from "./LoadingSpinner";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Tab, Tabs} from "@mui/material";
import {TabPanel} from "./TabPanel";
import {UserRole} from "../Models/UserRole";


export const UserManagement: FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [admins, setAdmins] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(0);

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
                {!isLoading && users.length > 0 &&
                    <DataGrid columns={columns} rows={users} pageSize={5}
                              rowsPerPageOptions={[5]} autoHeight={true}/>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {!isLoading && admins.length > 0 &&
                    <DataGrid columns={columns} rows={admins} pageSize={5}
                              rowsPerPageOptions={[5]} autoHeight={true}/>
                }
            </TabPanel>

        </React.Fragment>
    );
};