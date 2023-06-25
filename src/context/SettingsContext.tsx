import { createContext, useCallback, useEffect, useReducer } from 'react';
import { getMultiFromAsyncStorage, saveItem } from '../utils/AsyncStorage';
import ErrorHandler from '../utils/ErrorHandler';
import { ColorMode } from 'native-base';
import { useTranslation } from 'react-i18next';
import { Biometry, Device, Permissions, Languages, Network } from '../types/SettingsTypes';
import { checkBiometryType } from '../utils/Biometry';
import { isSecureStoreAvailable } from '../utils/SecureStore';
import NetInfo from '@react-native-community/netinfo';



export interface SettingsState {
  settingsInitilized: boolean;
  settingsError: null | string;
  walkThrough: boolean;
  language: Languages;
  notification: boolean;
  colorMode: ColorMode;
  permissions: Permissions
  device: Device | null;
  biometry: Biometry | null;
  SecureStoreAvailable: boolean;
  network: Network | null;
}


enum InitialState {
  colorMode = "colorMode",
  language = "language",
  walkThrough = "walkThrough",
  notification = "notification",
}

const initialState: SettingsState = {
  settingsInitilized: false,
  settingsError: null,
  [InitialState.language]: Languages.English,
  [InitialState.colorMode]: "dark",
  [InitialState.walkThrough]: false,
  [InitialState.notification]: false,
  permissions: {
    location: false,
    camera: false,
    notifications: false,
    microphone: false,
    mediaLibrary: false,
    cameraRoll: false,
  },

  // device informations
  device: null,
  biometry: null,
  SecureStoreAvailable: false,
  network: null,
};


enum SettingsActionType {
  INITIALIZED = "INITIALIZED",
  UPDATE_PERMISSION = "UPDATE_PERMISSION",
  UPDATE_THEME = "UPDATE_THEME",
  UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
  UPDATE_WALKTHROUGH = "UPDATE_WALKTHROUGH",
  UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION",
  UPDATE_DEVICE = "UPDATE_DEVICE",
  UPDATE_NETWORK = "UPDATE_NETWORK"
}

type SettingsAction =
  | { type: SettingsActionType.INITIALIZED; payload: any }
  | { type: SettingsActionType.UPDATE_PERMISSION; payload: { permission: keyof Permissions; value: boolean } }
  | { type: SettingsActionType.UPDATE_THEME; payload: { colorMode: ColorMode } }
  | { type: SettingsActionType.UPDATE_LANGUAGE; payload: { language: Languages } }
  | { type: SettingsActionType.UPDATE_NOTIFICATION; payload: { notification: boolean } }
  | { type: SettingsActionType.UPDATE_WALKTHROUGH; payload: { walkThrough: boolean } }
  | { type: SettingsActionType.UPDATE_DEVICE; payload: { device: Device } }
  | { type: SettingsActionType.UPDATE_NETWORK; payload: { network: Network } }


const handlers: Record<string, (state: SettingsState, action: SettingsAction) => SettingsState> = {
  // set language & theme  & notification from storage if available on app start up 
  INITIALIZED: (state, action) => {
    return {
      ...state,
      ...action.payload,
    }
  },
  // Update Permissions if user grants or denies permissions
  UPDATE_PERMISSION: (state, action) => ({
    ...state,
    permissions: {
      ...state.permissions,
      [action.payload.permission]: action.payload.value,
    }
  }),

  // Update Theme
  UPDATE_THEME: (state, action) => {
    return {
      ...state,
      colorMode: action.payload.colorMode
    }
  },

  // Update Language
  UPDATE_LANGUAGE: (state, action) => {
    return {
      ...state,
      language: action.payload.language
    }
  },

  // Update WalkThrough
  UPDATE_WALKTHROUGH: (state, action) => {
    return {
      ...state,
      walkThrough: action.payload.walkThrough
    }
  },
  // Update Notification
  UPDATE_NOTIFICATION: (state, action) => {
    return {
      ...state,
      notification: action.payload.notification
    }
  },
  // Update Device
  UPDATE_DEVICE: (state, action) => {
    return {
      ...state,
      device: action.payload.device
    }
  }
  ,
  // Update Network
  UPDATE_NETWORK: (state, action) => {
    return {
      ...state,
      network: action.payload.network,
    }
  }


};

const reducer = (state: SettingsState, action: SettingsAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;




interface SettingsContextProps extends SettingsState {
  updatePermission: (permission: keyof Permissions, value: boolean) => Promise<void>;
  updateTheme: (colorMode: ColorMode) => Promise<void>;
  updateLanguage: (language: Languages) => Promise<void>;
  updateWalkThrough: (walkThrough: boolean) => Promise<void>;
  updateDevice: (device: Device) => Promise<void>;
  updateNetwork: (network: Network) => Promise<void>;

}
const SettingsContext = createContext<SettingsContextProps>({
  ...initialState,
  updatePermission: () => Promise.resolve(),
  updateTheme: () => Promise.resolve(),
  updateLanguage: () => Promise.resolve(),
  updateWalkThrough: () => Promise.resolve(),
  updateDevice: () => Promise.resolve(),
  updateNetwork: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

interface SettingsProviderProps {
  children: React.ReactNode;

}

function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation()


  // set settings on app start up
  useEffect(() => {
    const loadAsyncStorage = async () => {
      try {
        // Language and Color mode
        const { colorMode, language, walkThrough } = await getMultiFromAsyncStorage(
          [{ key: InitialState.colorMode, defaultValue: state.colorMode },
          { key: InitialState.language, defaultValue: state.language },
          { key: InitialState.walkThrough, defaultValue: state.walkThrough }])
        await i18n.changeLanguage(language as string)
        // Device info
        const biometry = await checkBiometryType()
        const SecureStoreAvailable = await isSecureStoreAvailable()
        const network = await NetInfo.fetch()
        // const permissions: Permissions = {
        //   ...state.permissions
        // }
        dispatch({
          type: SettingsActionType.INITIALIZED,
          payload: {
            colorMode,
            language,
            walkThrough,
            // device info
            biometry,
            SecureStoreAvailable,
            network
            // permissions
            // should also added device info here
          }
        })
      } catch (error: Error | any) {
        ErrorHandler({ error, functionName: loadAsyncStorage.name })
        dispatch({
          type: SettingsActionType.INITIALIZED,
          payload: {
            settingErrors: error.message,
          }
        })
      } finally {
        // await 3 seconds to simulate loading from async storage
        await new Promise((resolve: any) => setTimeout(resolve, 3000));
        dispatch({
          type: SettingsActionType.INITIALIZED,
          payload: {
            settingsInitilized: true,
          }
        })

      }

    };
    loadAsyncStorage();
  }, []);


  // listen to network changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      const network: Network = {
        type: state.type,
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        details: state.details
      }
      dispatch({
        type: SettingsActionType.UPDATE_NETWORK,
        payload: { network }
      })

    });
    return () => {
      unsubscribe();
    };
  }, []);
  // Update Permissions if user grants or denies permissions
  const updatePermission = useCallback(async (permission: keyof Permissions, value: boolean) => {
    // update state
    dispatch({
      type: SettingsActionType.UPDATE_PERMISSION,
      payload: {
        permission,
        value
      }
    })
  }, []);

  // Update Theme  if user changes theme
  const updateTheme = useCallback(async (colorMode: ColorMode) => {
    try {
      // save to async storage
      await saveItem(InitialState.colorMode, colorMode)
      // update state
      dispatch({
        type: SettingsActionType.UPDATE_THEME,
        payload: {
          colorMode
        }
      })
    }
    catch (error: Error | any) {
      ErrorHandler({ error, functionName: updateTheme.name })

    }

  }, []);

  // Update Language if user changes language
  const updateLanguage = useCallback(async (language: Languages) => {
    try {
      // save to async storage
      await saveItem(InitialState.language, language)
      // update state
      dispatch({
        type: SettingsActionType.UPDATE_LANGUAGE,
        payload: {
          language,
        }
      })
    } catch (error: Error | any) {
      ErrorHandler({ error, functionName: updateLanguage.name })
    }
  }, []);


  // Update WalkThrough if the user already saw the walkthrough
  const updateWalkThrough = useCallback(async (walkThrough: boolean) => {
    try {
      // save to async storage
      await saveItem(InitialState.walkThrough, walkThrough)
      // update state
      dispatch({
        type: SettingsActionType.UPDATE_WALKTHROUGH,
        payload: {
          walkThrough,
        }
      })
    }
    catch (error: Error | any) {
      ErrorHandler({ error, functionName: updateWalkThrough.name })
    }
  }, []);


  // Update Device
  const updateDevice = useCallback(async (device: Device) => {
    try {
      // update state
      dispatch({
        type: SettingsActionType.UPDATE_DEVICE,
        payload: {
          device,
        }
      })
    }
    catch (error: Error | any) {
      ErrorHandler({ error, functionName: updateDevice.name })
    }
  }, []);

  // Update network
  const updateNetwork = useCallback(async (network: Network) => {
    try {
      // update state
      dispatch({
        type: SettingsActionType.UPDATE_NETWORK,
        payload: {
          network,
        }
      })
    }
    catch (error: Error | any) {
      ErrorHandler({ error, functionName: updateNetwork.name })
    }
  }, []);
  return (
    <SettingsContext.Provider
      value={{
        ...state,
        updatePermission,
        updateTheme,
        updateLanguage,
        updateWalkThrough,
        updateDevice,
        updateNetwork
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };
