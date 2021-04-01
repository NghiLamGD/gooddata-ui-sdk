// (C) 2021 GoodData Corporation
import React from "react";

import { IIconProps } from "../typings";

/**
 * @internal
 */
export const Hyperlink: React.FC<IIconProps> = ({ color, className, width, height }) => {
    return (
        <svg
            className={className}
            width={width ?? 16}
            height={height ?? 16}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.5253384 5.35355339c1.16753397-1.16753397 3.07510671-1.16753397 4.2426407 0 .2445142.24451421.4426847.52582312.5865661.83085168.1178075.24975188.0108454.54771764-.2389065.66552513-.2497519.11780749-.5477176.01084543-.6655251-.23890646-.0946564-.20067157-.2260109-.38713318-.3892413-.55036357-.74169105-.74169105-1.93658987-.77540428-2.71948164-.10113969l-.10894548.10113969L1.69691127 9.5961941c-.77700968.7770097-.77700968 2.0514174 0 2.8284271.74169106.7416911 1.93658988.7754043 2.71948164.1011397l.10894549-.1011397 1.97872047-1.9787205c.19526215-.1952621.51184464-.1952621.70710679 0 .17356635.1735664.1928515.4429908.05785545.6378589l-.05785545.0692479-1.97872048 1.9787205c-1.16753397 1.167534-3.07510672 1.167534-4.24264069 0-1.12583633-1.1258363-1.16604477-2.9397955-.12062532-4.1147834l.12062532-.1278573L4.5253384 5.35355339zM8.7679791 1.1109127c1.167534-1.16753397 3.0751067-1.16753397 4.2426407 0 1.1258363 1.12583633 1.1660447 2.93979545.1206253 4.11478341l-.1206253.12785728L9.4750859 8.8890873c-1.167534 1.167534-3.07510675 1.167534-4.24264072 0-.24536428-.2453643-.44246784-.5261743-.58615513-.8336651-.11690458-.25017576-.00886691-.54775321.24130889-.66465778.2501758-.11690458.54775324-.00886691.66465782.24130889.09431135.20182629.22404846.38666049.3872952.54990719.74169106.7416911 1.93658988.7754043 2.71948164.1011397l.1089455-.1011397 3.5355339-3.53553389c.7770097-.77700968.7770097-2.05141745 0-2.82842713-.7416911-.74169105-1.9365899-.77540428-2.7194816-.10113968l-.1089455.10113968-1.977542 1.97754197c-.19526214.19526215-.51184463.19526215-.70710678 0-.17356635-.17356635-.1928515-.44299075-.05785545-.63785889l.05785545-.06924789L8.7679791 1.1109127z"
                fillRule="nonzero"
                fill={color ?? "#94A1AD"}
            />
        </svg>
    );
};
