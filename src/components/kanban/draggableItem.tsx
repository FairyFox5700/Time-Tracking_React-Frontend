import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import React, { Fragment, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { ITEM_TYPE } from "../../data/constants";
import { IssueDetailedModel } from "../../types/issues/isues";
import AvatarItem from "./avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: "5px",
      border: " 1px dashed white",
      backgroundColor: theme.palette.background.default,
      width: "350px",
      height: "auto",
      marginBottom: "8px",
    },
    userTittle: {
      fontSize: "14px",
      whiteSpace: "nowrap",
      justifyСontent: "center",
      alignSelf: "center",
      marginLeft: "8px",
      textTransform: "capitalize",
      padding: "10px",
    },
    cardHeaderPriority: {
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
      padding: "2px",
    },
    cardHeader: {
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontFamily: "Ubuntu",
      overflowWrap: "break-word",
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
      margin: "15px 0 10px 10px",
    },
    cardContentLeft: {
      display: "flex",
      justifyContent: "space-between",
      width: "65px",
    },
    cardContetRight: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
    },
  })
);

export interface KanbanItemProps {
  issueId: string;
  item: IssueDetailedModel;
}
const KanbanItem: React.FC<KanbanItemProps> = ({ item, issueId }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { issueId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  function applyPriorityStyle() {
    if (item.totalRemainingTimeInSeconds < 200000) {
      return "card-color-low";
    } else if (item.totalRemainingTimeInSeconds < 300000) {
      return "card-color-med";
    } else {
      return "card-color-high";
    }
  }

  function applyPriorityName() {
    if (item.totalRemainingTimeInSeconds < 200000) {
      return "Low";
    } else if (item.totalRemainingTimeInSeconds < 300000) {
      return "Normal";
    } else {
      return "High";
    }
  }

  const location = useLocation();
  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);
  const classes = useStyles();
  const opacity = isDragging ? 0.4 : 1;
  drag(ref);
  return (
    <div ref={ref} style={{ opacity }}>
      <Fragment>
        <Card className={classes.card}>
          <CardContent
            ref={ref}
            style={{ opacity: isDragging ? 0 : 1 }}
            onClick={onOpen}
          >
            <div className={applyPriorityStyle()}>
              <div className={classes.cardHeaderPriority}>
                {applyPriorityName()}
              </div>
            </div>

            <p className={classes.cardHeader}>{item.title}</p>

            <div className={classes.cardContent}>
              <div className={classes.cardContentLeft}>
                <AvatarItem
                  name={item.assignedUserFirstName}
                  surname={item.assignedUserLastName}
                  label="Assignee"
                />
              </div>
              <div className={classes.cardContetRight}>
                <Badge badgeContent={4} color="primary">
                  <TurnedInNotIcon></TurnedInNotIcon>
                </Badge>
              </div>
            </div>
            <div className={classes.button}>
              <Link to={`/issue-details/issueId=${issueId}`}>
                <Button>Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </Fragment>
    </div>
  );
};

export default KanbanItem;
