//? Libraries
import { useState } from "react"

//? Contexts
import { useManager } from "../contexts/socket";

//? Components
import CursorRight from "../assets/images/CursorRight";

export default function RoomCard({ link, attendance }: { link: string, attendance: number }) {
    const [roomAttendance, setAttendance] = useState<number>(attendance);
    const manager = useManager();
    const socket = manager?.socket('/lobby');

    socket?.on(`attendance_change_${link}`, (value) => {
        setAttendance(value)
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