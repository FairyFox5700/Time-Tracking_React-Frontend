import { Collapse, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { TeamBoardStatuses } from "../../data/boardData";
import KanbanItem from "./draggableItem";

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
        console.log("open"+!open);
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
      <ListItem  button>
          <ListItemText primary={getFullName(groupKey)} />
      </ListItem>
      <Collapse in={open}>
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
