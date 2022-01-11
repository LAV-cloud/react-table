import React, { useState } from "react";

export default function useInput(defaultValue: string = "") {
    const [value, setValue] = useState(defaultValue);

    return {
        bind: {
            value,
            onChange: (e: any) => setValue(e.target.value)
        },
        clear: () => setValue(defaultValue),
        value: () => value,
    }
}