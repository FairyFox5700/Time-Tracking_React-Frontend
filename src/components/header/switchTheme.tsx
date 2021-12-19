import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';
import Switch from 'react-switch';
import ThemeProps from '../../types/ThemProps';

const SwitchTheme : React.FC<ThemeProps> = ({ toggleTheme }) =>  {
     const { colors, title } = useContext(ThemeContext);
    return (
        <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.15, colors.primary)}
        onColor={colors.secondary}
      />
    )
}
export default SwitchTheme;

