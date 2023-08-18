//? Libraries
import { useState } from "react";

type ToastStatus = "fail" | "success" | "warn";

export interface IToastProps {
    message: string,
    status: ToastStatus,
}

export default function useToast() {
    const [toast, setToast] = useState<IToastProps | null>(null);

    function showToast(message: string, status: ToastStatus) {
        setToast({ message, status });
        setTimeout(() => {
            setToast(null);
        }, 3000)
    }

    return { toast, showToast };
}