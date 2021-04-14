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

import zmq = require("zeromq");

const utf8d = new TextDecoder();

const MIN_HEADER_LENGTH = 2;

/** Generator for an invalid multipart error */
export const InvalidMultipart = (): Error =>
    new Error("invalid multipart object given");

/** Generator for an invalid body error */
export const InvalidBody = (): Error => new Error("an invalid body was given");

/**
 * Entity type enumeration
 */
export enum EntityType {
    /** Server entity */
    Server = "SERVER",
    /** Device entity */
    Device = "DEVICE",
    /** Sensor entity */
    Sensor = "SENSOR",
}

/**
 * Tuple-like Entity type comprising of {@link EntityType}
 * and the entity name.
 */
export type Entity = [EntityType, string];

/**
 * Constant that identifies a Server Entity
 */
export const ServerEntity: Entity = [EntityType.Server, ""];

/**
 * Macro that creates a device entity given the name.
 * @param name - Name of the device
 */
export const DeviceEntity: (name: string) => Entity = (name) => [
    EntityType.Device,
    name,
];

/**
 * Macro that creates a sensor entity given the name.
 * @param name - Name of the sensor
 */
export const SensorEntity: (name: string) => Entity = (name) => [
    EntityType.Sensor,
    name,
];

/**
 * Body type tuple-like comprising of {@link EntityType}
 */
export type Body = { [key: string]: string | number | string | boolean };

/**
 * Class representing a monitoring server message
 * which uses ZeroMQ as transmission channel.
 */
export default class Message {
    protected _entity: Entity;
    protected _subject: string;
    protected _body?: Body;

    /**
     * Constructor of a {@link Message} object
     * @param entity - entity of the message
     * @param subject - subject of the message
     * @param body - body of the message if any
     */
    constructor(entity: Entity, subject: string, body?: Body) {
        this._entity = entity;
        this._subject = subject;
        this._body = body;
    }

    /**
     * Method that serializes the message to a ZeroMQ multipart message.
     */
    toMultipart(): zmq.MessageLike[] {
        const multipart: zmq.MessageLike[] = [this._entity[0]];

        if (this._entity[0] != EntityType.Server) {
            multipart.push(this._entity[1]);
        }

        multipart.push(this._subject);

        if (this._body) {
            multipart.concat(
                ...[...Object.entries(this._body)]
                    .map(([key, value]) => [key, value.toString()])
                    .concat()
            );
        }

        return multipart;
    }

    /**
     * Entity getter
     */
    get entity(): Entity {
        return this._entity;
    }

    /**
     * Subject getter
     */
    get subject(): string {
        return this._subject;
    }

    /**
     * Body getter
     */
    get body(): Body | undefined {
        return this._body;
    }

    /**
     * Method that checks if this message has a body.
     */
    hasBody(): boolean {
        return this._body !== undefined;
    }

    /**
     * Helper function that parses entity, subject and body from
     * a multipart object.
     *
     * @param multipart - ZeroMQ multipart object
     * @returns A tuple containing an {@link Entity} object, the subject
     * and the {@link Body} if any.
     * @throws InvalidBody - if the body provided is invalid
     * @throws InvalidMultipart - if the multipart object provided is invalid
     */
    protected static parse(
        multipart: zmq.MessageLike[]
    ): [Entity, string, Body?] {
        if (multipart.length < MIN_HEADER_LENGTH) throw InvalidMultipart();

        let entity: Entity;
        let deviceType: EntityType | undefined;

        const s = popMultipartToString(multipart);
        switch (s) {
            case EntityType.Server:
                entity = [EntityType.Server, ""];
                break;
            case EntityType.Device:
                deviceType = EntityType.Device;
            case EntityType.Sensor:
                if (multipart.length < MIN_HEADER_LENGTH)
                    throw InvalidMultipart();

                const entityName = popMultipartToString(multipart);
                entity = [deviceType ?? EntityType.Sensor, entityName];
                break;
            default:
                throw InvalidMultipart();
        }

        const subject = popMultipartToString(multipart);

        const bodyLength = multipart.length;
        if (bodyLength % 2 !== 0) throw InvalidMultipart();

        let body: Body | undefined;

        if (bodyLength > 0) {
            body = {};
            for (let idx = 0; idx < bodyLength; idx += 2) {
                const key = popMultipartToString(multipart);
                const value = untag(popMultipartToString(multipart));
                body[key] = value;
            }
        }

        return [entity, subject, body];
    }

    /**
     * Parse the current message from a ZeroMQ multipart object
     * @param multipart - ZeroMQ multipart object
     */
    protected parse(multipart: zmq.MessageLike[]): void {
        [this._entity, this._subject, this._body] = Message.parse(multipart);
    }

    /**
     * Parses a ZeroMQ multipart message into a copy of the current object.
     * @param multipart - ZeroMQ multipart message
     */
    fromMultipart<T extends Message>(multipart: zmq.MessageLike[]): T {
        return <T>Message.fromMultipart(multipart);
    }

    /**
     * Static method that creates a new message from a ZeroMQ multipart message.
     * @param multipart - ZeroMQ multipart message
     */
    static fromMultipart(multipart: zmq.MessageLike[]): Message {
        return new Message(...Message.parse(multipart));
    }
}

/**
 * Helper function that pops a message from the multipart object
 * and converts it to a string
 * @param mp - ZeroMQ multipart object
 * @returns Popped message as string
 */
function popMultipartToString(mp: zmq.MessageLike[]): string {
    const buffer = mp.shift();
    if (typeof buffer === "string") return buffer;
    else return utf8d.decode(<ArrayBufferView>buffer);
}

/**
 * Helper function that parses a tagged string.
 * @param str - tagged string
 * @returns The parsed value
 * @throws Error - If the string has an invalid tag
 */
function untag(str: string): number | string | boolean {
    const [tag, value] = str.split(":", 2);

    switch (tag) {
        case "integer":
            return Number.parseInt(value);
        case "decimal":
            return Number.parseFloat(value);
        case "boolean":
            return value === "true";
        default:
            if (value) {
                throw Error("provided string with an invalid tag");
            }
    }

    return str;
}
