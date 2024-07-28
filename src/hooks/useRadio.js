import { useState } from "react";

export const useRadio = () => {
    const [value, setValue] = useState("");

    const handleOnClick = (e) => {
        const newValue = e.target.value;
        console.log(newValue);
        setValue(prevValue => (prevValue === newValue ? "" : newValue));
    }

    return { value, handleOnClick };
}