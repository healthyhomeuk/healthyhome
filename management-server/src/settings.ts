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

import path from "path";
import config from "./config";
import fs from "fs";

const settingsFilename = path.resolve(
    config.settingsFilepath,
    config.settingsFilename
);

const settingsObject = loadSettings(settingsFilename);

/**
 * User settings object
 */
export const settings = interceptSet(settingsObject, (obj, key, value) => {
    obj[key] = value;

    fs.writeFile(settingsFilename, JSON.stringify(obj), (err) => {
        if (err) {
            console.error(
                `failed to save settings to '${settingsFilename}': ${err}`
            );
        }
    });

    return true;
});

/**
 * Settings object type
 */
export type Settings = {
    pushTokens?: { [recipient: string]: string };
    [key: string]: unknown;
};

interface SetCallbackFn {
    (obj: Settings, key: string, value: unknown): boolean;
}

function loadSettings(fileUrl: string): Settings {
    try {
        const fileContents = fs.readFileSync(fileUrl);
        return JSON.parse(fileContents.toString());
    } catch (ex) {
        return {};
    }
}

function interceptSet(object: Settings, cb: SetCallbackFn): Settings {
    return new Proxy(object, {
        set: cb,
    });
}
