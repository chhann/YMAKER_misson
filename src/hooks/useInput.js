import { useState } from "react";

export const useInput = () => {
    const [value, setValue] = useState("");

    const handleOnChange = (e) => {
        setValue(() => e.target.value);
    }

    return { value, handleOnChange, setValue };
}