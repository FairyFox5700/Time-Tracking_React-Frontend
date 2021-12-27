import { ThemeOptions } from "@material-ui/core";


const themeOptions=(mode:string):ThemeOptions=> {
   return (mode === "light")
        ? {
            palette: {
                primary: {
                    main: '#9a01e2',
                    dark: '#47295c',
                    light: '#d4b8f4',
                },
                secondary: {
                    main: '#240460',
                    light: '#f39d17',
                },
                background: {
                    paper: '#f1e2f7',
                    default: "#fafafa"
                },
                text: {
                    secondary: 'rgba(53,47,117,0.54)',
                    disabled: 'rgba(195,195,195,0.38)',
                    primary: '#000000',
                },
                info: {
                    main: '#83c5fb',
                },
                success: {
                    main: '#6aea70',
                },
                warning: {
                    main: '#ffb343',
                },
                error: {
                    main: '#f95f56',
                },
            },
            typography: {
                h3: {
                    fontFamily: 'Lato',
                },
                fontFamily: 'Lato',
                htmlFontSize: 16,
                fontSize: 14,
            },
        }
        : {
            palette: {
                primary: {
                    main: '#9a01e2',
                    dark: '#47295c',
                    light: '#d4b8f4',
                },
                secondary: {
                    main: '#240460',
                    light: '#f39d17',
                },
                background: {
                    paper: '#705A90',
                    default: "#332F2F"
                },
                text: {
                    secondary: 'rgba(53,47,117,0.54)',
                    disabled: 'rgba(195,195,195,0.38)',
                    primary: '#ffffff',
                },
                info: {
                    main: '#83c5fb',
                },
                success: {
                    main: '#6aea70',
                },
                warning: {
                    main: '#ffb343',
                },
                error: {
                    main: '#f95f56',
                },
            },
            typography: {
                h3: {
                    fontFamily: 'Lato',
                },
                fontFamily: 'Lato',
                htmlFontSize: 16,
                fontSize: 14,
            },
        }
    };

export default themeOptions;
