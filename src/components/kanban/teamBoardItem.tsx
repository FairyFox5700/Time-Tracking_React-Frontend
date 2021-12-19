import React, { useRef } from "react";
import { ListItem, ListItemIcon, ListItemText, Collapse, List, GridList, Grid } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import KanbanItem from "./draggableItem";
import { TeamBoardStatuses } from "../../data/boardData";

export interface TeamBoardItemProps {
  groupKey: string;
  id:number;
  statuses:TeamBoardStatuses;
}

const TeamItem: React.FC<TeamBoardItemProps> = ({
  groupKey,
  statuses,
  id,
}) => {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        console.log("sta"+statuses.data);
        console.log("key"+groupKey);
      setOpen(!open);
    };


    const getFullName = (groupKeyString:string):string=> {
        console.log("group key"+ groupKeyString);
        if(statuses.data && statuses.data[groupKeyString]&& statuses.data[groupKeyString][0]){
            return statuses.data[groupKeyString][0].assignedUserFirstName + " "+ 
            statuses.data[groupKeyString][0].assignedUserLastName;
        }else{
            return "";
        }
    }

  return (
  <Grid key = {id} item>
      <ListItem key = {id} button onClick={handleClick}>
          <ListItemIcon>
              <ExpandLess />
          </ListItemIcon>
          <ListItemText primary={getFullName(groupKey)} />
          {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
              {statuses.data[groupKey]?.map((iss, idx) => (
                  <List component="div" disablePadding>
                      <KanbanItem
                          item={iss}
                          key={idx}
                          issueId={iss.issueId}
                      ></KanbanItem>
                  </List>
              ))}
          </Collapse>
          </Grid>);
};

export default  TeamItem;
