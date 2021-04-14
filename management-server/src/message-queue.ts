/*
 * This file is part of the HealthyHome project management server
 * available at <https://www.github.com/healthyhomeuk/healthyhome>.
 *
 * Copyright (C) 2021 the authors of the HealthyHome project.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import config from "./config";
import zmq = require("zeromq");
import Message from "./messages/Message";
import DeferredPromise from "./deferred-promise";

const broadcast = new zmq.Subscriber();
const endpoint = new zmq.Request();

interface Request {
    message: zmq.MessageLike[];
    promise: DeferredPromise<zmq.MessageLike[]>;
}

export interface UpdateCallback {
    (message: Message): void;
}

const requests: DeferredPromise<Request>[] = [];
let newRequest = new DeferredPromise<void>();

/**
 * Polling-free synchronised request-puller generator function.
 */
async function* nextRequest(): AsyncGenerator<Request> {
    for (;;) {
        const currentRequest = requests.pop();
        if (currentRequest) {
            yield await currentRequest;
        } else {
            await newRequest;
            newRequest = new DeferredPromise();
        }
    }
}

/**
 * Queries the monitoring server with a request.
 *
 * @param message - Request message
 * @returns Response message
 */
export function query<T extends Message>(message: T): Promise<T> {
    const request = new DeferredPromise<Request>();
    requests.push(request);

    const response = new DeferredPromise<zmq.MessageLike[]>();
    request.resolve({
        message: message.toMultipart(),
        promise: response,
    });

    if (newRequest.state === "pending") newRequest.resolve();

    return response.then((mp) => message.fromMultipart<T>(mp));
}

/**
 * Worker function that handles all the ZeroMQ requests sequentially.
 */
async function handleRequests(): Promise<void> {
    for await (const request of nextRequest()) {
        try {
            await endpoint.send(request.message);
            const response = await endpoint.receive();
            request.promise.resolve(response);
        } catch (err) {
            request.promise.reject(err);
        }
    }
}

/**
 * Worker function that subscribes to the monitoring
 * server updates and processes them.
 * @param callback - Callback that handles the incoming updates
 */
async function handleUpdates(callback: UpdateCallback): Promise<void> {
    for await (const multipart of broadcast) {
        try {
            callback(Message.fromMultipart(multipart));
        } catch (err) {
            console.error(err);
        }
    }
}

/**
 * Function to run the Monitoring Server Message Queue client.
 * @param callback - Callback that handles the incoming updates
 */
export function run(callback: UpdateCallback): void {
    broadcast.connect(config.monitdBroadcastAddress);
    broadcast.subscribe("");
    handleUpdates(callback);

    endpoint.connect(config.monitdEndpointAddress);
    handleRequests();
}
