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

import { Expo, ExpoPushTicket, ExpoPushToken } from "expo-server-sdk";
import { HasNotificationsQuery, ToggleNotificationsMutation } from "./schema";
import { settings } from "./settings";

const expo = new Expo();

/**
 * Push notification to the registered recipients
 * @param notification - Notification
 */
export function push(notification: string): Promise<ExpoPushTicket> {
    const allTokens = settings.pushTokens ? { ...settings.pushTokens } : {};
    const validPushTokens: ExpoPushToken[] = [];

    for (const id in allTokens) {
        if (deleteTokenIfInvalid(id)) {
            continue;
        }

        validPushTokens.push(allTokens[id]);
    }

    return expo
        .sendPushNotificationsAsync([
            {
                to: validPushTokens,
                sound: "default",
                body: notification,
            },
        ])
        .then(([ticket]) => ticket);
}

/**
 * GraphQL resolver to add/remove a recipient
 * @param _ - unused
 * @param recipientId - recipient unique identifier
 * @param pushToken - Expo push token
 */
export function toggleRecipient(
    _: unknown,
    { recipientId, pushToken }: ToggleNotificationsMutation
): boolean {
    const pushTokens = settings.pushTokens ?? {};
    if (pushTokens[recipientId]) {
        delete pushTokens[recipientId];
        settings.pushTokens = pushTokens;
    } else if (pushToken) {
        if (!Expo.isExpoPushToken(pushToken)) {
            throw Error("not a valid push token");
        }

        settings.pushTokens = { ...pushTokens, [recipientId]: pushToken };
        return true;
    }
    return false;
}

/**
 * GraphQL resolver to check if a recipient is registered
 * @param _ - unused
 * @param recipientId - recipient unique identifier
 */
export function hasRecipient(
    _: unknown,
    { recipientId }: HasNotificationsQuery
): boolean {
    if (deleteTokenIfInvalid(recipientId)) {
        return false;
    }

    const pushTokens = settings.pushTokens ?? {};
    return pushTokens.hasOwnProperty(recipientId);
}

/**
 * Helper function which checks a recipient's push token and if invalid
 * it deletes it and updates the settings automatically.
 * @param recipientId - recipient unique identifier
 * @returns `true` if the token was invalid, `false` otherwise
 */
function deleteTokenIfInvalid(recipientId: string): boolean {
    const pushTokens = settings.pushTokens ? { ...settings.pushTokens } : {};
    const token = pushTokens[recipientId];

    if (token && !Expo.isExpoPushToken(token)) {
        console.error(`Push token ${token} is not a valid Expo push token`);
        delete pushTokens[recipientId];
        settings.pushTokens = pushTokens;
        return true;
    }

    return false;
}
