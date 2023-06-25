/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

type BiometryType = 'unsupported' | 'Touch ID' | 'Face ID';

type AuthenticationResult = {
  isAuthenticated: boolean;
  error: string | null | unknown;
  authenticate: () => Promise<void>;
  biometryType: BiometryType;
  hasHardware: boolean;
};

/**
 * Custom React hook for biometric authentication using Expo Local Authentication.
 *
 * @param callback - A function to be called after successful authentication.
 * @returns An object containing the following properties:
 *          - isAuthenticated: A boolean indicating whether the user has been successfully authenticated.
 *          - error: If an error occurs during authentication, this will contain the error message.
 *          - authenticate: A function to initiate the biometric authentication process.
 *          - hasHardware:  A boolean indicating whether the device has LocalAuthentication hardware or not.
 *          - biometryType: A string indicating the type of biometric authentication supported by the device (e.g. "Touch ID", "Face ID", "unsupported").
 */
const useAuthentication = <T>(callback: () => T): AuthenticationResult => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [biometryType, setBiometryType] = useState<BiometryType>('unsupported');
  const [hasHardware, setHasHardware] = useState(false);
  useEffect(() => {
    checkBiometryType();
  }, []);

  const checkBiometryType = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (hasHardware) {
        setHasHardware(true);
        const supportedTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
          )
        ) {
          setBiometryType('Face ID');
        } else if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT,
          )
        ) {
          setBiometryType('Touch ID');
        } else {
          setBiometryType('unsupported');
        }
      } else {
        setHasHardware(false);
        setBiometryType('unsupported');
      }
    } catch (errors) {
      setBiometryType('unsupported');
      setError(errors);
    }
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setIsAuthenticated(true);
        setError(null);
        callback();
      } else {
        setIsAuthenticated(false);
        setError(result.error);
      }
    } catch (errors) {
      setIsAuthenticated(false);
      setError(errors);
    }
  };

  return { isAuthenticated, error, authenticate, biometryType, hasHardware };
};

export default useAuthentication;
