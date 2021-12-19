import { statuses } from "../../data/boardData";
import "../../components/kanban/kanban.css";
import SimpleAccordion from "../../components/kanban/accordion";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import { connect } from "react-redux";
import { changeIssueStatus, fetchIssues } from "../../redux/actions/issuesActions";
import React, { Dispatch, useEffect } from "react";
import { ChangeIssueStatusRequest } from "../../types/issues/isues";
import CircularUnderLoad from "../../components/loader/circularLoader";
import KanbanItem from "../../components/kanban/draggableItem";
import KanbanColumn from "../../components/kanban/kanbanColumn";
import { Alert } from "@material-ui/lab";

type KanbanBoardProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    getAllItems: (request: PagedRequest) => void;
    updateStatus: (request: ChangeIssueStatusRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  getAllItems,
  updateStatus,
  isLoading,
  errorMessage,
  issues,
}) => {
  const fetchIssuesData = () => {
    const pagedRequest: PagedRequest = {
      page: 0,
      pageSize: 1000,
    };
    getAllItems(pagedRequest);
  };

  useEffect(() => {
    fetchIssuesData();
  }, [1]);

  if (errorMessage) {
    <Alert severity="error">errorMessage</Alert>;
  }
  if (isLoading) {
    return <CircularUnderLoad />;
  } else {
    let boardStatuses = statuses(issues.data);
    console.log(issues.data);
    console.log(boardStatuses);

    const chnagesIssueStatus = (issueId: string, status: string) => {
      let request: ChangeIssueStatusRequest = {
        status: status,
        issueId: issueId,
      };
      updateStatus(request);
      fetchIssuesData();
      boardStatuses = statuses(issues.data);
    };

    const renderBoardCard = boardStatuses.map((s, i) => {
      return (
        <KanbanColumn
          key={i}
          status={s.status}
          type={s.type}
          changeIssueStatus={chnagesIssueStatus}
        >
          <SimpleAccordion
            style={s.style}
            isOver={true}
            isExpanded={true}
            name={s.status.toUpperCase()}
            children={s.data.map((iss, idx) => (
              <KanbanItem
                item={iss}
                key={idx}
                issueId={iss.issueId}
              ></KanbanItem>
            ))}
          ></SimpleAccordion>
        </KanbanColumn>
      );
    });

    return (
      <div className="app_bar">
        <div className="kanban__main">
          <div className={"kanban__main-wrapper"}>{renderBoardCard}</div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.issues.error,
  isLoading: state.issues.loading,
  issues: state.issues.issues,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getAllItems: (request: PagedRequest) => dispatch(fetchIssues(request)),
    updateStatus: (request: ChangeIssueStatusRequest) =>
      dispatch(changeIssueStatus(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
