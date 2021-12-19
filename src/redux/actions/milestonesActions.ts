import {
  FetchMilestoneByIdFailedActionType,
  FetchAllMilestonesSuccessActionType,
  FetchAllMilestonesRequestActionType,
  FetchAllMilestonesFailedActionType,
  FetchMilestoneByIdRequestActionType,
  FetchMilestoneByIdSuccessActionType,
  CreateMilestoneSuccessActionType,
  CreateMilestoneFailedActionType,
} from "../../types/milestones/milestoneActions";

import { PagedRequest } from "../../types/api/apiRequests";
import {
  MilestonModel,
  MilestoneDetailsModel,
} from "../../types/milestones/milestones";
import { ThunkResult } from "./issuesActions";
import { AxiosResponse } from "axios";
import client from "../../api/clients/client";
import { Dispatch } from "react";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";

//all milestones
export const fetchMilestones = (
  request: PagedRequest
): ThunkResult<void> => async (dispatch) => {
  handleFetchMilestones(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<MilestoneDetailsModel>
    > = await client.get(
      `/milestone?page=${request.page}&pageSize=${request.pageSize}`
    );
    console.log("fetch milestones");
    handleFetchMilestonesSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchMilestonesFail(dispatch);
  }
};

export const handleFetchMilestones = (
  dispatch: Dispatch<FetchAllMilestonesRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_MILESTONES_ASYNC",
  });
};

export const handleFetchMilestonesSuccess = (
  dispatch: Dispatch<FetchAllMilestonesSuccessActionType>,
  response: ApiPagedResponse<MilestoneDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_MILESTONES_ASYNC",
    payload: response,
  });
};

export const handleFetchMilestonesFail = (
  dispatch: Dispatch<FetchAllMilestonesFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_MILESTONES_ASYNC",
  });
};

//fetch milestones by id

export const fetchMilestoneById = (
  milestoneId: string
): ThunkResult<void> => async (dispatch) => {
  handleFetchMilestoneById(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<MilestoneDetailsModel>
    > = await client.get(`/milestone/${milestoneId}`);
    handleFetchMilestoneByIdSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchMilestoneByIdFail(dispatch);
  }
};

export const handleFetchMilestoneById = (
  dispatch: Dispatch<FetchMilestoneByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_FETCH_MILESTONE_BY_ID",
  });
};

export const handleFetchMilestoneByIdSuccess = (
  dispatch: Dispatch<FetchMilestoneByIdSuccessActionType>,
  response: ApiPagedResponse<MilestoneDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_FETCH_MILESTONE_BY_ID",
    payload: response,
  });
};

export const handleFetchMilestoneByIdFail = (
  dispatch: Dispatch<FetchMilestoneByIdFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_FETCH_MILESTONE_BY_ID",
  });
};

//add milestone
export const addMilestone = (model: MilestonModel): ThunkResult<void> => async (
  dispatch
) => {
  try {
    const response: AxiosResponse<
      ApiResponse<MilestoneDetailsModel>
    > = await client.post("/milestone/create", model);
    handleAddMilestone(dispatch, response.data);
  } catch (e) {
    handleAddMilestoneFail(dispatch);
  }
};

export const handleAddMilestone = (
  dispatch: Dispatch<CreateMilestoneSuccessActionType>,
  response: ApiResponse<MilestoneDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_CREATE_MILESTONE",
    payload: response,
  });
};

export const handleAddMilestoneFail = (
  dispatch: Dispatch<CreateMilestoneFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CREATE_MILESTONE",
  });
};
