import { Fade, Popper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import React from "react";
import {
  isUserEngineer, isUserProjectManager, isUserTeamLead
} from "../../utils/jwtUtils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const ActionsPopper = () => {
  const classes = useStyles();
  const ListItemLink = (props: ListItemProps<"a", { button?: true }>) => {
    return <ListItem button component="a" {...props} />;
  };
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
      <Button
        variant="contained"
        color="secondary"
        {...bindToggle(popupState)}
      >
        Add item
      </Button>
      <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
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
        </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
};
export default ActionsPopper;
