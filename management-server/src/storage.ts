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
import Datastore from "nedb";
import path from "path";

const urls = {
    hourly: path.resolve(
        config.docstoreFilepath,
        config.docstoreHourlyCollection
    ),
    daily: path.resolve(
        config.docstoreFilepath,
        config.docstoreDailyCollection
    ),
    weekly: path.resolve(
        config.docstoreFilepath,
        config.docstoreWeeklyCollection
    ),
    monthly: path.resolve(
        config.docstoreFilepath,
        config.docstoreMonthlyCollection
    ),
};

/**
 * Document store collections
 */
export const db: Collections = {
    hourly: makeDatastore(urls.hourly),
    daily: makeDatastore(urls.daily),
    weekly: makeDatastore(urls.weekly),
    monthly: makeDatastore(urls.monthly),
};

function makeDatastore<T>(url: string): Datastore<T> {
    return new Datastore<T>({
        filename: url,
        autoload: true,
    });
}

interface Collections {
    hourly: Datastore<TimeframeDocument>;
    daily: Datastore<TimeframeDocument>;
    weekly: Datastore<TimeframeDocument>;
    monthly: Datastore<TimeframeDocument>;
}

interface AvgMinMax {
    avg: number;
    min: number;
    max: number;
}

interface TimeframeDocument {
    timeframe: {
        from: Date;
        to: Date;
    };
    data: { [key: string]: AvgMinMax };
}
