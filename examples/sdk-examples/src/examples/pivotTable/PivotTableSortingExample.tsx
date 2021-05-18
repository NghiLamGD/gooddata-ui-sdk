// (C) 2007-2019 GoodData Corporation
import React from "react";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { newPositiveAttributeFilter, newRankingFilter, newMeasureValueFilter } from "@gooddata/sdk-model";
import { Ldm, LdmExt } from "../../ldm";

const measures = [LdmExt.FranchiseFees];
const attributes = [Ldm.LocationState, Ldm.DateWeekSunSatOfQtr];
//const columns = [Ldm.DateQuarter, Ldm.DateMonth.Short];
//const sortBy = [newAttributeSort("menu", "asc")];

const style = { height: 300 };

export const PivotTableSortingExample: React.FC = () => {
    return (
        <div style={style} className="s-pivot-table-sorting">
            <PivotTable
                measures={measures}
                rows={attributes}
                //    columns={columns}
                pageSize={20}
                // sortBy={sortBy}
                filters={[
                    newPositiveAttributeFilter(Ldm.DateWeekSunSatOfQtr, { values: ["Mon", "Tue", "Wed"] }),
                    newRankingFilter(LdmExt.FranchiseFees, "TOP", 5),
                    newMeasureValueFilter(LdmExt.FranchiseFees, "GREATER_THAN", 8000),
                    newPositiveAttributeFilter(Ldm.LocationState, { values: ["East Coast"] }),
                ]}
            />
        </div>
    );
};
