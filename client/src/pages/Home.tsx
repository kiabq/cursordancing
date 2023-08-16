//? Libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//? Contexts
import { useSocket } from "../contexts/socket";

async function getRooms() {
    return await fetch('http://localhost:3001/rooms')
        .then((res) => res.json())
        .catch((err) => err);
}

export default function Home() {
    const [rooms, setRooms] = useState<object>({});
    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        getRooms()
            .then((res) => {
                setRooms(res);
            });
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
        <div>
            <p>Home</p>
            <button onClick={onSubmit}>Create New Room</button>
            {Object.keys(rooms).map((key) => {
                return (
                    <a href={`/room/${key}`} style={{ 'display': 'block' }}>
                        {key}
                    </a>
                );
            })}
        </div>
    )
}