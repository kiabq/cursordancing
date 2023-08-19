//? Global
import { RoomHandler, lobbyNamespace } from '../../server';

//? Utils
import roomhash from '../../utils/roomhash';

//? Types
import type * as Koa from 'koa';
import type Router = require('koa-router');

type KoaRoute = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>

export async function getAttendance(ctx: KoaRoute) {
    const rooms = Object.entries(RoomHandler.rooms);

    //! Add Error Handling
    ctx.status = 200;
    ctx.body = {};
}

export async function getRooms(ctx: KoaRoute) {
    //! Add Error Handling
    ctx.status = 200;
    ctx.body = RoomHandler.rooms;
}

export async function createRoom(ctx: KoaRoute) {
    try {
        const socket = ctx.URL.searchParams.get('socket');
        const createdRoom = roomhash();

        if (!socket) {
            throw new Error('');
        }

        const newRoom = RoomHandler.createRoom(createdRoom, socket);
        lobbyNamespace.emit("room_new", newRoom);

        ctx.status = 200;
        ctx.body = { createdRoom };
    } catch (err) {
        ctx.status = 409;
        ctx.body = err;
    }
}
