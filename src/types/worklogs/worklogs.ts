export enum ActivityType {
  Research,
  CodeReview,
  Coding,
}

export interface WorkLogModel {
  description: string;
  timeSpent: string;
  activityType: ActivityType;
  startDate: Date;
  issueId: string;
}

export interface UpdateWorkLogStatusRequest {
  workLogId: string;
  isApproved: boolean;
  description: string;
}

export interface ActivitiesRequest {
  userId: string;
  projectId: string;
}

export interface UpdateWorkLogRequest {
  description: string;
  workLogId: string;
  timeSpent: string;
  activityType: ActivityType;
  startDate: Date;
}

export interface UserActivityWorklogs {
  userId: string;
  userName: string;
  userSurname: string;
  projectName: string;
  userEmail: string;
  totalWorklogInSeconds: number;
  workLogItems: Array<WorkLogDetails>;
}

export interface WorkLogDetails {
  workLogId: string;
  userId: string;
  description: string;
  timeSpent: string;
  activityType: ActivityType;
  startDate: Date;
  issueId: string;
  isApproved: boolean;
}
