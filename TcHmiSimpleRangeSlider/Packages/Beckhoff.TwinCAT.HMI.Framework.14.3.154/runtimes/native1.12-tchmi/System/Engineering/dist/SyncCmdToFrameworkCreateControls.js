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
import { SyncCmdToFramework } from './SyncCmdToFramework.js';
import { designerModeManager } from './DesignerModeManager.js';
if (!TCHMI_DESIGNER) {
    TcHmi.Log.errorEx(`Internal error: The file "${import.meta.url}" is restricted to use within the designer.`);
}
let SyncCmdToFrameworkCreateControls = (() => {
    var _a;
    let _classSuper = SyncCmdToFramework;
    let _instanceExtraInitializers = [];
    let ___onControlCreated_decorators;
    return class SyncCmdToFrameworkCreateControls extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            ___onControlCreated_decorators = [(_a = TcHmi).CallbackMethod.bind(_a)];
            __esDecorate(this, null, ___onControlCreated_decorators, { kind: "method", name: "__onControlCreated", static: false, private: false, access: { has: obj => "__onControlCreated" in obj, get: obj => obj.__onControlCreated }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        constructor(cmd) {
            super(cmd);
        }
        __controlsToSelect = (__runInitializers(this, _instanceExtraInitializers), []);
        __createsPending = 0;
        __onControlCreated(_data) {
            this.__createsPending--;
            if (this.__createsPending <= 0) {
                if (this.__controlsToSelect.length > 0) {
                    designerModeManager.unselectEach(true);
                    for (const controlToSelect of this.__controlsToSelect) {
                        designerModeManager.select(controlToSelect, true);
                    }
                    designerModeManager.resyncSelectedControls();
                }
            }
        }
        run() {
            if (!TCHMI_DESIGNER) {
                return;
            }
            const preparedTargetPartial = tchmi_path(this.__cmd.targetPartial);
            if (preparedTargetPartial !== TCHMI_TARGET_PARTIAL) {
                return;
            }
            if (!this.__cmd.controls) {
                this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
                return;
            }
            for (const control of this.__cmd.controls) {
                if (control.controlHtml) {
                    this.__createsPending++;
                    const parentControl = TcHmi.Controls.get(control.targetParentControl);
                    const pcElementInParent = parentControl
                        ?.getPcElement()[0]
                        .querySelector(`#${CSS.escape(control.controlId)}`);
                    if (pcElementInParent &&
                        pcElementInParent.outerHTML === control.controlHtml.replaceAll('\r\n', '\n') &&
                        TcHmi.Controls.get(control.controlId)) {
                        // We have the exact same control already here
                        this.__onControlCreated({ error: TcHmi.Errors.NONE });
                        continue;
                    }
                    if (control.select) {
                        this.__controlsToSelect.push(control.controlId);
                    }
                    const compileResult = designerModeManager.createControl(control.targetParentControl, control.domPosition, control.controlHtml, this.__onControlCreated);
                    if (compileResult.error) {
                        TcHmi.Log.errorEx(`[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCreateControls] compile of ${control.controlId} has failed:`, TcHmi.Log.buildMessage(compileResult.details));
                    }
                }
                else {
                    TcHmi.Log.error(`[Source=Framework, Module=TcHmi.System.Engineering.SyncCmdToFrameworkCreateControls] html content of ${control.controlId} is empty`);
                    this.__result = TcHmi.Errors.E_PARAMETER_INVALID;
                }
            }
        }
    };
})();
export { SyncCmdToFrameworkCreateControls };
//# sourceMappingURL=SyncCmdToFrameworkCreateControls.js.map