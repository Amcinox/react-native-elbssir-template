import * as SecureStore from 'expo-secure-store';
import ErrorHandler from './ErrorHandler';
type AsyncReturnType<T extends (...args: any) => Promise<any>> = ReturnType<T> extends Promise<infer U> ? U : never;


// used to get values from Secure store ! and if it's note exist will store the default value and return it
export const getAndSaveValueFromSecureStore = async (
    key: string,
    defaultValue: any): Promise<AsyncReturnType<typeof JSON.parse>> => {
    let value = defaultValue;
    try {
        const jsonValue = await SecureStore.getItemAsync(key);

        if (jsonValue !== null) {
            value = JSON.parse(jsonValue);
        } else {
            await SecureStore.setItemAsync(key, JSON.stringify(defaultValue));
        }
    } catch (error: Error | any) {
        ErrorHandler({ error, functionName: getAndSaveValueFromSecureStore.name })
    }
    return value;
};



export const getValueFromSecureStore = async<T>(key: string, options?: SecureStore.SecureStoreOptions): Promise<T | null> => {
    let value: T | null = null;
    try {
        const jsonValue = await SecureStore.getItemAsync(key, options)
        if (jsonValue !== null) {
            value = JSON.parse(jsonValue);
        }
    } catch (error: Error | any) {
        ErrorHandler({ error, functionName: getValueFromSecureStore.name })
    }
    return value
}


export const setValueToSecureStore = async (key: string, value: string, options?: SecureStore.SecureStoreOptions) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(value), options)
    } catch (error: Error | any) {
        ErrorHandler({ error, functionName: getValueFromSecureStore.name })
    }
}



export const deleteValueFromSecureStore = async (key: string, options?: SecureStore.SecureStoreOptions): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error: Error | any) {
        ErrorHandler({ error, functionName: deleteValueFromSecureStore.name })
    }
}

export const isSecureStoreAvailable = async (): Promise<Boolean> => {
    return await SecureStore.isAvailableAsync()
}