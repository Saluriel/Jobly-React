import { useState, useEffect } from "react";

function useLocalStorage(key, firstVal = null) {
    // set initial val to the key prop or the first value
    const initialVal = localStorage.getItem(key) || firstVal;

    const [data, setData] = useState(initialVal);

    useEffect(function putKeyInStorage() {
        // if there's no data, remove the key from local storage, otherwise set it and the key in the localStorage
        if (data === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, data)
        }
    }, [key, data])

    return [data, setData];
}

export default useLocalStorage;