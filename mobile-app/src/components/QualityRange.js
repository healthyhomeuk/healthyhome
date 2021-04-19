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

import React from "react";
import Svg, { Rect, Text } from "react-native-svg";
import { getStyleFromLevel } from "./SensorData";

const sidesOffset = 8;
const thickness = 4;
const tickLength = 2;
const rounding = 2;
const fontSize = 5;

function QualityRange({ qualityTable }) {
    const boundaries = splitBoundaries(qualityTable);
    const positions = [...getPositions(boundaries), 100];
    const segments = boundaries.map((value, idx) => [...value, idx]);
    segments.unshift(segments.pop());

    return (
        <Svg height={50} fill="none" viewBox="0 0 100 10">
            {segments.map(([quality, value, idx]) => {
                const isStart = idx === 0,
                    isEnd = boundaries.length - 1 === idx,
                    isEnds = isStart || isEnd;

                const width =
                    positions[idx + 1] -
                    positions[idx] +
                    (isEnds ? rounding : 0);
                const x = positions[idx] - (isEnd ? rounding : 0);

                const fill = getStyleFromLevel(quality).backgroundColor;

                return (
                    <React.Fragment key={idx}>
                        <Rect
                            fill={fill}
                            x={x}
                            width={width}
                            height={thickness}
                            rx={isEnds ? rounding : 0}
                        />
                        <Text
                            x={positions[idx]}
                            y={thickness}
                            textAnchor={isStart ? "left" : "middle"}
                            fill="black"
                            fontFamily="Arial"
                            fontSize={fontSize}
                            alignmentBaseline="top"
                        >
                            {value}
                        </Text>
                    </React.Fragment>
                );
            })}
        </Svg>
    );
}

export default QualityRange;

function splitBoundaries(qualityTable) {
    const segments = [];

    qualityTable.forEach(({ qualityValue, lowerBoundary }, idx) => {
        const entry = [qualityValue, lowerBoundary];

        if (segments.length > 0) {
            if (lowerBoundary === null || lowerBoundary < segments[0][1]) {
                segments.unshift([qualityValue, lowerBoundary]);
                entry[1] = qualityTable[idx - 1].upperBoundary;
            }
        }

        segments.push(entry);
    });

    return segments;
}

function getPositions(boundaries) {
    const hasStartOffset = boundaries[0][1] === null,
        minimum = boundaries.reduce(
            (min, cur) => (cur[1] !== null ? Math.min(min, cur[1]) : min),
            +Infinity
        ),
        maximum = boundaries.reduce(
            (max, cur) => (cur[1] !== null ? Math.max(max, cur[1]) : max),
            -Infinity
        ),
        range = maximum - minimum,
        rangePercentage =
            100 - sidesOffset - (hasStartOffset ? sidesOffset : 0);

    return boundaries.map(([_, value]) => {
        if (value === null) return 0;
        return (
            ((value - minimum) * rangePercentage) / range +
            (hasStartOffset ? sidesOffset : 0)
        );
    });
}
