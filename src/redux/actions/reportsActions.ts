import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import client from "../../api/clients/reportClient";
import { ReportGenerationRequest } from "../../types/report/report";
import {
  ReportGenerationFailedActionType, ReportGenerationSuccessActionType
} from "../../types/report/reportActions";
import { ThunkResult } from "./issuesActions";

//generate report
export const generateReport = (
  model: ReportGenerationRequest
): ThunkResult<void> => async (dispatch) => {
  try {
    const response: AxiosResponse<any> = await client.post("reports", model);
    handleGenerateReport(dispatch, response.data);
  } catch (e) {
    handleGenerateReportFail(dispatch);
  }
};

export const handleGenerateReport = (
  dispatch: Dispatch<ReportGenerationSuccessActionType>,
  response: any
) => {
  dispatch({
    type: "FETCH_SUCCESS_GENERATE_REPORT",
    payload: response,
  });
};

export const handleGenerateReportFail = (
  dispatch: Dispatch<ReportGenerationFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GENERATE_REPORT",
  });
};
