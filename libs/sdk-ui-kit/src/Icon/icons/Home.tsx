// (C) 2021 GoodData Corporation
import React from "react";

import { IIconProps } from "../typings";

/**
 * @internal
 */
export const Home: React.FC<IIconProps> = ({ color, className, width, height }) => {
    return (
        <svg
            className={className}
            width={width ?? 16}
            height={height ?? 16}
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-276.000000, -1255.000000)" fill={color ?? "#6D7680"}>
                    <g transform="translate(258.000000, 1124.500000)">
                        <path d="M34.502,140.001 C34.778,140.001 35.002,140.225 35.002,140.501 L35.002,148.501 C35.002,149.328 34.329,150.001 33.502,150.001 L29.502,150.001 C29.226,150.001 29.002,149.777 29.002,149.501 L29.002,146.001 L27.002,146.001 L27.002,149.501 C27.002,149.777 26.778,150.001 26.502,150.001 L22.502,150.001 C21.675,150.001 21.002,149.328 21.002,148.501 L21.002,140.501 C21.002,140.225 21.226,140.001 21.502,140.001 C21.778,140.001 22.002,140.225 22.002,140.501 L22.002,148.501 C22.002,148.777 22.226,149.001 22.502,149.001 L26.002,149.001 L26.002,145.501 C26.002,145.225 26.226,145.001 26.502,145.001 L29.502,145.001 C29.778,145.001 30.002,145.225 30.002,145.501 L30.002,149.001 L33.502,149.001 C33.778,149.001 34.002,148.777 34.002,148.501 L34.002,140.501 C34.002,140.225 34.226,140.001 34.502,140.001 Z M28.003,130.938 C28.4,130.938 28.77,131.105 29.045,131.408 L32.01,134.685 L32.003,133.505 C32.002,133.372 32.055,133.244 32.148,133.15 C32.241,133.056 32.369,133.003 32.503,133.003 L34.503,133.003 C34.779,133.003 35.003,133.227 35.003,133.503 L35.003,137.995 L37.874,141.168 C38.059,141.373 38.043,141.689 37.839,141.874 C37.635,142.059 37.318,142.043 37.133,141.839 L34.133,138.523 C34.05,138.431 34.004,138.311 34.004,138.188 L34.004,134.004 L33.007,134.004 L33.018,135.99 C33.019,136.197 32.892,136.384 32.699,136.459 C32.506,136.534 32.286,136.482 32.147,136.328 L28.304,132.081 C28.222,131.99 28.115,131.94 28.004,131.94 C27.893,131.94 27.786,131.99 27.704,132.081 L18.875,141.839 C18.776,141.948 18.64,142.004 18.504,142.004 L18.502,142.001 C18.382,142.001 18.262,141.958 18.167,141.872 C17.962,141.687 17.946,141.371 18.132,141.166 L26.961,131.408 C27.235,131.105 27.605,130.938 28.003,130.938 Z"></path>
                    </g>
                </g>
            </g>
        </svg>
    );
};
