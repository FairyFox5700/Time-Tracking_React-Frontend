export interface IssueFilteringRequest {
  milestoneId: string;
  startDate: string;
  endDate: string;
}

 export interface AssignIssueToUserRequest {
  issueId: string;
  userId: string;
}

export interface ChangeIssueStatusRequest {
  status: Status | string;
  issueId: string;
}

export interface IssueModel {
  title: string;
  description: string;
  status: Status;
  assignedToUserId: string;
  reportedByUserId: string;
  milestoneId: string;
  projectId: string;
}

export interface IssueDetailedModel {
  issueId: string;
  assignedUserFirstName: string;
  assignedUserLastName: string;
  reportedByUserFirstName: string;
  reportedByLastName: string;
  updatedAt?: Date | string;
  openedAt?: Date | string;
  closedAt?: Date | string;
  mileStoneName: string;
  totalRemainingTimeInSeconds: number;
  totalSpentTimeInSeconds: number;
  title: string;
  description: string;
  status?: Status | string;
  assignedToUserId: string;
  reportedByUserId: string;
  milestoneId: string;
  projectId: string;
}

export enum Status {
  Open,
  Closed,
  Review,
}
