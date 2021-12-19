import { Reducer } from "redux";
import { ApiResponse, ApiPagedResponse } from "../../types/api/apiResponses";
import {
  CREATE_MILESTONE,
  GET_ALL_MILESTONES_ASYNC,
  FETCH_MILESTONE_BY_ID,
} from "../../redux/constants/milestines";
import { API_ACTIONS } from "../actions/apiActions";
import {
  MilestoneDetailsModel,
  MilestonModel,
} from "../../types/milestones/milestones";
import { getErrorMessage } from "../../utils/actionErrorsUtils";

export interface MilestoneReducerType {
  milestones: ApiPagedResponse<MilestoneDetailsModel>;
  milestone: ApiResponse<MilestonModel> | undefined;
  loading: boolean;
  error?: string;
}

const milestoneData: ApiPagedResponse<MilestoneDetailsModel> = {
  currentPage: 1,
  resultsPerPage: 3,
  totalPages: 1,
  isSuccess: true,
  responseException: null,
  statusCode: 200,
  data: [],
  totalResults: 3,
};

const defaultState: MilestoneReducerType = {
  milestones: milestoneData,
  milestone: undefined,
  loading: false,
  error: undefined,
};

export const milestonesReducer: Reducer<MilestoneReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_MILESTONES_ASYNC}`:
    case `${API_ACTIONS.FETCH_START}${FETCH_MILESTONE_BY_ID}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${FETCH_MILESTONE_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_MILESTONES_ASYNC}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CREATE_MILESTONE}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_MILESTONES_ASYNC}`:
      console.log("action payload milestones request", action.payload);
      return {
        ...state,
        loading: false,
        milestones: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${FETCH_MILESTONE_BY_ID}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        milestone: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${CREATE_MILESTONE}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        milestones: [...state.milestones.data, action.payload],
      };

    default:
      return state;
  }
};
