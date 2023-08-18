import { IToastProps } from "../hooks/useToast";

export default function Toast({ message, status }: IToastProps) {
    return (
        <p style={{ 'position': 'absolute', 'right': 0, 'bottom': 0, "zIndex": 9999 }}>{message}</p>
    )
}