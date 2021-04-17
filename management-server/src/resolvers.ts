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

import { pushUpdates } from "./updates";
import { hasRecipient, toggleRecipient } from "./notifications";
import { getDevices } from "./messages";
import { getSensors } from "./sensors";
import { NumberType, Quality } from "./sensors/types";
import { ChangeServerNameMutation } from "./schema";
import { settings } from "./settings";

/**
 * GraphQL resolver to change the server name
 * @param _ - unused
 * @param newName - new server name
 */
function changeServerName(
    _: unknown,
    { newName }: ChangeServerNameMutation
): boolean {
    settings.serverName = newName;
    return true;
}

/**
 * GraphQL resolvers object
 */
export default {
    Query: {
        serverName: () => settings.serverName ?? "HealthyHome",
        devices: getDevices,
        sensors: getSensors,
        hasNotifications: hasRecipient,
    },
    Mutation: {
        toggleNotifications: toggleRecipient,
        changeServerName
    },
    Subscription: {
        sensorUpdate: {
            subscribe: pushUpdates,
        },
    },
    Quality,
    NumberType,
};
