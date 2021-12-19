export enum State {
  Opened,
  Closed,
}

export interface MilestonModel {
  state: State;
  title: string;
  description: string;
  dueDate: Date | string;
  projectId: string;
}

export interface MilestoneDetailsModel {
  id: string;
  state: State;
  title: string;
  description: string;
  dueDate: Date;
  projectId: string;
}
