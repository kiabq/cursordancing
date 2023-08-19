//? Libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//? Contexts
import { useManager } from "../contexts/socket";

//? Components
import RoomCard from "../components/RoomCard";

async function getRooms() {
    return await fetch('http://localhost:3001/rooms')
        .then((res) => res.json())
        .catch((err) => err);
}

async function getAttendance() {
    return await fetch('http://localhost:3001/attendance')
        .then((res) => res.json())
        .catch((err) => err);
}

export default function Lobby() {
    const [rooms, setRooms] = useState<object>({});
    const manager = useManager();
    const navigate = useNavigate();
    const socket = manager?.socket('/lobby');
    
    useEffect(() => {
        getRooms()
            .then((res) => {
                setRooms(res);
            });
        
        getAttendance()
            .then((res) => {
                console.log(res);
            })

        socket?.connect();

        return (() => {
            socket?.disconnect();   
        })
    }, [])

    async function onSubmit() {
        const result: { createdRoom: string } = await fetch(`http://localhost:3001/create-room?socket=${socket?.id}`, {
            method: "POST"
        }).then((res) => {
            return res.json();
        }).catch((err) => {
            console.log("err: ", err);
        })

        if (result) {
            navigate(`/room/${result.createdRoom}`);
        }
    }

    socket?.on("room_new", (newRoom) => {
        setRooms({ ...rooms, [newRoom.id]: newRoom });
    });

    return (
        <div id="lobby" className="flex flex-col">
            <div className="container">
                <h1 className="room-header">Cursor Stuff</h1>
                <div className="flex flex-col">
                    {Object.values(rooms).map(({ id, attendance }) => {
                        return <RoomCard link={id} attendance={attendance.amount} />
                    })}
                    <button onClick={onSubmit}>Create New Room</button>
                </div>
            </div>
        </div>
    )
}