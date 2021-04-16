import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LAST_READINGS } from "./api/fetchers";
const SensorsContext = createContext({});

export const SensorsProvider = ({ children }) => {
    const { loading, error, data, ...props } = useQuery(LAST_READINGS, {
        fetchPolicy: "no-cache",
    });
    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        if (!loading && data) {
            setSensors(
                data.sensors.reduce(
                    (params, sensor) =>
                        params.concat(
                            sensor.parameters.map((param) => ({
                                sensorId: sensor.id,
                                paramId: param.id,
                                value: param.currentValue,
                                valueType: param.valueType,
                                quality: param.currentQuality,
                                qualityTable: param.qualityTable,
                                name: param.name
                                    ? `${sensor.name} ${param.name}`
                                    : sensor.name,
                                unit: param.unit,
                            }))
                        ),
                    []
                )
            );
        }
    }, [data]);

    const updateSensor = (sensorUpdate) => {
        const newSensors = [...sensors];
        sensorUpdate.parameters.forEach((paramUpdate) => {
            const param = newSensors.find(
                (el) =>
                    el.sensorId === sensorUpdate.id &&
                    el.paramId === paramUpdate.id
            );
            param.value = paramUpdate.value;
            param.quality = paramUpdate.quality;
        });

        setSensors(newSensors);
    };

    return (
        <SensorsContext.Provider
            value={{ sensors, updateSensor, loading, error }}
        >
            {children}
        </SensorsContext.Provider>
    );
};

export const useSensors = () => useContext(SensorsContext);
