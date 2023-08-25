//? Libraries
import { useEffect, useRef, useState } from "react";

//? Contexts
import { useManager } from "../contexts/socket";

interface ICanvasProps {
    room: string,
    players: any
}

// TODO: Set user cursor to custom one
// TODO: Add interpolation on canvas

export default function Canvas({ room, players }: ICanvasProps) {
    const manager = useManager();
    const socket = manager?.socket(`/${room}`);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [svg, setSVG] = useState<HTMLImageElement | undefined>();
    const [call, setCall] = useState(true);

    function EmitCursor(event: React.MouseEvent) {
        if (!call) return;
        setCall(false);

        const pos = {
            x: event.pageX / window.innerWidth,
            y: event.pageY / window.innerHeight
        }

        if (call === true) {
            socket?.emit("player_move", {
                position: pos,
                room_id: room
            });
        }

        setTimeout(() => { setCall(true) }, 25);
    }

    useEffect(() => {
        const cursor = document.getElementById('cursor-1') as HTMLImageElement;
        const xml = new XMLSerializer().serializeToString(cursor);
        const blob = new Blob([xml], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;

        setSVG(img);
    }, [])

    function draw() {
        const canvas = canvasRef.current;

        if (canvas instanceof HTMLCanvasElement && svg) {
            const ctx = (canvas as HTMLCanvasElement).getContext('2d');
            const canvasW = canvas.width;
            const canvasH = canvas.height;

            ctx!.fillStyle = "#DFCCFB";
            ctx!.fillRect(0, 0, canvasW, canvasH);
            ctx!.font = "20px serif";

            if (players) {
                {
                    Object.keys(players).forEach((key) => {
                        if (socket?.id !== key && players[key].position) {
                            const x = Math.floor(window.innerWidth * players[key]?.position.x) | 0;
                            const y = Math.floor(window.innerHeight * players[key]?.position.y) | 0;

                            ctx!.fillStyle = 'black';
                            ctx!.drawImage(svg, x, y);
                            ctx!.fillText(key, x, y + 40);
                        }
                    })
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
        <>
            <canvas
                className="App"
                style={{ "backgroundColor": "#DFCCFB", "zIndex": 1, "position": "relative", "cursor": "none" }}
                height={window.innerHeight}
                width={window.innerWidth}
                onMouseMove={(e) => { EmitCursor(e) }}
                ref={canvasRef}
            >
            </canvas>
        </>
    )
}