import AsyncStorage from '@react-native-async-storage/async-storage';
// import EncryptedStorage from "react-native-encrypted-storage";
import * as EncryptedStorage from 'expo-secure-store';

import ErrorHandler from './ErrorHandler';
/*////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Used for storing Amplify Auth tokens in EncryptStorage ///////////////
//////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////
const MYSTORAGE_KEY_PREFIX = "@ElbssirStorage:";
interface IDataMemory {
    [key: string]: string;
}
async function removeUserSession(key: string): Promise<void | Error> {
    try {
        await EncryptedStorage.deleteItemAsync(key);
    } catch (error: Error | any) {
        ErrorHandler({ error, functionName: removeUserSession.name })
        return error;
    }
}

export class MyStorage {
    static syncPromise: Promise<void> | null = null;
    static dataMemory: IDataMemory = {};

    /**
     * This is used to set a specific item in EncryptStorage and the key in AsyncStorage
     */
    static setItem(key: string, value: string): string {
        EncryptedStorage.setItemAsync(key, value);
        AsyncStorage.setItem(MYSTORAGE_KEY_PREFIX + key, key);
        MyStorage.dataMemory[key] = value;
        return MyStorage.dataMemory[key];
    }

    /**
     * This is used to get a specific key from storage
     */
    static getItem(key: string): string | undefined {
        return Object.prototype.hasOwnProperty.call(MyStorage.dataMemory, key)
            ? MyStorage.dataMemory[key]
            : undefined;
    }

    /**
     * This is used to remove an item from EncryptStorage And Asyncstorage
     */
    static removeItem(key: string): boolean {
        removeUserSession(key);
        AsyncStorage.removeItem(MYSTORAGE_KEY_PREFIX + key);
        return delete MyStorage.dataMemory[key];
    }

    /**
     * This is used to clear the storage
     */
    static clear(): IDataMemory {
        MyStorage.dataMemory = {};
        return MyStorage.dataMemory;
    }

    /**
     * Will sync the MyStorage data from AsyncStorage to storageWindow MyStorage
     */
    static sync(): Promise<void> {
        if (!MyStorage.syncPromise) {
            MyStorage.syncPromise = new Promise(async (res, rej) => {
                /**
                 * Get All Keys Stored in AsyncStorage
                 */

                const keys = await AsyncStorage.getAllKeys();

                /**
                 * Filter Keys to get only MyStorage Keys
                 */

                const memoryKeys = keys.filter((key) =>
                    key.startsWith(MYSTORAGE_KEY_PREFIX)
                );

                /**
                 * Get All Values from EncryptStorage using keys from AsyncStorage
                 */

                await Promise.all(
                    memoryKeys.map(async (key) => {
                        const memoryKey = key.replace(MYSTORAGE_KEY_PREFIX, "");
                        const value = await EncryptedStorage.getItemAsync(memoryKey);
                        if (value)
                            MyStorage.dataMemory[memoryKey] = value;
                    })
                );
                res();
            });
        }
        return MyStorage.syncPromise;
    }
}