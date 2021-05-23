import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { IssuesAction } from "./types/issues/issesActions";
import { authReducer, AuthReducerType } from "./redux/reducers/authReducer";
import {
  MilestoneReducerType,
  milestonesReducer,
} from "./redux/reducers/milestoneReducer";
import {
  reportReducer,
  ReportsReducerType,
} from "./redux/reducers/reportReducers";
import { teamsReducer, TeamsReducerType } from "./redux/reducers/teamsReducer";
import {
  UserAccountReducerType,
  usersAccountReducer,
} from "./redux/reducers/userAccounts";
import {
  ProjectReducerType,
  projectsReducer,
} from "./redux/reducers/projectsReducer";
import { rolesReducer, RolesReducerType } from "./redux/reducers/rolesReducer";
import {
  WorklogReducerType,
  workLogsReducer,
} from "./redux/reducers/workLogReducer";
import { usersReducer, UsersReducerType } from "./redux/reducers/usersReduce";
import {
  issuesReducer,
  IssuesReducerType,
} from "./redux/reducers/issuesReducer";

export type RootActions = IssuesAction; // | CommentsAction | etc.

export interface RootState {
  readonly issues: IssuesReducerType;
  readonly worklogs: WorklogReducerType;
  readonly milestones: MilestoneReducerType;
  readonly reports: ReportsReducerType;
  readonly teams: TeamsReducerType;
  readonly userAccounts: UserAccountReducerType;
  readonly projects: ProjectReducerType;
  readonly auth: AuthReducerType;
  readonly roles: RolesReducerType;
  readonly users: UsersReducerType;
}

const rootReducer = combineReducers<RootState>({
  issues: issuesReducer,
  worklogs: workLogsReducer,
  milestones: milestonesReducer,
  reports: reportReducer,
  teams: teamsReducer,
  users: usersReducer,
  userAccounts: usersAccountReducer,
  projects: projectsReducer,
  auth: authReducer,
  roles: rolesReducer,
});

/*compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )*/

let composeEnhancers;
if (
  process.env.NODE_ENV !== "production" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
  )
);

export default store;
