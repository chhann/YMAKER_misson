import { useCallback, useState } from "react";

export const useSelect = (initialValue = 0) => {
    const [value, setValue] = useState(initialValue);

    const handleOnChange = useCallback((e) => {
        setValue(e.target.value);
      }, []);

    return { value, handleOnChange, setValue };
}