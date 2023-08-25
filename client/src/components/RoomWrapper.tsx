//? Libraries
import React, { ReactNode, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//? Context
import { useManager } from "../contexts/socket";

//? Components
import Toast from "./Toast";
import CursorRight from "../assets/images/CursorRight";

//? Hooks
import useToast from "../hooks/useToast";

export default function RoomWrapper({ children }: { children: ReactNode }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { toasts, showToast } = useToast();

    const params = useParams();
    const navigate = useNavigate();
    const manager = useManager();
    const socket = manager?.socket(`/${params.room}`);

    useEffect(() => {
        socket?.on("user_connected", (user) => {
            if (performance.navigation.type != 1) {
                showToast(`${user} Connected`, 'success');
            }
        });

        socket?.on("user_disconnected", (user) => {
            if (performance.navigation.type != 1) {
                showToast(`${user} Disconnected`, 'fail');
            }
        });

        return () => {
            socket?.off("user_connected");
            socket?.off("user_disconnected");
        }
    }, [])

    function updatePosition(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setPosition({ x: e.clientX, y: e.clientY })
    }

    return (
        <div onMouseMove={updatePosition}>
            <div style={{ 'position': 'absolute', 'right': 0, 'bottom': 0, "zIndex": 9999 }}>
                {toasts && toasts.map((toast) => {
                    if (toast !== undefined) {
                        return <Toast message={toast.message!} status="success" />
                    }
                })}
            </div>

            <CursorRight point={position} />

            {children}
        </div>
    )
}