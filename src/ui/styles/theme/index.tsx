import React, { useEffect } from 'react';
import { createTheme, ThemeProvider, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral: PaletteColor;
    neutralDark: PaletteColor;
  }

  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const Theme = (props) => {
  const { children } = props;
  const initialColorMode: 'light' | 'dark' =
    (localStorage.getItem('colorMode') as 'light' | 'dark') || 'light';
  const [mode, setMode] = React.useState<'light' | 'dark'>(initialColorMode);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const greenColor = '#007B00';
  const orangeColor = '#F18F01';

  const theme = React.useMemo(
    () =>
      createTheme({
        status: {
          danger: '#A90000',
        },
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? greenColor : orangeColor,
          },
          secondary: {
            main: mode === 'light' ? orangeColor : greenColor,
          },
          neutral: {
            main: '#fff',
            contrastText: '#fff',
            dark: '',
            light: ''
          },
          neutralDark: {
            main: '#000',
            contrastText: '#000',
            dark: '',
            light: ''
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
