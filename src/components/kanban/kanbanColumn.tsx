import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { IssueDetailedModel } from "../../types/issues/isues";
import { ITEM_TYPE } from "../../data/constants";

export interface KanbanProps {
  status: string;
  changeIssueStatus: (issueId: string, status: string) => void;
  children: any;
  type: string;
}
const KanbanColumn: React.FC<KanbanProps> = ({
  status,
  changeIssueStatus,
  children,
  type,
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop(item: IssueDetailedModel) {
      changeIssueStatus(item.issueId, type);
    },
  });
  drop(ref);
  return <div ref={ref}> {children}</div>;
};

export default KanbanColumn;
