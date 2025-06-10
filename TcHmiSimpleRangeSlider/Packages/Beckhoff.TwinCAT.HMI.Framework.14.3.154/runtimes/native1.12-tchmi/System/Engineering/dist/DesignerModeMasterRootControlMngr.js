var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { metaDataManager } from './DesignerModeControlMetaDataMngr.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
import { interactionManager } from './DesignerModeMasterInteractionMngr.js';
import { SyncCmdToCreatorRequestRequiredViewPortSize } from './SyncCmdToCreatorRequestRequiredViewPortSize.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles all viewport handling like scrolling, zooming and viewport emulation in designer master.
 */
let DesignerModeMasterRootControlManager = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let ___onRequiredViewPortSizeWatchTick_decorators;
    return class DesignerModeMasterRootControlManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            ___onRequiredViewPortSizeWatchTick_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            __esDecorate(this, null, ___onRequiredViewPortSizeWatchTick_decorators, { kind: "method", name: "__onRequiredViewPortSizeWatchTick", static: false, private: false, access: { has: obj => "__onRequiredViewPortSizeWatchTick" in obj, get: obj => obj.__onRequiredViewPortSizeWatchTick }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Handles all viewport handling like scrolling, zooming and viewport emulation in designer master.
         */
        constructor() {
            document.body.classList.add('tchmi-creator-chessboard');
            this.__viewPortSimulator.classList.add('tchmi-creator-view-port-simulator');
            this.__viewPortHighlightingContainer.classList.add('tchmi-creator-view-port-highlighting');
            this.__backgroundTarget.classList.add('tchmi-creator-view-port-background');
            window.setInterval(this.__onRequiredViewPortSizeWatchTick, 50);
        }
        __viewPortSimulator = (__runInitializers(this, _instanceExtraInitializers), document.createElement('div'));
        __viewPortHighlightingContainer = document.createElement('div');
        __backgroundTarget = document.createElement('div');
        __rootControlMeta;
        __scrollPosition = { left: 0, top: 0 };
        /**
         * The zoom factor is managed by the Creator
         */
        __creatorZoomFactor = 1.0;
        __viewportCurrentWidth = 0;
        __viewportCurrentHeight = 0;
        __scrollAnimationFrameId = 0;
        __zoomAnimationFrameId = 0;
        /* ****************************************************************************
                        Getter
                    **************************************************************************** */
        getCreatorZoomFactor() {
            return this.__creatorZoomFactor;
        }
        getViewPortSimulator() {
            return this.__viewPortSimulator;
        }
        getViewPortHighlightingContainer() {
            return this.__viewPortHighlightingContainer;
        }
        /**
         * This element catches interaction outside the Viewport Simulator and Highlighting Container
         * which both scrolls away with the Initial Containing Block.
         * This is needed to differentiate interaction with the scrollbar which will
         * bubble to the <html> documentElement but not hit this element.
         */
        getBackgroundTarget() {
            return this.__backgroundTarget;
        }
        /**
         */
        scroll(p) {
            // Do not do load intensive stuff in this function!
            if (p.left === this.__scrollPosition.left && p.top === this.__scrollPosition.top) {
                return;
            }
            this.__scrollPosition.left = p.left;
            this.__scrollPosition.top = p.top;
            if (this.__scrollAnimationFrameId !== 0) {
                window.cancelAnimationFrame(this.__scrollAnimationFrameId);
            }
            this.__scrollAnimationFrameId = window.requestAnimationFrame(() => {
                // We are chrome only here so scrollingElement can be used
                document.scrollingElement.scrollLeft = this.__scrollPosition.left;
                document.scrollingElement.scrollTop = this.__scrollPosition.top;
                this.__scrollAnimationFrameId = 0;
            });
        }
        /**
         * Apply the new Zoomfactor to all Controls and interaction container
         * @param newZoom
         */
        setCreatorZoom(newZoom) {
            if (newZoom === undefined || this.__creatorZoomFactor === newZoom) {
                return;
            }
            this.__creatorZoomFactor = newZoom;
            if (this.__zoomAnimationFrameId !== 0) {
                window.cancelAnimationFrame(this.__zoomAnimationFrameId);
            }
            this.__zoomAnimationFrameId = window.requestAnimationFrame(() => {
                if (this.__creatorZoomFactor !== 1) {
                    this.__viewPortSimulator.style.transform = 'scale(' + this.__creatorZoomFactor + ')';
                }
                else {
                    this.__viewPortSimulator.style.transform = '';
                }
                // snap distance depends on zoom
                highlightManager?.updateEngineeringStyles();
                interactionManager?.refreshControlSnapPositionCache();
                metaDataManager.refreshControlMetaData();
                this.__zoomAnimationFrameId = 0;
            });
        }
        /** Remembers meta object and updates the internal caches */
        setRootControl(tco, newControlMeta) {
            this.setCreatorViewPortPosition(tco);
            this.__rootControlMeta = newControlMeta;
            this.__viewPortSimulator.setAttribute('data-tchmi-creator-target-control-type', tco.getType());
        }
        __onRequiredViewPortSizeWatchTick() {
            // Determine required viewport size
            if (!this.__rootControlMeta) {
                return;
            }
            let vpWidth = 50;
            let vpHeight = 50;
            /*
             * The anchors are a bit bigger then the control itself.
             * We must not include original jOriginalPosition or jHierarchyControlposition
             * as they include the tchmi-creator-distance-line of 10000 px width.
             */
            for (const elem of [
                this.__viewPortSimulator,
                this.__rootControlMeta.jHierarchyAnchorContainer[0],
                this.__rootControlMeta.jAnchorContainer[0],
            ]) {
                const sWidth = elem.scrollWidth; // contains overflow but no < 1 scale...
                const sHeight = elem.scrollHeight; // contains overflow but no < 1 scale...
                if (sWidth > vpWidth) {
                    vpWidth = sWidth;
                }
                if (sHeight > vpHeight) {
                    vpHeight = sHeight;
                }
            }
            // Add some pixel to prevent the need for rescrolling after selection (thus revealing width config)
            vpWidth += 30;
            vpHeight += 30;
            if (vpWidth !== this.__viewportCurrentWidth || vpHeight !== this.__viewportCurrentHeight) {
                new SyncCmdToCreatorRequestRequiredViewPortSize({
                    name: 'RequestRequiredViewPortSize',
                    frameworkType: TCHMI_DESIGNER ? 'Designer' : 'LiveView',
                    targetPartial: TCHMI_TARGET_PARTIAL,
                    width: vpWidth,
                    height: vpHeight,
                    replyTo: null,
                }).send();
                this.__viewportCurrentWidth = vpWidth;
                this.__viewportCurrentHeight = vpHeight;
                document.body.style.width = vpWidth + 'px';
                document.body.style.height = vpHeight + 'px';
            }
        }
        /**
         * Updates the bounds of the view
         * @param tco
         */
        setCreatorViewPortPosition(tco) {
            if (!tco) {
                return;
            }
            let viewportWidth;
            let attributeViewportWidth = 0;
            let attrStr = tco.getElement()[0].getAttribute('data-tchmi-creator-viewport-width');
            if (attrStr) {
                attributeViewportWidth = TcHmi.ValueConverter.toType(attrStr, 'tchmi:framework#/definitions/PositiveNumber');
            }
            if (typeof attributeViewportWidth === 'number' && attributeViewportWidth > 0) {
                viewportWidth = attributeViewportWidth;
            }
            else {
                viewportWidth = TcHmi.System.config.creatorSettings.viewport.defaultWidth;
            }
            let viewportWidthActive = false;
            /** active ViewControl width */
            let widthValue = tco.getWidth();
            const widthUnit = tco.getWidthUnit();
            const widthMode = tco.getWidthMode();
            if (widthMode === 'Parent') {
                // Parent mode does not look into the width
                widthValue = null;
            }
            else if (widthMode === 'Content') {
                // Content mode has set the content size
                widthValue = tco.__getContentWidth();
            }
            if (widthUnit === '%') {
                viewportWidthActive = true;
            }
            else if (widthValue === null || widthValue === undefined) {
                viewportWidthActive = true;
            }
            if (!viewportWidthActive && widthValue) {
                let widthMinValue = tco.getMinWidth();
                let widthMinUnit = tco.getMinWidthUnit();
                /** Sanitized px value */
                let widthMinPix = widthMinValue;
                if (widthMinValue !== null && widthMinValue !== undefined && widthMinUnit === '%') {
                    widthMinPix = (widthMinValue * viewportWidth) / 100;
                }
                if (widthMinPix !== null && widthMinPix !== undefined && widthValue < widthMinPix) {
                    viewportWidthActive = true;
                }
            }
            if (!viewportWidthActive && widthValue) {
                let widthMaxValue = tco.getMaxWidth();
                let widthMaxUnit = tco.getMaxWidthUnit();
                /** Sanitized px value */
                let widthMaxPix = widthMaxValue;
                if (widthMaxValue !== null && widthMaxValue !== undefined && widthMaxUnit === '%') {
                    widthMaxPix = (widthMaxValue * viewportWidth) / 100;
                }
                if (widthMaxPix !== null && widthMaxPix !== undefined && widthValue > widthMaxPix) {
                    viewportWidthActive = true;
                }
            }
            let viewportWidthFinal = viewportWidth;
            if (!viewportWidthActive && widthValue) {
                viewportWidthFinal = parseInt(tco.getElement().css('left'), 10) + widthValue;
            }
            let viewportHeight;
            let attributeViewportHeight = 0;
            attrStr = tco.getElement()[0].getAttribute('data-tchmi-creator-viewport-height');
            if (attrStr) {
                attributeViewportHeight = TcHmi.ValueConverter.toType(attrStr, 'tchmi:framework#/definitions/PositiveNumber');
            }
            if (typeof attributeViewportHeight === 'number' && attributeViewportHeight > 0) {
                viewportHeight = attributeViewportHeight;
            }
            else {
                viewportHeight = TcHmi.System.config.creatorSettings.viewport.defaultHeight;
            }
            let viewportHeightActive = false;
            /** active ViewControl height */
            let heightValue = tco.getHeight();
            const heightUnit = tco.getHeightUnit();
            const heightMode = tco.getHeightMode();
            if (heightMode === 'Parent') {
                // Parent mode does not look into the height
                heightValue = null;
            }
            else if (heightMode === 'Content') {
                // Content mode has set the content size
                heightValue = tco.__getContentHeight();
            }
            if (heightUnit === '%') {
                viewportHeightActive = true;
            }
            else if (heightValue === null) {
                viewportHeightActive = true;
            }
            if (!viewportHeightActive && heightValue) {
                let heightMinValue = tco.getMinHeight();
                let heightMinUnit = tco.getMinHeightUnit();
                /** Sanitized px value */
                let heightMinPix = heightMinValue;
                if (heightMinValue !== null && heightMinValue !== undefined && heightMinUnit === '%') {
                    heightMinPix = (heightMinValue * viewportHeight) / 100;
                }
                if (heightMinPix !== null && heightMinPix !== undefined && heightValue < heightMinPix) {
                    viewportHeightActive = true;
                }
            }
            if (!viewportHeightActive && heightValue) {
                let heightMaxValue = tco.getMaxHeight();
                let heightMaxUnit = tco.getMaxHeightUnit();
                /** Sanitized px value */
                let heightMaxPix = heightMaxValue;
                if (heightMaxValue !== null && heightMaxValue !== undefined && heightMaxUnit === '%') {
                    heightMaxPix = (heightMaxValue * viewportHeight) / 100;
                }
                if (heightMaxPix !== null && heightMaxPix !== undefined && heightValue > heightMaxPix) {
                    viewportHeightActive = true;
                }
            }
            let viewportHeightFinal = viewportHeight;
            if (!viewportHeightActive && heightValue) {
                viewportHeightFinal = parseInt(tco.getElement().css('top'), 10) + heightValue; // .css(height) does not include the border
            }
            this.__viewPortSimulator.style.width = viewportWidthFinal + 'px';
            this.__viewPortSimulator.style.height = viewportHeightFinal + 'px';
            this.__viewPortHighlightingContainer.style.width = viewportWidthFinal * this.__creatorZoomFactor + 'px';
            this.__viewPortHighlightingContainer.style.height = viewportHeightFinal * this.__creatorZoomFactor + 'px';
        }
    };
})();
export { DesignerModeMasterRootControlManager };
/** Runtime Manager */
export const rootControlManager = new DesignerModeMasterRootControlManager();
//# sourceMappingURL=DesignerModeMasterRootControlMngr.js.map