import { makeStyles, Theme, useTheme } from '@material-ui/core';
import React from 'react';
import Switch from 'react-switch';
import ThemeProps from '../../types/ThemProps';


const SwitchTheme : React.FC<ThemeProps> = ({ toggleTheme,mode }) =>  {
  const useStyles = makeStyles((theme:Theme) => ({
    root: {
      color: theme.palette.secondary.main,
    },
  }));
  
  const theme = useTheme();
  const classes = useStyles();
    return (
        <Switch
        onChange={toggleTheme}
        checked={mode==="dark"}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        color="secondary"
        onColor={theme.palette.secondary.light}
      />
    )
}
export default SwitchTheme;

