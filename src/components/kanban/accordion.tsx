import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { ImageList } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",

      justifyContent: "center",
      overflow: "hidden",
    },
    ImageList: {
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
              <ImageList className={classes.ImageList} cols={1}>
                {children}
              </ImageList>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default SimpleAccordion;
