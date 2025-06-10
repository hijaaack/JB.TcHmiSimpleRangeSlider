import { type ControlMetaData } from './DesignerModeControlMetaDataMngr.js';
import type { Position } from './Position.js';
/**
 * Handles all container highlighting while dragging controls in designer master.
 */
export declare class DesignerModeMasterHierarchyManager {
    /**
     * Handles all container highlighting while dragging controls in designer master.
     */
    constructor();
    /**
     * Collection of active highlighting objects.
     */
    private __dragtargetContainerHighlighting;
    /**
                Is this a control which should have designer support?
                */
    isDesignerModeControl(id: string): boolean;
    /**
     * Register mouse interaction for container controls
     * @param ctrlMeta
     */
    registerContainerControl(ctrlMeta: ControlMetaData): void;
    /**
     * Register mouse interaction for container elements
     * @param ctrlMeta
     */
    registerContainerElement(jElem: JQuery): void;
    /**
     * Highlighting for dragging a new control into the designer
     */
    private __onDragEnter;
    /**
     * Disable Highlighting for dragging a new control into the designer
     */
    private __onDragLeave;
    /**
     * Activate drop highlight from a point relative to the whole document
     * @param position coordinates relative to the whole document
     * @param targetElem
     */
    addHighlightDropTarget(position: Position, targetElem: Element): void;
    /**
     * Remove drop highlight
     */
    removeHighlightDropTarget(): void;
    /**
     * Gets the highest container from a point on the whole document
     * Unwanted targets have to be excluded with css pointer-events:none
     * @param position coordinates relative to the document
     */
    getContainerFromPoint(position: Position): {
        /** tchmicontrol of the target container */
        tco: TcHmi.Controls.System.baseTcHmiControl;
        /** jQuery element which makes the mouse interaction. Could be a div for the control or a grid cell */
        jHighlighter: JQuery<HTMLElement> | undefined;
        mousePosXinTarget: number;
        mousePosYinTarget: number;
        /** rowIndex if we are inside a Grid. null if we are not in a grid */
        rowIndex: number | null;
        /** columnIndex if we are inside a Grid. null if we are not in a grid */
        columnIndex: number | null;
    } | null;
}
/** Runtime Manager */
export declare const hierarchyManager: DesignerModeMasterHierarchyManager;
//# sourceMappingURL=DesignerModeMasterHierarchyMngr.d.ts.map