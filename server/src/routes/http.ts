//? Global
import { RoomHandler, io } from '../../server';

//? Utils
import roomhash from '../../utils/roomhash';

//? Types
import type * as Koa from 'koa';
import type Router = require('koa-router');

type KoaRoute = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>

export async function getRooms(ctx: KoaRoute) {
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
        io.emit("room_new", newRoom);

        ctx.status = 200;
        ctx.body = { createdRoom };
    } catch (err) {
        ctx.status = 409;
        ctx.body = err;
    }
}