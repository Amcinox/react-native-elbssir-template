export interface Device {
    ID?: string;
    tag?: string;
    getBaseOs?: string;
    brand?: string;
    device?: string;
    deviceName?: string;
    deviceDisplay?: string;
    deviceId?: string;
    deviceFingerprint?: string;
    manufacturer?: string;
    macAddress?: string;
    model?: string;
    buildId?: string;
    isEmulator?: boolean;
    isTablet?: boolean;
    carrier?: string;
    IP?: string;
    packageName?: string;
    installReferrer?: string;
    readableVersion?: string;
    version?: string;
    buildNumber?: string;
    bundleId?: string;
    systemVersion?: string;
}



export type BiometryType = 'unsupported' | 'Touch ID' | 'Face ID';

export interface Biometry {
    type: BiometryType;
    hasHardware: boolean;
    error?: string | null | unknown;
}



export interface Permissions {
    location?: boolean;
    camera: boolean;
    notifications: boolean;
    contacts?: boolean;
    microphone: boolean;
    cameraRoll: boolean;
    mediaLibrary: boolean;
    motion?: boolean;
    reminders?: boolean;
    bluetooth?: boolean;
    speechRecognition?: boolean;
    tracking?: boolean;
    faceID?: boolean;
}



export enum Languages {
    English = "en",
    Spanish = "es",
    French = "fr",
    Portuguese = "pt",
    German = "de",
    Chinese = "zh",
    Japanese = "ja",
    Korean = "ko",
}


export interface Network {
    details: {
        carrier?: string;
        isConnectionExpensive?: boolean;
    }
    isConnected: boolean | null,
    isInternetReachable: boolean,
    isWifiEnabled?: boolean,
    type: string
}