import { createTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import HeroSection from "./components/hero";
import AuthRoute from "./components/routes/authRoute";
import EmailConfirmation from "./pages/auth/emailConfirmation";
import EmailConfirmationRedirect from "./pages/auth/emailConfirmRedirect";
import ForgotPasswordForm from "./pages/auth/forgotPassword";
import Login from "./pages/auth/loginForm";
import Register from "./pages/auth/register";
import KanbanBoard from "./pages/boards/kanbanBoard";
import TeamBoard from "./pages/boards/teamBoard";
import Calendar from "./pages/calendar";
import IssueDetailedCard from "./pages/issues/issueDetails";
import IssueForm from "./pages/issues/issuesForm";
import IssuesGrid from "./pages/issues/userIssuesList";
import MilestonesDGGrid from "./pages/milestones/milestoneDataGrid";
import MilestoneForm from "./pages/milestones/milestonesForm";
import MyWork from "./pages/myTasks";
import ProjectForm from "./pages/projects/projectForm";
import { default as ProjectsDataGrid, default as ProjectsTable } from "./pages/projects/projectsDataGrid";
import GanttReport from "./pages/reports/ganttReport";
import ReportCard from "./pages/reports/reportCard";
import Reports from "./pages/reports/reports";
import Settings from "./pages/settings/setting";
import NotFoundPage from "./pages/statuses/notFoundPage";
import RestrictedAccessPage from "./pages/statuses/restrictedAccessPage";
import TeamForm from "./pages/teams/teamForm";
import TeamDataGrid from "./pages/teams/teamsDataGrid";
import AppUserAccountDGTable from "./pages/users/accountUserDataGrid";
import AppUserDataGrid from "./pages/users/appUsersDataGrid";
import WorkLogDataGrid from "./pages/worklog/workLogDataGrig";
import store from "./store";
import themeOptions from "./styles/themes/theme";
import { getBoardType, getTheme, isUserLoggedIn, resetTheme } from "./utils/jwtUtils";
const App = () => {
  const [mode,setMode] = useState(getTheme()===null?"light":getTheme());
  let theme = themeOptions(mode);

  const toggleTheme = () => {
     if(mode=== "light"){
      setMode("dark");
      resetTheme("dark");
     }else{
      setMode("light");
      resetTheme("dark");
     };
  };

  const getBoardComponent = (): any => {
    if (getBoardType().toUpperCase() === "TEAM") {
      return TeamBoard;
    } else {
      return KanbanBoard;
    }
  };
  const isLogedIn = isUserLoggedIn();
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={responsiveFontSizes(createTheme(themeOptions(mode)))}>
          <BrowserRouter forceRefresh={true}>
             <Header toggleTheme={toggleTheme} mode = {mode} />
            <div className="App">
              <Switch>
                <Route path="/" exact component={HeroSection} />
                <AuthRoute path="/home" exact component={getBoardComponent()} />
                <AuthRoute path="/generate-report" component={Reports} />
                <AuthRoute path="/team-board" component={TeamBoard} />
                <AuthRoute path="/gantt-chart" component={GanttReport} />
                <AuthRoute path="/my-work" component={MyWork} />
                <AuthRoute path="/board" component={getBoardComponent()} />
                <AuthRoute path="/settings" component={Settings} />
                <AuthRoute path="/calendar" component={Calendar} />
                <Route path="/signup" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/issue-details" component={IssueDetailedCard}>
                  <Route path="/:id" component={IssueDetailedCard} />
                </Route>
                <Route path="/email-confirmation" component={EmailConfirmation}/>
                <Route path="/access-resticted" component={RestrictedAccessPage}/>
                <Route path="/email-confirmation-redirect" component={EmailConfirmationRedirect}/>
                <Route path="/forgot-password" component={ForgotPasswordForm} />
                <AuthRoute path="/create-issue" component={IssueForm} />
                <AuthRoute path="/create-milestone" component={MilestoneForm} />
                <AuthRoute path="/create-project" component={ProjectForm} />
                <AuthRoute path="/create-team" component={TeamForm} />
                <AuthRoute path="/all-projects" component={ProjectsTable} />
                <AuthRoute path="/my-issues" component={IssuesGrid} />
                <AuthRoute path="/reports-types" component={ReportCard} />
                <AuthRoute path="/teams" component={TeamDataGrid} />
                <AuthRoute path="/projects" component={ProjectsDataGrid} />
                <AuthRoute path="/milestones" component={MilestonesDGGrid} />
                <AuthRoute path="/users" component={AppUserDataGrid} />
                <AuthRoute path="/user-accounts" component={AppUserAccountDGTable}/>
                <AuthRoute path="/user-worklogs" component={WorkLogDataGrid} />
                <Route exact path="/404" component={NotFoundPage} />
                <Route exact path="/403" component={RestrictedAccessPage} />
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </DndProvider>
    </Provider>
  );
};

export default App;
function setTheme(arg0: { title: string; colors: { primary: string; secondary: string; header: string; background: string; text: string; }; }) {
  throw new Error("Function not implemented.");
}

