import { API_ACTIONS } from "../../redux/actions/apiActions";
import { GENERATE_REPORT } from "../../redux/constants/reports";

export interface ReportGenerationRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GENERATE_REPORT}`;
}

export interface ReportGenerationSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GENERATE_REPORT}`;
  payload?: any;
}

export interface ReportGenerationFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GENERATE_REPORT}`;
}

export type ReportsActionTypes =
  | ReportGenerationFailedActionType
  | ReportGenerationRequestActionType
  | ReportGenerationSuccessActionType;
