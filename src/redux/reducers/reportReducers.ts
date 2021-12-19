import { Reducer } from "redux";
import { getErrorMessage } from "../../utils/actionErrorsUtils";
import { API_ACTIONS } from "../actions/apiActions";
import { GENERATE_REPORT } from "../constants/reports";

export interface ReportsReducerType {
  response: any;
  loading: boolean;
  error?: string;
}

const defaultState: ReportsReducerType = {
  response: undefined,
  loading: false,
  error: undefined,
};

export const reportReducer: Reducer<ReportsReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_FAILURE}${GENERATE_REPORT}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GENERATE_REPORT}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        response: action.payload,
        loading: false,
        error: getErrorMessage(action),
      };

    default:
      return state;
  }
};
