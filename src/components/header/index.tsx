import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import ThemeProps from '../../types/ThemProps';
import { isUserLoggedIn } from '../../utils/jwtUtils';
import ActionsPopper from '../poper/actionPoper';
import AccountItem from './account';
import Messages from './messages';
import NotificationItem from './notification';
import Search from './search';
import SwitchSideBar from './sideBarSwitch';
import "./styles.css";
import SwitchTheme from './switchTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    containerStyle: {
      height: "60",
      background: "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(78, 99, 122, 1) 100%)",
      color: "#ffffff",
      flexGrow: 1,
      padding: "0 30px",
    },
    title: {
      fontFamily: "Warnes",
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 50,
      loneHeight: 65,
      justifyItems: "flex-start",
      flexDirection: "row",
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    infoSection: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);



const Header: React.FC<ThemeProps> = ({ toggleTheme, mode }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = useState(false);

  const isLogedIn = isUserLoggedIn();
  const handleDrawerOpenClose = () => {
    if (isLogedIn) setOpen(!open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <ActionsPopper />
      <Messages />
      <NotificationItem />
    </Menu>
  );

  return (
    <div className={classes.containerStyle} >
      <Toolbar>
        <SwitchSideBar
          sideBarOpen={open}
          handleDrawerOpenClose={handleDrawerOpenClose}
        />
        <Typography className={classes.title} variant="h6" noWrap>
          LILO
        </Typography>
        <div className={classes.grow} />
        <div className={classes.infoSection}>
          {isLogedIn && <ActionsPopper />}
          {isLogedIn && <Search />}
          {isLogedIn && <Messages />}
          {isLogedIn && <NotificationItem />}
          <AccountItem />
          <SwitchTheme toggleTheme={toggleTheme} mode={mode} />
        </div>

        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default Header;
