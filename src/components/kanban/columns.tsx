import React from "react";

export interface ColumnProps {
  isOver: boolean;
  children: any;
  style: string;
}
const Col: React.FC<ColumnProps> = ({ isOver, children, style }) => {
  const className = isOver ? "cards-dropping" : "";

  return (
    <div className={`"card-wrapper ${className} ${style}`}>{children}</div>
  );
};

export default Col;
