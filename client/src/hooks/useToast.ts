// //? Libraries
import { useReducer, useState } from "react";

type ToastStatus = "fail" | "success" | "warn";

export interface IToastProps {
    message: string,
    status: ToastStatus,
}

type Toast = {
    id: number,
    message?: string,
}

type ToastReducer = Toast & { type: 'added' | 'removed' }


export default function useToast() {
    let id = 0;

    function toastReducer(toasts: Toast[], action: ToastReducer) {
        switch (action.type) {
            case 'added': {
                return [...toasts, {
                    id: action.id,
                    message: action.message,
                }];
            }
            case 'removed': {
                return toasts.filter((toast) => toast.id !== action.id)
            }
        }
    }

    const [toasts, dispatch] = useReducer(toastReducer, [])

    function showToast(message: string, status: ToastStatus) {
        const newId: number = id++;

        dispatch({
            type: 'added',
            message: message,
            id: newId
        })

        setTimeout(() => {
            dispatch({
                type: 'removed',
                id: newId
            })
        }, 3000)
    }

    return { toasts, showToast };
}