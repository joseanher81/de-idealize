import { createMuiTheme, colors } from "@material-ui/core";

export const createTheme = () => {

  return createMuiTheme({
    palette: {
      primary: {
        main: '#FF8BA7',
      },
      background: {
        default: '#FAEEE7',
      },
      text: {
        primary: '#33272A',
        secondary: '#33272A',
      }
    },
    typography: {
      //fontFamily: ['"Baloo 2"', "-apple-system"].join(",")
    }
  });
};
