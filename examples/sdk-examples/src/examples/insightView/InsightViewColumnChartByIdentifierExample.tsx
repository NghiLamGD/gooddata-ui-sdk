// (C) 2007-2019 GoodData Corporation
import React from "react";
import { InsightView } from "@gooddata/sdk-ui-ext";

import { Ldm } from "../../ldm";
import { newPositiveAttributeFilter } from "@gooddata/sdk-model";
//import { newNegativeAttributeFilter, newPositiveAttributeFilter } from "@gooddata/sdk-model";

const style = { height: 300 };

export const InsightViewColumnChartByIdentifierExample: React.FC = () => {
    return (
        <div style={style} className="s-insightView-chart">
            <InsightView
                insight={Ldm.Insights.SalesOverTime}
                filters={[
                    newPositiveAttributeFilter(Ldm.DateWeekSunSatOfQtr, { values: ["Mon", "Tue", "Wed"] }),
                ]}
            />
        </div>
    );
};
