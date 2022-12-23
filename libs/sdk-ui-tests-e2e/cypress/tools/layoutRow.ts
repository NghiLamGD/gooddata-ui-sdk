// (C) 2021 GoodData Corporation

import { InsightsCatalog, InsightTitle } from "./insightsCatalog";
import { SectionHeader } from "./sectionHeader";

export class LayoutRow {
    constructor(private rowIndex: number) {}

    getSelector() {
        return `.s-fluid-layout-row:nth-child(${this.rowIndex + 1})`;
    }

    getElement() {
        return cy.get(this.getSelector());
    }

    getItems() {
        return this.getElement().find(".s-dash-item");
    }

    addAbove(name: InsightTitle) {
        const catalog = new InsightsCatalog().searchExistingInsight(name);
        cy.dragElementTo(catalog.getInsightSelector(name), `${this.getSelector()} .row-hotspot`);
        catalog.clearSearch();
        return this;
    }

    addInsightPlaceholder() {
        cy.dragElementTo(".s-add-insight", `.s-drag-info-placeholder-drop-target`, { x: 250, y: 150 });
        return this;
    }

    addKpiPlaceholder() {
        cy.get(".s-add-kpi:not(.disabled)").should("exist");
        cy.dragElementTo(".s-add-kpi", ".add-kpi-placeholder", { x: 250, y: 150 });
        return this;
    }

    hasWidgets(count: number) {
        this.getItems().should("have.length", count);
        return this;
    }

    hasTitles(titles: string[]) {
        this.hasWidgets(titles.length);

        titles.forEach((title, itemIndex) => {
            this.getItems().eq(itemIndex).find(".s-headline").should("have.text", title);
        });

        return this;
    }

    getHeader() {
        return new SectionHeader(this.rowIndex);
    }
}
