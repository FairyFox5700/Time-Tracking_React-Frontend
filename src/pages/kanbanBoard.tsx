import Item from "../components/kanban/item";
import DropWrapper from "../components/kanban/dropWrapper";
import { BoardStatuses, statuses } from "../data/boardData";
import "../components/kanban/kanban.css";
import SimpleAccordion from "../components/kanban/accordion";
import { RootState } from "../store";
import { PagedRequest } from "../types/api/apiRequests";
import { connect } from "react-redux";
import { changeIssueStatus, fetchIssues } from "../redux/actions/issuesActions";
import React, { Dispatch, useEffect } from "react";
import { ChangeIssueStatusRequest } from "../types/issues/isues";
import CircularUnderLoad from "../components/loader/circularLoader";
import KanbanItem from "../components/kanban/draggableItem";
import KanbanColumn from "../components/kanban/kanbanColumn";
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
  //let boardStatuses = statuses(issues.data);

  useEffect(() => {
    fetchIssuesData();
  }, [1]);

  /*const chnagesIssueStatus = (newStatus: string, issue: IssueDetailedModel) => {
    let request: ChangeIssueStatusRequest = {
      status: newStatus,
      issueId: issue.issueId,
    };
    updateStatus(request);
    fetchIssuesData();
  };*/

  if (errorMessage) {
    <Alert severity="error">errorMessage</Alert>;
  }
  if (isLoading) {
    return <CircularUnderLoad />;
  } else {
    let boardStatuses = statuses(issues.data);
    console.log(issues.data);
    console.log(boardStatuses);
    /* const onDrop = (item: IssueDetailedModel, monitor: any, status: string) => {
      const mapping: BoardStatuses | undefined = boardStatuses.find(
        (si) => si.status === status
      );
      if (!mapping) return;
      chnagesIssueStatus(mapping?.type, item);
    };

    const moveItem = (dragIndex: number, hoverIndex: number) => {
      const item = issues.data[dragIndex];
    };*/

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
    /* <DropWrapper key={i} onDrop={onDrop} status={s.status}>
          <SimpleAccordion
            style={s.style}
            isOver={true}
            isExpanded={true}
            name={s.status.toUpperCase()}
            children={s.data.map((i, idx) => (
              <Item
                key={idx}
                item={i}
                index={idx}
                moveItem={moveItem}
                status={s}
              />
            ))}
          ></SimpleAccordion>
        </DropWrapper>*/
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
/*import Item from "../components/kanban/item";
import DropWrapper from "../components/kanban/dropWrapper";
import { statuses } from "../data/boardData";
import "../components/kanban/kanban.css";
import SimpleAccordion from "../components/kanban/accordion";
import { RootState } from "../store";
import { PagedRequest } from "../types/api/apiRequests";
import { connect } from "react-redux";
import { fetchIssues } from "../redux/actions/issuesActions";
import issuesForm from "./issues/issuesForm";

type KanbanBoardProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    getAllItems: (request: PagedRequest) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  getAllItems,
  isLoading,
  errorMessage,
  issues,
}) => {
  const onDrop = (item: any, monitor: any, status: string) => {
    const mapping: any = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.issueId !== item.issueId)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex: any, hoverIndex: any) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const renderBoardCard = statuses.map((s, i) => {
    return (
      <DropWrapper onDrop={onDrop} status={s.status}>
        <SimpleAccordion
          style={s.style}
          isOver={true}
          name={s.status.toUpperCase()}
          children={s.data.map((i, idx) => (
            <Item
              key={i.issueId}
              item={i}
              index={idx}
              moveItem={moveItem}
              status={s}
            />
          ))}
        ></SimpleAccordion>
      </DropWrapper>
    );
  });

  return (
    <div className="kanban__main">
      <div className={"kanban__main-wrapper"}>{renderBoardCard}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.issues.error,
  isLoading: state.issues.loading,
  issues: state.issues.issues,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getAllItems: (request: PagedRequest) => dispatch(fetchIssues(request)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);*/
