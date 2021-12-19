import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./window";
import { ITEM_TYPE } from "../../data/constants";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import Badge from "@material-ui/core/Badge";
import AvatarItem from "./avatar";

export interface ItemProps {
  index: any;
  moveItem: any;
  status: any;
  item: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: "5px",
      border: " 1px dashed white",
      backgroundColor: "white",
      minWidth: "350px",
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

const Item: React.FC<ItemProps> = ({ item, index, moveItem, status }) => {
  const ref: any = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.issueId;
      const hoverIndex = index; //index we hover

      //the same item so we do nothing
      if (dragIndex === hoverIndex) {
        return;
      }

      if (ref) {
        //get bound reactangle
        const hoveredRect = ref.current.getBoundingClientRect();
        //center of rect
        const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
        const mousePosition: any = monitor.getClientOffset();
        //diff betwween user mouse height position and rectangle top
        const hoverClientY = mousePosition?.y - hoveredRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      } else {
        return;
      }
    },
  });

  const [{ isDragging }, drag]: any = useDrag({
    type: ITEM_TYPE,
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);
  drag(drop(ref));

  function applyPriorityStyle() {
    if (item.totalRemainingTimeInSeconds < 5) {
      return "card-color-low";
    } else if (item.totalRemainingTimeInSeconds < 11) {
      return "card-color-med";
    } else {
      return "card-color-high";
    }
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent
          ref={ref}
          style={{ opacity: isDragging ? 0 : 1 }}
          onClick={onOpen}
        >
          <div className={applyPriorityStyle()}>
            <div className={classes.cardHeaderPriority}>Normal</div>
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
            <Window item={item} onClose={onClose} onOpen={show} />
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Item;
