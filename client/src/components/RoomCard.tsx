//? Libraries
import { useState } from "react"

//? Contexts
import { useSocket } from "../contexts/socket";

//? Components
import CursorRight from "../assets/images/CursorRight";

//? Types
import type { AttendanceInfo } from "@backend/types";

export default function RoomCard({ link }: { link: string }) {
    const [roomAttendance, setAttendance] = useState<number>();
    const socket = useSocket();

    socket?.on(`attendance_change_${link}`, (attendance) => {
        setAttendance(attendance)
    })

    return (
        <a href={`/room/${link}`} className="room-card flex flex-col space-between">
            <h2>{link}</h2>
            <div className="flex content-end">
                {/* User Image Here */}
                <div className="flex">
                    <CursorRight />

                    {/* User Count */}
                    <span>{roomAttendance} / 8</span>
                </div>

            </div>
        </a>
    )
}