// (C) 2021-2023 GoodData Corporation
import React from "react";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";

const dashboardRef = "aaf3Gnp3LT0D";

export const BAC: React.FC = () => {
    return <Dashboard dashboard={dashboardRef} />;
};
