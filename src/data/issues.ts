import { IssueDetailedModel } from "../types/issues/isues";
import * as issues from "./issues.json";
export function getIssues(): IssueDetailedModel[] {
  return JSON.parse(JSON.stringify(issues));
}
