import { Alert } from "@material-ui/lab";
import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import SimpleAccordion from "../../components/kanban/accordion";
import "../../components/kanban/kanban.css";
import KanbanColumn from "../../components/kanban/kanbanColumn";
import TeamItem from "../../components/kanban/teamBoardItem";
import CircularUnderLoad from "../../components/loader/circularLoader";
import { statuses, teamBoardStatuses } from "../../data/boardData";
import { changeIssueStatus, fetchIssues } from "../../redux/actions/issuesActions";
import { RootState } from "../../store";
import { PagedRequest } from "../../types/api/apiRequests";
import { ChangeIssueStatusRequest } from "../../types/issues/isues";

type TeamBoardProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        getAllItems: (request: PagedRequest) => void;
        updateStatus: (request: ChangeIssueStatusRequest) => void;
        isLoading: boolean;
        errorMessage: string | undefined;
    };

const TeamBoard: React.FC<TeamBoardProps> = ({
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
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
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
        let teamBoardStatusesArray = teamBoardStatuses(boardStatuses);

        const chnagesIssueStatus = (issueId: string, status: string) => {
            let request: ChangeIssueStatusRequest = {
                status: status,
                issueId: issueId,
            };
            updateStatus(request);
            fetchIssuesData();
            boardStatuses = statuses(issues.data);
            teamBoardStatusesArray = teamBoardStatuses(boardStatuses);
 
        };
       
        const renderBoardCard = teamBoardStatusesArray.map((s, i) => {
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
                        children={
                            (Object.keys(s.data)as Array<string>).map((key,idx)=>(
                            <TeamItem  id ={idx} groupKey={key} statuses={s}/>
                        ))}
                       />
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamBoard);
