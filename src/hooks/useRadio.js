import { useEffect, useState } from "react";

export const useRadio = (initialValue = "", callback) => {
    const [value, setValue] = useState(initialValue);
  
    const handleOnClick = (e) => {
      const newValue = e.target.value;
      setValue((prevValue) => (prevValue === newValue ? "" : newValue));
    };
  
    useEffect(() => {
      if (callback) {
        callback();
      }
    }, [value]);
  
    return { value, handleOnClick };
  };