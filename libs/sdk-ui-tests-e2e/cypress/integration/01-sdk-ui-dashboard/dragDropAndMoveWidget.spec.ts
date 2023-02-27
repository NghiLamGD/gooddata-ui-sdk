// (C) 2023 GoodData Corporation

import * as Navigation from "../../tools/navigation";
import { Widget } from "../../tools/widget";
import { EditMode } from "../../tools/editMode";
import { Dashboard } from "../../tools/dashboards";
import { InsightsCatalog } from "../../tools/insightsCatalog";
import { DashboardMenu } from "../../tools/dashboardMenu";
import { DashboardHeader } from "../../tools/dashboardHeader";

const dashboard = new Dashboard();
const editMode = new EditMode();
const insightCatalog = new InsightsCatalog();

Cypress.Cookies.defaults({
    preserve: ["GDCAuthTT", "GDCAuthSTT", "_csrfToken"],
});

Cypress.on("uncaught:exception", (error) => {
    console.error("Uncaught exception cause", error);
    return false;
});

Cypress.Cookies.debug(true);

describe("Insight on dashboard", () => {
    beforeEach(() => {
        cy.login();

        Navigation.visit("dashboard/drag-drop-widgets");
        editMode.isInEditMode();
        insightCatalog.waitForCatalogReload();
    });

    it(
        "can add 3 widgets into the same row to create a new section",
        { tags: ["checklist_integrated_bear"] },
        () => {
            new DashboardMenu().toggle().hasOption("Save as new");
            new DashboardHeader().saveAsNew("save after drag drop widgets");
            editMode.edit();

            dashboard.getRow(0).addAbove("ComboChart");
            dashboard.hasRowsCount(4);
            dashboard.getWidget(0).waitChartLoaded().hasTitle("Combo chart");

            dashboard.getWidget(0).addBefore("TableWithHyperlinkAttribute");
            dashboard.getRow(0).getItems().should("have.length", 2);

            dashboard.getWidget(1).waitChartLoaded().addBefore("Headline");
            dashboard.getRow(0).getItems().should("have.length", 3);
            dashboard.getWidget(1).hasTitle("Headline").isSelected();

            editMode.save();
            dashboard.hasRowsCount(4);
            dashboard.getRow(0).hasWidgets(3);
        },
    );

    it("shows placeholder text during drag", { tags: ["pre-merge_isolated_tiger"] }, () => {
        //create a new row, between 2 existing rows
        dashboard.getRow(1).dragAbove("ComboChart");
        dashboard.hasPlaceholderText("Drop to create a new section");
        cy.get(".s-cancel_button").trigger("dragleave", { force: true });

        //drag to beginning of a row
        dashboard.getWidget(0).dragBefore("TableWithHyperlinkAttribute");
        dashboard.hasPlaceholderText("Drop here");
        cy.get(".s-cancel_button").trigger("dragleave", { force: true });

        //drag to the end of a row
        dashboard.getWidget(2).dragAfter("ComboChart");
        dashboard.hasPlaceholderText("Drop to the existing section");
        cy.get(".s-cancel_button").trigger("dragleave", { force: true });

        //drag to between of 2 widgets
        dashboard.getWidget(0).dragAfter("Headline");
        dashboard.hasPlaceholderText("Drop here");
    });

    it("can remove widgets after drap&drop", { tags: ["pre-merge_isolated_tiger"] }, () => {
        dashboard.getRow(2).addLast("ComboChart");
        dashboard.hasRowsCount(4);

        new Widget(5).removeVizWidget();
        dashboard.hasRowsCount(3);
    });
});
