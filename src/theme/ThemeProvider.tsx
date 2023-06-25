import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { ColorMode } from '../context/SettingsContext';

interface ThemeProviderProps {
  children: JSX.Element;
  colorMode: ColorMode
}
export default function ThemeProvider({ children, colorMode }: ThemeProviderProps) {
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#ebe8ff",
        100: "#ccc4ff",
        200: "#a89efe",
        300: "#8176ff",
        400: "#6653fd",
        500: "#542feb",
        600: "#4f23e0",
        700: "#4811d2",
        800: "#4200c4",
        900: "#3a00aa",
      },
      secondary: {
        50: "#faf3e5",
        100: "#f3e0be",
        200: "#eccc95",
        300: "#e5b870",
        400: "#e0aa59",
        500: "#db9d4d",
        600: "#d69348",
        700: "#ce8642",
        800: "#c67a3e",
        900: "#b7683a",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: colorMode,
    },
  });

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
}
