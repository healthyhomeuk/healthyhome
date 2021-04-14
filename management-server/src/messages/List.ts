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

import Message, { InvalidBody, ServerEntity } from "./Message";
import zmq = require("zeromq");

/**
 * Generic list message class
 */
class List extends Message {
    private _list: string[];

    /**
     * Constructor of a {@link List} object
     * @param subject - Subject of the message
     */
    constructor(subject: string) {
        super(ServerEntity, subject);
        this._list = [];
    }

    fromMultipart<T extends Message>(multipart: zmq.MessageLike[]): T {
        return <T>(<unknown>List.fromMultipart(multipart));
    }

    static fromMultipart(multipart: zmq.MessageLike[]): List {
        const [entity, subject, body] = Message.parse(multipart);
        const msg = new List(subject);
        msg._entity = entity;
        msg._body = body;

        if (!body || body.list === undefined) {
            throw InvalidBody();
        }

        msg._list = (<string>body.list)
            .split("\n")
            .map((el) => el.trim())
            .filter((el) => el.length > 0);

        return msg;
    }

    get list(): string[] {
        return this._list;
    }
}

/**
 * Message that fetches the registered devices list.
 */
export class DevicesList extends List {
    constructor() {
        super("devices");
    }
}

/**
 * Message that fetches the registered sensors list.
 */
export class SensorsList extends List {
    constructor() {
        super("sensors");
    }
}
