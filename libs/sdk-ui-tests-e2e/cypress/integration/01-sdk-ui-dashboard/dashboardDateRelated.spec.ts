// (C) 2022 GoodData Corporation

import * as Navigation from "../../tools/navigation";
import { EditMode } from "../../tools/editMode";
import { AttributeFilter, FilterBar } from "../../tools/filterBar";
import { DashboardHeader } from "../../tools/dashboardHeader";
import { DashboardMenu } from "../../tools/dashboardMenu";
import { Widget } from "../../tools/widget";
import { DateFilter } from "../../tools/dateFilter";
import { WidgetConfiguration } from "../../tools/widgetConfiguration";

Cypress.Cookies.defaults({
    preserve: ["GDCAuthTT", "GDCAuthSTT", "_csrfToken"],
});

Cypress.on("uncaught:exception", (error) => {
    console.error("Uncaught exception cause", error);
    return false;
});

Cypress.Cookies.debug(true);

const dashboardHeader = new DashboardHeader();
const editMode = new EditMode();
const filterBar = new FilterBar();
const dashboardMenu = new DashboardMenu();
const activityTypeFilter = new AttributeFilter("Activity Type");
const widget = new Widget(0);

describe("Dashboard Date Related", { tags: ["pre-merge_isolated_bear"] }, () => {
    beforeEach(() => {
        cy.login();
    });

    it("Make no change on unrelated date insight", () => {
        Navigation.visit("dashboard/date-filtering");

        editMode.edit();
        new DateFilter().open().selectAbsolutePreset("christmas-2011").apply();

        widget.getTable().hasCellValue(0, 0, "12/24/2011");

        new WidgetConfiguration(0).open().openConfiguration().selectDateDataset("Created").close();
        widget.getTable().waitLoaded().hasCellValue(0, 0, "01/01/1990");
    });

    it("Make no change on disabled date dataset filter insight", () => {
        Navigation.visit("dashboard/date-filtering");

        editMode.edit();
        new DateFilter().open().selectAbsolutePreset("christmas-2011").apply();

        widget.getTable().hasCellValue(0, 0, "12/24/2011");

        new WidgetConfiguration(0).open().openConfiguration().toggleDateFilter().close();
        widget.getTable().hasCellValue(0, 0, "01/01/1990");
    });

    it("Override filter if insight using same date dataset", () => {
        Navigation.visit("dashboard/date-filtering");
        new DateFilter().open().selectAbsolutePreset("christmas-2011").apply();

        widget.getTable().waitLoaded().hasCellValue(1, 0, "12/24/2011");
    });
});
