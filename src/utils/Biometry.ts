import { Biometry, BiometryType } from "../types/SettingsTypes";
import * as LocalAuthentication from 'expo-local-authentication';


export async function checkBiometryType(): Promise<Biometry> {
    let error = null;
    let type: BiometryType = 'unsupported';
    let hasHardware: boolean = false;

    try {
        const fetchHasHardware = await LocalAuthentication.hasHardwareAsync();
        if (fetchHasHardware) {
            hasHardware = true;
            const supportedTypes =
                await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (
                supportedTypes.includes(
                    LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
                )
            ) {
                type = 'Face ID';
            } else if (
                supportedTypes.includes(
                    LocalAuthentication.AuthenticationType.FINGERPRINT,
                )
            ) {
                type = 'Touch ID';
            } else {
                type = 'unsupported';
            }
        } else {
            hasHardware = false;
            type = 'unsupported';
        }
    } catch (errors) {
        type = 'unsupported';
        error = errors;
    }

    return {
        type,
        hasHardware,
        error
    }
};