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
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

export default function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={301}
            height={225}
            viewBox="0 0 301 225"
            fill="none"
            style={{ position: "absolute" }}
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M43.934 43.934A150 150 0 000 150h25A125 125 0 01150 25v125V0A150 150 0 0043.934 43.934z"
                fill="url(#prefix__paint0_linear)"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M256.167 43.934A150.003 150.003 0 01300.101 150h-25a125 125 0 00-125-125V0a150.002 150.002 0 01106.066 43.934z"
                fill="url(#prefix__paint1_linear)"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear"
                    x1={135}
                    y1={28}
                    x2={32}
                    y2={146}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.097} stopColor="#FFDD58" />
                    <Stop offset={0.816} stopColor="#72C04C" />
                </LinearGradient>
                <LinearGradient
                    id="prefix__paint1_linear"
                    x1={161}
                    y1={18}
                    x2={275}
                    y2={149}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.182} stopColor="#FFDC57" />
                    <Stop offset={0.76} stopColor="#D12D2D" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}
