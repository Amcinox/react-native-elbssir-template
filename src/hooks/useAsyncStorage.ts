import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ReturnObj<T> = {
    value: T;
    updateValue: (newValue: T) => void;
    clearAll: () => void;
    getAllKeys: () => Promise<string[]>;
};

const useAsyncStorage = <T>(key: string, defaultValue: T): ReturnObj<T> => {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const getItem = async () => {
            try {
                const item = await AsyncStorage.getItem(key);
                if (item !== null) {
                    setValue(JSON.parse(item) as T);
                } else {
                    await AsyncStorage.setItem(key, JSON.stringify(defaultValue));
                }
            } catch (e) {
                console.log({
                    hook: "useAsyncStorage",
                    method: "getItem",
                    error: e
                })
            }
        };
        getItem();
    }, []);

    const updateValue = async (newValue: T) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        } catch (e) {
            console.log({
                hook: "useAsyncStorage",
                method: "updateValue",
                error: e
            })
        }
    };

    const clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log({
                hook: "useAsyncStorage",
                method: "clearAll",
                error: e
            })
        }

    }

    const getAllKeys = async () => {
        let keys: any = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            console.log({
                hook: "useAsyncStorage",
                method: "getAllKeys",
                error: e
            })
        } finally {
            return keys
        }
    }




    return { value, updateValue, clearAll, getAllKeys };
};

export default useAsyncStorage;