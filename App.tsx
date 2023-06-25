import 'react-native-gesture-handler';
import "./src/locales/i18n";
import React, { useEffect } from 'react';
import Navigation from './src/routes/Navigation';
import { StatusBar } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';


// Providers
import ThemeProvider from './src/theme/ThemeProvider';
import { AuthProvider } from './src/context/AuthContext';
import { SettingsProvider } from './src/context/SettingsContext';


// Components
import DevBadge from './src/components/DevBadge';
import AccessChecker from "./src/components/AccessChecker";


// Hooks
import useAuth from './src/hooks/useAuth';
import useLoadingComplete from './src/hooks/useLoadingComplete';
import useSettings from './src/hooks/useSettings';
import useLoadAssets from './src/hooks/useLoadAssets';
SplashScreen.preventAutoHideAsync();

function App(): JSX.Element {
  const { colorMode, settingsInitilized, settingsError } = useSettings()
  const { authInitilized, authError } = useAuth()
  const { assetsInitilized, assetsError } = useLoadAssets()


  // useLoadingComplete hook will take all loading states and return true if all of them are true and also return errors if exist
  const { complete, errors } = useLoadingComplete([settingsInitilized, authInitilized, assetsInitilized], [settingsError, authError, assetsError])

  useEffect(() => {
    if (complete) {
      SplashScreen.hideAsync();
    }
  }, [complete])



  return (
    <React.Fragment>
      <StatusBar
        backgroundColor={colorMode == 'light' ? '#fff' : '#000'}
        barStyle={colorMode == 'light' ? 'dark-content' : 'light-content'}
      />
      <ThemeProvider colorMode={colorMode}>
        <React.Fragment>
          <DevBadge />
          <Navigation />
          <AccessChecker />
        </React.Fragment>
      </ThemeProvider>
    </React.Fragment>
  );
}


function WrappedApp() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SettingsProvider>
  )

}

export default WrappedApp;
