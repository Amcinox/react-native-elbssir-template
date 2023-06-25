import { createContext, useCallback, useEffect, useReducer } from 'react';
import { getValueFromAsyncStorage, saveItem } from '../utils/AsyncStorage';
import { deleteValueFromSecureStore, getValueFromSecureStore, setValueToSecureStore } from '../utils/SecureStore';
const EnrolledKey = 'EnrolledKey'; // the key to save enrolled biometric in secure storage ( should be refactored to be more generic )

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface EnrollBiometric {
  enrolled: boolean;
  user: User;
  refreshToken: string; // could use password instead of refresh token
}


export interface AuthState {
  authInitilized: boolean;
  authError: null | string;
  isAuthenticated: boolean;
  isEnrolledBiometric: boolean;
  user: User | null;
}




const initialState: AuthState = {
  authInitilized: false,
  authError: null,
  isAuthenticated: true,
  isEnrolledBiometric: false,
  user: null,
};

enum AuthActionType {
  INITIALIZED = "INITIALIZED",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  RESET = "RESET",
  ENROLL_BIOMETRIC = "ENROLL_BIOMETRIC",
}


type AuthAction =
  | { type: AuthActionType.INITIALIZED; payload: any }
  | { type: AuthActionType.LOGIN; payload: any }
  | { type: AuthActionType.LOGOUT; payload: any }
  | { type: AuthActionType.RESET; payload: any }
  | { type: AuthActionType.ENROLL_BIOMETRIC; payload: boolean };



const handlers: Record<string, (state: AuthState, action: AuthAction) => AuthState> = {
  INITIALIZED: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  LOGIN: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload.user,
  }),
  RESET: (state, action) => ({
    ...initialState,
    isAuthenticated: false,
  }),
  ENROLL_BIOMETRIC: (state, action) => ({
    ...state,
    isEnrolledBiometric: action.payload,
  }),
};





const reducer = (state: AuthState, action: AuthAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;




interface AuthContextProps extends AuthState {
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  resetAuthState: () => void;

  // biometric
  enrollBiometric: (enrollPayload: EnrollBiometric) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps>({
  ...initialState,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  resetAuthState: () => { },
  enrollBiometric: () => Promise.resolve(),
  loginWithBiometric: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize Auth and check if FaceID is available
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // const user = await getUserFromAsyncStorage();
        // const faceIDAvailable = await isFaceIDAvailable();
        // const authInitilized = true;
        const isAuthenticated = await getValueFromAsyncStorage("isAuthenticated", false)

        // TODO: remove this mock user
        const user = {
          id: 123,
          name: "Simo Elbssir",
          email: "example@elbssir.com",
          avatar: "https://static.wikia.nocookie.net/star-wars-legends/images/d/d8/DjinDjarinS2-EW.png",
        }

        // verify is biometric enrolled
        const enrolledBiometric = await getValueFromSecureStore<EnrollBiometric>(EnrolledKey)
        // check if the current user  is enrolled biometric ( because they can be multiple users)
        const isEnrolledBiometric = enrolledBiometric?.user.email === user.email ? true : false

        dispatch({
          type: AuthActionType.INITIALIZED,
          payload: {
            authInitilized: true,
            isAuthenticated,
            user,
            isEnrolledBiometric
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    initializeAuth();
  }, []);


  const logout = async () => {
    dispatch({
      type: AuthActionType.LOGOUT,
      payload: {
      },
    });
  };
  const login = async () => {
    // login logic here 
    await saveItem("isAuthenticated", true)
    dispatch({
      type: AuthActionType.LOGIN,
      payload: {
        isAuthenticated: true,
        user: {
          id: 123,
          name: "Simo Elbssir",
          email: "example@elbssir.com",
          avatar: "https://static.wikia.nocookie.net/star-wars-legends/images/d/d8/DjinDjarinS2-EW.png",
        }
      },
    });

  }
  const register = async () => {
    console.log("register")
  }


  const resetAuthState = async () => {
    dispatch({ type: AuthActionType.RESET, payload: {} });
  }



  // ---------------------------------------------------------------------- //
  // -------------------------- Biometric Login --------------------------- //
  // ---------------------------------------------------------------------- //


  // Enroll biometric ( when user enable biometric login like faceID or touchID)
  const enrollBiometric = async ({ enrolled, user, refreshToken }: EnrollBiometric) => {
    try {
      enrolled ?
        await setValueToSecureStore(EnrolledKey, JSON.stringify({ user, refreshToken }))
        :
        deleteValueFromSecureStore(EnrolledKey)
      // store refresh token in secure storage 
      dispatch({ type: AuthActionType.ENROLL_BIOMETRIC, payload: enrolled });
    } catch (error) {
      console.log(error)
    }
  }


  // login with biometric ( when user enable biometric login like faceID or touchID)
  const loginWithBiometric = async () => {
    try {
      // get enrolled biometric user
      const enrolledBiometric = await getValueFromSecureStore<EnrollBiometric>(EnrolledKey)
      if (!enrolledBiometric) return
      // TODO: call login api with refresh token and get new access token then dispatch login action
      // and save new access and refresh token in secure storage
      dispatch({ type: AuthActionType.LOGIN, payload: { user: enrolledBiometric.user } });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
        register,
        resetAuthState,
        // biometric login
        enrollBiometric,
        loginWithBiometric
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
