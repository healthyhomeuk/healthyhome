/*
 * This file is part of the HealthyHome project monitoring server
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

import * as React from "react";
import Svg, {
    Path,
    Defs,
    ClipPath,
    Image,
    Circle,
    Text,
} from "react-native-svg";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const strokeWidth = 10;

const edgeRadius = strokeWidth / 2;
const xStart = 0;
const yStart = 0;
const xEnd = 100;
const yEnd = 50 + edgeRadius;

const outerStartX = xStart;
const outerEndX = xEnd;
const innerEndX = xEnd - strokeWidth;
const innerStartX = xStart + strokeWidth;
const y = yEnd - edgeRadius;

/**
 * @constant {String} path
 *  For rendering the clip path the arc
 */
const path =
    `M ${outerStartX},${y} ` +
    `A 1 1 0 1 1 ${outerEndX},${y} ` +
    `A 1 1 0 1 1 ${innerEndX},${y} ` +
    `A 1 1 0 1 0 ${innerStartX},${y} ` +
    `A 1 1 0 1 1 ${outerStartX},${y}`;

const viewBox = `${xStart} ${yStart} ${xEnd} ${yEnd}`;

const sizeX = windowWidth * 0.7;
const sizeY = (sizeX * yEnd) / xEnd;
const max = 500;
const min = 1;

const dotRadius = edgeRadius;
const centerX = (outerStartX + outerEndX) / 2;
const centerY = y;
const arcRadius = centerX - dotRadius;

/**
 * Calculates the coordinates to place the dot on the arc
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns Coordinates and radius size for rendering the dot on the arc
 */
function calculateDotPosition(value, min, max) {
    const angle = ((value - min) / (max - min)) * Math.PI + Math.PI;
    const dotX = arcRadius * Math.cos(angle) + centerX;
    const dotY = arcRadius * Math.sin(angle) + centerY;
    return [dotX, dotY, dotRadius];
}

/**
 * Renders the arc gradient
 * @param {number} value
 * @returns {Svg} Arc gradient to indicate the indoor air quality
 */
export default function SvgComponent({ value }) {
    const [dotX, dotY, dotRadius] = calculateDotPosition(value, min, max);
    return (
        <Svg
            width={sizeX}
            height={sizeY}
            fill="none"
            viewBox={viewBox}
            style={{ marginVertical: 20 }}
        >
            <Defs>
                <ClipPath id="clip">
                    <Path d={path} />
                </ClipPath>
            </Defs>

            <Image
                href={require("../assets/images/iaq-gradient.png")} // The image of the gradient
                clipPath={`url(#clip)`}
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
            />
            <Circle
                fill="white"
                stroke="black"
                strokeWidth={1}
                cx={dotX}
                cy={dotY}
                r={dotRadius}
            />
            <Text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                fill="black"
                fontFamily="Arial"
                fontWeight="bold"
                fontSize="22"
            >
                {value}
            </Text>
        </Svg>
    );
}
