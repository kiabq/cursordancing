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
    const [rooms, setRooms] = useState<Array<string>>([]);
    const manager = useManager();
    const navigate = useNavigate();
    const socket = manager?.socket('/lobby');
    
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

    useEffect(() => {
        if (performance.navigation.type === 1) {}

        getRooms()
            .then((res) => {
                const rooms = res['rooms']?.reverse();

                setRooms(rooms);
            });
        
        // getAttendance()
        //     .then((res) => {
        //         console.log(res);
        //     })

        socket?.connect();

        return (() => {
            socket?.disconnect();   
        })
    }, [])

    socket?.on("room_new", (newRoom) => {
        setRooms([newRoom, ...rooms]);
    });

    return (
        <div id="lobby" className="flex flex-col">
            <div className="container">
                <h1 className="room-header">Cursor Stuff</h1>
                <div className="flex flex-col">
                    <button style={{ "marginBottom": "16px" }} onClick={onSubmit}>Create New Room</button>
                    {rooms?.map((value) => {
                        return <RoomCard link={value} attendance={0} />
                    })}
                </div>
            </div>
        </div>
    )
}