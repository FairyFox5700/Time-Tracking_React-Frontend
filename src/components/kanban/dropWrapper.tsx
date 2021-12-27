import React from "react";
import { useDrop } from "react-dnd";
import { BoardStatuses, statuses } from "../../data/boardData";
import { ITEM_TYPE } from "../../data/constants";
export interface DropWrapperItems {
  onDrop: any;
  children: any;
  status: string;
}

const DropWrapper: React.FC<DropWrapperItems> = ({
  onDrop,
  children,
  status,
}) => {
  const backlogStatuses = statuses(undefined);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    canDrop: (item: any, monitor) => {
      const itemIndex = backlogStatuses.findIndex(
        (si) => si.status === item.status
      );
      const statusIndex = backlogStatuses.findIndex(
        (si: BoardStatuses) => si.status === item.status
      );
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop}>
      {React.cloneElement(children as React.ReactElement<any>, { isOver })}
    </div>
  );
};

export default DropWrapper;
