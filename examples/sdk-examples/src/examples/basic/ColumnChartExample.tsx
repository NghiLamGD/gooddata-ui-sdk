// (C) 2007-2019 GoodData Corporation

import React from "react";
import { ColumnChart } from "@gooddata/sdk-ui-charts";
import { LdmExt } from "../../ldm";

const style = { height: 300 };

export const ColumnChartExample: React.FC = () => {
    return (
        <div style={style} className="s-column-chart">
            <ColumnChart
                measures={[LdmExt.TotalSales1]}
                viewBy={LdmExt.monthDate}
                // filters={[
                //     newNegativeAttributeFilter(
                //         Ldm.StateName,
                //         { uris: ["/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2210/elements?id=6340116"] })
                // ]}
            />
        </div>
    );
};
