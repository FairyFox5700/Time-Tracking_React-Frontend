import { GridList } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",

      justifyContent: "center",
      overflow: "hidden",
    },
    gridList: {
      width: 400,
      height: 800,
      alignItems: "flex-start",
      justify: "flex-start",
      spacing: 0,
    },
  })
);

export interface ColumnProps {
  isOver: boolean;
  children: any;
  style: string;
  name: string;
  isExpanded: boolean;
}
const SimpleAccordion: React.FC<ColumnProps> = ({
  isOver,
  children,
  style,
  isExpanded,
  name,
}) => {
  const classes = useStyles();
  const className = isOver ? "cards-dropping" : "";
  const [expanded, setExpanded] = React.useState(isExpanded);
  return (
    <div className={`"card-wrapper ${className} ${style}`}>
      <div className="card-wrapper__header">
        <Accordion expanded={expanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => setExpanded(!isExpanded)}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="card-wrapper__header">
              <Typography className="backlog-name">{name}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className="cards">
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={1}>
                {children}
              </GridList>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default SimpleAccordion;
