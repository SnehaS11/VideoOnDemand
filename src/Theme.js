import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5ea4e0',
      dark: '#0d449e',
      light: '#acd7fc'
    },
    secondary: {
      main: '#666666',
    },
  },
  overrides: {
    MuiButton: {
      label: {
        color: 'white'
      }
    }
  }
});

export default theme;
