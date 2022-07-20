// (C) 2022 GoodData Corporation
import { useCallback } from "react";
import { areObjRefsEqual, ObjRef } from "@gooddata/sdk-model";
import {
    selectConfigurationPanelOpened,
    selectIsInEditMode,
    selectSelectedWidgetRef,
    uiActions,
    useDashboardDispatch,
    useDashboardSelector,
} from "../../../model";

export interface IUseWidgetSelectionResult {
    /**
     * Flag indicating the given item can be selected.
     */
    isSelectable: boolean;
    /**
     * Flag indicating the given item is selected.
     */
    isSelected: boolean;
    /**
     * Callback to call when an item is selected.
     */
    onSelected: () => void;
    /**
     * Flag indicating the given item has its config panel open.
     */
    hasConfigPanelOpen: boolean;
}

export function useWidgetSelection(widgetRef: ObjRef | undefined): IUseWidgetSelectionResult {
    const dispatch = useDashboardDispatch();

    const isConfigPanelOpen = useDashboardSelector(selectConfigurationPanelOpened);

    const isSelectable = useDashboardSelector(selectIsInEditMode);

    const selectedWidget = useDashboardSelector(selectSelectedWidgetRef);
    const isSelected = Boolean(
        isSelectable && selectedWidget && widgetRef && areObjRefsEqual(selectedWidget, widgetRef),
    );

    const onSelected = useCallback(() => {
        if (isSelectable && widgetRef) {
            dispatch(uiActions.selectWidget(widgetRef));
            dispatch(uiActions.setConfigurationPanelOpened(true));
        }
    }, [isSelectable, widgetRef, dispatch]);

    return {
        isSelectable,
        isSelected,
        onSelected,
        hasConfigPanelOpen: isConfigPanelOpen && isSelected,
    };
}
