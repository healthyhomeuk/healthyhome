/*
 * This file is part of the HealthyHome project mobile app
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

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
    uri: "http://192.168.0.4:4000",
    cache: new InMemoryCache(),
});

/**
 * The query to obtain all the sensors registered to the device and its last readings
 *  @constant {DocumentNode}
 */
export const LAST_READINGS = gql`
    query GetLastReadings {
        sensors {
            id
            name
            parameters {
                name
                unit
                qualityTable {
                    qualityValue
                    lowerBoundary
                    upperBoundary
                }
                valueType
                currentValue
                currentQuality
            }
        }
    }
`;
