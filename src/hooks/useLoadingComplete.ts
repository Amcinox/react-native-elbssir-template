import { useState, useEffect } from 'react';

type ErrorType = string | null;
type LoadingArrayType = Array<boolean>;
type ErrorArrayType = Array<ErrorType>;

interface LoadingCompleteState {
    complete: boolean;
    errors: ErrorArrayType;
}



/**
* Monitors the loading state of an array of items and provides the completion status and any associated errors.
* @param loadingArray An array of boolean values indicating the loading state of individual items.
* @param errorArray An array of error messages associated with the loading state of individual items.
* @returns An object containing the completion status and any errors. The completion status is true when all items have finished loading, otherwise false. The errors array contains any non-null error messages associated with the loading process.
* @example
* const loadingItems = [true, true, false];
* const errorMessages = [null, "Error occurred", null];
* const { complete, errors } = useLoadingComplete(loadingItems, errorMessages);
*  complete: false
*  errors: ["Error occurred"]
*/
const useLoadingComplete = (
    loadingArray: LoadingArrayType,
    errorArray: ErrorArrayType
): LoadingCompleteState => {
    const [complete, setComplete] = useState(false);
    const [errors, setErrors] = useState<ErrorArrayType>([]);
    useEffect(() => {
        const allLoaded = loadingArray.every((value) => value);
        if (allLoaded) {
            setComplete(true);
            const hasErrors = errorArray.some((error) => error !== null);
            if (hasErrors) {
                const filteredErrors = errorArray.filter((error) => error !== null);
                setErrors(filteredErrors);
            } else {
                setErrors([]);
            }
        }
    }, [JSON.stringify(loadingArray), JSON.stringify(errorArray)]);

    return { complete, errors };
}

export default useLoadingComplete;