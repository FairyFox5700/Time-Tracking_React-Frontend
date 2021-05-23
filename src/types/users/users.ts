export interface AddUserToTeamRequest {
  teamId: string;
  userId: string;
}

export interface UserDetailsModel {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  teamId: string;
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  teamId: string;
}
