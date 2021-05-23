export enum ReportFormatType {
  Pdf,
  Excel,
}

export enum ReportType {
  ActivitiesReport,
}

export interface ReportGenerationRequest {
  reportFormatType: ReportFormatType;
  reportType: ReportType;
  fromDate: Date;
  toDate: Date;
  userId: string | null;
  projectId: string;
}
