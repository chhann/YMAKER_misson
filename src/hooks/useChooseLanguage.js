import { useState } from "react";

export const useChooseLanguage = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    const handleOnChange = (e) => {
        setValue(() => e.target.value);
    }

    return { value, handleOnChange, setValue };
}