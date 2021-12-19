import React from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  isUserEngineer,
  isUserTeamLead,
  isUserProjectManager,
} from "../../utils/jwtUtils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ActionsPopper = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const ListItemLink = (props: ListItemProps<"a", { button?: true }>) => {
    return <ListItem button component="a" {...props} />;
  };
  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Add item
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.root}>
          <List component="nav" aria-label="secondary mailbox folders">
            {(isUserEngineer() ||
              isUserProjectManager() ||
              isUserTeamLead()) && (
              <ListItemLink href="/create-issue">
                <ListItemText primary="Create new task" />
              </ListItemLink>
            )}
            {isUserProjectManager() && (
              <ListItemLink href="/create-project">
                <ListItemText primary="Create new project" />
              </ListItemLink>
            )}
            {isUserTeamLead() && (
              <ListItemLink href="/create-team">
                <ListItemText primary="Create new team" />
              </ListItemLink>
            )}
            {isUserTeamLead() && (
              <ListItemLink href="/create-milestone">
                <ListItemText primary="Create new milestone" />
              </ListItemLink>
            )}
          </List>
        </div>
      </Popover>
    </div>
  );
};
export default ActionsPopper;
