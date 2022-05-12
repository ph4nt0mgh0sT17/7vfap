import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserResponse} from "../../../core/models/user-response";
import {IUserService} from "../../../core/services/interfaces/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {UserRole} from "../../../core/models/user-role";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'username',
    'firstName',
    'lastName',
    'creationDate'
  ];

  rangeGroupForUsers = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  rangeGroupForAdmins = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  usernameGroupForUsers = new FormGroup({
    username: new FormControl('')
  });

  usernameGroupForAdmins = new FormGroup({
    username: new FormControl('')
  });

  loading = true;
  users: UserResponse[] | undefined;

  dataSourceForUsers: MatTableDataSource<UserResponse> = new MatTableDataSource<UserResponse>();
  dataSourceForAdmins: MatTableDataSource<UserResponse> = new MatTableDataSource<UserResponse>();


  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: IUserService) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.usernameGroupForUsers.controls['username'].valueChanges.subscribe(() => {
      this.filterUsersForUsers();
    });

    this.usernameGroupForAdmins.controls['username'].valueChanges.subscribe(() => {
      this.filterUsersForAdmins();
    });

    this.rangeGroupForUsers.valueChanges.subscribe(() => {
      this.filterUsersForUsers()
    });

    this.rangeGroupForAdmins.valueChanges.subscribe(() => {
      this.filterUsersForAdmins()
    });

    this.users = await this.userService.retrieveAllUsers();
    this.dataSourceForUsers = new MatTableDataSource(this.users.filter(x => x.role === UserRole.ROLE_USER));
    this.dataSourceForUsers.sort = this.sort;

    this.dataSourceForAdmins = new MatTableDataSource(this.users.filter(x => x.role === UserRole.ROLE_ADMIN));
    this.dataSourceForAdmins.sort = this.sort;
    this.loading = false;
  }

  ngAfterViewInit(): void {
    this.dataSourceForUsers.sort = this.sort;
  }

  public filterUsersForUsers() {
    let filteredUsers = [...this.users!?.filter(x => x.role === UserRole.ROLE_USER)];

    console.log(filteredUsers);

    filteredUsers = this.filterUsersByDate(filteredUsers);
    filteredUsers = this.filterUsersByUsername(filteredUsers);

    this.dataSourceForUsers = new MatTableDataSource(filteredUsers);
    this.dataSourceForUsers.sort = this.sort;
  }

  public filterUsersForAdmins() {
    let filteredUsers = [...this.users!?.filter(x => x.role === UserRole.ROLE_ADMIN)];

    console.log(filteredUsers);

    filteredUsers = this.filterAdminsByDate(filteredUsers);
    filteredUsers = this.filterAdminsByUsername(filteredUsers);

    this.dataSourceForAdmins = new MatTableDataSource(filteredUsers);
    this.dataSourceForAdmins.sort = this.sort;
  }

  private filterUsersByDate(users: UserResponse[]): UserResponse[] {
    let startDate = this.rangeGroupForUsers.controls['start'].value as Date;
    let endDate = this.rangeGroupForUsers.controls['end'].value as Date;

    if (!startDate || !endDate)
      return users;

    let startDateMoment = moment(startDate);
    let endDateMoment = moment(endDate);

    return users.filter(x => moment(x.creationDate).isBetween(startDateMoment, endDateMoment));
  }

  private filterAdminsByDate(users: UserResponse[]): UserResponse[] {
    let startDate = this.rangeGroupForAdmins.controls['start'].value as Date;
    let endDate = this.rangeGroupForAdmins.controls['end'].value as Date;

    if (!startDate || !endDate)
      return users;

    let startDateMoment = moment(startDate);
    let endDateMoment = moment(endDate);

    return users.filter(x => moment(x.creationDate).isBetween(startDateMoment, endDateMoment));
  }

  private filterUsersByUsername(users: UserResponse[]): UserResponse[] {
    let username = this.usernameGroupForUsers.controls['username'].value as string;
    console.log(username);
    if (username === '') {
      return users;
    }

    return users.filter(x => x.username.includes(username));
  }
  private filterAdminsByUsername(users: UserResponse[]): UserResponse[] {
    let username = this.usernameGroupForAdmins.controls['username'].value as string;
    console.log(username);
    if (username === '') {
      return users;
    }

    return users.filter(x => x.username.includes(username));
  }
}
