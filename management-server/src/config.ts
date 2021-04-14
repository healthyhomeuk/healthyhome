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

import dotenv from "dotenv";
dotenv.config();

/**
 * Server configuration definition
 */
interface Configuration {
    /**
     * Monitoring server ZeroMQ broadcast TCP address
     * - Environment variable: `MONITD_BROADCAST_ADDRESS`
     */
    monitdBroadcastAddress: string;
    /**
     * Monitoring server ZeroMQ request endpoint TCP address
     * - Environment variable: `MONITD_ENDPOINT_ADDRESS`
     */
    monitdEndpointAddress: string;
    /**
     * Management server HTTP port
     * - Environment variable: `SERVER_PORT`
     * @defaultValue `4000`
     */
    serverPort: number;
    /**
     * Document store file path
     * - Environment variable: `DOCSTORE_FILEPATH`
     */
    docstoreFilepath: string;
    /**
     * Document store hourly collection file name
     * - Environment variable: `DOCSTORE_HOURLY_COLLECTION`
     * @defaultValue `hourly.db`
     */
    docstoreHourlyCollection: string;
    /**
     * Document store daily collection file name
     * - Environment variable: `DOCSTORE_DAILY_COLLECTION`
     * @defaultValue `daily.db`
     */
    docstoreDailyCollection: string;
    /**
     * Document store weekly collection file name
     * - Environment variable: `DOCSTORE_WEEKLY_COLLECTION`
     * @defaultValue `weekly.db`
     */
    docstoreWeeklyCollection: string;
    /**
     * Document store monthly collection file name
     * - Environment variable: `DOCSTORE_MONTHLY_COLLECTION`
     * @defaultValue `monthly.db`
     */
    docstoreMonthlyCollection: string;
    /**
     * User settings file path
     * - Environment variable: `SETTINGS_FILEPATH`
     */
    settingsFilepath: string;
    /**
     * User settings file name
     * - Environment variable: `SETTINGS_FILENAME`
     * @defaultValue `settings.json`
     */
    settingsFilename: string;
}

/** Configuration object */
const config: Configuration = {
    monitdBroadcastAddress: getEnv("MONITD_BROADCAST_ADDRESS"),
    monitdEndpointAddress: getEnv("MONITD_ENDPOINT_ADDRESS"),
    serverPort: getEnvNumber("SERVER_PORT", "4000"),
    docstoreFilepath: getEnv("DOCSTORE_FILEPATH"),
    docstoreHourlyCollection: getEnv("DOCSTORE_HOURLY_COLLECTION", "hourly.db"),
    docstoreDailyCollection: getEnv("DOCSTORE_DAILY_COLLECTION", "daily.db"),
    docstoreWeeklyCollection: getEnv("DOCSTORE_WEEKLY_COLLECTION", "weekly.db"),
    docstoreMonthlyCollection: getEnv(
        "DOCSTORE_MONTHLY_COLLECTION",
        "monthly.db"
    ),
    settingsFilepath: getEnv("SETTINGS_FILEPATH"),
    settingsFilename: getEnv("SETTINGS_FILENAME", "settings.json"),
};

export default config;

/**
 * Retrieve an environment variable and fail if it does not exist, unless
 * a default value is provided.
 *
 * @param envVarName - Environment variable name
 * @param defaultValue - Default value
 */
function getEnv(envVarName: string, defaultValue?: string): string {
    const value = process.env[envVarName] ?? defaultValue;
    if (value) {
        return value;
    }

    throw Error(`expected environment variable '${envVarName}'`);
}

/**
 * Retrieve a numeric environment variable and fail if it does not exist or is
 * invalid, unless a default value is provided.
 *
 * @param envVarName - Environment variable name
 * @param defaultValue - Default value
 */
function getEnvNumber(envVarName: string, defaultValue?: string): number {
    const numberValue = Number.parseInt(getEnv(envVarName, defaultValue));
    if (Number.isNaN(numberValue)) {
        throw Error(
            `invalid integer value for environment variable '${envVarName}'`
        );
    }

    return numberValue;
}
