// (C) 2021-2022 GoodData Corporation

import { Chart } from "./chart";
import { Table } from "./table";
import { Kpi } from "./kpi";
import { WidgetConfiguration } from "./widgetConfiguration";
import { InsightsCatalog, InsightTitle } from "./insightsCatalog";
import { WidgetOptionsMenu } from "./widgetOptionsMenu";

export const WIDGET_SELECTOR = ".s-dash-item";
const MAXIMUM_TIMEOUT = Cypress.env("timeForInsightLoading");

export class Widget {
    constructor(private index: number) {}

    getElementSelector() {
        return `.s-dash-item-${this.index}`;
    }

    getElement() {
        return cy.get(this.getElementSelector());
    }

    waitChartLoaded() {
        this.getElement()
            .find(".visualization-value-loading", { timeout: MAXIMUM_TIMEOUT })
            .should("not.exist");
        this.getElement().find(".s-loading").should("not.exist");
        return this;
    }

    waitKpiLoaded() {
        this.getElement().find(".content-loaded.widget-loaded").should("exist");
        this.getElement().find(".is-alert-evaluating").should("not.exist");
        return this;
    }

    waitTableLoaded() {
        this.getElement().find(".s-loading").should("not.exist");
        this.getElement().find(".s-loading-done").should("exist");
        return this;
    }

    setTitle(title: string) {
        this.getElement().find(".s-headline").click().type(`${title}{enter}`);
        return this;
    }

    getChart() {
        return new Chart(this.getElementSelector());
    }

    getTable() {
        return new Table(this.getElementSelector());
    }

    getKPI() {
        return new Kpi(this.getElementSelector());
    }

    getConfiguration() {
        return new WidgetConfiguration(this.index);
    }

    removeKPIWidget() {
        this.getElement().click().get(".dash-item-action-delete").click();
        return this;
    }

    removeVizWidget() {
        this.getElement().click().get(".s-delete-insight-item").click();
        return this;
    }

    exists(expect = true) {
        this.getElement().should(expect ? "exist" : "not.exist");
        return this;
    }

    isTitleVisible(expect = true) {
        this.getElement()
            .find(".s-headline")
            .should(expect ? "exist" : "not.exist");
        return this;
    }

    hasAlert(expect = true) {
        this.getElement()
            .find(".dash-item-content")
            .should(expect ? "have.class" : "not.have.class", "has-set-alert");
        return this;
    }

    hasTriggeredAlert(expect = true) {
        this.getElement()
            .find(".dash-item-content")
            .should(expect ? "have.class" : "not.have.class", "is-alert-triggered");
        return this;
    }

    addBefore(name: InsightTitle) {
        return this.add(name, "prev");
    }

    addAfter(name: InsightTitle) {
        return this.add(name, "next");
    }

    add(name: InsightTitle, offset: "next" | "prev") {
        const catalog = new InsightsCatalog();
        catalog.searchExistingInsight(name);
        cy.dragElementTo(
            catalog.getInsightSelector(name),
            `${this.getElementSelector()} .dropzone.${offset}`,
            { x: 100, y: 100 },
        );
        return this;
    }

    move(itemIndex: number, offset: "next" | "prev") {
        const newColumn = new Widget(itemIndex);
        this.getElement().dragTo(`${newColumn.getElementSelector()} .dropzone.${offset}`, { x: 100, y: 100 });
        return newColumn;
    }

    moveAfter(itemIndex: number) {
        return this.move(itemIndex, "next");
    }

    moveBefore(itemIndex: number) {
        return this.move(itemIndex, "prev");
    }

    /**
     * This will drag width to bulletIndex
     * @param bulletIndex
     * @returns
     */
    resizeWidthTo(bulletIndex: number) {
        this.getElement()
            .parents(".s-fluid-layout-column")
            .find(".s-dash-width-resizer-hotspot")
            .dragTo(`.s-resize-bullet-${bulletIndex}`);
        return this;
    }

    /**
     * This checks actual width in grid of 12
     * @param size
     * @returns
     */
    hasWidth(size: number) {
        this.getElement()
            .parents(".s-fluid-layout-column")
            .should("have.class", `s-fluid-layout-column-width-${size}`);
        return this;
    }

    hover() {
        this.getElement().realHover();
        return this;
    }

    openTooltip() {
        this.getElement().find(".s-description-trigger").click();
        return this;
    }

    tooltipHoverExist(expect = true) {
        this.getElement()
            .find(".s-description-trigger")
            .should(expect ? "exist" : "not.exist");
        return this;
    }

    tooltipHasText(text: string) {
        cy.get(".s-gd-description-panel").should("have.text", text);
        return this;
    }

    getWidgetOptionsMenu() {
        return new WidgetOptionsMenu(this);
    }

    getEditableLabelElement() {
        return this.getElement().find(".s-editable-label");
    }

    hasTitle(title: string) {
        this.getElement().find(".s-headline").should("have.text", title);
        return this;
    }

    isSelected() {
        this.getElement().should("have.class", "is-selected");
        return this;
    }
}
