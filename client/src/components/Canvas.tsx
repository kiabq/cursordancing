//? Libraries
import { useEffect, useRef, useState } from "react";

//? Contexts
import { useSocket } from "../contexts/socket";

interface ICanvasProps {
    room: string,
    players: any
}

export default function Canvas({ room, players }: ICanvasProps) {
    const socket = useSocket();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [call, setCall] = useState(true);

    function EmitCursor(event: React.MouseEvent) {
        if (!call) return;

        setCall(false);

        const pos = {   
            x: event.pageX / window.innerWidth,
            y: event.pageY / window.innerHeight
        }

        socket?.emit("player_move", {
            position: pos,
            room_id: room
        });

        setTimeout(() => { setCall(true) }, 25);
    }

    const cursor = document.getElementById('cursor-1') as HTMLImageElement;
    const xml = new XMLSerializer().serializeToString(cursor);
    const blob = new Blob([xml], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;

    function draw() {
        const canvas = canvasRef.current;

        img.onload = () => {
            if (canvas instanceof HTMLCanvasElement && cursor) {
                const ctx = (canvas as HTMLCanvasElement).getContext('2d');
                const canvasW = canvas.width;
                const canvasH = canvas.height;

                ctx!.fillStyle = "#DFCCFB";
                ctx!.fillRect(0, 0, canvasW, canvasH);
                ctx!.font = "20px serif";

                if (players) {
                    {
                        Object.keys(players).forEach((key) => {
                            console.log("redrawing");

                            if (socket?.id !== key && players[key].position) {
                                const x = Math.floor(window.innerWidth * players[key]?.position.x) | 0;
                                const y = Math.floor(window.innerHeight * players[key]?.position.y) | 0;

                                ctx!.fillStyle = 'black';
                                ctx!.drawImage(img, x, y);
                                ctx!.fillText(key, x, y + 40);

                                URL.revokeObjectURL(img.src);
                            }
                        })
                    }
                }
            }
        }
    }

    useEffect(() => {
        const reqAnimate = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(reqAnimate);
        }
    }, [players])

    return (
        <canvas
            className="App"
            style={{ "backgroundColor": "#DFCCFB", "zIndex": 9998, "position": "relative" }}
            height={window.innerHeight}
            width={window.innerWidth}
            onMouseMove={(e) => { EmitCursor(e) }}
            ref={canvasRef}
        >
        </canvas>
    )
}