[![Dependency Status](https://david-dm.org/plantain-00/ws-heartbeat.svg)](https://david-dm.org/plantain-00/ws-heartbeat)
[![devDependency Status](https://david-dm.org/plantain-00/ws-heartbeat/dev-status.svg)](https://david-dm.org/plantain-00/ws-heartbeat#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/ws-heartbeat.svg?branch=master)](https://travis-ci.org/plantain-00/ws-heartbeat)
[![npm version](https://badge.fury.io/js/ws-heartbeat.svg)](https://badge.fury.io/js/ws-heartbeat)
[![Downloads](https://img.shields.io/npm/dm/ws-heartbeat.svg)](https://www.npmjs.com/package/ws-heartbeat)

# ws-heartbeat
Server-side and client-side heartbeat library for ws and browser-side Websocket.

#### install

`npm i ws-heartbeat`

#### client side usage

```ts
import { setWsHeartbeat } from "ws-heartbeat/client";
// import * as WebSocket from "ws";
const ws = new WebSocket("ws://localhost:8000");

setWsHeartbeat(ws, '{"kind":"ping"}');
```

options:

```ts
setWsHeartbeat(ws, '{"kind":"ping"}', {
    pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
    pingInterval: 25000, // every 25 seconds, send a ping message to the server.
});
```

#### server-side usage

```ts
import { setWsHeartbeat } from "ws-heartbeat/server";
import * as WebSocket from "ws";

const wss = new WebSocket.Server();

setWsHeartbeat(wss, (ws, data, binary) => {
    if (data === '{"kind":"ping"}') { // send pong if recieved a ping.
        ws.send('{"kind":"pong"}');
    }
});
```

options:

```ts
setWsHeartbeat(wss, (ws, data, flag) => {
    if (data === '{"kind":"ping"}') {
        ws.send('{"kind":"pong"}');
    }
}, 60000); // in 60 seconds, if no message accepted from client, close the connection.
```
