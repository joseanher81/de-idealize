import { createMuiTheme } from "@material-ui/core";

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
  });
};
