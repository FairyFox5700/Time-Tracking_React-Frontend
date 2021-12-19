export enum ReportFormatType {
  Pdf,
  Excel,
}
export interface ReportInfo {
  type: string;
  link: string;
}
export const reportLinkTypeMapping: ReportInfo[] = [
  {type:"Activities Report",link:"/generate-report"},
  {type:"Gantt Chart",link:"/gantt-chart"},
];

export enum ReportType {
  ActivitiesReport,
  GanttChart,
}

export interface ReportGenerationRequest {
  reportFormatType: ReportFormatType;
  reportType: ReportType;
  fromDate: Date;
  toDate: Date;
  userId: string | null;
  projectId: string;
}
