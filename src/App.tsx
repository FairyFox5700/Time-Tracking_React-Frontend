import React from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import usePeristedState from "./utils/usePersistedState";
import { Provider, connect } from "react-redux";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import { DndProvider } from "react-dnd";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Sidebar from "./components/sidebar/sidebar";
import { Switch, Route, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import Reports from "./pages/reports";
import Settings from "./pages/setting";
import MyWork from "./pages/myTasks";
import KanbanBoard from "./pages/kanbanBoard";
import Calendar from "./pages/calendar";
import HeroSection from "./components/hero";
import Login from "./pages/auth/loginForm";
import Register from "./pages/auth/register";
import EmailConfirmation from "./pages/auth/emailConfirmation";
import EmailConfirmationRedirect from "./pages/auth/emailConfirmRedirect";
import ForgotPasswordForm from "./pages/auth/forgotPassword";
import IssueForm from "./pages/issues/issuesForm";
import ProjectForm from "./pages/projects/projectForm";
import ProjectsTable from "./pages/projects/projectsDataGrid";
import MilestoneForm from "./pages/milestones/milestonesForm";
import IssuesGrid from "./pages/issues/userIssuesList";
import IssueDetailedCard from "./pages/issues/issueDetails";
import ReportCard from "./pages/reports/reportCard";
import store from "./store";
import TeamForm from "./pages/teams/teamForm";
import TeamDataGrid from "./pages/teams/teamsDataGrid";
import ProjectsDataGrid from "./pages/projects/projectsDataGrid";
import MilestonesDGGrid from "./pages/milestones/milestoneDataGrid";
import AppUserDataGrid from "./pages/users/appUsersDataGrid";
import AppUserAccountDGTable from "./pages/users/accountUserDataGrid";
import AuthRoute from "./components/routes/authRoute";
import NotFoundPage from "./pages/statuses/notFoundPage";
import WorkLogDataGrid from "./pages/worklog/workLogDataGrig";
import RestrictedAccessPage from "./pages/statuses/restrictedAccessPage";
import { isUserLoggedIn } from "./utils/jwtUtils";
const App = () => {
  const [theme, setTheme] = usePeristedState<DefaultTheme>("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };
  const isLogedIn = isUserLoggedIn();
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <BrowserRouter forceRefresh={true}>
            {isLogedIn && <Header toggleTheme={toggleTheme} />}
            <div className="App">
              <GlobalStyle />
              <Switch>
                <Route path="/" exact component={HeroSection} />
                <AuthRoute path="/home" exact component={KanbanBoard} />
                <AuthRoute path="/generate-report" component={Reports} />
                <AuthRoute path="/my-work" component={MyWork} />
                <AuthRoute path="/board" component={KanbanBoard} />
                <AuthRoute path="/settings" component={Settings} />
                <AuthRoute path="/calendar" component={Calendar} />
                <Route path="/signup" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/issue-details" component={IssueDetailedCard}>
                  <Route path="/:id" component={IssueDetailedCard} />
                </Route>
                <Route
                  path="/email-confirmation"
                  component={EmailConfirmation}
                />
                <Route
                  path="/access-resticted"
                  component={RestrictedAccessPage}
                />
                <Route
                  path="/email-confirmation-redirect"
                  component={EmailConfirmationRedirect}
                />

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
                <AuthRoute
                  path="/user-accounts"
                  component={AppUserAccountDGTable}
                />
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
