import type { RootControlManagerShape } from '../../ServicesTypes/SystemEngineering.js';
import { type ControlMetaData } from './DesignerModeControlMetaDataMngr.js';
import type { Position } from './Position.js';
/**
 * Handles all viewport handling like scrolling, zooming and viewport emulation in designer master.
 */
export declare class DesignerModeMasterRootControlManager implements RootControlManagerShape {
    /**
     * Handles all viewport handling like scrolling, zooming and viewport emulation in designer master.
     */
    constructor();
    private readonly __viewPortSimulator;
    private readonly __viewPortHighlightingContainer;
    private readonly __backgroundTarget;
    private __rootControlMeta;
    private __scrollPosition;
    /**
     * The zoom factor is managed by the Creator
     */
    private __creatorZoomFactor;
    private __viewportCurrentWidth;
    private __viewportCurrentHeight;
    private __scrollAnimationFrameId;
    private __zoomAnimationFrameId;
    getCreatorZoomFactor(): number;
    getViewPortSimulator(): HTMLDivElement;
    getViewPortHighlightingContainer(): HTMLDivElement;
    /**
     * This element catches interaction outside the Viewport Simulator and Highlighting Container
     * which both scrolls away with the Initial Containing Block.
     * This is needed to differentiate interaction with the scrollbar which will
     * bubble to the <html> documentElement but not hit this element.
     */
    getBackgroundTarget(): HTMLDivElement;
    /**
     */
    scroll(p: Position): void;
    /**
     * Apply the new Zoomfactor to all Controls and interaction container
     * @param newZoom
     */
    setCreatorZoom(newZoom: number): void;
    /** Remembers meta object and updates the internal caches */
    setRootControl(tco: TcHmi.Controls.System.baseTcHmiControl, newControlMeta: ControlMetaData): void;
    private __onRequiredViewPortSizeWatchTick;
    /**
     * Updates the bounds of the view
     * @param tco
     */
    setCreatorViewPortPosition(tco: TcHmi.Controls.System.baseTcHmiControl | null | undefined): void;
}
/** Runtime Manager */
export declare const rootControlManager: DesignerModeMasterRootControlManager;
//# sourceMappingURL=DesignerModeMasterRootControlMngr.d.ts.map