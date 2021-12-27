import { IssueDetailedModel } from "../types/issues/isues";
import { groupBy } from "../utils/groupUtils";

const backlog = [
  {
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignedUserFirstName: "name",
    assignedUserLastName: "surname",
    reportedByUserFirstName: "repoName",
    reportedByLastName: "repSurname",
    updatedAt: "2021-04-25T07:37:09.572Z",
    openedAt: "2021-04-25T07:37:09.572Z",
    closedAt: "2021-04-25T07:37:09.572Z",
    mileStoneName: "string",
    totalRemainingTimeInSeconds: 0,
    totalSpentTimeInSeconds: 0,
    title: "simple title",
    description: "string",
    status: "Open",
    assignedToUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    milestoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  },
  {
    issueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignedUserFirstName: "name",
    assignedUserLastName: "surname",
    reportedByUserFirstName: "repoName",
    reportedByLastName: "repSurname",
    updatedAt: "2021-04-25T07:37:09.572Z",
    openedAt: "2021-04-25T07:37:09.572Z",
    closedAt: "2021-04-25T07:37:09.572Z",
    mileStoneName: "string",
    totalRemainingTimeInSeconds: 4,
    totalSpentTimeInSeconds: 0,
    title: "simple title 3",
    description: "string",
    status: "Review",
    assignedToUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    milestoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  },
  {
    issueId: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignedUserFirstName: "name",
    assignedUserLastName: "surname",
    reportedByUserFirstName: "repoName",
    reportedByLastName: "repSurname",
    updatedAt: "2021-04-25T07:37:09.572Z",
    openedAt: "2021-04-25T07:37:09.572Z",
    closedAt: "2021-04-25T07:37:09.572Z",
    mileStoneName: "string",
    totalRemainingTimeInSeconds: 40,
    totalSpentTimeInSeconds: 0,
    title: "simple title 5",
    description: "string",
    status: "Closed",
    assignedToUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    milestoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  },
  {
    issueId: "6fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignedUserFirstName: "name",
    assignedUserLastName: "surname",
    reportedByUserFirstName: "repoName",
    reportedByLastName: "repSurname",
    updatedAt: "2021-04-25T07:37:09.572Z",
    openedAt: "2021-04-25T07:37:09.572Z",
    closedAt: "2021-04-25T07:37:09.572Z",
    mileStoneName: "string",
    totalRemainingTimeInSeconds: 10,
    totalSpentTimeInSeconds: 0,
    title: "simple title 6",
    description: "string",
    status: "Review",
    assignedToUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reportedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    milestoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  },
];

export interface BoardStatuses {
  status: string;
  icon: any;
  style: string;
  data: Array<IssueDetailedModel>;
  type: string;
}


export interface TeamBoardStatuses {
  status: string;
  icon: any;
  style: string;
  data: Record<string, Array<IssueDetailedModel>>;
  type: string;
}
export const teamBoardStatuses = (board: Array<BoardStatuses>): Array<TeamBoardStatuses> => {
  const teamBoard = board.map(b => {
    return ({
      status: b.status,
      icon: b.icon,
      style: b.style,
      data:
        groupBy(b.data, e =>e.assignedToUserId  ) ?? [],
      type: b.type,
    })
  });
  return teamBoard;
};

export const statuses = (
  backlog?: Array<IssueDetailedModel>
): Array<BoardStatuses> => {
  return [
    {
      status: "open",
      icon: "⭕️",
      style: "backlog-color",
      data:
        backlog?.filter((e: IssueDetailedModel) => e.status === "Open") ?? [],
      type: "Open",
    },
    {
      status: "in review",
      icon: "📝",
      style: "review-color",
      type: "Review",
      data:
        backlog?.filter((e: IssueDetailedModel) => e.status === "Review") ?? [],
    },
    {
      status: "done",
      icon: "✅",
      style: "complete-color",
      type: "Closed",
      data:
        backlog?.filter((e: IssueDetailedModel) => e.status === "Closed") ?? [],
    },
  ];
};
