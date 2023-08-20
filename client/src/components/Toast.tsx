//? Libraries
import { useReducer } from "react";

//? Types
import type { IToastProps } from "../hooks/useToast";

// Toast triggers
// Toast is pushed to bottom of queue
// Each toast should have an interval that will cause it
// to clear once the interval is reached


export default function Toast({ message, status }: IToastProps) {
    return (
        <p>
            {message}
        </p>
    )
}