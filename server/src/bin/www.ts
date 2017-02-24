#!/usr/bin/env node
"use strict";

import { ServerApp } from '../server';
import { Server } from "http";
import * as express from 'express';
import {createServer} from "http";

let debug = require("debug")("express:serverApp");

let serverApp: ServerApp = ServerApp.bootstrap();
let app: express.Application = serverApp.app;
let httpServer: Server = createServer(app);

httpServer.listen(serverApp.port);

httpServer.on("listening", onListening);

/**
* Event listener for HTTP serverApp "listening" event.
*/
function onListening() {
    let address = httpServer.address();
    let bind = typeof address === "string"
        ? "pipe " + address
        : "port " + address.port;
    console.log("Listening on " + bind);
    debug("Listening on " + bind);
}