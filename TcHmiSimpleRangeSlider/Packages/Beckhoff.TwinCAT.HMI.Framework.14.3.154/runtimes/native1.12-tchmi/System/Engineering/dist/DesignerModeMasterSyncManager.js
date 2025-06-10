import { metaDataManager } from './DesignerModeControlMetaDataMngr.js';
import { designerModeManager } from './DesignerModeManager.js';
import { highlightManager } from './DesignerModeMasterControlHighlightMngr.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
/**
 * Handles sync in designer master.
 */
export class DesignerModeMasterSyncManager {
    /**
     * Handles sync in designer master.
     */
    constructor() { }
    /**
     * Calculates the new control Attributes and sync to Creator
     * @param eventName
     */
    updatePcElementAndSync(eventName) {
        const tcoList = [];
        // Update Bounds
        const stylenames = ['top', 'left', 'width', 'right', 'height', 'bottom'];
        const selectedControlsMeta = metaDataManager.getSelectedControlsMetaData();
        for (let id in selectedControlsMeta) {
            const ctrlMeta = selectedControlsMeta[id];
            if (ctrlMeta === undefined || ctrlMeta === null) {
                continue;
            }
            const tco = TcHmi.Controls.get(ctrlMeta.id);
            if (!tco) {
                continue;
            }
            tcoList.push(tco);
            let horizontalCount = 0;
            let verticalCount = 0;
            const pcElementClone = tco.getPcElement()[0].cloneNode(true);
            const tValue = TcHmi.StyleProvider.getSimpleElementStyle(tco.getElement(), stylenames);
            for (let stylename of stylenames) {
                // processmove changes the two css (top|height|bottom and left|width|right), so only some are valid values.
                if (tValue[stylename] !== undefined) {
                    const styleHtmlName = 'data-tchmi-' + stylename;
                    let oldValue = pcElementClone.getAttribute(styleHtmlName);
                    if (oldValue) {
                        if (['top', 'height', 'bottom'].includes(stylename)) {
                            verticalCount++;
                        }
                        else if (['right', 'width', 'left'].includes(stylename)) {
                            horizontalCount++;
                        }
                        let isSymbolExpression = TcHmi.Symbol.isSymbolExpression(oldValue);
                        let isSymbolExpressionEscaped = TcHmi.Symbol.isSymbolExpressionEscaped(oldValue);
                        if (isSymbolExpression && !isSymbolExpressionEscaped) {
                            let sym = new TcHmi.System.Symbol(oldValue);
                            if (sym) {
                                if (sym.getExpression().getType() !== TcHmi.SymbolType.Server) {
                                    sym.read(function (data) {
                                        if (data.error === TcHmi.Errors.NONE) {
                                            oldValue = data.value;
                                        }
                                        sym.destroy();
                                    });
                                }
                                else {
                                    sym.destroy();
                                    // Skip dimension for this known to be async only binding. Even if this feels odd in designer
                                    continue;
                                }
                            }
                        }
                    }
                    if (typeof oldValue === 'string') {
                        oldValue = parseFloat(oldValue);
                    }
                    const styleUnitHtmlName = 'data-tchmi-' + stylename + '-unit';
                    const oldUnit = pcElementClone.getAttribute(styleUnitHtmlName);
                    let tUnitValue = tValue[stylename].replace(/[-.0-9]/g, '');
                    if (tUnitValue !== 'px' && tUnitValue !== '%') {
                        // Force a valid unit
                        tUnitValue = 'px';
                    }
                    if (!oldUnit) {
                        if (tUnitValue !== 'px') {
                            // We had nothing and want percent. Perhaps in the future...
                            pcElementClone.setAttribute(styleUnitHtmlName, tUnitValue);
                        }
                        else {
                            // Do not add a unit by ourself
                        }
                    }
                    else if (oldUnit !== tUnitValue) {
                        pcElementClone.setAttribute(styleUnitHtmlName, tUnitValue);
                    }
                    let newValue = parseFloat(tValue[stylename]);
                    if (oldValue !== undefined &&
                        typeof oldValue === 'number' &&
                        Math.round(oldValue) !== Math.round(newValue) &&
                        !(
                        // do not create or change a value for:
                        (['height', 'width'].includes(stylename) && // logic for width and height
                            ['Content', 'Parent'].includes(pcElementClone.getAttribute('data-tchmi-' + stylename + '-mode') ?? '')) // we are in content or parent mode
                        )) {
                        if (tUnitValue === 'px') {
                            // We want to send Integer only pixel values
                            pcElementClone.setAttribute(styleHtmlName, newValue.toFixed(0));
                        }
                        else if (tUnitValue === '%') {
                            // We need to send floating values here
                            pcElementClone.setAttribute(styleHtmlName, newValue.toFixed(1));
                        }
                    }
                }
                // Important ! Do not remove attributes here... Only updates ! Removing a TwinCAT HMI attribute has to be done in serialized html first to keep information in sync. Keep in mind -> Creator is chief of html ;)
            }
            if (horizontalCount < 2 &&
                tValue['left'] &&
                tValue['left'] !== '0px' &&
                !pcElementClone.hasAttribute('data-tchmi-left')) {
                pcElementClone.setAttribute('data-tchmi-left', tValue['left'].replace('px', ''));
            }
            if (verticalCount < 2 &&
                tValue['top'] &&
                tValue['top'] !== '0px' &&
                !pcElementClone.hasAttribute('data-tchmi-top')) {
                pcElementClone.setAttribute('data-tchmi-top', tValue['top'].replace('px', ''));
            }
            if (ctrlMeta.domVisibility) {
                pcElementClone.removeAttribute('data-tchmi-creator-visibility');
            }
            else {
                pcElementClone.setAttribute('data-tchmi-creator-visibility', 'False');
            }
            if (!ctrlMeta.locked) {
                pcElementClone.removeAttribute('data-tchmi-creator-locked');
            }
            else {
                pcElementClone.setAttribute('data-tchmi-creator-locked', 'True');
            }
            designerModeManager.syncControl(TCHMI_TARGET_PARTIAL, ctrlMeta.id, pcElementClone.outerHTML);
        }
        TcHmi.EventProvider.raise(eventName, tcoList);
        highlightManager?.requestAsyncHighlighterUpdate();
    }
}
/** Runtime Manager */
export const syncManager = new DesignerModeMasterSyncManager();
//# sourceMappingURL=DesignerModeMasterSyncManager.js.map