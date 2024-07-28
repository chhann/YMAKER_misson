import { useState } from "react";

export const useSelect = () => {
    const [value, setValue] = useState(0);

    const handleOnChange = (e) => {
        setValue(() => e.target.value);
    }

    return { value, handleOnChange, setValue };
}