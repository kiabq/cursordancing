//? Global
import { redis, lobbyNamespace } from '../../server';

//? Utils
import roomhash from '../../utils/roomhash';

//? Types
import type * as Koa from 'koa';
import type Router = require('koa-router');

// TODO: Move to types.ts
type KoaRoute = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>

// TODO: Move to different dir
export async function getAttendance(room: string) {
    try {
        let cursor = 0;
    } catch (err) {

    }
}

export async function getRooms(ctx: KoaRoute) {
    const rooms = await redis.smembers("rooms");
    const attendance = null;

    //! Add Error Handling
    ctx.status = 200;
    ctx.body = { rooms };
}

export async function createRoom(ctx: KoaRoute) {
    try {
        const socket = ctx.URL.searchParams.get('socket');

        if (!socket) {
            throw new Error('');
        }

        const createdRoom = roomhash();
        redis.sadd("rooms", createdRoom).then(() => {
            lobbyNamespace.emit("room_new", createdRoom);
        })

        ctx.status = 200;
        ctx.body = { createdRoom };
    } catch (err) {
        ctx.status = 409;
        ctx.body = err;
    }
}