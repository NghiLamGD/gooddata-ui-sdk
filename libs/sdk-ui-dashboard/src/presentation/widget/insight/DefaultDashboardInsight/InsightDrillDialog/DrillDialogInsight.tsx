// (C) 2020 GoodData Corporation
import React, { useCallback, useMemo, useState, CSSProperties } from "react";
import { IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { createSelector } from "@reduxjs/toolkit";
import { insightFilters, insightSetFilters, insightVisualizationUrl } from "@gooddata/sdk-model";
import {
    GoodDataSdkError,
    IntlWrapper,
    OnError,
    OnLoadingChanged,
    useBackendStrict,
    useWorkspaceStrict,
} from "@gooddata/sdk-ui";
import { InsightError, InsightRenderer } from "@gooddata/sdk-ui-ext";
import { useDashboardComponentsContext } from "../../../../dashboardContexts";
import {
    useDashboardSelector,
    selectColorPalette,
    selectLocale,
    selectMapboxToken,
    selectSeparators,
    selectSettings,
    selectIsExport,
    selectDrillableItems,
} from "../../../../../model";
import { IDashboardInsightProps } from "../../types";
import { useWidgetFiltersQuery } from "../../../common";
import { useResolveDashboardInsightProperties } from "../useResolveDashboardInsightProperties";
import { useDrillDialogInsightDrills } from "./useDrillDialogInsightDrills";

const insightStyle: CSSProperties = { width: "100%", height: "100%", position: "relative", flex: "1 1 auto" };

const selectCommonDashboardInsightProps = createSelector(
    [selectLocale, selectSettings, selectColorPalette],
    (locale, settings, colorPalette) => ({
        locale,
        settings,
        colorPalette,
    }),
);

const selectChartConfig = createSelector(
    [selectMapboxToken, selectSeparators, selectDrillableItems, selectIsExport],
    (mapboxToken, separators, drillableItems, isExport) => ({
        mapboxToken,
        separators,
        forceDisableDrillOnAxes: !drillableItems, // to keep in line with KD, enable axes drilling only if using explicit drills
        isExportMode: isExport,
    }),
);

/**
 * @internal
 */
export const DrillDialogInsight = (props: IDashboardInsightProps): JSX.Element => {
    const {
        insight,
        widget,
        clientHeight,
        backend,
        workspace,
        onError,
        onDrill: onDrillFn,
        onExportReady,
        ErrorComponent: CustomErrorComponent,
        LoadingComponent: CustomLoadingComponent,
    } = props;

    // Custom components
    const { ErrorComponent, LoadingComponent } = useDashboardComponentsContext({
        ErrorComponent: CustomErrorComponent,
        LoadingComponent: CustomLoadingComponent,
    });

    // Context
    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);

    // State props
    const { locale, settings, colorPalette } = useDashboardSelector(selectCommonDashboardInsightProps);
    const chartConfig = useDashboardSelector(selectChartConfig);

    // Loading and rendering
    const [isVisualizationLoading, setIsVisualizationLoading] = useState(false);
    const [visualizationError, setVisualizationError] = useState<GoodDataSdkError | undefined>();

    const handleLoadingChanged = useCallback<OnLoadingChanged>(({ isLoading }) => {
        setIsVisualizationLoading(isLoading);
    }, []);

    /// Filtering
    const {
        result: filtersForInsight,
        status: filtersStatus,
        error: filtersError,
    } = useWidgetFiltersQuery(widget, insight && insightFilters(insight));

    const insightWithAddedFilters = insightSetFilters(insight, filtersForInsight);
    const insightWithAddedWidgetProperties = useResolveDashboardInsightProperties({
        insight: insightWithAddedFilters ?? insight,
        widget,
    });

    const { drillableItems, onDrill, onPushData } = useDrillDialogInsightDrills({
        widget,
        insight,
        onDrill: onDrillFn,
    });

    // CSS
    const insightPositionStyle: CSSProperties = useMemo(() => {
        return {
            width: "100%",
            height: "100%",
            position:
                // Headline violates the layout contract.
                // It should fit parent height and adapt to it as other visualizations.
                // Now, it works differently for the Headline - parent container adapts to Headline size.
                insight && insightVisualizationUrl(insight).includes("headline") ? "relative" : "absolute",
        };
    }, [insight]);

    // Error handling
    const handleError = useCallback<OnError>(
        (error) => {
            setVisualizationError(error);
            onError?.(error);
        },
        [onError],
    );
    const error = filtersError ?? visualizationError;

    return (
        <div style={insightStyle}>
            <div style={insightPositionStyle}>
                <IntlWrapper locale={locale}>
                    {(filtersStatus === "running" || isVisualizationLoading) && <LoadingComponent />}
                    {error && (
                        <InsightError
                            error={error}
                            ErrorComponent={ErrorComponent}
                            clientHeight={settings?.enableKDWidgetCustomHeight ? clientHeight : undefined}
                            height={null} // make sure the error is aligned to the top (this is the behavior in gdc-dashboards)
                        />
                    )}
                    {filtersStatus === "success" && (
                        <InsightRenderer
                            insight={insightWithAddedWidgetProperties}
                            backend={effectiveBackend}
                            workspace={effectiveWorkspace}
                            drillableItems={drillableItems}
                            onDrill={onDrill}
                            config={chartConfig}
                            onLoadingChanged={handleLoadingChanged}
                            locale={locale}
                            settings={settings as IUserWorkspaceSettings}
                            colorPalette={colorPalette}
                            onError={handleError}
                            onExportReady={onExportReady}
                            pushData={onPushData}
                            ErrorComponent={ErrorComponent}
                            LoadingComponent={LoadingComponent}
                        />
                    )}
                </IntlWrapper>
            </div>
        </div>
    );
};
