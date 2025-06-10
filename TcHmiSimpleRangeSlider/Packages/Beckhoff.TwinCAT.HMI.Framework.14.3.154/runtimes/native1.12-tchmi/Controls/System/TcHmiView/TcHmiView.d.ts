declare namespace TcHmi.Controls.System {
    class TcHmiView extends TcHmi.Controls.System.TcHmiPartial {
        #private;
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /**
         * Shows/hides the control depending of the current 'observe' right
         */
        __processAccessConfig(): void;
    }
}