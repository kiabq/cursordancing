//? Types
import { IClient, ClientPosition } from "../../utils/types";

export class Clients {
    clients: IClient = {}

    constructor() {
        this.clients = {};
        this.saveClients = this.saveClients.bind(this);
        this.removeClients = this.removeClients.bind(this);
    }

    public saveClients(socket: string, position: ClientPosition, connected_id: string) {
        this.clients[socket] = { socket, position, connected_id };
    }

    public removeClients(socket: string) {
        delete this.clients[socket];
    }
};