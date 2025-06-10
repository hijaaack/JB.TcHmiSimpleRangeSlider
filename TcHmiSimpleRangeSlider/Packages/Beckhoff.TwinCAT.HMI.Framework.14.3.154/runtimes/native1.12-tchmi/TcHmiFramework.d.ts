declare namespace TcHmi {
}
declare namespace TcHmi {
    /**
     * Enables the decorated method to be used as an event handler by binding its this to the class it is defined on.
     * @param options Options for the event handler.
     */
    function EventHandler<R, R2 extends R>(options?: R extends void | undefined ? Decorators.EventHandlerOptions : Decorators.EventHandlerOptions & Decorators.ReturningEventHandlerOptions<R2>): <This extends TcHmi.Controls.System.baseTcHmiControl, Args extends any[]>(originalMethod: (this: This, ...args: Args) => R, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => R>) => (this: This, ...args: Args) => R;
    /**
     * Enables the decorated method to be used as a callback by binding its this to the class it is defined on.
     * @param _originalMethod The method to decorate.
     * @param context The decorator context.
     */
    function CallbackMethod<This extends any, Args extends any[], R>(_originalMethod: (this: This, ...args: Args) => R, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => R>): void;
    namespace Decorators {
        /**
         * Options for the event handler decorator.
         */
        interface EventHandlerOptions {
            /**
             * Whether to check if the control is enabled before running the event handler.
             */
            checkIsEnabled?: boolean;
            /**
             * Set this to a non-empty string to check whether the control has this access right or an array of strings
             * to check whether the control has all of the access rights in the array.
             */
            checkAccess?: string | string[];
            /**
             * Whether to check if the control is not in read only mode before running the event handler. Only supported
             * on controls that have the IsReadOnly attribute.
             */
            checkIsReadOnly?: boolean;
        }
        /**
         * Extension for the event handler options that is used when an event handler is decorated that returns a value.
         */
        interface ReturningEventHandlerOptions<R> {
            /**
             * Value that should be returned if the event handler returns early because one of its checks fails.
             */
            earlyReturnValue: R;
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides resources for accessing configuration data.
     * @preserve (Part of the public API)
     */
    class Config {
        /**
         * Returns a copy of the current object which is constructed from tchmiconfig.json
         * @preserve (Part of the public API)
         */
        static get(): TcHmi.IConfig;
        /**
         * Returns a Dictionary with all nuget packages of the project.
         * Key is the Nuget ID.
         * @preserve (Part of the public API)
         */
        static getNugetPackagesMetadata(): Dictionary<TcHmi.Config.NugetPackageMetadata>;
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for checking rights.
     * @preserve (Part of the public API)
     */
    class Access {
        /**
         * Checks if a right is allowed for the current user on this control or its parents
         * Rules for granting access:
         * - Designer Mode Master => true
         * - Server Auth is not restricted (IsAuthRequired == false in Server) => TRUE
         * - Server Auth is not known right now => null
         * - Server Auth loading error => false
         * - On this control: 1 Group  has  ALLOW => TRUE
         * - On this control: 0 Groups have ALLOW, but 1 Group has DENY => FALSE
         * - On this control: 0 Groups have ALLOW, 0 Groups have DENY => Ask Parent
         * - use control default of the bottom most control with this right. TcHmi.Controls.System.TcHmiView has operate/observe set to TRUE
         * - control has no parent (detached control) => null
         * @param control Control to check
         * @param requestedAccessright name of the access right
         * @returns Returns true/false or null if the state is not known right now
         * @preserve (Part of the public API)
         */
        static checkAccess(control: Readonly<TcHmi.Controls.System.baseTcHmiControl>, requestedAccessright: string): boolean | null;
        /**
         * Overrides a control access right to Deny state. Call with null to release the force again.
         * @param control Control to check
         * @param accessrightToOverride name of the access right
         * @param forcedRight 'Deny' or null to release
         */
        static setControlRightOverride(control: Readonly<Controls.System.baseTcHmiControl>, accessrightToOverride: string, forcedRight: 'Deny' | null): boolean;
        /**
         * Returns a Set with a list of all overridden deny rights for a control.
         * Gives an empty Set when no right is overridden.
         * @param control Control to check
         */
        static getControlRightOverrides(control: Readonly<Controls.System.baseTcHmiControl>): Set<string>;
    }
}
declare namespace TcHmi {
    /**
     * @deprecated
     */
    class AnimationProvider {
        /**
         * Deprecated. Please use new TcHmi.Animation()
         * Creates a new animation
         * @param controlName The name of the control for which the animation is intendend.
         * @param selector A CSS selector to identify the element inside the control to animate.
         * @preserve (Part of the public API)
         * @deprecated Please use new TcHmi.Animation()
         */
        static create(controlName: string, selector?: string): Animation;
    }
    /**
     * An animation class
     */
    class Animation {
        /**
         * Creates a new animation
         * @param controlName The name of the control for which the animation is intendend.
         * @param selector A CSS selector to identify the element inside the control to animate.
         * @preserve (Part of the public API)
         */
        constructor(controlName: string, selector?: string);
        /**
         * Returns the name of the control the animation is intended for.
         * @returns The name of the control.
         * @preserve (Part of the public API)
         */
        controlName(): string;
        /**
         * Returns the selector of the element to animate.
         * @returns The selector.
         * @preserve (Part of the public API)
         */
        selector(): string;
        /**
         * Returns the name of the animation.
         * @returns The name of the animation.
         * @preserve (Part of the public API)
         */
        animationName(): string;
        /**
         * Returns the state of the animation.
         * @returns The state.
         * @preserve (Part of the public API)
         */
        state(): Animation.Status;
        /**
         * Adds a keyframe.
         * This function throws an exception if the progressPoint of the keyframe is not between 0 and 1 inclusive.
         * @param keyframe The keyframe to add.
         * @preserve (Part of the public API)
         */
        addKeyframe(keyframe: TcHmi.Animation.Keyframe): this;
        /**
         * Adds a keyframe.
         * This function throws an exception if the progressPoint is not between 0 and 1 inclusive.
         * @param styles The styles for this keyframe.
         * @param progressPoint A number between 0 and 1 inclusive to determine when this keyframe should be reached.
         * @preserve (Part of the public API)
         */
        addKeyframe(styles: Dictionary<string | string[]>, progressPoint: number): this;
        /**
         * Adds a keyframe.
         * This function throws an exception if the progressPoint of the keyframe is not between 0 and 1 inclusive.
         * @param property The CSS property for this keyframe.
         * @param value The value for the CSS property at this keyframe.
         * @param progressPoint A number between 0 and 1 inclusive to determine when this keyframe should be reached.
         * @preserve (Part of the public API)
         */
        addKeyframe(property: string, value: string, progressPoint: number): this;
        /**
         * Adds a keyframe.
         * This function throws an exception if the progressPoint of the keyframe is not between 0 and 1 inclusive.
         * @param property The CSS property for this keyframe.
         * @param value An array of values for the CSS property at this keyframe. This is useful to pass vendor-prefixed CSS values to ensure compatibility.
         * @param progressPoint A number between 0 and 1 inclusive to determine when this keyframe should be reached.
         * @preserve (Part of the public API)
         */
        addKeyframe(property: string, value: string[], progressPoint: number): this;
        /**
         * Removes all keyframes.
         * @preserve (Part of the public API)
         */
        clearKeyframes(): this;
        /**
         * Reverses the keyframes by subtracting the progressPoint from 1 and setting that as the new progressPoint.
         * @preserve (Part of the public API)
         */
        reverseKeyframes(): this;
        /**
         * Gets the keyframes of this animation.
         * @returns The keyframes.
         * @preserve (Part of the public API)
         */
        keyframes(): Animation.Keyframe[];
        /**
         * Gets the configured duration for this animation. Default is 0.
         * @returns The duration.
         * @preserve (Part of the public API)
         */
        duration(): number;
        /**
         * Sets the duration for this animation. Default is 0.
         * @param valueNew The new duration.
         * @preserve (Part of the public API)
         */
        duration(valueNew: number | null): this;
        /**
         * Gets the delay before this animation starts. Default is 0.
         * @returns The delay.
         * @preserve (Part of the public API)
         */
        delay(): number;
        /**
         * Sets the delay before this animation starts. Default is 0.
         * @param valueNew {number} The new delay.
         * @preserve (Part of the public API)
         */
        delay(valueNew: number | null): this;
        /**
         * Gets the iteration count for this animation. Default is 1.
         * @returns The iteration count.
         * @preserve (Part of the public API)
         */
        iterationCount(): number | 'infinite';
        /**
         * Sets the iteration count for this animation. Default is 1.
         * @param valueNew The new iteration count.
         * @preserve (Part of the public API)
         */
        iterationCount(valueNew: number | 'infinite' | null): this;
        /**
         * Gets the order in which the keyframes are used. Default is 'normal'.
         * @returns The direction.
         * @preserve (Part of the public API)
         */
        direction(): Animation.Direction;
        /**
         * Sets the order in which the keyframes are used. Default is 'normal'.
         * @param valueNew The new direction.
         * @preserve (Part of the public API)
         */
        direction(valueNew: Animation.Direction | null): this;
        /**
         * Gets the timing function for this animation. Default is 'ease'.
         * @returns The timing function.
         * @preserve (Part of the public API)
         */
        timingFunction(): string | ((t: number) => number);
        /**
         * Sets the timing function for this animation. Default is 'ease'.
         * @param valueNew The new timing function. Possible values: "linear", "ease(-in/-out/-in-out)", "step-start/-end", "cubic-bezier(<number>, <number>, <number>, <number)", "steps(<number>, start/end)".
         * @preserve (Part of the public API)
         */
        timingFunction(valueNew: string | ((t: number) => number) | null): this;
        /**
         * Gets the fill mode. The fill mode determines whether the state of the first keyframe is applied to the element before the animation starts ('backwards'),
         * the state of the last keyframe is applied to the element after the animation ends ('forwards'), both or none. Default is 'none'.
         * @returns The fill mode.
         * @preserve (Part of the public API)
         */
        fillMode(): Animation.FillMode;
        /**
         * Sets the fill mode. The fill mode determines whether the state of the first keyframe is applied to the element before the animation starts ('backwards'),
         * the state of the last keyframe is applied to the element after the animation ends ('forwards'), both or none. Default is 'none'.
         * @param valueNew The new fill mode.
         * @preserve (Part of the public API)
         */
        fillMode(valueNew: Animation.FillMode | null): this;
        /**
         * Gets whether a cleanup is scheduled after the animation ends. Default is false.
         * @returns The cleanup value.
         * @preserve (Part of the public API)
         */
        cleanup(): boolean;
        /**
         * Set whether to schedule a cleanup after the animation has finished. A cleanup removes all animation specific CSS and, depending on fillMode, persists the properties of the last keyframe to the element CSS. Default is false.
         * @param valueNew {boolean} The cleanup value.
         * @preserve (Part of the public API)
         */
        cleanup(valueNew: boolean | null): this;
        /**
         * Gets whether the animation will be rendered via CSS or JavaScript. Will return false if the user has set useCss to false or configured features not supported by CSS. Default is true.
         * @returns Whether CSS will be used.
         * @preserve (Part of the public API)
         */
        useCss(): boolean;
        /**
         * Sets whether to render the animation via CSS or JavaScript. JavaScript may offer better performance if the animation is often changed and restarted.
         * If the animation has been configured with features unsupported by CSS, JavaScript will be used regardless of the value of useCss. Default is true.
         * @param valueNew {boolean} Whether to use CSS, when available.
         * @preserve (Part of the public API)
         */
        useCss(valueNew: boolean | null): this;
        /**
         * Registers an event handler for one of the events animationstart, animationend or animationiteration.
         * @param name The name of the event.
         * @param callback The callback function.
         * @preserve (Part of the public API)
         */
        registerEventHandler(name: 'animationstart' | 'animationend' | 'animationiteration', callback: (event: TcHmi.Animation.AnimationEvent) => void): this;
        /**
         * Unregisters a previously registered event handler.
         * @param name The name of the event.
         * @param callback The callback function to unregister.
         * @preserve (Part of the public API)
         */
        unregisterEventHandler(name: 'animationstart' | 'animationend' | 'animationiteration', callback?: (event: TcHmi.Animation.AnimationEvent) => void): this;
        /**
         * Gets all event handlers
         * @returns The event handlers.
         * @preserve (Part of the public API)
         */
        eventHandlers(): {
            name: 'animationstart' | 'animationend' | 'animationiteration';
            callback: (event: Animation.AnimationEvent) => void;
        }[];
        /**
         * Run the animation.
         * @preserve (Part of the public API)
         */
        run(): this;
        /**
         * Pause the animation.
         * @preserve (Part of the public API)
         */
        pause(): this;
        /**
         * Cancels the animation and writes the last keyframe styles into the element CSS.
         * @preserve (Part of the public API)
         */
        skip(): this;
        /**
         * Resets the animation. This is an asynchronous operation.
         * @param callback The function to call when the animation has been reset.
         * @preserve (Part of the public API)
         */
        reset(callback?: () => void): this;
    }
    namespace Animation {
        interface Keyframe {
            styles: Dictionary<string[]>;
            progressPoint: number;
        }
        interface AnimationEvent extends TcHmi.IResultObject {
            animationName: string;
            elapsedTime: number;
            JQueryEvent?: JQuery.TriggeredEvent;
        }
        enum Status {
            CONFIGURE = 0,
            INITIALIZED = 1,
            RUNNING = 2,
            PAUSED = 3,
            ENDED = 4
        }
        type Direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
        type FillMode = 'none' | 'forwards' | 'backwards' | 'both';
    }
}
declare namespace TcHmi {
    /**
     * Provides methods to read base64 encoded data.
     * @preserve (Part of the public API)
     */
    class Base64BinaryReader {
        /**
         * Creates a new Base64BinaryReader.
         * This constructor throws an exception if the data is not valid base64.
         * @param data The base64 encoded string to read from.
         * @param endianness Whether the encoded data uses little endian (default) or big endian to store numbers.
         * @preserve (Part of the public API)
         */
        constructor(data: string, endianness?: Endianness);
        /**
         * Reads a boolean value.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readBoolean(): boolean;
        /**
         * Reads a single byte of data.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readByte(): number;
        /**
         * Reads a signed byte.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readSByte(): number;
        /**
         * Reads a signed 16-bit integer.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readInt16(): number;
        /**
         * Reads an unsigned 16-bit integer.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readUInt16(): number;
        /**
         * Reads a signed 32-bit integer.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readInt32(): number;
        /**
         * Reads an unsigned 32-bit integer.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readUInt32(): number;
        /**
         * Reads a signed 64-bit integer.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readInt64(): bigint;
        /**
         * Reads an unsigned 64-bit integer.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readUInt64(): bigint;
        /**
         * Reads a single precision floating point number.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readFloat(): number;
        /**
         * Reads a double precision floating point number.
         * This function throws an exception if reading from the current offset position would exceed the length of the available data.
         * @preserve (Part of the public API)
         */
        readDouble(): number;
        /**
         * Reads a string. Will read until a zero byte is encountered, or until the specified length has been reached, or, if no length has been specified, until the end of the data.
         * This function throws an exception if length is negative or reading the number of bytes specified by length from the current offset position would exceed the length of the available data.
         * @param options (Optional) Options for the write.
         * @param options.encoding (Optional) The encoding to use. Defaults to UTF-8.
         * @param options.length (Optional) The length of the string to read in bytes.
         * @preserve (Part of the public API)
         */
        readString(options?: Base64BinaryReader.StringOptions): string;
        /**
         * Reads a string. Will read until a zero byte is encountered, or until the specified length has been reached, or, if no length has been specified, until the end of the data.
         * This function throws an exception if length is negative or reading the number of bytes specified by length from the current offset position would exceed the length of the available data.
         * @param length The length of the string to read in bytes.
         * @preserve (Part of the public API)
         */
        readString(length: number): string;
        /**
         * Returns the length of the data in bytes.
         * @preserve (Part of the public API)
         */
        getLength(): number;
        /**
         * Returns the current position of the read pointer.
         * @preserve (Part of the public API)
         */
        getOffset(): number;
        /**
         * Sets the position of the read pointer.
         * @param offset The new position of the read pointer.
         * @preserve (Part of the public API)
         */
        setOffset(offset: number): void;
    }
    namespace Base64BinaryReader {
        interface StringOptions {
            encoding?: 'UTF-8' | 'Latin-1' | 'Windows-1252';
            length?: number;
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides methods to write base64 encoded data.
     * @preserve (Part of the public API)
     */
    class Base64BinaryWriter {
        /**
         * Creates a new Base64BinaryWriter.
         * @param endianness Whether to use little endian (default) or big endian when encoding numbers.
         * @param length The desired length of the data. If this parameter is omitted the data will be expanded dynamically.
         * @preserve (Part of the public API)
         */
        constructor(endianness?: Endianness, length?: number);
        /**
         * Writes a boolean value.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The boolean value to write.
         * @preserve (Part of the public API)
         */
        writeBoolean(value: boolean): this;
        /**
         * Writes a single byte of data.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The byte to write.
         * @preserve (Part of the public API)
         */
        writeByte(value: number): this;
        /**
         * Writes a signed byte.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The byte to write.
         * @preserve (Part of the public API)
         */
        writeSByte(value: number): this;
        /**
         * Writes a signed 16-bit integer.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeInt16(value: number): this;
        /**
         * Writes an unsigned 16-bit integer.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeUInt16(value: number): this;
        /**
         * Writes a signed 32-bit integer.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeInt32(value: number): this;
        /**
         * Writes an unsigned 32-bit integer.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeUInt32(value: number): this;
        /**
         * Writes a signed 64-bit integer.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeInt64(value: bigint): this;
        /**
         * Writes an unsigned 64-bit integer.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeUInt64(value: bigint): this;
        /**
         * Writes a single precision floating point number.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeFloat(value: number): this;
        /**
         * Writes a double precision floating point number.
         * This function throws an exception if the provided value does not fit into this datatype or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The number to write.
         * @preserve (Part of the public API)
         */
        writeDouble(value: number): this;
        /**
         * Writes a string.
         * This function throws an exception if the provided value does not fit into the given length or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The string to write.
         * @param options (Optional) Options for the write.
         * @param options.encoding (Optional) The encoding to use. Defaults to UTF-8.
         * @param options.length (Optional) The length of the string to write. If the string is shorter, the remaining space is filled with 0.
         * @param options.addNullTerminator (Optional) Whether to add a terminating 0 at the end of the string, if it isn't already terminated.
         * @preserve (Part of the public API)
         */
        writeString(value: string, options?: Base64BinaryWriter.StringOptions): this;
        /**
         * Writes a string.
         * This function throws an exception if the provided value does not fit into the given length or if length was specified during writer construction and the value to write does not fit into the remaining length.
         * @param value The string to write.
         * @param length The length of the string to write. If the string is shorter, the remaining space is filled with 0.
         * @preserve (Part of the public API)
         */
        writeString(value: string, length: number): this;
        /**
         * Returns the base64 encoded string. If not enough data was written to fill the length the data should have, the rest is filled up with zeros.
         * @preserve (Part of the public API)
         */
        getEncodedString(): string;
        /**
         * Returns the length of the data that has been written.
         * @preserve (Part of the public API)
         */
        getLength(): number;
    }
    namespace Base64BinaryWriter {
        interface StringOptions {
            encoding?: 'UTF-8' | 'Latin-1' | 'Windows-1252';
            length?: number;
            addNullTerminator?: boolean;
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for creating and removing bindings.
     * @preserve (Part of the public API)
     */
    class Binding {
        /**
         * Creates a binding between a symbol and a control attribute setter function.
         * @param expression The target symbol expression.
         * @param fn The target function as prototype reference.
         * @param control The target control instance.
         * @preserve (Part of the public API)
         */
        static create(expression: string, fn: (value: any) => void, control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Creates a binding between a symbol and a control attribute setter function by name.
         * @param expression The target symbol expression.
         * @param fn The name of the control setter function.
         * @param control The target control instance.
         * @preserve (Part of the public API)
         */
        static createEx(expression: string, fn: string, control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Creates a binding between a symbol and a control attribute setter function by name of property.
         * @param expression The target symbol expression.
         * @param propertyName The name of the control property.
         * @param control The target control instance.
         * @preserve (Part of the public API)
         */
        static createEx2(expression: string, propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Removes a binding between a symbol and a control attribute setter function.
         * @param expression [OBSOLETE] The target symbol expression.
         * @param fn The target function as prototype reference.
         * @param control The target control instance.
         * @param bReset [Optional] If set to false the setter will not resetted with null.
         * @preserve (Part of the public API)
         */
        static remove(expression: string | null, fn: (value: any) => void, control: TcHmi.Controls.System.baseTcHmiControl, bReset?: boolean): void;
        /**
         * Removes a binding between a symbol and a control attribute setter function.
         * @param expression [OBSOLETE] The target symbol expression.
         * @param fn The name of the control setter function.
         * @param control The target control instance.
         * @param bReset [Optional] If set to false the setter will not resetted with null.
         * @preserve (Part of the public API)
         */
        static removeEx(expression: string | null, fn: string, control: TcHmi.Controls.System.baseTcHmiControl, bReset?: boolean): void;
        /**
         * Removes a binding between a symbol and a control attribute setter function by name of property.
         * @param _unused [OBSOLETE] The target symbol expression.
         * @param propertyName The name of the control attribute property.
         * @param control The target control instance.
         * @param bReset [Optional] If set to false the setter will not resetted with null.
         * @preserve (Part of the public API)
         */
        static removeEx2(_unused: string | null, propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl, bReset?: boolean): void;
        /**
         * Returns true if a symbol is bound to the target control property.
         * @param propertyName The name of the control attribute property.
         * @param control The target control instance.
         * @preserve (Part of the public API)
         */
        static exists(propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl): boolean;
        /**
         * Returns the symbol expression of a binding as string or null if no symbol is bound to the target control property.
         * @param propertyName The name of the control attribute property.
         * @param control The target control instance.
         * @preserve (Part of the public API)
         */
        static resolve(propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl): string | null;
        /**
         * Returns the symbol expression of a binding as SymbolExpression object or null if no symbol is bound to the target control property.
         * @param propertyName The name of the control attribute property.
         * @param control The target control instance.
         * @preserve (Part of the public API)
         */
        static resolveEx(propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl): SymbolExpression | null;
    }
    type BindingMode = 'OneWay' | 'TwoWay';
}
declare namespace TcHmi {
    /**
     * Provides resources for safely calling callback functions.
     */
    class Callback {
        /**
         * Calls a callback and catches exceptions to return them as value of type {Error} for further processing.
         * @param callback function to call
         * @param thisArg the this pointer in the function call
         * @param args parameters for the function call
         * @returns undefined or the Error in case of an exception
         * @template T this for the call
         * @template A Array of types for all parameter for the function
         * @preserve (Part of the public API)
         */
        static callSafe<T extends object | null, A extends any[]>(callback: Callback.ICallback<T, A> | null | undefined, thisArg: T, ...args: A): Error | undefined;
        /**
         * Calls a callback and catches exceptions to return them as value of type {Error} for further processing and prints it to console for proper call stack.
         * @param callback function to call
         * @param thisArg the this pointer in the function call
         * @param args parameters for the function call
         * @returns undefined or the Error in case of an exception
         * @template T this for the call
         * @template A Array of types for all parameter for the function
         * @preserve (Part of the public API)
         */
        static callSafeEx<T extends object | null, A extends any[]>(callback: Callback.ICallback<T, A> | null | undefined, thisArg: T, ...args: A): Error | undefined;
    }
    namespace Callback {
        /**
         * @template T this for the call
         * @template A Array of types for all parameter for the function
         */
        interface ICallback<T extends object | null, A extends any[]> {
            (this: T, ...args: A): void;
        }
    }
}
declare namespace TcHmi {
    let version: Version;
    /**
     * Deprecated. Please use TcHmi.Controls.get()
     * @deprecated Please use TcHmi.Controls.get()
     */
    let control: Dictionary<Controls.System.baseTcHmiControl>;
    /**
     * Reserved
     */
    class Control {
    }
}
declare namespace TcHmi {
    /**
     * Class for creating control instances.
     * @preserve (Part of the public API)
     */
    class ControlFactory {
        /**
         * Creates a new control.
         * This function throws an exception if one of the given parameter values is invalid.
         * * Attributes are given with its html attribute names:
         * ```json
         * {
         *     'data-tchmi-attribute1' : true,
         *     'data-tchmi-attribute2' : false
         * }
         * ```
         * @param type The type of the control.
         * @param id The identifier of the control.
         * @param attributes A dictionary for the attributes with the html attribute names as keys
         * @param parent Optional. The logical parent control.
         * @template C defines the type for the new control
         * @preserve (Part of the public API)
         */
        static createEx<C extends TcHmi.Controls.System.baseTcHmiControl>(type: string, id: string, attributes: null | Dictionary<any>, parent?: TcHmi.Controls.System.baseTcHmiControl | null): C | undefined;
        /** DEPRECATED API PARTS*/
        /**
         * DEPRECATED
         * Creates a new control.
         * @param html The base html for the control.
         * @param unused Optional. Has to be set to null if parameter parent is used.
         * @param parent Optional. The logical parent control.
         * @template C defines the type for the new control
         * @deprecated Please use createEx()
         */
        static create<C extends TcHmi.Controls.System.baseTcHmiControl>(html: string, unused?: null, parent?: TcHmi.Controls.System.baseTcHmiControl | null): C | undefined;
        /**
         * DEPRECATED
         * Creates a new control.
         * The new control HTMLElement, available via getElement(), can be attached to the DOM afterwards.
         * @param element The base element for the control.
         * @param unused Optional. Has to be set to null if parameter parent is used.
         * @param parent Optional. The logical parent control.
         * @template C defines the type for the new control
         * @deprecated Please use createEx()
         */
        static create<C extends TcHmi.Controls.System.baseTcHmiControl>(element: JQuery, unused?: null, parent?: TcHmi.Controls.System.baseTcHmiControl | null): C | undefined;
        /**
         * DEPRECATED
         * Creates a new control.
         * @param type The type of the control.
         * @param id The identifier of the control.
         * @param parent Optional. The logical parent control.
         * @template C defines the type for the new control
         * @deprecated Please use createEx()
         */
        static create<C extends TcHmi.Controls.System.baseTcHmiControl>(type: string, id: string, parent?: TcHmi.Controls.System.baseTcHmiControl | null): C | undefined;
    }
}
declare namespace TcHmi {
    /**
     * TwinCAT HMI Controls
     * Check out
     * https://infosys.beckhoff.com/content/1031/te2000_tc3_hmi_engineering/3728912139.html?id=2674190766896363084
     * for an API reference.
     * @preserve (Part of the public API)
     */
    namespace Controls {
    }
}
declare namespace TcHmi.Controls {
    /**
     * DEPRECATED
     * Register a control.
     * The Framework will fetch and interprete the Description.json in the Control Directory and optionally load a HTML Template file
     * @param controlTypeName Name of the Control type.
     * @param constructor Constructor which generates the TcHmi Control.
     * @param directory Directory of the Control (base path is the Controls directory).
     * @param template Template file of the Control (base path is the Controls directory).
     * @template C defines the type for the control to register
     * @preserve (Part of the public API)
     * @deprecated Please use registerEx()
     */
    function register<C extends TcHmi.Controls.System.baseTcHmiControl>(controlTypeName: string, constructor: TcHmi.Controls.baseTcHmiControlConstructor<C>, directory: string, template?: string | null): void;
    /**
     * Register a control.
     * The Framework will fetch and interprete the Description.json in the Control Directory and optionally load a HTML Template file
     * @param controlTypeName Name of the Control type.
     * @param namespace Name of the Control namespace.
     * @param constructor Constructor which generates the TcHmi Control.
     * @param options options
     * @param options.injectInGlobalObject Inject the control implementation at namespace.name in global object
     * @template C defines the type for the control to register
     * @preserve (Part of the public API)
     */
    function registerEx<C extends TcHmi.Controls.System.baseTcHmiControl>(controlTypeName: string, namespace: string, constructor: TcHmi.Controls.baseTcHmiControlConstructor<C>, options?: {
        /** Inject the control implementation at namespace.name in global object */
        injectInGlobalObject: boolean;
    }): void;
    /**
     * Get control by identifier. Returns the control or undefined.
     * @param id Identifier of the Control.
     * @template T Type of the Control
     * @preserve (Part of the public API)
     */
    function get<T extends TcHmi.Controls.System.baseTcHmiControl>(id: string | null | undefined): T | undefined;
    /**
     * Gets version information of control by type.
     * @param type Type of the Control.
     * @preserve (Part of the public API)
     */
    function getVersion(type: string): Version | null;
    /**
     * Returns the dynamic base path of a control.
     * @preserve (Part of the public API)
     * @param type Control type name
     */
    function getBasePath(type: string): string | null;
    /**
     * Returns the dynamic base path of a control.
     * @preserve (Part of the public API)
     * @param control TcHmi Control reference
     */
    function getBasePathEx(control: TcHmi.Controls.System.baseTcHmiControl): string | null;
    /**
     * Get an ES5 Map of all controls. Key of the map is the control identifier
     * @preserve (Part of the public API)
     */
    function getMap(): Map<string, TcHmi.Controls.System.baseTcHmiControl>;
    /**
     * Limit a pixel dimension with the min and max dimension of the control.
     * @param control Control to check the dimension
     * @param dimension Dimension to check
     * @param valueToTest Value which should be compared
     */
    function limitPixelDimensionToControlBound(control: TcHmi.Controls.System.baseTcHmiControl, dimension: 'width' | 'height', valueToTest: number | null): number | null;
    /**
     * DEPRECATED
     * Does no longer do anything
     * @deprecated Does no longer do anything
     * @param callback will be imediately called
     * @preserve (Part of the public API)
     */
    function tachControls(callback?: null | ((this: null) => void)): void;
    /**
     * DEPRECATED
     * Does no longer do anything
     * @param callback will be imediately called
     * @deprecated Does no longer do anything
     */
    function tachControlsAsync(callback?: null | ((this: null) => void)): void;
}
declare namespace TcHmi {
    /**
     * Provides multiple types of dialogs to the user.
     * @preserve (Part of the public API)
     */
    class DialogManager {
        /**
         * Change visibility of dialog and set its DialogType when showing.
         * @param dialogOwner Caller Id to prevent overwriting forreign dialogs
         * @param bVisibility Toggling visiblity of dialog
         * @param dialogType Type of dialog
         * @param options Options
         * @returns returns false if the dialog could not be opened
         * @preserve (Part of the public API)
         */
        static showDialog(dialogOwner: string, bVisibility: boolean, dialogType?: TcHmi.DialogManager.DialogType, options?: TcHmi.DialogManager.DialogOptions): boolean;
        /**
         * Changes the output content of the Dialog to a new value.
         * Will always target DialogType.Overlay. Use updateTextEx if you want to target a specific DialogType.
         * The default DialogSeverity is Info.
         * @param dialogOwner Caller Id to prevent overwriting forreign dialogs
         * @param html Content to show
         * @param severity Severity for the content.
         * @returns Success of the text update
         * @preserve (Part of the public API)
         */
        static updateText(dialogOwner: string, html: string, severity?: DialogManager.DialogSeverity): boolean;
        /**
         * Changes the output content of the Dialog to a new value.
         * The default DialogType is Overlay.
         * The default DialogSeverity is Info.
         * @param dialogOwner Caller Id to prevent overwriting forreign dialogs
         * @param html Text to display
         * @param options options
         * @param options.dialogType Overlay or watermark
         * @param options.severity severity of the text
         * @param options.buttonReload If true a reload button is added
         * @returns Success of the text update
         * @preserve (Part of the public API)
         */
        static updateTextEx(dialogOwner: string, html: string, options?: {
            dialogType?: TcHmi.DialogManager.DialogType;
            severity?: TcHmi.DialogManager.DialogSeverity;
            buttonReload?: boolean;
        }): boolean;
        /**
         * Returns the current dialog owner or null.
         * @preserve (Part of the public API)
         */
        static getDialogOwner(): string | null;
        /**
         * Builds a formatted message of hierarchical error objects for use in dialog.
         * @param error Error object to show nicely
         * @preserve (Part of the public API)
         */
        static buildMessage(error: TcHmi.IErrorDetails | undefined): string;
    }
    namespace DialogManager {
        /**
         * We support different severities for the dialog:
         * Info
         * Error
         */
        enum DialogSeverity {
            Info = 0,
            Warning = 1,
            Error = 2
        }
        /**
         * We support different types for the dialog:
         * Overlay
         * Watermark
         */
        enum DialogType {
            /** An overlay dialog */
            Overlay = 1,
            /** A watermark */
            Watermark = 2
        }
        /**
         * Options for the system dialogs
         */
        interface DialogOptions {
            /** The dialog should have a button to close the dialog. */
            cancelable?: boolean;
            /** The dialog should replace existing dialogs of different owner without respect. */
            force?: boolean;
            /** The dialog should be replaced by new dialogs of different owner without respect. */
            forceable?: boolean;
        }
    }
}
declare namespace TcHmi.Engineering {
    /**
     * Provides resources for interaction with the Visual Studio error pane
     */
    class ErrorPane {
        /**
         * Adds an message to current error pane
         * @param id Identifier for the message. Must be unique.
         * @param content Text content of the message
         * @param type severity of the message
         */
        static add(id: string, content: string, type: TcHmi.Engineering.ErrorPane.MessageType): void;
        /**
         * Removes an message from current error pane
         * @param id Identifier for the message. Must be unique.
         */
        static remove(id: string): void;
    }
    namespace ErrorPane {
        interface Message {
            identifier: string;
            type: ErrorPane.MessageType;
            content: string;
        }
        enum MessageType {
            Message = 0,
            Error = 1,
            Warning = 2,
            Information = 3
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides environment information.
     * @preserve (Part of the public API)
     */
    class Environment {
        private static __browserCapabilities;
        /**
         * Returns the dynamic framework base path.
         * @preserve (Part of the public API)
         */
        static getBasePath(): string;
        /**
         * Returns the dynamic base path of a control.
         * @preserve (Part of the public API)
         * @param type Control type name
         */
        static getControlBasePath(type: string): string | null;
        /**
         * Returns the dynamic base path of a control.
         * @preserve (Part of the public API)
         * @param control TcHmi Control reference
         */
        static getControlBasePathEx(control: TcHmi.Controls.System.baseTcHmiControl): string | null;
        /**
         * Returns an object describing if the current browser is a TcEmbeddedBrowser and what its capabilities are.
         */
        static getBrowserCapabilities(): Environment.BrowserCapabilities;
        /**
         * Returns the host base uri (with no pathname) which under normal circumstances is in the form "https://192.0.2.1:2020"
         * but can for example be "https://192.0.2.1/TcHmiSrv" in reverse proxy scenarios.
         * In this example http traffic to the external url "https://192.0.2.1/TcHmiSrv" will perhaps be sent to "https://192.0.2.1:2020".
         * If you have to call static urls of the hmi server which are always host related (like "/Config") you should call this function and prepend the result.
         * Example: let configUri = tchmi_path(TcHmi.Environment.getHostBaseUri() + '/Config');
         */
        static getHostBaseUri(): string;
        /**
         * path+query+hash of the hmi but as seen from the hmi server.
         * Could be different for reverse proxy scenarios.
         * Must be used for populating server redirects like /Logout?Location={1}
         */
        static getServerSidePathAndQuery(): string;
    }
    namespace Environment {
        interface BrowserCapabilities {
            isCefSharp: boolean;
            isTcEmbeddedBrowser: boolean;
            supportsDownload: boolean;
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for managing events.
     * @preserve (Part of the public API)
     */
    class EventProvider {
        /**
         * Register a callback to an event name.
         * If the name is a symbol expression the callback will be initially called when
         * there is a symbol with this name.
         * Returns a destroy function to remove the registration.
         * @param name Name of the event.
         * @param callback Callback which will be called
         * @param options Data an event can be given while registration.
         * @param registrationData Additional data and options for the event registration.
         * @param registrationData.ctx Context to be used when resolving %ctx% symbols.
         * @returns Destroy function which cleans up/unregisters
         * @preserve (Part of the public API)
         */
        static register(name: string, callback: (this: void, e: EventProvider.Event, ...args: any[]) => void, options?: any, registrationData?: {
            ctx?: Context<any>;
        }): DestroyFunction;
        /**
         * Calls all registered callbacks related to an event name.
         * @param name Name of the event.
         * @param args Optional parameter(s) which will be transfered to the callbacks
         * @preserve (Part of the public API)
         */
        static raise(name: string, ...args: any[]): void;
        /**
         * Calls the callback of a specific event registration.
         * @param event Event object
         * @param args optional parameter(s) which will be transfered to the callbacks
         * @preserve (Part of the public API)
         */
        static raiseEx(event: EventProvider.IEventEntry, ...args: any[]): void;
        /**
         * Watch for event registrations.
         * @param name Name of the event to watch
         * @param callback Callback which will be called
         */
        static watchEventRegistration(name: string, callback: (data: EventProvider.IEventRegResultObject) => void): DestroyFunction;
        /**
         * Check if event is registered.
         * @param name Name of the event
         */
        static has(name: string): boolean;
        /**
         * Event registration count
         * @param name Name of the event
         */
        static count(name: string): number;
        /**
         * Registers an event on DOM elements and returns an easy to use DestroyFunction to remove the event later.
         * @param element The element or elements to register the event on.
         * @param type The type of event to register.
         * @param listener The callback function that will handle the event.
         * @param options Options for the event registrations. Defaults to { passive: true }.
         */
        static registerDomEvent<K extends keyof HTMLElementEventMap>(element: Element | Document | Window | Iterable<Element>, type: K, listener: (this: EventTarget, event: HTMLElementEventMap[K]) => void, options?: AddEventListenerOptions): DestroyFunction;
        /**
         * Registers an event on DOM elements and returns an easy to use DestroyFunction to remove the event later.
         * @param element The element or elements to register the event on.
         * @param type The type of event to register.
         * @param listener The callback function that will handle the event.
         * @param options Options for the event registrations. Defaults to { passive: true }.
         */
        static registerDomEvent(element: Element | Document | Window | Iterable<Element>, type: string, listener: (this: EventTarget, event: Event) => void, options?: AddEventListenerOptions): DestroyFunction;
    }
    namespace EventProvider {
        enum EventRegWatchType {
            REGISTER = 100,
            DESTROY = 200
        }
        interface Event extends EventContext {
            /** Function to unregister from this event. */
            destroy: DestroyFunction;
        }
        interface IEventEntry {
            /** Id for internal event management. */
            id: number;
            /** Name of the event. */
            name: string;
            callback: (this: void, e: EventProvider.Event, ...data: any[]) => void;
            /** Data an event can be given while registration. */
            options?: any;
            /** Additional data and options for the event registration. */
            registrationData?: {
                /** Context to be used when resolving %ctx% symbols. */
                ctx?: Context<any>;
            };
            /** Function to unregister from an event. */
            destroy: DestroyFunction | null;
        }
        interface IEventRegResultObject extends TcHmi.IResultObject {
            type: EventRegWatchType;
            event: IEventEntry;
        }
    }
}
declare namespace TcHmi {
    /**
     * Represents a TcHmi Error.
     */
    class Exception extends Error {
        protected __details: SelectableRequired<IErrorDetails, 'message'>;
        /**
         * Creates a new Exception.
         * @param details The error details for this exception.
         */
        constructor(details: IErrorDetails);
        /**
         * Creates a new Exception.
         * @param code The error code.
         * @param reason The reason for the error in user-friendly plain text.
         * @param domain The domain the error originates from.
         * @param exception Underlying native JavaScript error, if there is one.
         */
        constructor(code: Exclude<Errors, Errors.NONE>, reason: string, domain: string, exception?: Error);
        /**
         * Creates a new Exception.
         * @param code The error code.
         * @param reason The reason for the error in user-friendly plain text.
         * @param domain The domain the error originates from.
         * @param errors Underlying TcHmi errors, if there are any.
         */
        constructor(code: Exclude<Errors, Errors.NONE>, reason: string, domain: string, errors?: IErrorDetails[]);
        /**
         * Creates a new Exception.
         * @param code The error code.
         * @param reason The reason for the error in user-friendly plain text.
         * @param domain The domain the error originates from.
         * @param exception Underlying native JavaScript error, if there is one.
         * @param errors Underlying TcHmi errors, if there are any.
         */
        constructor(code: Exclude<Errors, Errors.NONE>, reason: string, domain: string, exception?: Error, errors?: IErrorDetails[]);
        /**
         * Gets the error code.
         */
        get code(): Errors | number;
        /**
         * Gets the string name of the code in the Errors enum.
         */
        get message(): string;
        /**
         * Gets the reason for the error in user-friendly plain text.
         */
        get reason(): string | undefined;
        /**
         * Gets the domain the error originates from.
         */
        get domain(): string | undefined;
        /**
         * Gets the underlying native JavaScript error, if there is one.
         */
        get exception(): Error | undefined;
        /**
         * Gets the underlying TcHmi errors, if there are any.
         */
        get errors(): IErrorDetails[] | undefined;
        /**
         * Gets the error details.
         */
        get details(): IErrorDetails;
        /**
         * Adds underlying TcHmi errors.
         * @param errors The errors to add.
         */
        pushSubErrors(...errors: IErrorDetails[]): number;
        /**
         * Builds a formatted message of hierarchical error objects
         */
        buildMessage(): string;
        /**
         * Logs the error in the console with information about the caller.
         * @param callerInfo Information about the caller.
         * @param message An optional message to add further context.
         */
        log(callerInfo: Exception.ControlInfo | Exception.FrameworkInfo | Exception.FunctionInfo, message?: string): void;
        /**
         * Logs the error in the console with information about the caller.
         * @param callerInfo Information about the caller.
         * @param message An optional message to add further context.
         */
        log<T extends string>(callerInfo: Exception.LogInfo<T extends 'Control' | 'Framework' | 'Function' ? never : T>, message?: string): void;
    }
    namespace Exception {
        interface LogInfo<T extends string> {
            Source: T;
            [InfoName: string]: string | number | boolean;
        }
        interface ControlInfo extends LogInfo<'Control'> {
            Module: string;
            Origin: string;
            Id: string;
        }
        interface FrameworkInfo extends LogInfo<'Framework'> {
            Module: string;
        }
        interface FunctionInfo extends LogInfo<'Function'> {
            Module: string;
        }
    }
}
declare namespace TcHmi {
    /**
     * Uploads files to the server. Files are uploaded sequentially and divided into chunks if necessary.
     */
    class FileUploader {
        protected static __queue: FileUploader.QueuedFile[];
        protected static __current: FileUploader.QueuedFile | null;
        protected static __working: boolean;
        protected static __preparedChunks: Promise<Map<string, FileUploader.Chunk> | null> | null;
        protected static __chunkSize: null | number;
        protected static __subscribedToChunkSize: boolean;
        protected static __chunkSizeSubscriptionError: FileUploader.ProgressResultFail | null;
        protected __queueTimeoutId: number;
        protected readonly __options: SelectableRequired<FileUploader.Options, 'symbol'>;
        /**
         * Create a new FileUploader instance.
         * @param options Options for uploading files with this FileUploader instance.
         * @param options.domain The domain to upload files to. If not specified, files will be uploaded directly to the
         * TcHmiSrv domain.
         * @param options.symbol The symbol to upload files to. This symbol must take a writeValue containing the
         * properties fileName (full path and name of the file, delimited by forward slashes), data (base64 encoded file
         * contents) and chunkType (value of the enum FileUploader.ChunkType). Defaults to 'Upload'.
         * @param options.chunkSize The chunk size to use while uploading. Defaults to the chunk size specified in the
         * server config if not given, or if greater than the server config chunk size.
         */
        constructor(options?: FileUploader.Options);
        /**
         * Queue a file for upload. Queued files will be managed in a single queue across all instances.
         * If there is already a file with the same path in the queue, the already queued file will be canceled.
         * The returned Promise will resolve when the file upload finishes, is canceled, or encounters an error.
         * @param path The path to upload to.
         * @param file The file to upload.
         * @param options Options for this file upload.
         * @param options.progressCallback A callback function that will be called with the upload progress or any
         * errors whenever a chunk of the file was uploaded.
         * @param options.additionalProperties Additional properties that are set in the write value. Properties named
         * fileName, data or chunkType are reserved for use by the file uploader and will be ignored.
         */
        queue(path: string, file: Blob, options?: FileUploader.QueueOptions): Promise<FileUploader.ProgressResultSuccess>;
        /**
         * Cancel the upload of a queued file. If an upload is canceled after it has already started, the upload is
         * stopped, but the file fragment will remain on the server. It is the responsibility of the caller to delete it.
         * @param path The path of the file that should be cancelled.
         */
        cancel(path: string): Promise<boolean>;
        /**
         * The domain to upload files to. If not specified, files will be uploaded directly to the TcHmiSrv domain.
         */
        set domain(value: string | undefined | null);
        /**
         * The domain to upload files to. If not specified, files will be uploaded directly to the TcHmiSrv domain.
         */
        get domain(): typeof this.__options.domain;
        /**
         * The symbol to upload files to. This symbol must take a writeValue containing the properties fileName (full
         * path and name of the file, delimited by forward slashes), data (base64 encoded file contents) and chunkType
         * (value of the enum FileUploader.ChunkType). Defaults to 'Upload'.
         */
        set symbol(value: string | undefined | null);
        /**
         * The symbol to upload files to. This symbol must take a writeValue containing the properties fileName (full
         * path and name of the file, delimited by forward slashes), data (base64 encoded file contents) and chunkType
         * (value of the enum FileUploader.ChunkType). Defaults to 'Upload'.
         */
        get symbol(): typeof this.__options.symbol;
        /**
         * The chunk size to use while uploading. Defaults to the chunk size specified in the server config if not
         * given, or if greater than the server config chunk size.
         */
        set chunkSize(value: number | undefined | null);
        /**
         * The chunk size to use while uploading. Defaults to the chunk size specified in the server config if not
         * given, or if greater than the server config chunk size.
         */
        get chunkSize(): typeof this.__options.chunkSize;
        /**
         * Reads the file data as a base64 encoded string.
         * @param file The file to read.
         * @param offset The offset from which to start reading. Leave empty to read the whole file.
         * @param limit How many bytes to read. Leave empty to read to the end of the file.
         */
        static readFileAsBase64(file: Blob, offset?: number, limit?: number): Promise<string>;
        /**
         * Opens a dialog that allows the user to select one or more files from their local file system. Returns a
         * promise that resolves to null if the file dialog is canceled and to a FileList if the user selects files.
         * @param options Options for the file dialog.
         * @param options.multiple Set to true to allow selecting more than one file. Defaults to false.
         * @param options.acceptedFileTypes An array of unique file type specifiers. A unique file type specifier can be
         * a case-insensitive filename extension starting with a dot, a valid MIME type string, or one of the strings
         * 'audio/*', 'image/*' or 'video/*'.
         * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers.
         * Leave empty to allow any file type to be selected.
         */
        static openFileDialog(options?: FileUploader.FileDialogOptions): Promise<FileList | null>;
        /**
         * Split the files in the queue into chunks and upload them.
         */
        protected static __workQueue(): Promise<void>;
        /**
         * Dequeue the first item, read the file and prepare it for upload. If the chunkSize is not yet reached, further
         * files will be dequeued and also uploaded.
         */
        protected static __createChunks(): Promise<Map<string, FileUploader.Chunk> | null>;
        /**
         * Upload the given chunks.
         * @param chunks The chunks to upload.
         */
        protected static __upload(chunks: Map<string, {
            file: FileUploader.QueuedFile;
            data: string;
            type: FileUploader.ChunkType;
        }>): void;
        /**
         * Subscribe to the TcHmiSrv.Config::CHUNKSIZE symbol
         */
        protected static __subscribeChunkSize(): void;
    }
    namespace FileUploader {
        interface Options {
            /**
             * The domain to upload files to. If not specified, files will be uploaded directly to the TcHmiSrv domain.
             */
            domain?: string;
            /**
             * The symbol to upload files to. This symbol must take a writeValue containing the properties fileName
             * (full path and name of the file, delimited by forward slashes), data (base64 encoded file contents) and
             * chunkType (value of the enum FileUploader.ChunkType). Defaults to 'Upload'.
             */
            symbol?: string;
            /**
             * The chunk size to use while uploading. Defaults to the chunk size specified in the server config if not
             * given, or if greater than the server config chunk size.
             */
            chunkSize?: number;
        }
        interface QueueOptions {
            /**
             * A callback function that will be called with the upload progress or any errors whenever a chunk of the
             * file was uploaded.
             */
            progressCallback?: FileUploader.ProgressCallback;
            /**
             * Additional properties that are set in the write value. Properties named fileName, data or chunkType are
             * reserved for use by the file uploader and will be ignored.
             */
            additionalProperties?: Dictionary<any>;
        }
        interface QueuedFile {
            file: Blob;
            path: string;
            domainAndSymbol: string;
            additionalProperties?: QueueOptions['additionalProperties'];
            chunkSize?: number;
            offset: number;
            status: FileStatus;
            progressCallback: ProgressCallback;
        }
        type ProgressCallback = (result: ProgressResult) => void;
        interface ProgressResultSuccess extends IResultObject {
            error: Errors.NONE;
            uploadedBytes: number;
            totalBytes: number;
            status: FileStatus;
        }
        interface ProgressResultFail extends IResultObject {
            error: Exclude<Errors, Errors.NONE>;
            details: SelectableRequired<IErrorDetails, 'message' | 'reason' | 'domain'>;
        }
        type ProgressResult = ProgressResultSuccess | ProgressResultFail;
        enum FileStatus {
            Pending = 0,
            Uploading = 1,
            Finished = 2,
            Canceled = 3
        }
        interface Chunk {
            file: FileUploader.QueuedFile;
            data: string;
            type: FileUploader.ChunkType;
        }
        /** Common interface for all/most upload symbols */
        interface UploadWriteValue {
            /** Identifier for the uploaded file. */
            fileName: string;
            /** Data as base64. Not used with isDirectory. */
            data?: string;
            /**
             * The request should create a directory and not a file.
             * Not supported by all extensions.
             */
            isDirectory?: boolean;
            /** Not supported by all extensions. */
            checkSum?: string;
            /** Chunktype: 0=file is sent as a whole, 1=beginning of a file, 2=middle part of a file (any number of times), 3=end of a file */
            chunkType?: ChunkType;
        }
        enum ChunkType {
            /** File is sent as a whole. */
            Disabled = 0,
            /** Beginning of a file */
            First = 1,
            /** Middle part of a file (any number of times) */
            Intermediate = 2,
            /** End of a file */
            Last = 3
        }
        /**
         * Options for opening a file dialog.
         */
        interface FileDialogOptions {
            /**
             * Set to true to allow selecting more than one file. Defaults to false.
             */
            multiple?: boolean;
            /**
             * An array of unique file type specifiers. A unique file type specifier can be a case-insensitive filename
             * extension starting with a dot, a valid MIME type string, or one of the strings 'audio/*', 'image/*' or
             * 'video/*'.
             * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers.
             * Leave empty to allow any file type to be selected.
             */
            acceptedFileTypes?: string[];
        }
    }
}
declare namespace TcHmi {
    /**
     * Allows users to build filters and filter data with them.
     */
    class FilterInstance<T = any> {
        private __filter;
        private __schema;
        private __parsedFilter;
        private __wrapInBrackets;
        /**
         * Creates a new empty filter. An empty filter will match any data.
         * @param schema Optional schema that describes the filter. Necessary if you want to compare the values of
         * dates, since the filter needs to know if a given string should be interpreted as a date in ISO-8601 format.
         */
        constructor(schema?: JsonSchema);
        /**
         * Creates a copy of an existing filter instance.
         * @param filter The filter instance to copy.
         * @param schema Optional schema that describes the filter. If omitted, the schema of the existing filter
         * instance will be used. Necessary if you want to compare the values of dates, since the filter needs to know
         * if a given string should be interpreted as a date in ISO-8601 format.
         */
        constructor(filter: FilterInstance, schema?: JsonSchema);
        /**
         * Creates a new filter instance based on an existing filter definition.
         * @param filter The filter definition to use.
         * @param schema Optional schema that describes the filter. Necessary if you want to compare the values of
         * dates, since the filter needs to know if a given string should be interpreted as a date in ISO-8601 format.
         */
        constructor(filter: Filter, schema?: JsonSchema);
        /**
         * Creates a new filter instance based on a single comparison.
         * @param comparison The comparison to use.
         * @param schema Optional schema that describes the filter. Necessary if you want to compare the values of
         * dates, since the filter needs to know if a given string should be interpreted as a date in ISO-8601 format.
         */
        constructor(comparison: Comparison, schema?: JsonSchema);
        /**
         * Creates a new filter instance based on a single comparison.
         * @param path The path of the property that should be compared. The special values '{value}' and '{key}' can be
         * used to refer to the items value or key directly.
         * @param comparator How the comparison should be done.
         * @param value The value to compare against.
         * @param schema Optional schema that describes the filter. Necessary if you want to compare the values of
         * dates, since the filter needs to know if a given string should be interpreted as a date in ISO-8601 format.
         */
        constructor(path: '{value}' | '{key}' | string, comparator: Comparison['comparator'], value: Comparison['value'], schema?: JsonSchema);
        /**
         * Returns the current filter definition.
         */
        getFilter(): Filter;
        /**
         * Returns the filter schema.
         */
        getSchema(): JsonSchema | null;
        /**
         * Combines this filter with another filter using a logical and operator.
         * @param filter The filter to append.
         */
        and(filter: Filter | FilterInstance): this;
        /**
         * Combines this filter with a new comparison using a logical and operator.
         * @param comparison The comparison to append.
         */
        and(comparison: Comparison): this;
        /**
         * Combines this filter with a new comparison using a logical and operator.
         * @param path The path of the property that should be compared. The special values '{value}' and '{key}' can be
         * used to refer to the items value or key directly.
         * @param comparator How the comparison should be done.
         * @param value The value to compare against.
         */
        and(path: '{value}' | '{key}' | string, comparator: Comparison['comparator'], value: Comparison['value']): this;
        /**
         * Combines this filter with another filter using a logical or operator.
         * @param filter The filter to append.
         */
        or(filter: Filter | FilterInstance): this;
        /**
         * Combines this filter with a new comparison using a logical or operator.
         * @param comparison The comparison to append.
         */
        or(comparison: Comparison): this;
        /**
         * Combines this filter with a new comparison using a logical or operator.
         * @param path The path of the property that should be compared. The special values '{value}' and '{key}' can be
         * used to refer to the items value or key directly.
         * @param comparator How the comparison should be done.
         * @param value The value to compare against.
         */
        or(path: '{value}' | '{key}' | string, comparator: Comparison['comparator'], value: Comparison['value']): this;
        /**
         * Combines this filter with another filter or a comparison using a given logical operator.
         * @param logic Whether to use and or or logic.
         * @param filter The filter or comparison to combine this filter with.
         */
        private __append;
        /**
         * Wraps the entire filter in brackets.
         */
        wrapInBrackets(): this;
        /**
         * Compiles the filter. Returns an object indicating if any error occured during compilation.
         */
        compile(): IResultObject;
        /**
         * Tests whether the given candidate matches the filter.
         * @param candidate The candidate to test.
         * @param key If the candidat originated in a collection, for example an array, you can specify the key or index
         * of the candidate to support filters that filter by the key.
         */
        test(candidate: T, key?: string | number): boolean;
        /**
         * Filter an array. Returns a new array which contains only the items that match the filter.
         * @param array The array to filter.
         */
        filter<D extends T[]>(array: D): D;
        /**
         * Filter a dictionary. Returns a new dictionary which contains only the items that match the filter.
         * @param dictionary The dictionary to filter.
         */
        filter<D extends Dictionary<T>>(dictionary: D): D;
        /**
         * Filter a map. Returns a new map which contains only the items that match the filter.
         * @param map The map to filter.
         */
        filter<D extends Map<string | number, T>>(map: D): D;
        /**
         * Filter a set. Returns a new set which contains only the items that match the filter.
         * @param set The set to filter.
         */
        filter<D extends Set<T>>(set: D): D;
        /**
         * Filter an array. Returns a new array which contains only the items that match the filter and a map array that
         * contains the original indices of the filtered data.
         * @param array The array to filter.
         */
        filterWithMap<D extends T[]>(array: D): {
            data: D;
            map: number[];
        };
        /**
         * Recursively filter a tree by applying the filter to all levels of the structure. Returns the filtered data.
         * @param tree The tree to filter.
         * @param childrenProperty The name of the property that contains child items of each tree node.
         * @param strategy The strategy to use. DepthFirst will include items that don't match the filter if they have
         * children that match, while BreadthFirst will only include items that directly match the filter, regardless of
         * their children.
         */
        filterTree<D extends FilterInstance.Tree<T, C>, C extends keyof D[number]>(tree: D, childrenProperty: C, strategy?: FilterInstance.Strategy): D;
        /**
         * Recursively filter a tree by applying the filter to all levels of the structure. Returns the filtered data
         * and a map array that contains the original indices of the filtered data.
         * @param tree The tree to filter.
         * @param childrenProperty The name of the property that contains child items of each tree node.
         * @param strategy The strategy to use. DepthFirst will include items that don't match the filter if they have
         * children that match, while BreadthFirst will only include items that directly match the filter, regardless of
         * their children.
         */
        filterTreeWithMap<D extends FilterInstance.Tree<T, C>, C extends keyof D[number]>(tree: D, childrenProperty: C, strategy?: FilterInstance.Strategy): {
            data: D;
            map: HierarchicalFilterMap[];
        };
        /**
         * Perform depth-first filtering.
         * @param tree The tree to filter.
         * @param childrenProperty The name of the property that contains child items of each tree node.
         * @param parsedFilter The filter to use.
         * @param path Set to an empty array to generate a filter map. Omit to skip filter map generation.
         */
        private __depthFirst;
        /**
         * Perform breadth-first filtering.
         * @param tree The tree to filter.
         * @param childrenProperty The name of the property that contains child items of each tree node.
         * @param parsedFilter The filter to use.
         * @param path Set to an empty array to generate a filter map. Omit to skip filter map generation.
         */
        private __breadthFirst;
    }
    namespace FilterInstance {
        /**
         * The strategy to use while recursing into a tree structure.
         */
        enum Strategy {
            /**
             * Children will be evaluated first. If a child matches the filter, its parent will also match the filter.
             */
            DepthFirst = 0,
            /**
             * Children will only be evaluated after the parent itself was tested. If a parent item does not match the
             * filter, none of its children will match.
             */
            BreadthFirst = 1
        }
        type Tree<D, C extends string | number | symbol> = ({
            [children in C]?: Tree<D, C>;
        } & D)[];
    }
}
declare namespace TcHmi {
    /**
     * Used to execute functions based on a static JSON description.
     * @template R Type of the result of the function
     * @preserve (Part of the public API)
     */
    class Function<R = any> {
        /**
         * constructor
         * @param functionCallDescription function definition
         */
        constructor(functionCallDescription: IFunction<R>);
        /**
         * Will raise the function defined in constructor argument f: IFunction.
         * @param requiredArgs Optional required arguments. Will be injected before arguments defined in IFunction and after context object dummy if context object is required.
         * @preserve (Part of the public API)
         */
        execute(requiredArgs?: any[]): any;
        /**
         * Will raise the function defined in constructor argument f: IFunction and raises a callback afterwards.
         * @param requiredArgs Optional required arguments. Will be injected before arguments defined in IFunction and after context object dummy if context object is required.
         * @param callback Callback which will be called with the result
         * @preserve (Part of the public API)
         */
        executeEx(requiredArgs: any[] | undefined, callback: (this: TcHmi.Function<R>, data: Function.IExecuteResultObject<R>) => void): DestroyFunction;
        /**
         * Will raise the function defined in constructor argument f: IFunction and forward the context object defined in ctx: TcHmi.Context if the function supports this.
         * @param ctx Context object.
         * @param requiredArgs Optional required arguments. Will be injected before arguments defined in IFunction and after context object dummy if context object is required.
         * @preserve (Part of the public API)
         */
        executeEx2(ctx: SelectableRequired<TcHmi.Context, 'success' | 'error'>, requiredArgs?: any[]): DestroyFunction;
        /**
         * Resolved the processed wait mode of the function call description.
         * Even if a called function provides a synchronous wait mode it may be processed asynchronous if asynchronous working symbols
         * are added as additional parameter because parameters are resolved before the underlying function is called.
         */
        private __resolveProcessedWaitMode;
        /**
         * Returns true if the function call description will be processed asynchronous and false if not.
         * Even if a called function provides a synchronous wait mode it may be processed asynchronous if asynchronous working symbols
         * are added as additional parameter because parameters are resolved before the underlying function is called.
         * This function throws an exception if the function object was destroyed, the function call description is missing or the function description is missing.
         */
        isProcessedAsync(): boolean;
        /**
         * Releases all resources of the function
         * @preserve (Part of the public API)
         */
        destroy(): void;
        /**
         * Get the description of the function.
         * @preserve (Part of the public API)
         */
        getDescription(): FunctionDescription | undefined;
    }
    namespace Function {
        /**
         * @template R Type of the result of the function
         */
        interface IExecuteResultObject<R = any> extends TcHmi.IResultObject {
            /** Result of the function */
            result?: R;
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides resources for managing functions.
     * @preserve (Part of the public API)
     */
    namespace Functions {
    }
}
declare namespace TcHmi.Functions {
    /**
     * Deprecated! Please use registerFunctionEx.
     * @deprecated Please use registerFunctionEx.
     * @param name name of the framework function
     * @param functionImplementation Javascript function to execute
     * @param _descriptionUrl Url for the function description
     * @preserve (Part of the public API)
     */
    function registerFrameworkFunction(name: string, functionImplementation: (...args: any[]) => any, _descriptionUrl?: string): void;
    /**
     * Registers a function created within a TwinCAT HMI project in the framework.
     * @param name Name of the function
     * @param functionImplementation Javascript function to execute
     * @preserve (Part of the public API)
     */
    function registerFunction(name: string, functionImplementation: (...args: any[]) => any): void;
    /**
     * Registers a function created within a TwinCAT HMI project in the framework.
     * @param name Name of the function
     * @param namespace namespace of the function
     * @param functionImplementation Javascript function to execute
     * @param options options
     * @param options.injectInGlobalObject Inject the function implementation at namespace.name in global object
     * @preserve (Part of the public API)
     */
    function registerFunctionEx(name: string, namespace: string, functionImplementation: (...args: any[]) => any, options?: {
        /** Inject the function implementation at namespace.name in global object */
        injectInGlobalObject: boolean;
    }): void;
    /**
     * Returns a registered HMI function
     * @param name Name of the function
     * @preserve (Part of the public API)
     */
    function getFunction(name: string): ((...args: any[]) => any) | undefined;
    /**
     * Gets version information of function by name.
     * @param name Name of the function
     * @preserve (Part of the public API)
     */
    function getFunctionVersion(name: string): Version | null;
}
declare namespace TcHmi {
    /**
     * Provides an interface for keyboard interaction.
     * @preserve (Part of the public API)
     */
    class Keyboard {
        /**
         * Closes the system keyboard.
         */
        static close(): void;
        /**
         * Get the provider name of the system keyboard.
         */
        static getProviderName(): string;
        /**
         * Set the provider name of the system keyboard.
         * @param providerName Name of the system keyboard provider.
         */
        static setProviderName(providerName: string): void;
        /**
         * Gets if the system keyboard should open on focus of a textarea or input element.
         */
        static getAutoOpen(): boolean;
        /**
         * Sets if the system keyboard should open on focus of a textarea or input element.
         * @param newState new value
         */
        static setAutoOpen(newState: boolean): void;
        /**
         * Get the url of the keyboard layout according to the requested input mode and the current localization.
         * @param requestedInputMode the input mode of the input field the system keyboard is requested.
         */
        static getLayoutFileFromInputMode(requestedInputMode: string): Keyboard.LayoutResult;
        /**
         * Returns the project keyboard mapping. The project keyboard mapping maps pairs of input mode and keyboard layout urls to locale strings.
         */
        static getProjectKeyboardMapping(): Dictionary<Keyboard.InputModeMapping>;
        /**
         * Sets the project keyboard mapping. The project keyboard mapping maps pairs of input mode and keyboard layout urls to locale strings.
         * @param projectKeyboardMapping new project keyboard mapping.
         */
        static setProjectKeyboardMapping(projectKeyboardMapping: Dictionary<Keyboard.InputModeMapping>): void;
        /**
         * Gets the layout object of the system keyboard container.
         */
        static getContainerLayout(): Keyboard.ContainerLayout | null;
        /**
         * Sets the layout object of the system keyboard container. The layout object defines the positioning and dimensions of the keyboard.
         * @param layout dimensions and position of the system keyboard.
         */
        static setContainerLayout(layout: Keyboard.ContainerLayout): void;
    }
    namespace Keyboard {
        interface LayoutResultSuccess extends IResultObject {
            error: Errors.NONE;
            layoutUrl: string;
        }
        interface LayoutResultFail extends IResultObject {
            error: Exclude<Errors, Errors.NONE>;
            details: SelectableRequired<IErrorDetails, 'message' | 'reason' | 'domain'>;
        }
        type LayoutResult = LayoutResultSuccess | LayoutResultFail;
    }
}
declare namespace TcHmi {
    /**
     * Please use an array.
     * @deprecated Please use an array.
     */
    class List<T> extends Array<T> {
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        constructor();
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        first(predicate: ($: T) => boolean): T;
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        firstOrDefault(predicate: ($: T) => boolean, _defaultValue?: T): T | null;
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        remove(item: T): boolean;
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        addRange(items: T[]): void;
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        clearAll(): void;
        /**
         * Please use an array.
         * @deprecated Please use an array.
         */
        findIndex(predicate: ($: T, index: number, obj: T[]) => boolean): number;
    }
}
declare namespace TcHmi {
    /**
     * Provides resources for managing the localization.
     * @preserve (Part of the public API)
     */
    namespace Locale {
    }
}
declare namespace TcHmi.Locale {
    /**
     * Changes the locale of the HMI including all localization symbols.
     * Note that this does not change the Time Format Locale.
     * The locale name is given as ISO 639/BCP 47 identifier (Examples: 'en', 'en-US').
     * @param locale locale name to load. The locale name is given as ISO 639/BCP 47 identifier (Examples: 'en', 'en-US').
     * @param callback optional callback which is called after locale change
     * @preserve (Part of the public API)
     */
    function load(locale: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
    /**
     * Returns the current locale string for texts or undefined if no localized Symbol is available.
     * Note that this is not the Time Format Locale.
     * The locale name is given as ISO 639/BCP 47 identifier (Examples: 'en', 'en-US').
     * @returns The current locale identifier as ISO 639/BCP 47 identifier (Examples: 'en', 'en-US').
     * @preserve (Part of the public API)
     */
    function get(): string | undefined;
    /**
     * Returns the list of available application locales.
     * The locale name is given as ISO 639/BCP 47 identifiers (Examples: 'en', 'en-US').
     * @preserve (Part of the public API)
     */
    function getRegisteredLocales(): string[];
    /**
     * Returns the list of available control locales.
     * The locale name is given as ISO 639/BCP 47 identifiers (Examples: 'en', 'en-US').
     * @param type Control type (for example TcHmi.Controls.Beckhoff.TcHmiRadialGauge)
     */
    function getRegisteredLocalesForControl(type: string | null): string[];
    /**
     * Returns the list of available function locales.
     * The locale name is given as ISO 639/BCP 47 identifiers (Examples: 'en', 'en-US').
     * @param type Function type (for example TcHmi.Functions.Beckhoff.CheckAccess)
     */
    function getRegisteredLocalesForFunction(type: string | null): string[];
    /**
     * Allows safe access to a localization dictionary.
     * @template K Keys this Reader will resolve
     */
    class LocalizationReader<K extends string = string> {
        /**
         * Allows safe access to a localization dictionary.
         * @param localization localization dictionary
         */
        constructor(localization: ILocalizedTextMap<K>);
        private __localizationDictionary;
        /**
         * Returns the raw localization dictionary.
         */
        getLocalization(): ILocalizedTextMap<K>;
        /**
         * Returns the value associated with the key or the key if not value exists.
         * @param key Key to map to a localization
         */
        get(key: K): string;
    }
    /**
     * Used to access namespace related localization content.
     * Do not use this class directly. Please use one of its specializations like TcHmi.Locale.ControlLocalization,
     * TcHmi.Locale.FunctionLocalization or TcHmi.Locale.ApplicationLocalization.
     * @template K Keys this Localization will provide.
     */
    abstract class Localization<K extends string = string> {
        protected __namespace: string;
        /**
         * Returns a dictionary with all related localization texts.
         * @param options optional locale level
         */
        get(options?: {
            level: TcHmi.Locale.Level;
        }): TcHmi.Locale.LocalizationReader<K>;
        /**
         * Watches the list of all related localization texts.
         * Returns a destroy function to remove the watch.
         * @param callback callback which is called on each value change
         * @template WK Keys this watch will provide. Falls back to keys of the Localization.
         */
        watch<WK extends string = K>(callback: (this: void, data: TcHmi.Locale.IWatchResultObject<WK>) => void): TcHmi.DestroyFunction;
        /**
         * Watches the list of all related localization texts.
         * Returns a destroy function to remove the watch.
         * @param options optional locale level
         * @param callback callback which is called on each value change
         * @template WK Keys this watch will provide. Falls back to keys of the Localization.
         */
        watchEx<WK extends string = K>(options: {
            level: TcHmi.Locale.Level;
        } | undefined, callback: (this: void, data: TcHmi.Locale.IWatchResultObject<WK>) => void): TcHmi.DestroyFunction;
        /**
         * Returns the text for a specific localization key or the key if no text is available.
         * @param key Key which should be mapped to a text.
         * @param options optional locale level
         */
        getText(key: K, options?: {
            level: TcHmi.Locale.Level;
        }): string;
        /**
         * Watches the text for a specific localization key or the key if no text is available.
         * Returns a destroy function to remove the watch.
         * @param key Key which is mapped to a text.
         * @param callback callback which is called on each value change
         */
        watchText(key: K, callback?: (this: void, data: TcHmi.Locale.IWatchTextResultObject) => void): TcHmi.DestroyFunction;
        /**
         * Watches the text for a specific localization key or the key if no text is available.
         * @param key Key which is mapped to a text.
         * @param options optional locale level
         * @param callback callback which is called on each value change
         */
        watchTextEx(key: K, options: {
            level: TcHmi.Locale.Level;
        } | undefined, callback: (this: void, data: TcHmi.Locale.IWatchTextResultObject) => void): TcHmi.DestroyFunction;
    }
    /**
     * Used to access application related localization content.
     */
    class ApplicationLocalization extends TcHmi.Locale.Localization {
        /**
         * Constructor
         */
        constructor();
    }
    /**
     * Used to access control related localization content.
     */
    class ControlLocalization extends TcHmi.Locale.Localization {
        /**
         * Constructor
         * @param type Name+Namespace of the control
         */
        constructor(type: string);
    }
    /**
     * Used to access function related localization content.
     */
    class FunctionLocalization extends TcHmi.Locale.Localization {
        /**
         * Constructor
         * @param type Name+Namespace of the function
         */
        constructor(type: string);
    }
    /**
     * Used to access package related localization content.
     */
    class PackageLocalization extends TcHmi.Locale.Localization {
        /**
         * Constructor
         * @param id Id of the target NuGet package
         */
        constructor(id: string);
    }
    enum Level {
        Application = 0,
        Engineering = 1
    }
    interface IWatchResultObject<K extends string = string> extends TcHmi.IResultObject {
        reader?: LocalizationReader<K>;
        /** A destroy function to remove the watch. Only set if there is no error. */
        destroy?: TcHmi.DestroyFunction;
    }
    interface IWatchTextResultObject extends TcHmi.IResultObject {
        text?: string;
        /** A destroy function to remove the watch. Only set if there is no error. */
        destroy?: TcHmi.DestroyFunction;
    }
}
declare namespace TcHmi {
    /**
     * Allows handling date and time formatting.
     * @preserve (Part of the public API)
     */
    class Localization {
        /**
         * Constructor
         */
        constructor();
        /**
         * Returns a cached Intl.DateTimeFormat
         * When no parameter is given the current setting of the user is used
         *
         * @param locale Locale like 'en'
         * @param timeZone Timezone locator
         * @param hour12 time format
         * @param type format type
         */
        static getDateTimeFormatter(locale: string | undefined, timeZone: string | undefined, hour12: boolean | undefined, type?: Localization.FormatType): Intl.DateTimeFormat;
        /**
         * Skip non numeric chars and parseInt the rest.
         * MS Browsers add Left-To-Right-Mark to output
         * https://github.com/tc39/ecma402/issues/28
         * @param input string input
         * @preserve (Part of the public API)
         */
        static parseInt(input: string): number;
        /**
         * Parses a Date object
         * formats it to a time zone and split its components into an object
         * On error all entries will be NaN
         * @param date Date object to parse
         * @param options Options
         * @preserve (Part of the public API)
         */
        static parseDate(date: Date, options?: Localization.ParseOptions): Localization.DateParts;
        /**
         * Formats a Date object down to milliseconds in the correct locale and time zone (config from server user or browser default)
         * On error this will be null
         * @param date Date Object to parse
         * @param options Options
         * @preserve (Part of the public API)
         */
        static formatDate(date: Date, options?: TcHmi.Localization.FormatOptions): string | null;
    }
    namespace Localization {
        /** Holds a date splitted in the number parts */
        interface DateParts {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
            millisecond: number;
        }
        interface ParseOptions {
            timeZone?: string | undefined;
        }
        interface FormatOptions extends ParseOptions {
            /** Type of the format output. Can be 'full', 'date', 'time', 'time-no-millisec' or 'date-no-millisec' */
            type?: FormatType;
            /** Locale to format the string. Can be empty to use the time format locale of the current user. */
            locale?: string | undefined | null;
        }
        type FormatType = 'full' | 'date' | 'time' | 'time-no-millisec' | 'full-no-millisec';
    }
}
declare namespace TcHmi {
    /**
     * Encapsulates access to the browsers localStorage. Provides methods to set, get and delete Items from localStorage
     * that take and return properly typed values. Has a validation mechanism that automatically deletes items if their
     * default initial value changes between class instantiations.
     * @preserve (Part of the public API)
     */
    class LocalStorage<I extends {
        [key: string]: unknown;
    }, V extends Partial<{
        [K in keyof I]: unknown;
    }> = {
        [K in keyof I]?: never;
    }> {
        protected __validationValues: V;
        protected __name: string;
        protected __storage: Partial<{
            [K in keyof I]: LocalStorage.Item<I[K], V[K]>;
        }>;
        /**
         * Create a new storage instance with the specified name. Values that were previously stored under the same name
         * will be read from the browsers localStorage and values that no longer match their validation values are removed.
         * @param name The name of the storage instance.
         * @param validationValues Values to validate stored items. The validationValue for each item will be stored in
         * localStorage alongside the stored item. When a new storage instance is created, stored items whose validationValue
         * no longer matches the validationValue given to the constructor will be deleted. The validationValue for each item
         * should be chosen to be an attribute or similar value, that, when changed during engineering in the creator
         * overrides the stored item value. This way, attributes that are changed in the creator are not overridden again by
         * values from localStorage when the liveview is reloaded or a deployed HMI is updated.
         * @preserve (Part of the public API)
         */
        constructor(name: string, validationValues: V);
        /**
         * Create a new storage instance for the given control. The name of the instance will be derived from the control id.
         * Values that were previously stored under the same name will be read from the browsers localStorage and values
         * that no longer match their validation values are removed. For validation to function properly, storage instances
         * should be created in the __init() method of controls.
         * @param control The control for which to create the storage instance.
         * @param validationValues Values to validate stored items. The validationValue for each item will be stored in
         * localStorage alongside the stored item. When a new storage instance is created, stored items whose validationValue
         * no longer matches the validationValue given to the constructor will be deleted. The validationValue for each item
         * should be chosen to be an attribute or similar value, that, when changed during engineering in the creator
         * overrides the stored item value. This way, attributes that are changed in the creator are not overridden again by
         * values from localStorage when the liveview is reloaded or a deployed HMI is updated.
         * @preserve (Part of the public API)
         */
        constructor(control: TcHmi.Controls.System.baseTcHmiControl, validationValues: V);
        /**
         * Sets a stored value for the current user. Returns a boolean that indicates if writing to localStorage was successful.
         * @param key The key of the value to set.
         * @param value The value to set.
         * @preserve (Part of the public API)
         */
        set<K extends keyof I>(key: K, value: I[K]): boolean;
        /**
         * Sets a stored value for the current user only if a stored value is already set or the new value to be stored
         * is not equal to the validationValue. This is useful if you want to avoid writing a value into localStorage if
         * that value is already equal to the default value anyway. Returns a boolean that indicates if a new value was set.
         * @param key The key of the value to set.
         * @param value The value to set.
         * @preserve (Part of the public API)
         */
        setWithValidation<K extends keyof I>(key: K, value: I[K]): boolean;
        /**
         * Returns the stored value associated with the given key for the current user.
         * @param key The key to read.
         * @preserve (Part of the public API)
         */
        get<K extends keyof I>(key: K): I[K] | undefined;
        /**
         * Deletes a stored value for the current user.
         * @param key The key of the value to delete.
         * @preserve (Part of the public API)
         */
        delete<K extends keyof I>(key: K): void;
    }
    namespace LocalStorage {
        interface BaseItem<S> {
            users?: Dictionary<S>;
        }
        interface ValidatedItem<S, V> extends BaseItem<S> {
            validation: {
                expectedValue: V;
            };
        }
        export type Item<S, V = void> = BaseItem<S> | ValidatedItem<S, V>;
        export {};
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for logging.
     * @preserve (Part of the public API)
     */
    class Log {
        /** When set to true no prefix will be printed with log messages. */
        static Prefix: boolean;
        /** When set to true the configured log level will be ignored and the messages logged anyway. */
        static Force: boolean;
    }
    /**
     * Provides functions for logging.
     * @preserve (Part of the public API)
     */
    namespace Log {
        /**
         * Prints out an error message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 1 or higher.
         * If the message is an object it will be inspectable in most debug tools. See errorEx if you want to show multiple objects.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 1 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param forceNoPrefix If set the date will be hidden
         * @preserve (Part of the public API)
         */
        function error(message: string | object | null | undefined, forceNoPrefix?: boolean): void;
        /**
         * Prints out an error message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 1 or higher.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 1 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param optionalParameters Optional parameters
         * @preserve (Part of the public API)
         */
        function errorEx(message: string, ...optionalParameters: any[]): void;
        /**
         * Prints out a warning message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 2 or higher.
         * If the message is an object it will be inspectable in most debug tools. See warnEx if you want to show multiple objects.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 2 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param forceNoPrefix If set the date will be hidden
         * @preserve (Part of the public API)
         */
        function warn(message: string | object | null | undefined, forceNoPrefix?: boolean): void;
        /**
         * Prints out a warning message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 2 or higher.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 2 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param optionalParameters Optional parameters
         * @preserve (Part of the public API)
         */
        function warnEx(message: string, ...optionalParameters: any[]): void;
        /**
         * Prints out an info message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 3 or higher.
         * If the message is an object it will be inspectable in most debug tools. See infoEx if you want to show multiple objects.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 3 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param forceNoPrefix If set the date will be hidden
         * @preserve (Part of the public API)
         */
        function info(message: string | object | null | undefined, forceNoPrefix?: boolean): void;
        /**
         * Prints out an info message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 3 or higher.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 3 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param optionalParameters Optional parameters
         * @preserve (Part of the public API)
         */
        function infoEx(message: string, ...optionalParameters: any[]): void;
        /**
         * Prints out a debug message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 4 or higher.
         * If the message is an object it will be inspectable in most debug tools. See debugEx if you want to show multiple objects.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 4 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param forceNoPrefix If set the date will be hidden
         * @preserve (Part of the public API)
         */
        function debug(message: string | object | null | undefined, forceNoPrefix?: boolean): void;
        /**
         * Prints out a debug message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 4 or higher.
         * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 4 or higher.
         * See "client" page in config page of the server for live overrides.
         * @param message The text which will be printed out in the browsers console and/or written to the browser database.
         * @param optionalParameters Optional parameters
         * @preserve (Part of the public API)
         */
        function debugEx(message: string, ...optionalParameters: any[]): void;
        namespace Controls {
            type AdditionalInfo = {
                /** attribute name of the control */
                Attribute?: string | undefined | null;
                Symbol?: string | undefined | null;
                [key: string]: string | undefined | null;
            };
            /**
             * Prints out an error message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 1 or higher.
             * Adds contextual information (module type, ID, origin) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 1 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function error(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out an error message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 1 or higher.
             * Adds contextual information (module type, ID, origin, custom) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 1 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param additionalInfo Additional custom context information. The key and value of this object will be shown in output. {Attribute: "Top"} will add "Attribute=Top" into the log.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function error(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, additionalInfo: AdditionalInfo, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out a warn message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 2 or higher.
             * Adds contextual information (module type, ID, origin) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 2 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function warn(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out a warn message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 2 or higher.
             * Adds contextual information (module type, ID, origin, custom) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 2 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param additionalInfo Additional custom context information. The key and value of this object will be shown in output. {Attribute: "Top"} will add "Attribute=Top" into the log.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function warn(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, additionalInfo: AdditionalInfo, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out an info message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 3 or higher.
             * Adds contextual information (module type, ID, origin) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 3 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function info(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out an info message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 3 or higher.
             * Adds contextual information (module type, ID, origin, custom) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 3 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param additionalInfo Additional custom context information. The key and value of this object will be shown in output. {Attribute: "Top"} will add "Attribute=Top" into the log.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function info(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, additionalInfo: AdditionalInfo, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out a debug message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 4 or higher.
             * Adds contextual information (module type, ID, origin) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 4 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function debug(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, message: string, ...optionalParameters: any[]): void;
            /**
             * Prints out a debug message in the browsers console if TCHMI_CONSOLE_LOG_LEVEL is set to 4 or higher.
             * Adds contextual information (module type, ID, origin, custom) to the message for improved traceability.
             * Writes to browser database (IndexedDB) if TCHMI_PERSISTENT_LOG_LEVEL is set to 4 or higher.
             * See "client" page in config page of the server for live overrides.
             * @param control Control instance used to derive module type and ID which is included in the composed context.
             * @param origin The fully qualified name of the control which is included in the composed context if it differs from the control type.
             * @param additionalInfo Additional custom context information. The key and value of this object will be shown in output. {Attribute: "Top"} will add "Attribute=Top" into the log.
             * @param message The text which will be printed out in the browsers console and/or written to the browser database.
             * @param optionalParameters Optional parameters
             * @preserve (Part of the public API)
             */
            function debug(control: TcHmi.Controls.System.baseTcHmiControl, origin: string, additionalInfo: AdditionalInfo, message: string, ...optionalParameters: any[]): void;
        }
        /**
         * Starts a new timer for performance analysis and stops the current timer
         * Is also responsible for console grouping
         * @param timerName Human readable name of the starting Timer or null to end timer
         */
        function performanceLog(timerName: string | null): void;
        /**
         * Starts a new timer for performance analysis
         * @param timerName Human readable name of the starting Timer
         */
        function performanceLogStart(timerName: string): void;
        /**
         * Stops an existing timer for performance analysis
         * @param timerName Human readable name of the starting Timer
         */
        function performanceLogEnd(timerName: string): void;
        /**
         * Builds a formatted message of hierarchical error objects
         * @param error Error object to show nicely
         * @preserve (Part of the public API)
         */
        function buildMessage(error: TcHmi.IErrorDetails | undefined): string;
    }
}
declare namespace TcHmi {
    /**
     * Convenience functionality for dealing with TwinCAT HMI object path syntax.
     * @preserve (Part of the public API)
     */
    class ObjectPath implements Iterable<string | number> {
        /**
         * Stores the path as a string. This is only created if the constructor was called with a string or the toString
         * method was called. It will be reset to null if the path is modified.
         */
        private __pathString;
        /**
         * Stores the path as an array of property accessors. If the array does not contain any numbers, that will be
         * indicated by isTokens.
         */
        private __path;
        /**
         * Create an empty object path.
         * @preserve (Part of the public API)
         */
        constructor();
        /**
         * Create an object path instance from a path in string format. A path in string format uses '::' to denote
         * object property access and '[]' to denote array element access. For example: 'foo::bar[1]'.
         * @param path The path in string format.
         * @preserve (Part of the public API)
         */
        constructor(path: string);
        /**
         * Create an object path instance from an array of tokens. In an array of tokens, strings denote object property
         * access, while numbers denote array element access. For example: ['foo', 'bar', 1]. To support legacy
         * behavior, array element access can also be specified by enclosing a number in square brackets. For example:
         * ['foo', 'bar', '[1]'].
         * @param tokens The token array.
         * @preserve (Part of the public API)
         */
        constructor(tokens: (string | number)[]);
        /**
         * Append the given tokens to the back of the path. A token can be a single object property accessor, a single
         * array element accessor using a number or string containing a number enclosed in brackets, or a complete path
         * in string format, which will be parsed and its individual parts added to the object path instance.
         * @param tokens The tokens to add.
         * @returns The new length of the path.
         * @preserve (Part of the public API)
         */
        push(...tokens: (string | number)[]): number;
        /**
         * Removes the last property accessor from the back of the path and returns it. Object property accessors are
         * returned as strings, while array element accessors are returned as numbers.
         * @returns The removed property accessor.
         * @preserve (Part of the public API)
         */
        pop(): string | number | undefined;
        /**
         * Removes the last path token from the back of the path and returns it. Object property accessors are returned
         * as strings, while array element accessors are returned as strings containing a number enclosed in brackets.
         * @returns The removed path token.
         * @preserve (Part of the public API)
         */
        popAsPathToken(): string | undefined;
        /**
         * Append the given tokens to the front of the path. A token can be a single object property access, a single
         * array element access using a number or string containing a number enclosed in brackets, or a complete path in
         * string format, which will be parsed and its individual parts added to the object path instance.
         * @param tokens The tokens to add.
         * @returns The new length of the path.
         * @preserve (Part of the public API)
         */
        unshift(...tokens: (string | number)[]): number;
        /**
         * Removes the first property accessor from the front of the path and returns it. Object property accessors are
         * returned as strings, while array element accessors are returned as numbers.
         * @returns The removed property accessor.
         * @preserve (Part of the public API)
         */
        shift(): string | number | undefined;
        /**
         * Removes the first path token from the front of the path and returns it. Object property accessors are
         * returned as strings, while array element accessors are returned as strings containing a number enclosed
         * in brackets.
         * @returns The removed path token.
         * @preserve (Part of the public API)
         */
        shiftAsPathToken(): string | undefined;
        /**
         * Add the given tokens to the front or back of the path.
         * @param tokens The tokens to add.
         * @param inFront Set to true to add the tokens to the front. Defaults to false.
         * @returns The new length.
         */
        private __add;
        /**
         * Removes the first or last token and returns it.
         * @param inFront Set to true to remove the first token. Defaults to false.
         * @returns The removed token.
         */
        private __remove;
        /**
         * Returns a copy of a section of the path.
         * For both start and end, a negative index can be used to indicate an offset from the end of the path.
         * For example, -2 refers to the second to last token of the path.
         * @param start The beginning index of the specified portion of the path.
         * If start is undefined, then the slice begins at index 0.
         * @param end The end index of the specified portion of the path. This is exclusive of the token at the index 'end'.
         * If end is undefined, then the slice extends to the end of the path.
         */
        slice(start?: number, end?: number): ObjectPath;
        /**
         * Returns the property accessor at the given index.
         * @param index The index.
         * @returns The property accessor at the given index.
         * @preserve (Part of the public API)
         */
        get(index: number): number | string | undefined;
        /**
         * Returns the property accessor at the given index. Array item accessors are returned as a string containing a
         * number enclosed in brackets.
         * @param index The index.
         * @returns The property accessor at the given index.
         * @preserve (Part of the public API)
         */
        getAsPathToken(index: number): string | undefined;
        /**
         * The current length of the path.
         * @preserve (Part of the public API)
         */
        get length(): number;
        /**
         * Provides an IterableIterator for the object path. Iterates over all property accessors.
         * @returns An IterableIterator.
         * @preserve (Part of the public API)
         */
        [window.Symbol.iterator](): IterableIterator<string | number>;
        /**
         * Reads the property of the given object or array that is indicated by the object path. Does not create a
         * clone.
         * @param target The object, array or string to read from.
         * @returns The value of the property that was read.
         * @preserve (Part of the public API)
         */
        readFrom(target: Dictionary<any> | any[] | string): any;
        /**
         * Writes the given value to the property of the given object or array that is indicated by the object path.
         * @param target The object or array to write to.
         * @param value The value to write.
         * @preserve (Part of the public API)
         */
        writeTo(target: Dictionary<any> | any[] | string, value: any): void;
        /**
         * Applies a single property accessor to the given target. Returns the property that is indicated by the
         * property accessor.
         * @param target The target to apply the property accessor to.
         * @param propertyAccessor The property accessor to apply.
         * @returns The property that is indicated by the property accessor.
         */
        private __applyPropertyAccessor;
        /**
         * Returns the path in string format.
         * @returns The path in string format.
         * @preserve (Part of the public API)
         */
        toString(): string;
        /**
         * Converts the object path to tokens. Object property accessors are defined as strings, array item accessors
         * are defined as strings containig a number enclosed in brackets.
         * @returns The path in token array format.
         * @preserve (Part of the public API)
         */
        toPathTokens(): string[];
        /**
         * Splits the object path into tokens but converts tokens like [0] into 0 which can directly be used as array
         * item accessors. Object property accessors are defined as strings.
         * @returns The path in property accessors format.
         * @preserve (Part of the public API)
         */
        toPropertyAccessors(): (string | number)[];
        /**
         * Splits the object path into tokens.
         * @param pathString The string to split.
         * @param options Options for the split operation.
         * @param options.noArrayBrackets Set to true to convert strings containing numbers in brackets to numbers.
         * Defaults to false.
         * @returns The path as an array in token or property accessor format.
         */
        private __split;
        /** Returns a string representation of a function. */
        static toString(): string;
        /**
         * Returns the path in string format.
         * @param tokens The path as an array in token or property accessor format.
         * @returns The path in string format.
         * @preserve (Part of the public API)
         */
        static toString(tokens: (string | number)[]): string;
        /**
         * Converts the object path to tokens. Object property accessors are defined as strings, array item accessors
         * are defined as strings containig a number enclosed in brackets.
         * @param path The path to convert. A path in string format uses '::' to denote object property access and '[]'
         * to denote array element access. For example: 'foo::bar[1]'.
         * @returns The path in token array format.
         * @preserve (Part of the public API)
         */
        static toPathTokens(path: string): string[];
        /**
         * Splits the object path into tokens but converts tokens like [0] into 0 which can directly be used as array
         * item accessors. Object property accessors are defined as strings.
         * @param path The path to convert. A path in string format uses '::' to denote object property access and '[]'
         * to denote array element access. For example: 'foo::bar[1]'.
         * @returns The path in property accessors format.
         * @preserve (Part of the public API)
         */
        static toPropertyAccessors(path: string): (string | number)[];
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for interaction with the server.
     * @preserve (Part of the public API)
     */
    class Server {
        /**
         * Returns the current readyState value of the underlying websocket which is connected to the server. Returns null when system is not ready.
         * Use constants like WebSocket.CLOSED or WebSocket.OPEN for comparison.
         * If websocket is OPEN handshakes between server and framework may not yet be done and server may not be ready for full functionality.
         * Use isReady function instead.
         * @returns The current readyState value of the underlying websocket which is connected to the server or null.
         * @preserve (Part of the public API)
         * @deprecated Please use isReady function.
         */
        static getWebsocketReadyState(): number | null;
        /**
         * Returns true if the websocket is ready and false if its not.
         * If websocket is ready handshakes between server and framework may not yet be done and server may not be ready for full functionality.
         * Use isReady function instead.
         * @returns If true the websocket is ready for connectivity.
         * @preserve (Part of the public API)
         * @deprecated Please use isReady function.
         */
        static isWebsocketReady(): boolean;
        /**
         * Returns true if the server is ready for application communication.
         * Websocket is ready and handshakes are done.
         * @preserve (Part of the public API)
         */
        static isReady(): boolean;
        /**
         * Returns the framework related api version of the server in the form x.x.x.x and null if the
         * current server version does not support this information yet or the server communication is not yet ready.
         * You can call isReady function to determine if server is ready for communication.
         * You can use the global tchmi_compare_version function to compare the result against a specific version.
         * @preserve (Part of the public API)
         */
        static getApiVersion(): string | null;
        /**
         * Write one value to a TwinCAT HMI Server symbol.
         * @param symbolName The target TwinCAT HMI Server symbolname.
         * @param value The value which should be written to the target symbol.
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static writeSymbol<W = any, R = W>(symbolName: string, value: W, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Write multiple values to a TwinCAT HMI Server symbol.
         * @param symbolName The target TwinCAT HMI Server symbolnames as array.
         * @param value The values (as array) which should be written to the target symbol.
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static writeSymbol<W = any, R = W>(symbolName: string[], value: W[], callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Write one or more values to a server symbol.
         * @param symbolNames The target server symbol name or list of symbol names
         * @param values The value which should be written to the target symbol.
         * @param requestOptions Options for the request itself
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static writeSymbolEx<W = any, R = W>(symbolNames: string | string[], values: W | W[], requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Write one or more values to a server symbol.
         * @param symbolNames The target server symbol name or list of symbol names
         * @param values The value which should be written to the target symbol.
         * @param options Options
         * @param options.symbolOptions Options for the symbols
         * @param options.requestOptions Options for the request to the server
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static writeSymbolEx2<W = any, R = W>(symbolNames: string | string[], values: W | W[], options: {
            symbolOptions?: Server.ISymbolOptions | Server.ISymbolOptions[] | null;
            requestOptions?: TcHmi.Server.IRequestOptions | null;
        } | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Reads the value of one or multiple TwinCAT HMI Server symbol.
         * @param symbolNames The target TwinCAT HMI Server symbolname or list of symbol names
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * The callback function gets 'error' (TcHmi.Errors.E_WEBSOCKET_NOT_READY or TcHmi.Errors.NONE) and the response
         * @returns Request id
         * @template W unused because this is a read only
         * @template R Type of the read value.
         * @preserve (Part of the public API)
         */
        static readSymbol<W = any, R = W>(symbolNames: string | string[], callback?: null | ((this: void, data: TcHmi.Server.IResultObject<undefined, R>) => void)): number | null;
        /**
         * Reads the value of one or multiple TwinCAT HMI Server symbol.
         * @param symbolNames The target TwinCAT HMI Server symbolname or list of symbol names
         * @param requestOptions Options for the request itself
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * The callback function gets 'error' (TcHmi.Errors.E_WEBSOCKET_NOT_READY or TcHmi.Errors.NONE) and the response
         * @returns Request id
         * @template W unused because this is a read only
         * @template R Type of the read value.
         * @preserve (Part of the public API)
         */
        static readSymbolEx<W = any, R = W>(symbolNames: string | string[], requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<undefined, R>) => void)): number | null;
        /**
         * Reads the value of a server symbol
         * @param symbolNames The target symbol name or list of symbol names
         * @param options Options
         * @param options.symbolOptions Options for the symbols
         * @param options.requestOptions Options for the request to the server
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * The callback function gets 'error' (TcHmi.Errors.E_WEBSOCKET_NOT_READY or TcHmi.Errors.NONE) and the response
         * @returns Request id
         * @template R Type of the read value.
         * @preserve (Part of the public API)
         */
        static readSymbolEx2<R = any>(symbolNames: string | string[], options: {
            symbolOptions?: Server.ISymbolOptions | Server.ISymbolOptions[] | null;
            requestOptions?: Server.IRequestOptions | null;
        } | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<undefined, R>) => void)): number | null;
        /**
         * Subscribe to one or more server symbols.
         * @param symbolNames The target server symbol name or list of symbol names.
         * @param interval Subscription refresh interval.
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Subscription id
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static subscribeSymbol<R = any>(symbolNames: string | string[], interval: number, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<unknown, R>) => void)): number | null;
        /**
         * Subscribe to one or more server symbols with writeValue support for function symbols with parameters or cyclic writing.
         * @param symbolNames The target server symbol name or list of symbol names.
         * @param writeValues The value which should be written to the target symbol with each call.
         * @param interval Subscription refresh interval.
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Subscription id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static subscribeSymbolEx<W = any, R = W>(symbolNames: string | string[], writeValues: W | W[] | undefined, interval: number, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Subscribe to one or more server symbols with writeValue support for function symbols with parameters or cyclic writing.
         * @param symbolNames The target server symbol name or list of symbol names.
         * @param writeValues The value which should be written to the target symbol.
         * @param interval Subscription refresh interval.
         * @param options Options
         * @param options.symbolOptions Options for the symbols
         * @param options.requestOptions Options for the request to the server
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Subscription id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static subscribeSymbolEx2<W = any, R = W>(symbolNames: string | string[], writeValues: W | W[] | undefined, interval: number, options: {
            symbolOptions?: Server.ISymbolOptions | Server.ISymbolOptions[] | null;
            requestOptions?: TcHmi.Server.IRequestOptions | null;
        } | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Resolves the schema of a server symbol by name.
         * @param symbolName The target symbol name.
         * @param callback Possibly asynchronous callback which will be raised when the resolved schema is available or the schema can't be resolved.
         */
        static resolveSymbolSchema(symbolName: string, callback?: null | ((this: void, data: TcHmi.Server.ISchemaResultObject) => void)): void;
        /**
         * Resolves the schema of a server symbol by name.
         * @param symbolName The target symbol name.
         * @param options Options
         * @param callback Possibly asynchronous callback which will be raised when the resolved schema is available or the schema can't be resolved.
         */
        static resolveSymbolSchemaEx(symbolName: string, options: Server.IResolveSchemaOptions | null, callback?: null | ((this: void, data: TcHmi.Server.ISchemaResultObject) => void)): void;
        /**
         * Resolves meta data of a server symbol by name.
         * @param symbolName The target symbol name.
         * @param callback Callback which will be raised when the meta data is available or the meta data can't be resolved.
         */
        static resolveSymbolMetaData(symbolName: string, callback?: null | ((this: void, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void)): void;
        /**
         * Requests a message to the hmi server with default connection parameter
         * @param request Request object
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * The callback function gets 'error' (TcHmi.Errors.E_WEBSOCKET_NOT_READY or TcHmi.Errors.NONE) and the response
         * @returns Request id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static request<W = any, R = W>(request: TcHmi.Server.IMessage<W, R>, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Requests a message to the hmi server with given connection parameter
         * @param request Request object
         * @param requestOptions Options for the request itself
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * The callback function gets 'error' (TcHmi.Errors.E_WEBSOCKET_NOT_READY or TcHmi.Errors.NONE) and the response
         * @returns Request id
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static requestEx<W = any, R = W>(request: TcHmi.Server.IMessage<W, R>, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Subscribe to a to a list of commands.
         * Subscription have to be unsubscribed by use of the TcHmi.Server.unsubscribe function.
         * @param commands Command object with the subscription
         * @param interval Subscription refresh interval.
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static subscribe<R = any>(commands: TcHmi.Server.ICommand<unknown, R>[], interval: number, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<unknown, R>) => void)): number | null;
        /**
         * Subscribe to a to a list of commands.
         * Subscription have to be unsubscribed by use of the TcHmi.Server.unsubscribe function.
         * @param commands Command object with the subscription
         * @param interval Subscription refresh interval.
         * @param requestOptions Options for the request itself
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         * @preserve (Part of the public API)
         */
        static subscribeEx<R = any>(commands: TcHmi.Server.ICommand<unknown, R>[], interval: number, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject<unknown, R>) => void)): number | null;
        /**
         * Unsubscribe a list of commands.
         * @param requestId The id of the subscription request which shall be unsubscribed.
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @preserve (Part of the public API)
         */
        static unsubscribe(requestId: number, callback?: null | ((this: void, data: TcHmi.Server.IResultObject) => void)): number | null;
        /**
         * Unsubscribe a list of commands.
         * @param requestId The id of the subscription request which shall be unsubscribed.
         * @param requestOptions Options for the request itself
         * @param callback Asynchronous response callback which will be raised when the operation has finished.
         * @returns Request id
         * @preserve (Part of the public API)
         */
        static unsubscribeEx(requestId: number, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.IResultObject) => void)): number | null;
        /**
         * Releases a request and associated resources like callbacks.
         * @param id Id of the request to release.
         * @preserve (Part of the public API)
         */
        static releaseRequest(id: number | null): void;
        /**
         * Get current username as string (could be __SystemGuest/__SystemUser without auth) or null when unknown (while loading).
         * @preserve (Part of the public API)
         */
        static getCurrentUser(this: void): string | null;
        /**
         * Get groups membership of current user as array (can be empty).
         * @preserve (Part of the public API)
         */
        static getGroupsOfCurrentUser(this: void): string[];
        /**
         * Get current user config.
         * @preserve (Part of the public API)
         */
        static getCurrentUserConfig(this: void): TcHmi.Server.userConfigOnServer;
        /**
         * Login into a TcHmiServer, reloads the page on success, call of a callback after login.
         * The authentication domain can be specified by using 'Domain::UserName'. If no domain is specified the default auth extension will be used.
         * @param userName String with the username
         * @param password String with the password
         * @param persistent Should the session be valid even after browser restart
         * @param callback This callback is called if the login was sent
         * @returns returns a boolean if the login was called
         * @preserve (Part of the public API)
         */
        static login(userName: string | null | undefined, password: string | null | undefined, persistent?: boolean, callback?: (this: void, resultObject: TcHmi.IResultObject) => void): boolean;
        /**
         * Login into a TcHmiServer, reloads the page on success, call of a callback after login.
         * The authentication domain can be specified by using 'Domain::UserName'. If no domain is specified the default auth extension will be used.
         * @param userName String with the username
         * @param password String with the password
         * @param persistent Should the session be valid even after browser restart
         * @param requestOptions Options for the request itself
         * @param callback This callback is called if the login was sent
         * @returns returns a boolean if the login was called
         * @preserve (Part of the public API)
         */
        static loginEx(userName: string | null | undefined, password: string | null | undefined, persistent: boolean | undefined, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: (this: void, data: TcHmi.IResultObject) => void): boolean;
        /**
         * Login into a TcHmiServer, reloads the page on success if not deactivated, call of a callback after login.
         * The authentication domain can be specified by using 'Domain::UserName'. If no domain is specified the default auth extension will be used.
         * @param userName String with the username
         * @param password String with the password
         * @param persistent Should the session be valid even after browser restart
         * @param reload Reload hmi after session login.
         * @param requestOptions Options for the request itself
         * @param callback This callback is called if the login was sent
         * @returns returns a boolean if the login was called
         * @preserve (Part of the public API)
         */
        static loginEx2(userName: string | null | undefined, password: string | null | undefined, persistent: boolean | undefined, reload: boolean | undefined, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: (this: void, data: TcHmi.IResultObject) => void): boolean;
        /**
         * Logout from a TcHmiServer, reloads the page on success
         * @param callback This callback is called after the logout was sent
         * @returns returns a boolean if the logout was called
         * @preserve (Part of the public API)
         */
        static logout(callback?: null | ((this: void, resultObject: TcHmi.IResultObject) => void)): boolean;
        /**
         * Logout from a TcHmiServer, reloads the page on success
         * @param requestOptions Options for the request itself
         * @param callback This callback is called after the logout was sent
         * @returns returns a boolean if the logout was called
         * @preserve (Part of the public API)
         */
        static logoutEx(requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): boolean;
        /**
         * Logout from a TcHmiServer, optional reloads the page on success
         * @param reload Reload hmi after session logout
         * @param requestOptions Options for the request itself
         * @param callback This callback is called after the logout was sent
         * @returns returns a boolean if the logout was called
         * @preserve (Part of the public API)
         */
        static logoutEx2(reload: boolean | undefined, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): boolean;
        /**
         * Logout all users with a specific username or all users from a TcHmiServer
         * @param username username to logout.
         * If empty string or null is provided, all users are logged out.
         * The authentication domain can be specified by using 'Domain::UserName'. If no domain is specified all users with the given name will be logged out.
         * 'Domain::' will logout every user from this domain
         * @param callback This callback is called after the request was sent
         * @returns returns a boolean if the logout was called
         * @preserve (Part of the public API)
         */
        static forceLogout(username: string | Server.IForceLogoutTarget | null | undefined, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): boolean;
        /**
         * Logout all users with a specific username or all users from a TcHmiServer
         * @param userName username to logout.
         * If empty string or null is provided, all users are logged out.
         * The authentication domain can be specified by using 'Domain::UserName'. If no domain is specified all users with the given name will be logged out.
         * 'Domain::' will logout every user from this domain
         * @param requestOptions Options for the request itself
         * @param callback This callback is called after the request was sent
         * @returns returns a boolean if the logout was called
         * @preserve (Part of the public API)
         */
        static forceLogoutEx(userName: string | TcHmi.Server.IForceLogoutTarget | null | undefined, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): boolean;
        /**
         * Analyze the server result and calls
         * completed callback if done (on any case),
         * error if there at least is one error on top level or command level and
         * success if there was no error at all.
         * @param args Object with callbacks for success, error and completed.
         * @param args.success Is called when the response contains no errors at all.
         * @param args.error Is called when the response contains at least one command with an error.
         * @param args.completed Is called anyway regardless of success or error.
         * @template W Type of the write value. Use 'any' (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use 'any' (or omit) if this contains multiple different types.
         */
        static handleResponse<W = any, R = W>(args: {
            /** Called with no error. */
            success?: (this: void, data: Required<TcHmi.Server.IResultObject<W, R>>) => void;
            /** Called with at least one error on top level or command level. */
            error?: (this: void, data: TcHmi.Server.IResultObject<W, R>) => void;
            /** Called in any case. */
            completed?: (this: void, data: TcHmi.Server.IResultObject<W, R>) => void;
        }): (data: TcHmi.Server.IResultObject<W, R>) => void;
    }
    namespace Server {
        /**
         * Result object which could have no response object.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface IResultObject<W = any, R = W> extends TcHmi.IResultObject {
            /** The response of the server. */
            response?: TcHmi.SelectableRequired<IMessage<W, R>, 'apiVersion' | 'id' | 'sessionId' | 'commands'>;
            /**
             * The related command indices.
             * In case of a bundled request the response may contain more than the request related commands.
             * This array contains the indices of the request related command indicies.
             **/
            responseCommandIndices?: number[];
            /**
             * Read values per command.
             * In case of a bundled request this array will only contain the request related results in order.
             **/
            results?: IValueResultObject<R>[];
        }
        /**
         * Result object with value of a command.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface IValueResultObject<R = any> extends TcHmi.Server.IResultObject {
            symbol?: string;
            value?: R;
        }
        /**
         * A message to the server.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        type IMessage<W = any, R = W> = IReadWriteMessage<W, R> | ISubscriptionMessage<W, R> | IEventMessage<W, R>;
        /**
         * Message common interface.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface IMessageBase<W = any, R = W> {
            apiVersion?: string;
            id?: number;
            sessionId?: string;
            /** Id of the server instance (cookies are shared with all servers on the same host) */
            serverId?: string;
            error?: IErrorDetails;
            /** custom string which will be in the answer again */
            customerData?: string;
            commands?: ICommand<W, R>[];
        }
        /**
         * A message to read or write to the server.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface IReadWriteMessage<W = any, R = W> extends IMessageBase<W, R> {
            requestType: 'ReadWrite';
        }
        /**
         * A message to request a subscription in the server.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface ISubscriptionMessage<W = any, R = W> extends IMessageBase<W, R> {
            requestType: 'Subscription';
            /** Minimal time the subscription ticks will be fired on symbol changes. If not set the default of the project will be used */
            intervalTime?: number | null;
        }
        /**
         * A message to request an event in the server.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface IEventMessage<W = any, R = W> extends IMessageBase<W, R> {
            requestType: 'Event';
        }
        enum Error {
            HMI_SUCCESS = 0,
            HMI_E_FAIL = 257,
            HMI_E_SYMBOL_IN_USE = 274,
            HMI_E_SYMBOL_NOT_MAPPED = 513,
            HMI_E_LICENSE_TARGET = 778,
            HMI_E_MISSING_LICENSE_HANDSHAKE = 781,
            HMI_E_LICENSE_VERIFY = 782,
            HMI_E_PASSWORD_CHANGE_REQUIRED = 4096,
            HMI_E_INSUFFICIENT_ACCESS = 4101
        }
        /**
         * tchmi:server#/definitions/accessEnum
         *
         * NONE = 0,
         * READ = 1,
         * WRITE = 2,
         * READWRITE = 3
         */
        enum ACCESS {
            NONE = 0,
            READ = 1,
            WRITE = 2,
            READWRITE = 3
        }
        /**
         * One command for the server.
         * @template W Type of the write value. Use 'any' (or omit) if this interface contains multiple different types.
         * @template R Type of the read value.Use 'any' (or omit) if this interface contains multiple different types.
         */
        interface ICommand<W = any, R = W> {
            /** Name of the symbol */
            symbol: string;
            /** Custom string which will be forwared to the response */
            customerData?: string;
            /** Write value */
            writeValue?: W;
            /** Read value */
            readValue?: R;
            /** Error of the command */
            error?: IErrorDetails;
            /** Command options */
            commandOptions?: ICommandOptions[];
            /** Filter for arrays and maps. */
            filter?: Filter | string;
            /** Maps the filtered, sorted, and paged values to their original positions */
            filterMap?: number[];
            /** Order by settings. This is processed before limit and offset are used. */
            orderBy?: string;
            /** Should/is the request restricted in amount of array entries? 0 disables the limit. */
            limit?: number;
            /** Array entries should/do not start at the beginning (Zero-based numbering) */
            offset?: number;
            /** The answer has this amount of entries */
            maxEntries?: number;
            /** The time the command processing has started as iso 8601 string. */
            processedStart?: string;
            /** The time the command processing has ended as iso 8601 string. */
            processedEnd?: string;
            /** The amount of sub symbol levels */
            maxSubSymbolDepth?: number;
            /** Extension specific data. */
            extensionData?: Dictionary<object>;
            /** The version of the symbol.*/
            version?: number;
            /** The index of the command in the request. */
            commandIndex?: number;
        }
        /** Supported types of requests of the server. */
        type IRequestType = 'ReadWrite' | 'Subscription' | 'Event';
        /** Supported commands options of requests of the server. */
        type ICommandOptions = 
        /** Config Symbols only: When using vectors, add the entry at the end instead of replacing it. */
        'Add'
        /** Config Symbols only: Deletes the given vector or map entry. */
         | 'Delete'
        /** Config Symbols only: Config beforeChange handlers are sent to beforeImport and the whole config is sent for easier validation. */
         | 'Import'
        /** Do not pass the symbol to the extension, simulate it instead. */
         | 'Offline'
        /** Set by the server only: Paging for this symbol has been done. */
         | 'PagingHandled'
        /** For subscriptions only: Send a response for each subscription tick, even if the data has not changed. */
         | 'Poll'
        /** Config Symbols only: Replace the whole data structure instead of partially updating it. */
         | 'Replace'
        /** Add error message and reason to the response. By default, only the error code is returned. */
         | 'SendErrorMessage'
        /** Send the writeValue for requests back to the client. */
         | 'SendWriteValue'
        /** Config Symbols only: If one of the commands in the request fails all changes will be rolled back. */
         | 'Transaction'
        /** Validate the readValue against the symbol's JSON schema before sending it to the client. */
         | 'ValidateRead'
        /** Do not merge subscriptions. */
         | 'UniqueHash'
        /** Use timespan instead of timestamp for the `processedStart` and `processedEnd` fields. */
         | 'ProcessTimingAsTimespan' | 'Extension1' | 'Extension2' | 'Extension3' | 'Extension4';
        /** Internal state of the user config */
        const enum userConfigState {
            /** Userconfig is still loaded. */
            loading = 0,
            /** Userconfig loading failed. */
            loadingerror = 1,
            /** No auth is required. */
            noAuthRequired = 2,
            /** Engineering server is active. */
            communicationDisabled = 3,
            /** Access set by group membership. */
            usergroup = 4
        }
        interface userConfigOnServer {
            /** State of the request for the config from server */
            state: TcHmi.Server.userConfigState;
            /** List of the groups the current user is member of */
            userIsInGroups: string[];
            /** Current Username (could be __SystemGuest/__SystemUser without auth) or null when unknown (while loading) */
            name: string | null;
            /**
             * Current authentication domain for example "TcHmiUserManagement".
             * This value is only set when auth is required/active.
             */
            domain: string | null;
            /** Current locale of this user for texts. Could be undefined if client locale should be used for this user! */
            locale: string | undefined;
            /** Configured locale of this user for texts. 'client' is the browser setting. 'project' refer to the default of the project which could be 'client' and a locale name. */
            configLocale: string | 'client' | 'project';
            /** Current locale of this user for date formatting. Could be undefined if client locale should be used for this user! */
            timeFormatLocale: string | undefined;
            /** Configured locale of this user for time formats. 'client' is the browser setting. 'project' refer to the default of the project which could be 'client' and a locale name. */
            configTimeFormatLocale: string | undefined;
            /** Current time zone of this user to use in .toLocaleString() option. Could be undefined if client locale should be used for this user! */
            timeZone: string | undefined;
            /**
             * Millisecond offset to utc calculated from the current timeZone of the user.
             * This is +1 * 60 * 60 * 1000 or +2 * 60 * 60 * 1000 for central Europe.
             */
            timeZoneOffset: number;
            /** Configured time zone of this user. 'client' is the browser setting. 'project' refer to the default of the project which could be 'client' and a time zone name. */
            configTimeZone: string | undefined;
            /** Current ip as seen from the server */
            clientIp: string;
            /** Current Session ID */
            session: string | null;
            /** Thumbprint/fingerprint of the client certificate */
            clientCertificate: string | null;
            /** Timespan (in ms) for a auto logoff. null disables auto logoff */
            autoLogOffMilliSeconds: number | null;
            /** Clear text error message */
            errorMessage: string;
            /** Name of the extension which handles default authentication */
            defaultAuthExtension: string;
            /** Name of the user group a new user will be by default */
            defaultUserGroup: string;
        }
        /**
         * Request level options
         */
        interface IRequestOptions {
            /**
             * After the timeout in ms the request will be aborted.
             * Timer starts when the request hit the API, not when the request is send to the server (after waiting in the queue?).
             **/
            timeout?: number;
            /** If not set to true the request will be held in the queue so every request is send after each others. */
            parallel?: boolean;
            /** The request can be added to a group. */
            groupId?: string | null;
            /** The request with the request id should be refreshed instead of creating a new request. */
            refresh?: boolean;
        }
        /**
         * Symbol/command level options
         */
        interface ISymbolOptions {
            version: number;
        }
        interface IForceLogoutTarget {
            /** IP address of the client */
            clientIp?: string;
            /** Thumbprint of the used client certificate */
            clientCertificate?: string;
            /** User group */
            group?: string;
            /** session id of the user */
            sessionId?: string;
        }
        interface ISchemaResultObject extends TcHmi.IResultObject {
            schema?: TcHmi.JsonSchema;
        }
        interface IResolveSchemaOptions {
            version?: number;
        }
        /**
         * Provides functions for user management.
         */
        class UserManagement {
            /**
             * Add a new user with a given password
             * @param userName Username to add.
             * @param password Password for the new user.
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static addUser(userName: string, password: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Add a new user with a given password
             * @param userName Username to add.
             * @param password Password for the new user.
             * @param options Optional details for this new user.
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static addUserEx(userName: string, password: string, options?: Partial<TcHmi.Server.UserManagement.IUserDetails> | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all usernames as a string array
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUsernames(callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IUsernameListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all usernames as a string array
             * @param options Options
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUsernamesEx(options?: TcHmi.Server.UserManagement.IUserManagementOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IUsernameListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all username as a dictionary with all meta data
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUsers(callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IUserResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all username as a dictionary with all meta data
             * @param options Options
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUsersEx(options?: TcHmi.Server.UserManagement.IUserManagementOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IUserResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all user groups as a dictionary with all meta data
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUserGroups(callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IGroupResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all user groups as a dictionary with all meta data
             * @param _options (not used till now)
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUserGroupsEx(_options?: Dictionary<never> | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IGroupResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all user group names as a string array.
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUserGroupNames(callback?: null | ((this: void, data: TcHmi.Server.UserManagement.GroupNamesResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all user group names as a string array.
             * @param _options (not used till now)
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUserGroupNamesEx(_options?: Dictionary<never> | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.GroupNamesResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all users of a group as a string array
             * @param groupName group name to check
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUsersInGroup(groupName: string, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IUsernameListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all users of a group as a string array
             * @param groupName group name to check
             * @param options Options
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listUsersInGroupEx(groupName: string, options?: TcHmi.Server.UserManagement.IUserManagementOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IUsernameListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Removes a user
             * @param userName user name to remove
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static removeUser(userName: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Removes a user
             * @param userName user name to remove
             * @param options Options
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static removeUserEx(userName: string, options?: TcHmi.Server.UserManagement.IUserManagementOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Update user config
             * @param userName Username to update.
             * @param options Details for this user.
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateUser(userName: string | null, options: UserManagement.IUpdateUserDetails | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Update user config
             * @param userName Username to update.
             * @param options Details for this user.
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateUserEx(userName: string | null, options: TcHmi.Server.UserManagement.IUpdateUserDetails | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Check access rights for usermanagement functions
             * @param options Option for setting usermanagement domain
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getApiAccess(options: TcHmi.Server.UserManagement.IUserManagementOptions | null, callback?: null | ((this: void, data: TcHmi.Server.UserManagement.IApiAccessResultObject) => void)): TcHmi.IErrorDetails;
        }
        namespace UserManagement {
            interface IUserManagementOptions {
                /** Domain of the user management. defaults to TcHmiUserManagement */
                domain?: string;
            }
            interface IBaseUserDetails extends IUserManagementOptions {
                /** A user can be disabled or enabled. Setting this needs access to symbol 'DisableUser' or 'EnableUser'. */
                enabled: boolean;
                /** ISO8601 TimeSpan for logout after user interaction. Setting this needs access to symbol 'AddOrChangeUser'. */
                autoLogout: string;
                /** Locale of this user. 'client' and 'project' are special values for project global or browser. */
                locale?: string;
                /** Locale of this user for date formatting. 'client' and 'project' are special values for project global or browser. */
                timeFormatLocale?: string;
                /** Time zone of this user. 'client' and 'project' are special values for project global or browser. */
                timeZone?: string;
            }
            interface IUserDetails extends IBaseUserDetails {
                /** list of groups the user is part of */
                groups: string[];
            }
            interface IUpdateUserDetails extends Partial<IBaseUserDetails> {
                /** New username for this user. Access to symbol 'RenameUser' needed. */
                newName?: string;
                /** New password for the user. */
                password?: string;
                /** Current password for the user (needed if the user wants to change the password of itself). */
                currentPassword?: string;
                /** List of new groups the user will be part of. Access to symbol 'AddOrChangeUser' needed. */
                addGroups?: string[];
                /** List of groups the user will be removed. Access to symbol 'AddOrChangeUser' needed. */
                removeGroups?: string[];
            }
            /** userList: string[]; */
            interface IUsernameListResultObject extends TcHmi.IResultObject {
                userList?: string[];
            }
            /** userDetails: Dictionary<IUserDetails>; */
            interface IUserResultObject extends TcHmi.IResultObject {
                userDetails?: Dictionary<TcHmi.Server.UserManagement.IUserDetails>;
            }
            interface IGroupDetails {
                /** a group can be disabled */
                enabled: boolean;
                fileAccess: TcHmi.Server.ACCESS;
                files: Dictionary<TcHmi.Server.ACCESS>;
                symbolAccess: TcHmi.Server.ACCESS;
                symbols: Dictionary<TcHmi.Server.ACCESS>;
            }
            interface IGroupResultObject extends TcHmi.IResultObject {
                groupDetailsList?: Dictionary<TcHmi.Server.UserManagement.IGroupDetails>;
            }
            interface GroupNamesResultObject extends TcHmi.IResultObject {
                groupNames?: string[];
            }
            interface IApiAccessResultObject extends TcHmi.IResultObject {
                result?: {
                    addUser: {
                        general: boolean;
                        enable: boolean;
                        locale: boolean;
                        timeFormatLocale: boolean;
                        timeZone: boolean;
                        autoLogoff: boolean;
                        groups: boolean;
                    };
                    listUserNames: {
                        general: boolean;
                    };
                    listUsers: {
                        general: boolean;
                        enabled: boolean;
                        locale: boolean;
                        timeFormatLocale: boolean;
                        timeZone: boolean;
                        autoLogoff: boolean;
                        groups: boolean;
                    };
                    listUserGroupNames: {
                        general: boolean;
                    };
                    listUserGroups: {
                        general: boolean;
                        enabled: boolean;
                        fileAccess: boolean;
                        files: boolean;
                        symbolAccess: boolean;
                        symbols: boolean;
                    };
                    listUsersInGroup: {
                        general: boolean;
                    };
                    removeUser: {
                        general: boolean;
                    };
                    updateUser: {
                        general: boolean;
                        newName: boolean;
                        addGroups: boolean;
                        removeGroups: boolean;
                        enabled: boolean;
                        autoLogout: boolean;
                        locale: boolean;
                        timeFormatLocale: boolean;
                        timeZone: boolean;
                        changeOwnPassword: boolean;
                        changePassword: boolean;
                    };
                };
            }
        }
        /**
         * Provides functions for recipe management.
         */
        class RecipeManagement {
            #private;
            /**
             * Lists all available recipe types
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listRecipeTypes(callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IRecipeTypeListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all available recipe types
             * This function provides more options to manipulate the request
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listRecipeTypesEx(options?: RecipeManagement.IRecipeListOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IRecipeTypeListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Watches a list of all available recipe types
             * @param options Options for the watch
             * @param callback Callback which is called once and on every change
             * @preserve (Part of the public API)
             */
            static watchRecipeTypesList(options?: RecipeManagement.IRecipeWatchOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IWatchResultObject<TcHmi.Server.RecipeManagement.FolderRecipeType>) => void)): DestroyFunction;
            /**
             * Returns a recipe types addressed by name and optional path
             * @param recipeTypeName Name of the recipe type
             * @param path Name of the folder
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getRecipeType(recipeTypeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IRecipeTypeGetResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Returns a recipe types addressed by name and optional path
             * This function provides more options to manipulate the request
             * @param recipeTypeName Name of the recipe type
             * @param path Name of the folder
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getRecipeTypeEx(recipeTypeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IRecipeTypeGetResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Watches a recipe type
             * @param recipeTypeName Name of the recipe type
             * @param path Name of the folder
             * @param options Options for the watch
             * @param callback Callback which is called once and on every change
             * @preserve (Part of the public API)
             */
            static watchRecipeType(recipeTypeName: string, path: string | null, options?: RecipeManagement.IRecipeWatchOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IWatchResultObject<TcHmi.Server.RecipeManagement.RecipeType>) => void)): DestroyFunction;
            /**
             * Creates a recipe type folder
             * @param path name of the new folder
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeTypeFolder(path: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Creates a recipe type folder
             * This function provides more options to manipulate the request
             * @param path Name of the new folder
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeTypeFolderEx(path: string, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe type folder
             * @param path name of the folder
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeTypeFolder(path: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe type folder
             * This function provides more options to manipulate the request
             * @param path Name of the folder
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeTypeFolderEx(path: string, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Creates a new recipe type
             * @param recipeTypeName Name of the recipe type
             * @param recipeType recipe type definition
             * @param path Path of the recipe type (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeType(recipeTypeName: string, recipeType: TcHmi.Server.RecipeManagement.RecipeType, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Creates a new recipe type
             * This function provides more options to manipulate the request
             * @param recipeTypeName Name of the recipe type
             * @param recipeType Recipe type definition
             * @param path Path of the recipe type (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeTypeEx(recipeTypeName: string, recipeType: TcHmi.Server.RecipeManagement.RecipeType, path: string | null, options?: TcHmi.Server.RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Updates a recipe type
             * @param recipeTypeName Name of the recipe type
             * @param recipeType recipe type definition
             * @param path Path of the recipe type (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateRecipeType(recipeTypeName: string, recipeType: TcHmi.Server.RecipeManagement.RecipeType, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Updates a recipe type
             * This function provides more options to manipulate the request
             * @param recipeTypeName Name of the recipe type
             * @param recipeType Recipe type definition
             * @param path Path of the recipe type (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateRecipeTypeEx(recipeTypeName: string, recipeType: TcHmi.Server.RecipeManagement.RecipeType, path: string | null, options?: TcHmi.Server.RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe type
             * @param recipeTypeName Old name of the recipe type
             * @param path Old path of the recipe type (root folder if set to null)
             * @param newName New name of the recipe type
             * @param newPath New path of the recipe type (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeType(recipeTypeName: string, path: string | null, newName: string, newPath: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe type
             * This function provides more options to manipulate the request
             * @param recipeTypeName Old name of the recipe type
             * @param path Old path of the recipe type (root folder if set to null)
             * @param newName New name of the recipe type
             * @param newPath New path of the recipe type (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeTypeEx(recipeTypeName: string, path: string | null, newName: string, newPath: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe type folder
             * @param recipeTypeFolderName Old name of the recipe type
             * @param path Old path of the recipe type (root folder if set to null)
             * @param newName New name of the recipe type
             * @param newPath New path of the recipe type (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeTypeFolder(recipeTypeFolderName: string, path: string | null, newName: string, newPath: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe type folder
             * This function provides more options to manipulate the request
             * @param recipeTypeFolderName Old name of the recipe type
             * @param path Old path of the recipe type (root folder if set to null)
             * @param newName New name of the recipe type
             * @param newPath New path of the recipe type (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeTypeFolderEx(recipeTypeFolderName: string, path: string | null, newName: string, newPath: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe type
             * @param recipeTypeName Name of the recipe type
             * @param path Path of the recipe type (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeType(recipeTypeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe type
             * This function provides more options to manipulate the request
             * @param recipeTypeName Name of the recipe type
             * @param path Path of the recipe type (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeTypeEx(recipeTypeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all available recipes
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listRecipes(callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IRecipeListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all available recipes
             * This function provides more options to manipulate the request
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static listRecipesEx(options?: RecipeManagement.IRecipeListOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IRecipeListResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Watches a list of all available recipes
             * @param options Options for the watch
             * @param callback Callback which is called once and on every change
             * @preserve (Part of the public API)
             */
            static watchRecipeList(options?: RecipeManagement.IRecipeWatchOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IWatchResultObject<TcHmi.Server.RecipeManagement.FolderRecipe>) => void)): DestroyFunction;
            /**
             * Creates a recipe folder
             * @param path name of the new folder
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeFolder(path: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Creates a recipe folder
             * This function provides more options to manipulate the request
             * @param path name of the new folder
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeFolderEx(path: string, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe folder
             * @param path name of the folder
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeFolder(path: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe folder
             * This function provides more options to manipulate the request
             * @param path Name of the folder
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeFolderEx(path: string, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Creates a new recipe
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param recipe recipe definition
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipe(recipeName: string, path: string | null, recipe: RecipeManagement.Recipe, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Creates a new recipe
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param recipe Recipe definition
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static createRecipeEx(recipeName: string, path: string | null, recipe: RecipeManagement.Recipe, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists one recipe
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getRecipe(recipeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IGetRecipeResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists one recipe
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getRecipeEx(recipeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IGetRecipeResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Watches a recipe
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param options Options for the watch
             * @param callback Callback which is called once and on every change
             * @preserve (Part of the public API)
             */
            static watchRecipe(recipeName: string, path: string | null, options?: RecipeManagement.IRecipeWatchOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IWatchResultObject<TcHmi.Server.RecipeManagement.Recipe>) => void)): DestroyFunction;
            /**
             * Updates a recipe
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param newValues dictionary of the new values
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateRecipe(recipeName: string, path: string | null, newValues: Dictionary<any>, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Updates a recipe
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param newValues Dictionary of the new values
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateRecipeEx(recipeName: string, path: string | null, newValues: Dictionary<any>, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Reads all values which is referenced by a recipe
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static readFromTarget(recipeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IReadFromTargetResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Reads all values which is referenced by a recipe
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static readFromTargetEx(recipeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IReadFromTargetResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Reads the current values which are referenced from a base recipe and write it back
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static teach(recipeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IReadFromTargetResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Reads the current values which are referenced from a base recipe and write it back
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static teachEx(recipeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IReadFromTargetResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Reads the current values which are referenced from a base recipe and write it into a new recipe
             * @param recipeName Name of the base recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param newRecipeName Name of the new recipe. (could be prefixed with a path if separated with ::)
             * @param newRecipePath Path of the new recipe. (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static teachAsNewRecipe(recipeName: string, path: string | null, newRecipeName: string, newRecipePath: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Reads the current values which are referenced from a base recipe and write it into a new recipe
             * This function provides more options to manipulate the request
             * @param recipeName Name of the base recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param newRecipeName Name of the new recipe. (could be prefixed with a path if separated with ::)
             * @param newRecipePath Path of the new recipe. (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static teachAsNewRecipeEx(recipeName: string, path: string | null, newRecipeName: string, newRecipePath: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Activates a recipe (writes all values)
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static activate(recipeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Activates a recipe (writes all values)
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static activateEx(recipeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all active recipes
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getActiveRecipes(callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IGetActiveRecipesResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Lists all active recipes
             * This function provides more options to manipulate the request
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getActiveRecipesEx(options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IGetActiveRecipesResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Watches a list of all active recipes
             * @param options Options for the watch
             * @param callback Callback which is called once and on every change
             * @preserve (Part of the public API)
             */
            static watchActiveRecipes(options?: RecipeManagement.IRecipeWatchOptions | null, callback?: null | ((this: void, data: TcHmi.Server.RecipeManagement.IWatchResultObject<string[]>) => void)): DestroyFunction;
            /**
             * Renames or moves a recipe
             * @param recipeName Old name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Old path of the recipe (root folder if set to null)
             * @param newName New name of the recipe
             * @param newPath New path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipe(recipeName: string, path: string | null, newName: string, newPath: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe
             * This function provides more options to manipulate the request
             * @param recipeName Old name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Old path of the recipe (root folder if set to null)
             * @param newName New name of the recipe
             * @param newPath New path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeEx(recipeName: string, path: string | null, newName: string, newPath: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe folder
             * @param recipeFolderName Old name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Old path of the recipe (root folder if set to null)
             * @param newName New name of the recipe
             * @param newPath New path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeFolder(recipeFolderName: string, path: string | null, newName: string, newPath: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Renames or moves a recipe folder
             * This function provides more options to manipulate the request
             * @param recipeFolderName Old name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Old path of the recipe (root folder if set to null)
             * @param newName Mew name of the recipe
             * @param newPath New path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static renameRecipeFolderEx(recipeFolderName: string, path: string | null, newName: string, newPath: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipe(recipeName: string, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Deletes a recipe
             * This function provides more options to manipulate the request
             * @param recipeName Name of the recipe (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe (root folder if set to null)
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static deleteRecipeEx(recipeName: string, path: string | null, options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Downloads one or more recipes. Downloads all recipes when filter is the empty string, empty array or null.
             * The sibling API downloadRecipesEx can include the referenced recipe types, too.
             * This needs to be triggered by a user interaction (not on load or symbol change).
             * @param filter Name or names of the recipes (could be prefixed with a path if separated with ::)
             * @param path Path of the recipes (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static downloadRecipes(filter: string | string[] | null, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Downloads one or more recipes. Downloads all recipes when filter is the empty string, empty array or null.
             * Can include the referenced recipe types, too, when set in options.
             * This function provides more options to manipulate the request.
             * This needs to be triggered by a user interaction (not on load or symbol change).
             * @param filter Name or names of the recipes (could be prefixed with a path if separated with ::)
             * @param path Path of the recipes (root folder if set to null)
             * @param options Options for the download recipeManagement
             * @param requestOptions Options for the request itself (not used right now)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static downloadRecipesEx(filter: string | string[] | null, path: string | null, options?: RecipeManagement.IRecipeDownloadOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Downloads one or more recipe types. Downloads all recipe types when recipeTypeName is the empty string or null.
             * The sibling API downloadRecipeTypesEx can include the referenced recipe types, too.
             * This needs to be triggered by a user interaction (not on load or symbol change).
             * @param filter Name or names of the recipe types (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe types (root folder if set to null)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static downloadRecipeTypes(filter: string | string[] | null, path: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Downloads one or more recipe types. Downloads all recipe types when recipeTypeName is the empty string or null.
             * Can include the referenced recipe types, too, when set in options.
             * This function provides more options to manipulate the request.
             * This needs to be triggered by a user interaction (not on load or symbol change).
             * @param filter Name or names of the recipe types (could be prefixed with a path if separated with ::)
             * @param path Path of the recipe types (root folder if set to null)
             * @param options Options for the download recipeManagement
             * @param requestOptions Options for the request itself (not used right now)
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static downloadRecipeTypesEx(filter: string | string[] | null, path: string | null, options?: RecipeManagement.IRecipeDownloadOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Uploads one or more recipe files (each containing one or all recipes or recipe types of a server).
             * This needs to be triggered by a user interaction (not on load or symbol change).
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static uploadRecipeFiles(callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Uploads one or more recipe files (each containing one or all recipes or recipe types of a server).
             * This needs to be triggered by a user interaction (not on load or symbol change).
             * This function provides more options to manipulate the request
             * @param options Options for the recipeManagement
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static uploadRecipeFilesEx(options?: RecipeManagement.IRecipeOptions | null, requestOptions?: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
        }
        namespace RecipeManagement {
            interface RecipeType {
                /** List of RecipeTypes this RecipeType inherits */
                recipeTypeNames?: string[];
                /** List of symbol definitions for this RecipeType */
                members: Dictionary<{
                    /** Name of the symbol of this entry */
                    symbol: string;
                    /** defaultValue for this symbol */
                    defaultValue: any;
                    /** Schema the value inside a Recipe should validate */
                    schema?: TcHmi.JsonSchema;
                    /** Engineering unit for this symbol */
                    unit?: string;
                    comment?: string;
                    enabled?: boolean;
                    /** Groups for engineering display */
                    group?: string;
                    /** Engineering display order */
                    order?: number;
                } | {
                    /**
                     * References another recipeType.
                     * The used recipe name will be in the recipe as a string value.
                     */
                    recipeType: string;
                    enabled?: boolean;
                    /** Groups for engineering display */
                    group?: string;
                    /** Engineering display order */
                    order?: number;
                    /** Engineering unit for this symbol */
                    unit?: string;
                    comment?: string;
                }>;
                options?: {
                    /** None: no restriction from recipeType
                    Disabled: All member of the recipe are disabled */
                    enabled?: 'None' | 'Disabled';
                    comment?: string;
                };
            }
            /** Dictionary of folders or RecipeTypes */
            interface FolderRecipeType {
                [index: string]: FolderRecipeType | RecipeType;
            }
            interface IRecipeListResultObject extends TcHmi.IResultObject {
                value?: FolderRecipe;
            }
            interface Recipe {
                /** Full path of the RecipeType this Recipe implements */
                recipeTypeName: string;
                /**
                 * Values for the symbols or the name of a linked recipe.
                 * Key is the symbol name or recipeType name.
                 */
                values: Dictionary<any>;
            }
            /** Dictionary of folders or Recipes */
            interface FolderRecipe {
                [index: string]: FolderRecipe | Recipe;
            }
            interface IRecipeTypeListResultObject extends TcHmi.IResultObject {
                value?: TcHmi.Server.RecipeManagement.FolderRecipeType;
            }
            interface IRecipeTypeGetResultObject extends TcHmi.IResultObject {
                value?: TcHmi.Server.RecipeManagement.RecipeType;
            }
            interface IGetRecipeResultObject extends TcHmi.IResultObject {
                value?: TcHmi.Server.RecipeManagement.Recipe;
            }
            interface IReadFromTargetResultObject extends TcHmi.IResultObject {
                /** This is an example key "subFolder::myRecipe" */
                value?: Dictionary<TcHmi.Server.RecipeManagement.Recipe>;
            }
            interface IGetActiveRecipesResultObject extends TcHmi.IResultObject {
                recipeList?: string[];
            }
            /** Options for all recipe APIs */
            interface IRecipeOptions {
                /** domain of the RecipeManagement. defaults to TcHmiRecipeManagement */
                domain?: string;
                parallel?: boolean;
            }
            interface IRecipeListOptions extends IRecipeOptions {
                /** Subpath to list a subfolder */
                path?: string;
            }
            interface IRecipeDownloadOptions extends IRecipeOptions {
                /** The export should contain referenced recipe types, too. Defaults to false. */
                referencedRecipeTypes?: boolean;
            }
            interface IRecipeWatchOptions extends IRecipeOptions {
            }
            interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
                value?: T;
                /** A destroy function to remove the watch. Only set if there is no error. */
                destroy?: TcHmi.DestroyFunction;
                response?: TcHmi.Server.IMessage<T>;
            }
            /**
             * Type guard for recipes. Returns true if the given candidate is a Recipe, false otherwise
             * @param candidate The candidate to test.
             */
            function isRecipe(candidate: FolderRecipe | Recipe): candidate is Recipe;
            /**
             * Type guard for recipe types. Returns true if the given candidate is a RecipeType, false otherwise
             * @param candidate The candidate to test.
             */
            function isRecipeType(candidate: FolderRecipeType | RecipeType): candidate is RecipeType;
        }
        /**
         * Provides functions for managing configuration settings of the SqliteHistorize server extension.
         */
        class Historize {
            /**
             * Adding a Symbol to the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param settings Settings for the symbol
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static add(symbolName: string, settings: TcHmi.Server.Historize.IEntrySettings, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Adding a Symbol to the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param settings Settings for the symbol
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static addEx(symbolName: string, settings: TcHmi.Server.Historize.IEntrySettings, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Adding a Symbol to the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param settings Settings for the symbol
             * @param options global settings
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static addEx2(symbolName: string, settings: TcHmi.Server.Historize.IEntrySettings, options: TcHmi.Server.Historize.IOptions | null, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Removing a Symbol from the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static remove(symbolName: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Removing a Symbol from the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static removeEx(symbolName: string, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Removing a Symbol from the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param options global settings
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static removeEx2(symbolName: string, options: TcHmi.Server.Historize.IOptions | null, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Update a config of a Symbol in the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param settings Settings for the symbol
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static update(symbolName: string, settings: TcHmi.Server.Historize.IEntrySettings, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Update a config of a Symbol in the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param settings Settings for the symbol
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateEx(symbolName: string, settings: TcHmi.Server.Historize.IEntrySettings, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Update a config of a Symbol in the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param settings Settings for the symbol
             * @param options global settings
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static updateEx2(symbolName: string, settings: TcHmi.Server.Historize.IEntrySettings, options: TcHmi.Server.Historize.IOptions | null, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Gets the current config of a Symbol in the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static get(symbolName: string, callback?: null | ((this: void, data: TcHmi.Server.Historize.IEntryResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Gets the current config of a Symbol in the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getEx(symbolName: string, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.Historize.IEntryResultObject) => void)): TcHmi.IErrorDetails;
            /**
             * Gets the current config of a Symbol in the Historize Configuration of the server
             * @param symbolName Name of the Symbol to manipulate
             * @param options global settings
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             * @preserve (Part of the public API)
             */
            static getEx2(symbolName: string, options: Historize.IOptions | null, requestOptions: TcHmi.Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.Historize.IEntryResultObject) => void)): TcHmi.IErrorDetails;
        }
        namespace Historize {
            interface IEntrySettings {
                /** ISO8601 Time Span */
                INTERVAL?: string;
                MAXENTRIES?: number;
                ROWLIMIT?: number;
                RECORDINGENABLED?: boolean;
            }
            interface IEntrySettingsEx {
                /** ISO8601 Time Span */
                interval?: string;
                maxEntries?: number;
                rowLimit?: number;
                recordingEnabled?: boolean;
            }
            /** Global options for the historization */
            interface IOptions {
                /** Domain of the historize handling. defaults to TcHmiSqliteHistorize */
                domain?: string;
            }
            interface IEntryResultObject extends TcHmi.IResultObject {
                key?: string;
                settings?: IEntrySettings;
            }
        }
        /**
         * Provides functions for monitoring alarms and server events.
         */
        class Events {
            /**
             * Confirm an alarm.
             * @param alarm The alarm to confirm.
             * @param callback Asynchronous response callback which will be raised when the operation has finished.
             */
            static confirmAlarm(alarm: Events.Alarm, callback?: (this: void, data: TcHmi.IResultObject) => void): void;
            /**
             * Export events.
             * @param exportOptions An object containing the export settings.
             * @param exportOptions.filter The filter to apply for the export.
             * @param exportOptions.filename Optional filename for the exported file.
             * @param callback Asynchronous response callback which will be raised when the operation has finished.
             */
            static exportEvents(exportOptions: {
                filter?: Filter | null;
                filename?: string;
            }, callback?: (error: TcHmi.IResultObject) => void): void;
            /**
             * DEPRECATED
             * Please use a subscription to the ListEvents server symbol instead, otherwise a high volume of events will lead to drastically reduced client performance.
             * Register a consumer for events.
             * @param filter The filter of this consumer. Only events matching the filter will be passed on to the consumer.
             * @param callbacks The callbacks to pass events back to the consumer. Consumers can specify one callback for listing events and one for the event subscription.
             * @param callbacks.list The callback that is called when the event list has new data.
             * @param callbacks.subscription The callback that is called when the subscription has new data.
             * @param doneCallback The callback that is called when the registration has finished.
             * @deprecated Please use a subscription to the ListEvents server symbol instead.
             */
            static registerConsumer(filter: Filter | null, callbacks: {
                list?: (this: void, data: Events.ListResult) => void;
                subscription?: (this: void, data: Events.SubscriptionResult) => void;
            }, doneCallback?: (this: void, data: TcHmi.IResultObject) => void): DestroyFunction;
            /**
             * Parses a raw server event and returns an object for consumption by controls etc.
             * @param rawEvent The raw event to parse.
             */
            static parseServerEvent(rawEvent: TcHmi.Server.Events.RawServerEvent): TcHmi.Server.Events.Message | TcHmi.Server.Events.Alarm | TcHmi.Server.Events.PayloadEvent;
            /**
             * Creates a message or payload event on the server.
             * @param event The event to create.
             * @param callback Is called when the server responds to the CreateEvent request.
             */
            static createEvent(event: TcHmi.SelectableOptional<Events.Message, 'sourceDomain'> | Events.PayloadEvent, callback?: (this: void, data: TcHmi.IResultObject) => void): void;
        }
        namespace Events {
            export interface Consumer {
                filter: System.Filter;
                rawFilter: TcHmi.Filter | null;
                activeAlarmIds: (number | string)[];
                listCallback?: (data: ListResult) => void;
                subscriptionCallback?: (data: SubscriptionResult) => void;
                registration: {
                    listPending: boolean;
                    subscriptionPending: boolean;
                    callback?: (this: void, data: TcHmi.IResultObject) => void;
                };
            }
            export interface ListResult<TPayload = any, TParams extends Dictionary<any> = Dictionary<any>> extends TcHmi.IResultObject {
                events?: Event<TPayload, TParams>[];
            }
            export interface SubscriptionResult<TPayload = any, TParams extends Dictionary<any> = Dictionary<any>> extends TcHmi.IResultObject {
                event?: Event<TPayload, TParams>;
                changeType?: ChangeType;
                removedByFilter?: boolean;
            }
            export enum Type {
                Message = 0,
                Alarm = 1,
                Payload = 2
            }
            export enum Severity {
                Verbose = 0,
                Info = 1,
                Warning = 2,
                Error = 3,
                Critical = 4
            }
            export enum AlarmState {
                Raised = 0,
                Confirmed = 1,
                Cleared = 2,
                ClearedAndConfirmed = 3,
                Invalid = 4
            }
            export enum ConfirmationState {
                NotSupported = 0,
                NotRequired = 1,
                WaitForConfirmation = 2,
                Confirmed = 3,
                Reset = 4
            }
            interface EventBase {
                /** The type of event */
                type: Type;
                /** The domain of the event */
                domain: string;
                /** The name of the event */
                name: string;
                timeReceived: Date;
                sessionId?: string;
            }
            interface MessageOrAlarm<T extends Dictionary<any> = Dictionary<any>> extends EventBase {
                /** The type of event */
                type: Type.Message | Type.Alarm;
                /** The severity of the event */
                severity: Severity;
                /** DEPRECATED! This used to be used to differentiate the domain in which the event originated vs the domain which was responsible for delivering it. It now always holds the same value as domain.
                 * @deprecated This used to be used to differentiate the domain in which the event originated vs the domain which was responsible for delivering it. It now always holds the same value as domain.
                 */
                sourceDomain: string;
                /** The localized text of the event */
                text?: string | undefined;
                /** The time at which the event was triggered */
                timeRaised: Date;
                /** Parameters set by the trigger of the event */
                params: T;
            }
            export interface Message<T extends Dictionary<any> = Dictionary<any>> extends MessageOrAlarm<T> {
                /** The type of event */
                type: Type.Message;
            }
            export interface Alarm<T extends Dictionary<any> = Dictionary<any>> extends MessageOrAlarm<T> {
                /** The type of event */
                type: Type.Alarm;
                /** A unique value with which this alarm can be identified */
                id: number;
                /** The time at which the alarm was confirmed by the trigger as no longer acute */
                timeCleared: Date | null;
                /** The time at which the alarm was acknowledged by the user */
                timeConfirmed: Date | null;
                alarmState: AlarmState;
                /** The current confirmation status */
                confirmationState: ConfirmationState;
            }
            export interface PayloadEvent<T = any> extends EventBase {
                /** The type of event */
                type: Type.Payload;
                payload?: T;
            }
            export enum ChangeType {
                AlarmRaised = 0,
                AlarmChanged = 1,
                AlarmDisposed = 2,
                MessageSent = 3
            }
            export type Event<TPayload = any, TParams extends Dictionary<any> = Dictionary<any>> = Message<TParams> | Alarm<TParams> | PayloadEvent<TPayload>;
            export interface RawServerEvent {
                domain: string;
                name: string;
                timeReceived: string;
                payload?: RawServerMessage | RawServerAlarm | any;
                payloadType?: TcHmi.Server.Events.Type;
                localizedString?: string;
                changeType?: ServerAlarmChangeType;
                sessionId?: string;
            }
            export interface RawServerMessage {
                name: string;
                domain: string;
                severity: Server.Events.Severity;
                timeRaised: string;
                params: Dictionary<any>;
            }
            export interface RawServerAlarm extends RawServerMessage {
                id: number;
                timeCleared: string | null;
                timeConfirmed: string | null;
                alarmState: AlarmState;
                confirmationState: ConfirmationState;
            }
            export enum ServerAlarmChangeType {
                Raise = 0,
                Change = 1,
                Dispose = 2
            }
            /**
             * Type guard for alarms. Returns true if the given candidate is a Alarm, false otherwise
             * @param value The candidate to test.
             */
            export function isAlarm(value: Event): value is Alarm;
            /**
             * Type guard for Messages. Returns true if the given candidate is a Message, false otherwise
             * @param value The candidate to test.
             */
            export function isMessage(value: Event): value is Message;
            /**
             * Type guard for Payloads. Returns true if the given candidate is a Payload, false otherwise
             * @param value The candidate to test.
             */
            export function isPayload(value: Event): value is PayloadEvent;
            export {};
        }
        /**
         * Provides functions of the ADS server extension.
         */
        class ADS {
            /**
             * Get information about a specific license by sending a request to the TwinCAT license server.
             * @param licenseId id to check
             * @param callback Will be called after request.
             */
            static checkLicense(licenseId: string, callback?: null | ((this: void, data: TcHmi.Server.ADS.ICheckLicenseResult) => void)): TcHmi.IErrorDetails;
            /**
             * Get information about a specific license by sending a request to the TwinCAT license server with given connection parameter.
             * @param licenseId id to check
             * @param requestOptions Options for the request itself
             * @param callback Will be called after request.
             */
            static checkLicenseEx(licenseId: string, requestOptions: Server.IRequestOptions | null, callback?: null | ((this: void, data: TcHmi.Server.ADS.ICheckLicenseResult) => void)): TcHmi.IErrorDetails;
        }
        namespace ADS {
            interface ICheckLicenseResult extends TcHmi.IResultObject {
                /** License instance count */
                count?: number;
                /** Expiration time as ISO-8601 time string ('1804-03-05T00:25:27.70955161Z'). */
                expireTimeUTC?: string;
                /**
                 * License result (Valid if >= 0, Invalid if < 0)
                 * Can be compared to enum TcHmi.Server.ADS.CheckLicenseResult
                 */
                result?: number | CheckLicenseResult;
            }
            enum CheckLicenseResult {
                /** Valid license */
                S_VALID = 0,
                /** License generated by System Manager (e.g. 7 day trial license) */
                S_PENDING = 515,
                /** No license found (unknown license id) */
                E_LICENSENOTFOUND = -403769124,
                /** License expired */
                E_LICENSEEXPIRED = -403769125,
                /** License exceeded */
                E_LICENSEEXCEEDED = -403769126,
                /** License invalid */
                E_LICENSEINVALID = -403769127,
                /** License invalid system id */
                E_LICENSESYSTEMID = -403769128,
                /** License not time limited */
                E_LICENSENOTIMELIMIT = -403769129,
                /** License issue time in the future */
                E_LICENSEFUTUREISSUE = -403769130,
                /** License time period to long */
                E_LICENSETIMETOLONG = -403769131
            }
        }
        /**
         * Provides functions for the Audit Trail extension.
         */
        class AuditTrail {
            /**
             * Creates a custom audit trail log entry.
             * @param entry The data for the custom audit trail log entry.
             * @param callback Will be called after request.
             */
            static createAuditLogEntry(entry: AuditTrail.CreateAuditLogEntry.AuditLogEntry, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
            /**
             * Creates a custom audit trail log entry.
             * @param entry The data for the custom audit trail log entry.
             * @param options Optional options
             * @param callback Will be called after request.
             * @returns
             */
            static createAuditLogEntryEx(entry: AuditTrail.CreateAuditLogEntry.AuditLogEntry, options?: {
                requestOptions: Server.IRequestOptions | null;
            } | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
        }
        namespace AuditTrail {
            namespace CreateAuditLogEntry {
                interface AuditLogEntry {
                    name: string;
                    contextDomain?: string;
                    comment?: string;
                    data?: any;
                }
            }
        }
        /**
         * Provides functions for monitoring domains / extensions of the server.
         */
        class Domains {
            /**
             * Watches on specific domain.
             * @param name Name of the domain to watch
             * @param callback Will be called after request.
             */
            static watch(name: string, callback?: (data: TcHmi.Server.Domains.IServerWatchResultObject<Domains.IDomainInfo>) => void): DestroyFunction;
        }
        namespace Domains {
            interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
                value?: T;
                processedStart?: string;
                processedEnd?: string;
                dirtyPaths?: string[];
                /** A destroy function to remove the watch. Only set if there is no error. */
                destroy?: TcHmi.DestroyFunction;
            }
            interface IServerWatchResultObject<T = any> extends IWatchResultObject<T> {
                response?: TcHmi.Server.IMessage<T>;
            }
            /** IDomainInfo */
            interface IDomainInfo {
                error?: IErrorDetails;
                /** Shows if extension can be used for user management. */
                authExtension: boolean;
                /** The version of the extension's configuration. */
                configVersion: string;
                /** Indicates whether a debugger is or will be attached to the extension. */
                debuggerAttached?: boolean;
                /** Name of the extension. */
                extension: string;
                /** A more readable name version of the extension name. */
                friendlyName: string;
                /** The globally unique identifier associated with the extension. */
                guid?: string;
                /** Indicate the extension is license status. */
                licensed?: boolean;
                /** Shows if the domain refers to a remote server. */
                remote?: boolean;
                /** Shows if the extension is considered to be required. */
                required?: boolean;
                /** Shows the current state of the extension. */
                state?: 'NotLoaded' | 'Loaded' | 'Initialized' | 'Invalid' | 'Disabled' | 'Unloading' | 'NotRunning';
                /** Indicate the extension is a customer extension. */
                thirdParty?: boolean;
                /** Shows last update time of the config. */
                updated?: string;
                /** The version of the extension. */
                version: string;
                /** Indicates under which circumstances the extension configuration should be visible. */
                visibility?: 'AlwaysShow' | 'AlwaysHide' | 'HideInEngineering';
            }
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for manipulating HTML elements.
     * @preserve (Part of the public API)
     */
    class StyleProvider {
        /**
         * Returns all computed styles that are active on the first given element. Does return values set by CSS files, the other Style APIs and AnimationProvider
         * Unset or unknown CSS values will not be set in the result object.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         */
        static getComputedElementStyle(element: Iterable<Element> | Element | undefined): Dictionary<string>;
        /**
         * Returns the given computed CSS property on the first given element. Does return values set by CSS files, the other Style APIs and AnimationProvider
         * Unset or unknown CSS values will not be set in the result object.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param propertyName The CSS property to get.
         * @template T Name of the property to fetch
         */
        static getComputedElementStyle<T extends string>(element: Iterable<Element> | Element | undefined, propertyName: T): Record<T, string>;
        /**
         * Returns the given computed CSS property on the first given element. Does return values set by CSS files, the other Style APIs and AnimationProvider
         * Unset or unknown CSS values will not be set in the result object.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param propertyNames The CSS properties to get.
         * @template T Names of the properties to fetch
         */
        static getComputedElementStyle<T extends string>(element: Iterable<Element> | Element | undefined, propertyNames: readonly T[]): Record<T, string>;
        /**
         * Returns all styles that are set on the first given element. Does not return values set by CSS files, the other Style APIs and AnimationProvider
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         */
        static getSimpleElementStyle(element: Iterable<Element> | Element | undefined): Dictionary<string>;
        /**
         * Returns the given CSS property on the first given element. Does not return values set by CSS files, the other Style APIs and AnimationProvider
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param propertyName The CSS property to get.
         * @template T Name of the property to fetch
         */
        static getSimpleElementStyle<T extends string>(element: Iterable<Element> | Element | undefined, propertyName: T): Record<T, string>;
        /**
         * Returns the given CSS property on the first given element. Does not return values set by CSS files, the other Style APIs and AnimationProvider
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param propertyNames The CSS properties to get.
         * @template T Names of the properties to fetch
         */
        static getSimpleElementStyle<T extends string>(element: Iterable<Element> | Element | undefined, propertyNames: readonly T[]): Record<T, string>;
        /**
         * Style setter for simple styles in a collection of JQuery elements or single HTML or SVG Elements.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param propertyName The CSS property to process.
         * @param value The value for the CSS property.
         */
        static setSimpleElementStyle(element: Iterable<Element> | Element | undefined, propertyName: string, value: string | null | undefined): void;
        /**
         * Style setter forsimple styles in a collection of JQuery elements or single HTML or SVG Elements.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param propertyName The CSS property to process.
         * @param value An array of values for the CSS property. This is useful for providing vendor-prefixed values to ensure compatibility.
         */
        static setSimpleElementStyle(element: Iterable<Element> | Element | undefined, propertyName: string, values: readonly string[] | null): void;
        /**
         * Style setter for simple styles in a collection of JQuery elements or single HTML or SVG Elements.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param styles A dictionary of property-value pairs. Can be used to set multiple styles simultaneously. The values can be strings or null to remove values.
         */
        static setSimpleElementStyle(element: Iterable<Element> | Element | undefined, styles: Readonly<Dictionary<string | readonly string[] | null | undefined>> | null): void;
        /**
         * Style processor for generic styles.
         * @param controlName The name of the target control.
         * @param selector The target CSS selector. %id% is automatically replaced by the control name. Pass an empty string to target the control root.
         * @param property The CSS property to process.
         * @param value The value for the CSS property.
         */
        static processGenericStyle(controlName: string, selector: string, property: string, value: string | null): void;
        /**
         * Style processor for generic styles.
         * @param controlName The name of the target control.
         * @param selector The target CSS selector. %id% is automatically replaced by the control name. Pass an empty string to target the control root.
         * @param propertyName The CSS property to process.
         * @param value An array of values for the CSS property. This is useful for providing vendor-prefixed values to ensure compatibility.
         */
        static processGenericStyle(controlName: string, selector: string, propertyName: string, value: string[] | null): void;
        /**
         * Style processor for generic styles.
         * @param controlName The name of the target control.
         * @param selector The target CSS selector. %id% is automatically replaced by the control name. Pass an empty string to target the control root.
         * @param styles A dictionary of property-value pairs. Can be used to set multiple styles simultaneously. The values can be strings or arrays of strings to provide vendor-prefixed values.
         */
        static processGenericStyle(controlName: string, selector: string, styles: Dictionary<string | string[] | null>): void;
        /**
         * Resolves a SolidColor object to a string representation for use as css color property.
         * Has to be called with a valid SolidColor. Use isSolidColor to check
         * @param colorObject The SolidColor to resolve.
         * @preserve (Part of the public API)
         */
        static resolveSolidColorAsCssValue(colorObject: TcHmi.SolidColor): string;
        /**
         * Resolve a SolidColor object to a RGBAColor object.
         * Has to be called with a valid SolidColor. Use isSolidColor to check
         * @param colorObject The SolidColor to resolve.
         * @preserve (Part of the public API)
         */
        static resolveSolidColorAsRGBA(colorObject: TcHmi.SolidColor): RGBAColor;
        private static __normalizedColorMap;
        /**
         * Normalize a SolidColor object
         * Every supported color format will be returned as
         * for example '#ff0000' or with transparency as 'rgba(255, 0, 0, 0.333)'
         * Has to be called with a valid SolidColor. Use isSolidColor to check
         * @param colorObject The SolidColor to normalize.
         * @preserve (Part of the public API)
         */
        static normalizeColorAsCssValue(colorObject: TcHmi.SolidColor): string;
        /**
         * Resolves a LinearGradientColor object to a string representation for use in css background-image property.
         * Has to be called with a valid LinearGradientColor. Use isLinearGradientColor to check
         * @param colorObject The LinearGradientColor to resolve.
         * @preserve (Part of the public API)
         */
        static resolveLinearGradientColorAsCssValue(colorObject: TcHmi.LinearGradientColor): string;
        /**
         * Style Processor for background.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new value for the background.
         * @preserve (Part of the public API)
         */
        static processBackground(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: Partial<TcHmi.Background> | null | undefined): void;
        /**
         * Style Processor for background colors and gradients.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new value for the background.
         * @preserve (Part of the public API)
         */
        static processBackgroundColor(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.Color | null | undefined): void;
        /**
         * Style Processor for background images.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The URL of the image.
         * @preserve (Part of the public API)
         */
        static processBackgroundImage(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: string | null | undefined): void;
        /**
         * Style processor for SVG fill color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new fill color.
         * @preserve (Part of the public API)
         * HTMLElement allowed because default jQuery type is HTMLElement
         */
        static processFillColor(element: JQuery<SVGElement | HTMLElement> | Iterable<SVGElement> | SVGElement | undefined, valueNew: TcHmi.Color | null | undefined): void;
        /**
         * Style processor for SVG stroke color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new stroke color.
         * @preserve (Part of the public API)
         * HTMLElement allowed because default jQuery type is HTMLElement
         */
        static processStrokeColor(element: JQuery<SVGElement | HTMLElement> | Iterable<SVGElement> | SVGElement | undefined, valueNew: TcHmi.SolidColor | null | undefined): void;
        /**
         * Style processor for text color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new text color.
         * @preserve (Part of the public API)
         */
        static processTextColor(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.SolidColor | null | undefined): void;
        /**
         * Style processor for border color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border color.
         * @preserve (Part of the public API)
         */
        static processBorderColor(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.Color | null | undefined): void;
        /**
         * Style processor for border width.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border widths.
         * @preserve (Part of the public API)
         */
        static processBorderWidth(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: Partial<TcHmi.BorderWidth> | null | undefined): void;
        /**
         * Style processor for border radius.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border radii.
         * @preserve (Part of the public API)
         */
        static processBorderRadius(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.BorderRadius | null | undefined): void;
        /**
         * Style processor for border style.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border styles.
         * @preserve (Part of the public API)
         */
        static processBorderStyle(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.BorderStyle | null | undefined): void;
        /**
         * Style processor for box shadow.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border styles.
         * @preserve (Part of the public API)
         */
        static processBoxShadow(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: readonly TcHmi.BoxShadow[] | null | undefined): void;
        /**
         * Style processor for font family.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font family.
         * @preserve (Part of the public API)
         */
        static processFontFamily(element: JQuery | readonly Element[] | NodeListOf<Element> | HTMLCollectionOf<Element> | Element | undefined, valueNew: TcHmi.FontFamily | null | undefined): void;
        /**
         * Style processor for font size.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font size.
         * @param unitNew The new font size unit. Defaults to "px".
         * @preserve (Part of the public API)
         */
        static processFontSize(element: JQuery | readonly Element[] | NodeListOf<Element> | HTMLCollectionOf<Element> | Element | undefined, valueNew: number | null | undefined, unitNew?: FontSizeUnit): void;
        /**
         * Style processor for font style.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font style. Allowed values are "Normal", "Italic" and "Oblique".
         * @preserve (Part of the public API)
         */
        static processFontStyle(element: JQuery | readonly Element[] | NodeListOf<Element> | HTMLCollectionOf<Element> | Element | undefined, valueNew: TcHmi.FontStyle | null | undefined): void;
        /**
         * Style processor for font weight.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font weight. Allowed values are "Normal" and "Bold".
         * @preserve (Part of the public API)
         */
        static processFontWeight(element: JQuery | readonly Element[] | NodeListOf<Element> | HTMLCollectionOf<Element> | Element | undefined, valueNew: TcHmi.FontWeight | null | undefined): void;
        /**
         * Style processor for visibility.
         * Visibility also affects pointer events, i.e. a hidden element will not receive mouse click events.
         * Hidden still uses space in fluid calculations, collapsed is ignored there.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new visibility. Allowed values are "Visible", "Collapsed" and "Hidden". Hidden still uses space in fluid calculations, collapsed is ignored there.
         * @preserve (Part of the public API)
         */
        static processVisibility(element: JQuery | readonly Element[] | NodeListOf<Element> | HTMLCollectionOf<Element> | Element | undefined, valueNew: TcHmi.Visibility | null | undefined): void;
        /**
         * Style processor for horizontal alignment. This aligns the content of the target element, not the target element itself.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new horizontal alignment. Allowed values are "Left", "Center" and "Right".
         * @preserve (Part of the public API)
         */
        static processContentHorizontalAlignment(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.HorizontalAlignment | null | undefined): void;
        /**
         * Style processor for vertical alignment. This aligns the content of the target element, not the target element itself.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new vertical alignment. Allowed values are "Top", "Center" and "Bottom".
         * @preserve (Part of the public API)
         */
        static processContentVerticalAlignment(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.VerticalAlignment | null | undefined): void;
        /**
         * Style processor for content padding.
         * Note: Percentages always refer to the width of the element, never its height (even for top and bottom).
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new content padding.
         * @preserve (Part of the public API)
         */
        static processContentPadding(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: Partial<TcHmi.FourSidedCss> | null | undefined): void;
        /**
         * Theme processor for transforms.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new transform value or an array of transform values.
         * @param order If this parameter is passed, the transforms in valueNew will replace the transform at the specified place, instead of replacing all transforms.
         * @preserve (Part of the public API)
         */
        static processTransform(element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.Transform | TcHmi.Transform[] | null | undefined, order?: number): void;
        /**
         * Return the width of the given text in px as it would appear on the given element.
         * Make sure the element you operate with is attached to the DOM.
         * The function uses the computed values of the element which only exist when an element is attached to the DOM.
         * This function only works with single line text.
         * @param text The text to measure.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @preserve (Part of the public API)
         */
        static getTextWidth(text: string, element: JQuery | readonly HTMLElement[] | NodeListOf<HTMLElement> | HTMLCollectionOf<HTMLElement> | HTMLElement | undefined): number | null;
    }
}
declare namespace TcHmi {
    /**
     * Provides methods to read and write symbol values and schemas.
     * @template ST Type of the value in the symbol.
     * @preserve (Part of the public API)
     */
    class Symbol<ST = any> {
        /**
         * Throws SyntaxError if called with no valid symbol expression.
         * @param expression Expression for the symbol
         */
        constructor(expression: string);
        /**
         * Throws SyntaxError if called with no valid arguments object.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         */
        constructor(expressionObject: {
            expression: string;
            ctx?: Context;
        });
        /**
         * Throws SyntaxError if called with no valid arguments object.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         */
        constructor(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        });
        /**
         * Reads the value of the current symbol.
         * return undefined if the symbol is not available
         * @returns A copy of the value
         * @template T Type of the read value. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        read<T = ST>(): T | undefined;
        /**
         * Reads the value of the current symbol and raises a callback with a copy of the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param callback with gets a copy of the value
         * @template T Type of the read value. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        readEx<T = ST>(callback?: (this: this, data: TcHmi.Symbol.IReadResultObject<T> | TcHmi.Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Reads the value of the current symbol and raises a callback with a copy of the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param options Options for symbol handling
         * @param callback with gets a copy of the value
         * @template T Type of the read value. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        readEx2<T = ST>(options: Symbol.IOptions | null, callback?: (this: this, data: TcHmi.Symbol.IReadResultObject<T> | TcHmi.Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Writes the value of the current symbol.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param value The new value
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        write<T = ST>(value: T, callback?: (this: this, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void): DestroyFunction;
        /**
         * Writes the value of the current symbol.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param value Value to write
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        writeEx<T = ST>(value: T, options: Symbol.IOptions | null, callback?: (this: this, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void): DestroyFunction;
        /**
         * Watches for changes of the current symbol and raises the callback in case of a change.
         * Returns a destroy function to remove the watch.
         * @param callback Callback will be called with each change of the value of the symbol
         * @template T Type of the value to watch. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        watch<T = ST>(callback?: (this: this, data: TcHmi.Symbol.IWatchResultObject<T> | TcHmi.Symbol.IServerWatchResultObject<T>) => void): DestroyFunction;
        /**
         * Watches for changes of the current symbol and raises the callback in case of a change.
         * Returns a destroy function to remove the watch.
         * @param options Options for symbol handling
         * @param callback Callback will be called with each change of the value of the symbol
         * @template T Type of the value to watch. Falls back to type of the symbol.
         * @preserve (Part of the public API)
         */
        watchEx<T = ST>(options: Symbol.IOptions | null, callback?: (this: this, data: TcHmi.Symbol.IWatchResultObject<T> | TcHmi.Symbol.IServerWatchResultObject<T>) => void): DestroyFunction;
        /**
         * Returns the underlying TcHmi.SymbolExpression object.
         * @preserve (Part of the public API)
         */
        getExpression(): TcHmi.SymbolExpression;
        /**
         * Resolves the expression.
         * @param callback Callback will be called after success (with the schema) or failure
         * @preserve (Part of the public API)
         */
        resolveExpression(callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): void;
        /**
         * Watches the expression.
         * @param callback Callback will be called after success (with the schema) or failure
         * @preserve (Part of the public API)
         */
        watchExpression(callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): DestroyFunction;
        /**
         * Resolves the schema of the current symbol.
         * @param callback Callback will be called after success (with the schema) or failure
         * @preserve (Part of the public API)
         */
        resolveSchema(callback?: (this: this, data: TcHmi.Symbol.ISchemaResultObject) => void): void;
        /**
         * Resolves a dictionary of PLC (?) attributes from the underlying schema.
         * @param callback Callback will be called after success (with the attributes) or failure
         * @preserve (Part of the public API)
         */
        resolveAttributes(callback?: (this: this, data: TcHmi.Symbol.IAttributesResultObject) => void): void;
        /**
         * Resolves a PLC (?) attribute by name from the underlying schema.
         * @param name Name of the PLC (?) attribute
         * @param callback Callback will be called after success (with the attribute) or failure
         * @preserve (Part of the public API)
         */
        resolveAttribute(name: string, callback?: (this: this, data: TcHmi.Symbol.IAttributeResultObject) => void): void;
        /**
         * Resolves a list of available versions of the symbol.
         * @param callback Callback will be called after success (with the list of version) or failure
         * @preserve (Part of the public API)
         */
        resolveVersions(callback?: (this: this, data: TcHmi.Symbol.IVersionsResultObject) => void): void;
        /**
         * Watches a list of available versions of the symbol.
         * @param callback Callback will be called after success (with the list of version) or failure
         * @preserve (Part of the public API)
         */
        watchVersions(callback?: (this: this, data: TcHmi.Symbol.IVersionsResultObject) => void): DestroyFunction;
        /**
         * Resolves the symbols meta data
         * @param callback Callback will be called after success (with the meta data) or failure
         * @preserve (Part of the public API)
         */
        resolveMetaData(callback?: (this: this, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): void;
        /**
         * Watches for changes of the symbols meta data
         * @param callback Callback will be called after success (with the meta data) or failure
         * @preserve (Part of the public API)
         */
        watchMetaData(callback?: (this: this, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): DestroyFunction;
        /**
         * Checks if this symbol exists
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        exists(callback?: (this: this, data: TcHmi.Symbol.IExistsResultObject) => void): void;
        /**
         * Is this Symbol processed async or does it provide a sync answer?
         */
        isProcessedAsync(): boolean;
        /**
         * Destroys the current symbol object.
         * @preserve (Part of the public API)
         */
        destroy(): void;
        /**
         * Reads the value of a symbol by name and type.
         * This function throws an exception if the symbol type is not supported.
         * @param name Name of the symbol (without for example %i% marker)
         * @param type Type of the symbol as enum value
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static read<T = any>(name: string, type: TcHmi.SymbolType): T | undefined;
        /**
         * Reads the value of a symbol by expression.
         * @param expression Expression for the symbol
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx<T = any>(expression: string): T | undefined;
        /**
         * Reads the value of a symbol by expression.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx<T = any>(expressionObject: {
            expression: string;
            ctx?: Context;
        }): T | undefined;
        /**
         * Reads the value of a symbol by expression.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx<T = any>(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }): T | undefined;
        /**
         * Reads the value of a symbol by expression and raises a callback with the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param expression Expression for the symbol to read
         * @param callback Callback will be called after success (with the value) or failure
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx2<T = any>(expression: string, callback?: (this: void, data: TcHmi.Symbol.IReadResultObject<T> | Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Reads the value of a symbol by expression and raises a callback with the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param callback Callback will be called after success (with the value) or failure
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx2<T = any>(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IReadResultObject<T> | Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Reads the value of a symbol by expression and raises a callback with the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success (with the value) or failure
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx2<T = any>(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IReadResultObject<T> | Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Reads the value of a symbol by expression and raises a callback with the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param expression Expression for the symbol
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx3<T = any>(expression: string, options: TcHmi.Symbol.IOptions | null, callback?: (this: void, data: TcHmi.Symbol.IReadResultObject<T> | Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Reads the value of a symbol by expression and raises a callback with the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx3<T = any>(expressionObject: {
            expression: string;
            ctx?: Context;
        }, options: TcHmi.Symbol.IOptions | null, callback?: (this: void, data: TcHmi.Symbol.IReadResultObject<T> | Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Reads the value of a symbol by expression and raises a callback with the result.
         * Returns a destroy function to terminate reading of asynchronous values.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the read value.
         * @preserve (Part of the public API)
         */
        static readEx3<T = any>(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, options: TcHmi.Symbol.IOptions | null, callback?: (this: void, data: TcHmi.Symbol.IReadResultObject<T> | Symbol.IServerReadResultObject<T>) => void): DestroyFunction;
        /**
         * Writes the value of a symbol by name and type.
         * This function throws an exception if the symbol type is not supported.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param name Name of the symbol (without for example %i% marker)
         * @param type Type of the symbol as enum value
         * @param value The new value
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static write<T = any>(name: string, type: TcHmi.SymbolType, value: T, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Writes the value of a symbol by expression.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param expression Expression for the symbol
         * @param value Value to write
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static writeEx<T = any>(expression: string, value: T, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Writes the value of a symbol by expression.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param value Value to write
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static writeEx<T = any>(expressionObject: {
            expression: string;
            ctx?: Context;
        }, value: T, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Writes the value of a symbol by expression.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param value Value to write
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static writeEx<T = any>(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, value: T, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Writes the value of a symbol by expression.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param expression Expression for the symbol
         * @param value Value to write
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static writeEx2<T = any>(expression: string, value: T, options: Symbol.IOptions | null, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Writes the value of a symbol by expression.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param value Value to write
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static writeEx2<T = any>(expressionObject: {
            expression: string;
            ctx?: Context;
        }, value: T, options: Symbol.IOptions | null, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Writes the value of a symbol by expression.
         * Returns a destroy function to terminate writing of asynchronous values.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param value Value to write
         * @param options Options for symbol handling
         * @param callback Callback will be called after success or failure
         * @template T Type of the write value.
         * @preserve (Part of the public API)
         */
        static writeEx2<T = any>(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, value: T, options: Symbol.IOptions | null, callback?: null | ((this: void, data: Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void)): DestroyFunction;
        /**
         * Returns function references which are handled by the symbol consumer.
         *
         * @preserve (Part of the public API)
         */
        getReferenceDelegation(): TcHmi.Symbol.ReferenceDelegation | null;
        /**
         * Resolves the expression.
         * @param expression Expression for the symbol
         * @param callback Callback will be called after success (with the schema) or failure
         * @preserve (Part of the public API)
         */
        static resolveExpression(expression: string, callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): void;
        /**
         * Resolves the expression.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success (with the schema) or failure
         * @preserve (Part of the public API)
         */
        static resolveExpression(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): void;
        /**
         * Resolves the expression.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success (with the schema) or failure
         * @preserve (Part of the public API)
         */
        static resolveExpression(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): void;
        /**
         * Resolves the schema of the current symbol.
         * @param expression Expression for the symbol
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveSchema(expression: string, callback?: (this: void, data: TcHmi.Symbol.ISchemaResultObject) => void): void;
        /**
         * Resolves the schema of the current symbol.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveSchema(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.ISchemaResultObject) => void): void;
        /**
         * Resolves the schema of the current symbol.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveSchema(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.ISchemaResultObject) => void): void;
        /**
         * Resolves a dictionary of PLC (?) attributes from the underlying schema.
         * @param expression Expression for the symbol
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveAttributes(expression: string, callback?: (this: void, data: TcHmi.Symbol.IAttributesResultObject) => void): void;
        /**
         * Resolves a dictionary of PLC (?) attributes from the underlying schema.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveAttributes(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IAttributesResultObject) => void): void;
        /**
         * Resolves a dictionary of PLC (?) attributes from the underlying schema.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveAttributes(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IAttributesResultObject) => void): void;
        /**
         * Resolves a PLC (?) attribute by name from the underlying schema.
         * @param expression Expression for the symbol
         * @param name Name of the PLC (?) attribute
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveAttribute(expression: string, name: string, callback?: (this: void, data: TcHmi.Symbol.IAttributeResultObject) => void): void;
        /**
         * Resolves a PLC (?) attribute by name from the underlying schema.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param name Name of the PLC (?) attribute
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveAttribute(expressionObject: {
            expression: string;
            ctx?: Context;
        }, name: string, callback?: (this: void, data: TcHmi.Symbol.IAttributeResultObject) => void): void;
        /**
         * Resolves a PLC (?) attribute by name from the underlying schema.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param name Name of the PLC (?) attribute
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static resolveAttribute(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, name: string, callback?: (this: void, data: TcHmi.Symbol.IAttributeResultObject) => void): void;
        /**
         * Resolves a list of available versions of the symbol.
         * @param expression Expression for the symbol
         * @param callback Callback will be called after success (with the list of version) or failure
         * @preserve (Part of the public API)
         */
        static resolveVersions(expression: string, callback?: (this: void, data: TcHmi.Symbol.IVersionsResultObject) => void): void;
        /**
         * Resolves a list of available versions of the symbol.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param callback Callback will be called after success (with the list of version) or failure
         * @preserve (Part of the public API)
         */
        static resolveVersions(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IVersionsResultObject) => void): void;
        /**
         * Resolves a list of available versions of the symbol.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success (with the list of version) or failure
         * @preserve (Part of the public API)
         */
        static resolveVersions(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IVersionsResultObject) => void): void;
        /**
         * Resolves the symbols meta data
         * @param expression Expression for the symbol
         * @param callback Callback will be called after success (with the meta data) or failure
         * @preserve (Part of the public API)
         */
        static resolveMetaData(expression: string, callback?: (this: void, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): void;
        /**
         * Resolves the symbols meta data
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param callback Callback will be called after success (with the meta data) or failure
         * @preserve (Part of the public API)
         */
        static resolveMetaData(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): void;
        /**
         * Resolves the symbols meta data
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success (with the meta data) or failure
         * @preserve (Part of the public API)
         */
        static resolveMetaData(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): void;
        /**
         * Checks if a symbol exists.
         * @param expression Expression for the symbol
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static exists(expression: string, callback?: (this: void, data: TcHmi.Symbol.IExistsResultObject) => void): void;
        /**
         * Checks if a symbol exists.
         * @param expressionObject Expression meta data object including the expression itself and further information like context.
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static exists(expressionObject: {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IExistsResultObject) => void): void;
        /**
         * Checks if a symbol exists.
         * @param expressionOrExpressionObject Expression meta data object including the expression itself and further information like context or string.
         * @param callback Callback will be called after success or failure
         * @preserve (Part of the public API)
         */
        static exists(expressionOrExpressionObject: string | {
            expression: string;
            ctx?: Context;
        }, callback?: (this: void, data: TcHmi.Symbol.IExistsResultObject) => void): void;
        /**
         * Returns true if the expression is a valid symbol expression
         * @param expression Expression for the symbol
         * @preserve (Part of the public API)
         */
        static isSymbolExpression(expression: string): boolean;
        /**
         * Returns true if expression is escaped with $ in opening expression tag before type token.
         * Example:
         * %$i%... -> true
         * %i%...  -> false
         * @param expression Expression for the symbol
         * @preserve (Part of the public API)
         */
        static isSymbolExpressionEscaped(expression: string): boolean;
        /**
         * Will remove one escape level from expression and return it.
         * @param expression Expression for the symbol
         * @preserve (Part of the public API)
         */
        static escapeSymbolExpression(expression: string): string;
        /**
         * A type assertion for differntiating a IServerReadResultObject from a IReadResultObject
         * @param data IReadResultObject
         */
        static isIServerReadResultObject<T = any>(data: TcHmi.Symbol.IReadResultObject<T> | TcHmi.Symbol.IServerReadResultObject<T>): data is TcHmi.Symbol.IServerReadResultObject<T>;
    }
    namespace Symbol {
        interface ISymbolResultObject extends TcHmi.IResultObject {
            /** The original expression of the symbol (unset in case of error) */
            expression?: SymbolExpression;
            /** The resolved expression used for processing this result (unset in case of error) */
            expressionResolved?: SymbolExpression;
        }
        interface IWatchResultObject<T = any> extends ISymbolResultObject {
            value?: T;
            processedStart?: string;
            processedEnd?: string;
            dirtyPaths?: string[];
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
        interface IServerWatchResultObject<T = any> extends IWatchResultObject<T> {
            response?: TcHmi.Server.IMessage<T>;
        }
        interface IReadResultObject<T = any> extends ISymbolResultObject {
            value?: T;
            processedStart?: string;
            processedEnd?: string;
            dirtyPaths?: string[];
        }
        interface IServerReadResultObject<T = any> extends IReadResultObject<T> {
            response?: TcHmi.Server.IMessage<T>;
        }
        interface IWriteResultObject<T = any> extends ISymbolResultObject {
            value?: T;
            processedStart?: string;
            processedEnd?: string;
            dirtyPaths?: string[];
        }
        interface IServerWriteResultObject<T = any> extends TcHmi.Symbol.IWriteResultObject<T> {
            response?: TcHmi.Server.IMessage<T>;
        }
        interface ISchemaResultObject extends ISymbolResultObject {
            schema?: TcHmi.JsonSchema;
        }
        interface IExistsResultObject extends ISymbolResultObject {
            result?: boolean;
        }
        interface IAttributesResultObject extends ISymbolResultObject {
            attributes?: Dictionary<any>;
        }
        interface IAttributeResultObject<T = any> extends ISymbolResultObject {
            name?: string;
            value?: T;
        }
        interface IVersionsResultObject extends ISymbolResultObject {
            versions?: number[];
        }
        interface IServerSymbolMetaDataResultObject extends ISymbolResultObject {
            ListSymbols?: IListSymbols;
            TcHmiAuditTrail?: {
                AuditTrailSymbols?: {
                    enabled?: boolean;
                    commentRequired?: boolean;
                };
            };
        }
        interface IListSymbols {
            /** numeric access as in enum TcHmi.Server.ACCESS */
            ACCESS?: number;
            DOMAIN?: string;
            DYNAMIC?: boolean;
            HIDDEN?: boolean;
            MAPPING?: string;
            OPTIONS?: object;
            SCHEMA?: JsonSchema;
            USEMAPPING?: boolean;
            /** Versions the symbol supports on this server */
            VERSIONS?: number[];
            REAUTHENTICATION_REQUIRED?: boolean;
        }
        interface IOptions {
            forceParallel?: boolean;
            forceReadWriteGroup?: string | number;
            forceVersion?: number;
        }
        interface ReferenceDelegation {
            /**
             * A function reference that has to be injected by the symbol reference consumer when able to preload.
             * Preloading should be done when the function is called by the symbol reference provider and the
             * symbol reference consumer must call the done callback function when preloading is done.
             */
            preload?: (done: () => void) => void;
        }
        /**
         * @preserve (Part of the public API)
         */
        class ObjectResolver<T extends object | null> {
            /**
             * Creates a new ObjectResolver
             * @param obj Object to resolve subvalues
             * @param parentControl When a reference to a logical parent control is defined, calls to resolve or watch will be delayed, when they contain a symbol reference of type Control,
             * until the controls parent partial (View, Content, UserControl) is initialized to guarantee that symbols of type Control which exist in this scope are available.
             */
            constructor(obj: AllowSymbolExpressionsAsValues<T>, parentControl?: TcHmi.Controls.System.baseTcHmiControl | null);
            /**
             * Resolves all symbol expression refs in the current object.
             * @param callback Callback will be called after success or failure
             * @preserve (Part of the public API)
             */
            resolve(callback?: (this: void, data: TcHmi.Symbol.ObjectResolver.IResultObject<T>) => void): DestroyFunction;
            /**
             * Watches for changes of symbol expressions in the current object und returns the object with updated values.
             * Returns a destroy function to remove the watch.
             * @param callback Callback will be called after success or failure
             * @preserve (Part of the public API)
             */
            watch(callback?: (this: void, data: TcHmi.Symbol.ObjectResolver.IWatchResultObject<T>) => void): DestroyFunction;
            /**
             * Writes to the current object instance and reflects changes to possibly existing symbol expressions.
             * @param obj The new object value
             * @param dirtyPaths Paths in the object that have been changed. If not defined changes will be detected automatically.
             * @param callback Will be called when the object (and all symbols mentioned within the object) have completed writing.
             */
            write(obj: AllowSymbolExpressionsAsValues<T>, dirtyPaths?: string[], callback?: (data: TcHmi.IResultObject) => void): void;
            /**
             * Destroys the current object.
             * @preserve (Part of the public API)
             */
            destroy(): void;
        }
        namespace ObjectResolver {
            interface IWatchResultObject<T extends object | null> extends TcHmi.IResultObject {
                value?: T;
                /** A destroy function to remove the watch. Only set if there is no error. */
                destroy?: TcHmi.DestroyFunction;
            }
            interface IResultObject<T extends object | null> extends TcHmi.IResultObject {
                value?: T;
            }
        }
    }
    type SymbolTag = 's' | 'i' | 'l' | 'pp' | 'tp' | 'f' | 'ctrl' | 'ctx' | 'tr' | 't';
    enum SymbolType {
        Invalid = 0,
        Server = 10,// Used for symbols with expression -> %s%...%/s%
        Internal = 20,// Used for symbols with expression -> %i%...%/i%
        LocalizedText = 30,// Used for symbols with expression -> %l%...%/l%
        PartialParam = 40,// Used for symbols with expression -> %pp%...%/pp%
        TemplateParam = 50,// Used for symbols with expression -> %tp%...%/tp%
        Function = 60,// Used for symbols with expression -> %f%...%/f%
        Control = 70,// Used for symbols with expression -> %ctrl%...%/ctrl%
        Context = 80,// Used for symbols with expression -> %ctx%...%/ctx%
        ThemedResource = 90,// Used in for symbols with getExpression() -> %tr%...%/tr%
        Timer = 100
    }
    /**
     * A symbol expression string like "%s%Symbol%/s%".
     */
    type SymbolExpressionString<ST extends SymbolTag = SymbolTag> = ST extends ST ? `%${ST}%${string}%/${ST}%` : never;
    type AllowSymbolExpressionsAsValues<T, ST extends SymbolTag = SymbolTag> = T | (T extends object ? {
        [P in keyof T]: AllowSymbolExpressionsAsValues<T[P], ST>;
    } : never) | SymbolExpressionString<ST>;
}
declare namespace TcHmi {
    /**
     * Symbol expression parser.
     * @preserve (Part of the public API)
     */
    class SymbolExpression {
        /**
         * Split string by pipe, but ignore pipes in brackets.
         * @deprecated Please use SymbolExpression.parse instead. RegExp method will not work properly with nested symbol expressions.
         * @preserve (Part of the public API)
         */
        static RegExpExpressionGroupByPipe: RegExp;
        /**
         * Resolves the first expression occurrence and the content including line breaks.
         * @deprecated Please use SymbolExpression.parse instead. RegExp method will not work properly with nested symbol expressions.
         * @preserve (Part of the public API)
         */
        static RegExpExpression: RegExp;
        /**
         * Resolves the first escapted expression occurrence and the content including line breaks.
         * @deprecated Please use SymbolExpression.parse instead. RegExp method will not work properly with nested symbol expressions.
         * @preserve (Part of the public API)
         */
        static RegExpExpressionEscaped: RegExp;
        /**
         * Parses the given expression.
         * @param expression The expression to be parsed.
         */
        static parse(expression: string): SymbolExpression.IParseResultObject;
        /**
         * Creates a SymbolExpression instance
         * @param expression expression string
         */
        constructor(expression: string);
        /**
         * Returns the expression string.
         * @preserve (Part of the public API)
         */
        toString(): string;
        /**
         * Returns the content of the expression. The content is everything except the expression tags.
         * @preserve (Part of the public API)
         */
        getContent(): string | undefined;
        /**
         * Returns the tag of the expression. For example "s" in case of an expression of type Server.
         * @preserve (Part of the public API)
         */
        getTag(): SymbolTag | undefined;
        /**
         * Returns the name of the expression.
         * In case of an expression of type Server getName will also contain the path. Use getNameEx to retrieve the name in all expressions which support having a name.
         * @preserve (Part of the public API)
         */
        getName(): string | undefined;
        /**
         * Returns the name of the expression.
         * @preserve (Part of the public API)
         */
        getNameEx(): string | undefined;
        /**
         * Returns the full name containing the base name and the path of the expression but no options.
         * @preserve (Part of the public API)
         */
        getFullName(): string | undefined;
        /**
         * Returns the path of the expression.
         * In case of an expression of type Server getPath will return null. Use getPathEx if you want to retrieve the path in all expressions which support having a path.
         * @preserve (Part of the public API)
         */
        getPath(): string | null;
        /**
         * Returns the path of the expression.
         * @preserve (Part of the public API)
         */
        getPathEx(): string | null;
        /**
         * Returns the path tokens.
         * In case of an expression of type Server getPathTokens will return null. Use getPathTokensEx if you want to retrieve the path tokens in all expressions which support having a path.
         * @preserve (Part of the public API)
         */
        getPathTokens(): string[] | null;
        /**
         * Returns the path tokens.
         * @preserve (Part of the public API)
         */
        getPathTokensEx(): string[] | null;
        /**
         * Returns the type of the expression.
         * @preserve (Part of the public API)
         */
        getType(): SymbolType;
        /**
         * Returns a Dictionary of option flags.
         * @preserve (Part of the public API)
         */
        getOptions(): SymbolExpression.IOptions;
        /**
         * Returns an array of child symbol expressions.
         * @returns
         */
        getChildren(): SymbolExpression[];
        /**
         * Returns the current symbol expressions parse data.
         * @returns
         */
        getParseData(): SymbolExpression.IParseData | null;
        /**
         * Returns true if the expressions contains child symbols that have to be resolved before the expression can be resolved.
         */
        hasChildren(): boolean;
        /**
         * Resolves the expression.
         * @param callback The function that will be called when the result is available.
         * @preserve (Part of the public API)
         */
        resolve(callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): DestroyFunction;
        private __symbolRefCount;
        /**
         * Watches the expression.
         * @param callback The function that will be called when the result is available.
         * @preserve (Part of the public API)
         */
        watch(callback: (data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): DestroyFunction;
    }
    namespace SymbolExpression {
        /**
         * Symbol expression related option flags.
         */
        interface IOptions {
            /** The binding mode to be used when the symbol expression is used to bind a symbol to a control attribute. */
            BindingMode?: TcHmi.BindingMode;
            /**
             * DEPRECATED
             * Will hold first defined BindingEvent. Complete list is stored in BindingEvents array.
             * @deprecated
             */
            BindingEvent?: string;
            /**
             * A list of control event names that will trigger a binding to read the control attribute and write it to the symbol
             * when the symbol expression is used to bind a symbol to a control attribute.
             */
            BindingEvents?: string[];
            /**
             * Timeout
             * Only respected in case of a symbol expression of type Server or Control.
             */
            Timeout?: number;
            /**
             * The interval used for Subscription requests to the symbol described by the expression.
             * Only respected in case of a symbol expression of type Server.
             */
            Interval?: number;
            /**
             * Defines if requests made to the symbol described by the expression will bypass the system request queue.
             * Only respected in case of a symbol expression of type Server.
             */
            Parallel?: boolean;
            /**
             * The mode used for Subscription requests to the symbol described by the expression.
             * Only respected in case of a symbol expression of type Server.
             *
             * Change
             * The server will send a message for a symbols current value when the server has detected a value change.
             *
             * Poll
             * The server will send a message for a symbols current value with every interval timer tick.
             * Can be used to always have information about the current value.
             *
             * ClientPoll
             * Only respected for subscriptions from TcHmi.Symbol api.
             * The client will run a timer (with subscriptions interval time) and send an update to the affected
             * TcHmi.Symbol instance with the last known subscription value reported by the server
             * with every timer tick.
             * Can be used to always have information about the current value.
             *
             * ClientWriteConfirm
             * Only respected for subscriptions from TcHmi.Symbol api.
             * The client will send an one time update to the affected TcHmi.Symbol instance
             * with the last known subscription value reported by the server after a write has happend
             * via the affected TcHmi.Symbol instance.
             * The update will be send after a timer (with subscriptions interval time) has triggered.
             * The timer will be resetted when a write occurs while the timer is already running.
             * Can be used to always have information about the current value after a write operation,
             * without additional load on the server and the client.
             * Can help if the value of a symbol is reset to the previous value after a successful write
             * operation before the server was able to recognise the change caused by the write operation
             * in the context of the subscription.
             */
            SubscriptionMode?: 'Change' | 'Poll' | 'ClientPoll' | 'ClientWriteConfirm';
            /**
             * Subscription requests to the symbol described by the expression with the same SubscriptionGroup will be bundled into the same Subscription request to the server.
             * Only respected in case of a symbol expression of type Server.
             */
            SubscriptionGroup?: string;
            /**
             * ReadWrite requests to the symbol described by the expression with the same ReadWriteGroup will be bundled into the same request to the server when they are raised synchronous.
             * Only respected in case of a symbol expression of type Server.
             */
            ReadWriteGroup?: string;
            /**
             * Requests to the symbol described by the expression will contain the UniqueHash command options when set to true.
             * Only respected in case of a symbol expression of type Server.
             */
            UniqueHash?: boolean;
            /**
             * Requests to the symbol described by the expression will call this version of the symbol.
             * Only respected in case of a symbol expression of type Server.
             */
            Version?: number;
            /**
             *
             */
            Start?: number;
            /**
             *
             */
            End?: number;
            /**
             * Defines whether an event should be registered to listen for changes in the symbol value or if the symbol expression should be resolved and the resulting string be used as the event name.
             * Only respected when the symbol expression is used to register an event.
             */
            EventRegistrationMode?: 'Verbatim' | 'Resolve';
            /**
             * Defines if we should wait for a control to become available before reporting an error.
             * The time to wait can be defined via Timeout option.
             * Only respected in case of a symbol expression of type Control.
             */
            WaitForControl?: boolean;
            /**
             * Determines how a binding will handle symbol related read/watch errors.
             * Possible values:
             * - Ignore: Ignore the error.
             * - Reset: Forward the default toggle switch (null) to force the control attribute to reset to default value.
             */
            BindingErrorHandling?: 'Ignore' | 'Reset';
            /**
             * Determines how a binding will handle symbol related write errors.
             * Possible values:
             * - Ignore: Ignore the error.
             * - ReadBack: Read back the current symbol value after write attempt failure and forward it to the control.
             */
            BindingWriteErrorHandling?: 'Ignore' | 'ReadBack';
        }
        /**
         * Symbol expression parse result.
         */
        interface IParseData {
            type: SymbolType;
            expression: string;
            tag?: SymbolTag;
            content?: string;
            isEscaped: boolean;
            escapeLevel: number;
            fullName?: string;
            name?: string;
            path?: string;
            options?: string[];
            openStart?: number;
            openEnd?: number;
            closeStart?: number;
            closeEnd?: number;
            children?: IParseData[];
            origin?: IParseData;
            originOpenStart?: number;
            originOpenEnd?: number;
            originCloseStart?: number;
            originCloseEnd?: number;
        }
        interface IParseResultObject extends TcHmi.IResultObject {
            data?: IParseData;
        }
    }
}
declare namespace TcHmi {
    /**
     * Infrastructure to have calls which are sync but async if the time (in ms) is too long.
     */
    class TimedAsyncTask {
        /**
         * constructor
         * @param duration Milliseconds for the threshold value
         */
        constructor(duration: number);
        __duration: number;
        protected __than: number;
        /**
         * Call a callback.
         * Sync if time is not later than the threshold value of the instance.
         * Returns 0 if the callback is sync, otherwise the timeout id
         * @param callback function to call (sync or async)
         */
        do(callback: () => void): number;
        /**
         * Returns false if time is not later than the threshold value of the instance.
         */
        timeQuotaReached(): boolean;
    }
}
declare namespace TcHmi {
    /**
     * Functions for interaction with TcSpeech.
     * @preserve (Part of the public API)
     */
    namespace TcSpeech {
    }
}
declare namespace TcHmi.TcSpeech {
    /**
     * (Re-)Starts the rtc connection to TwinCAT speech engine.
     * @param options This option can override all setting from tchmiconfig.json and more
     * @param callback Gets notification when opening connection failed.
     * @preserve (Part of the public API)
     */
    function openConnection(options?: TcHmi.TcSpeech.ConnectionOptions & Partial<TcHmi.TcSpeech.BaseConfig>, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
    /**
     * Closes an active connection to TwinCAT speech engine.
     * @param options Can target a specific remote TwinCAT speech engine
     * @param options.remoteSocketId socket id to close
     * @param callback A callback to get feedback
     * @preserve (Part of the public API)
     */
    function closeConnection(options?: {
        remoteSocketId?: number;
    }, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
    /**
     * Sets the volume (between 0 and 1) of speech output on this device.
     * @param valueNew new volume. Will be capped between 0 and 1.
     * @preserve (Part of the public API)
     */
    function setVolume(valueNew: number): void;
    /**
     * Functions for SpeechSynthesis .
     * @preserve (Part of the public API)
     */
    class SpeechSynthesis {
        /** Text to be synthesized */
        readonly text: string;
        readonly options?: {
            priority?: TcHmi.TcSpeech.AudioEntityPriority;
        } | undefined;
        /**
         * Functions for SpeechSynthesis .
         * @param text Text to be synthesized
         * @param options Options
         * @param options.priority Audio entity priority
         * @preserve (Part of the public API)
         */
        constructor(
        /** Text to be synthesized */
        text: string, options?: {
            priority?: TcHmi.TcSpeech.AudioEntityPriority;
        } | undefined);
        private __guid;
        /**
         * Starting output of text. The connection must be open at this point and we have to have enableSpeaker.
         * The callback will get a guid which can be used to stop or request status of the speech synthesis.
         * @param callback The callback will get a guid which can be used to stop or request status of the speech synthesis.
         * @preserve (Part of the public API)
         */
        start(callback?: null | ((this: void, data: TcHmi.TcSpeech.SpeechSynthesisResult) => void)): void;
        /**
         * Request the state (queued, playing, stopped) of a given speech synthesis call.
         * @param callback The callback will get the state of the speech synthesis
         * @preserve (Part of the public API)
         */
        getStatus(callback?: null | ((this: void, data: TcHmi.TcSpeech.SpeechSynthesisResult) => void)): void;
        /**
         * Stops a given speech synthesis call.
         * @param callback The callback will get the state of the speech synthesis
         * @preserve (Part of the public API)
         */
        stop(callback?: null | ((this: void, data: TcHmi.TcSpeech.SpeechSynthesisResult) => void)): void;
    }
}
declare namespace TcHmi {
    /**
     * Provides functions for managing and changing themes.
     * @preserve (Part of the public API)
     */
    class Theme {
        /**
         * Returns the active theme.
         * @preserve (Part of the public API)
         */
        static get(): string;
        /**
         * Sets the active theme.
         * @param valueNew Name of the new theme.
         * @preserve (Part of the public API)
         */
        static set(valueNew: string): TcHmi.Errors;
        /**
         * Returns all registered themes of the project.
         * @preserve (Part of the public API)
         */
        static getRegisteredThemes(): string[];
    }
    namespace Theme {
        /**
         * Control property related API
         * @preserve (Part of the public API)
         */
        class Properties {
            /**
             * Parses every source of implicit properties and returns this or null
             * Can have different value after the event onThemeDataChanged.
             * The order of resources are
             * 1) control class
             * 2) theme definition of the control type in project
             * 3) theme definition in control
             * 4) defaultValueInternal in Description.json of the control
             * @param control Control which needs the resource
             * @param propertyName name of the property
             * @template T Type of the default value
             * @preserve (Part of the public API)
             */
            static getDefaultValue<T = any>(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): Theme.Resource<T>;
            /**
             * Sets the default value of a property and change it (if needed) on theme change.
             * @param control Control to manipulate
             * @param propertyName Property to manipulate
             * @returns returns an Error code
             * @preserve (Part of the public API)
             */
            static setThemeValue(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): TcHmi.Errors;
            /**
             * After calling this function the control property will not be changed on theme change anymore.
             * Does not change the property value.
             * @param control Control to manipulate
             * @param propertyName Property to manipulate
             * @returns returns an Error code
             * @preserve (Part of the public API)
             */
            static releaseThemeValue(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): TcHmi.Errors;
        }
        /**
         * Control resource related API
         * @preserve (Part of the public API)
         */
        class Resources {
            /**
             * Gets a themed resource.
             * Parses every source of properties and returns this or null
             * Can have different value after the event onThemeDataChanged.
             * The order of resources are
             * 1) control class
             * 2) theme definition of the control type in project
             * 3) theme definition in control
             *
             * @param control Control which needs the resource
             * @param resourceName name of the resource
             * @returns returns the resource or null
             * @template T Type of the value
             * @preserve (Part of the public API)
             */
            static get<T = any>(control: TcHmi.Controls.System.baseTcHmiControl, resourceName: string): Theme.Resource<T>;
            /**
             * Resolves the basepath for a path value inside a theme resource
             * @param control Control which asks for that
             * @param resource resource to resolve the basepath
             * @template T Type of the value
             */
            static resolveBasePath<T = any>(control: TcHmi.Controls.System.baseTcHmiControl, resource: Theme.Resource<T>): string;
        }
        interface Resource<T extends any> extends TcHmi.IResultObject {
            value: T | null;
            /** The value is generated from the control, the project or in error case from the system. */
            origin: 'control' | 'project' | 'system';
            /** Resources of a control will get "Base" if they do not implement the current theme */
            originThemeName: string;
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides a layer to show elements above the normal visualization.
     * @preserve (Part of the public API)
     */
    class TopMostLayer {
        /**
         * Appends the elements to the top layer above the normal visualization
         * A reference to the element should be kept to be able to call remove() function
         * The parent element will be a div with style="width:<browserwindowwidth>;height:<browserwindowheight>;"
         * Your element could have style="min-width:50%;min-height:50%;"
         * @param control Control which requests this. If no reference for justAbove is specified, the control element
         * will be used as the justAbove reference, with conflict resolution set to Up.
         * @param element HTML element which should be moved to TopMostLayer
         * @param options Optional options
         * @returns success of the add
         * @preserve (Part of the public API)
         */
        static add<E extends HTMLElement>(control: TcHmi.Controls.System.baseTcHmiControl, element: E | undefined | null, options?: TopMostLayer.IOptions<E>): boolean;
        /**
         * Appends the elements to the top layer above the normal visualization
         * A reference to the element should be kept to be able to call remove() function
         * The parent element will be a div with style="width:<browserwindowwidth>;height:<browserwindowheight>;"
         * Your element could have style="min-width:50%;min-height:50%;"
         * @param control Control which requests this. If no reference for justAbove is specified, the control element
         * will be used as the justAbove reference, with conflict resolution set to Up.
         * @param element jQuery Collection with exactly one element which should be moved to TopMostLayer
         * @param options Optional options
         * @returns success of the add
         * @preserve (Part of the public API)
         */
        static add(control: TcHmi.Controls.System.baseTcHmiControl, element: JQuery | undefined | null, options?: TopMostLayer.IOptions): boolean;
        /**
         * Removes the element from the top layer and returns it for later use by the caller
         * If the element is not inside the TopMostLayer it will be returned without change.
         * @param control control which requests this
         * @param element HTML element which should be removed from TopMostLayer
         * @returns The removed HTML element
         * @preserve (Part of the public API)
         */
        static remove<E extends HTMLElement>(control: TcHmi.Controls.System.baseTcHmiControl, element: E): E;
        /**
         * Removes the element from the top layer and returns it for later use by the caller
         * If the element is not inside the TopMostLayer it will be returned without change.
         * @param control control which requests this
         * @param element jQuery Collection with the element which should be removed from TopMostLayer
         * @returns jQuery Collection
         * @preserve (Part of the public API)
         */
        static remove(control: TcHmi.Controls.System.baseTcHmiControl, element: JQuery): JQuery;
        /**
         * Appends the elements to the top layer above the normal visualization (not control namespaced)
         * A reference to the element should be kept to be able to call remove() function
         * The parent element will be a div with style="width:<browserwindowwidth>;height:<browserwindowheight>;"
         * Your element could have style="min-width:50%;min-height:50%;"
         * @param element HTML element which should be moved to TopMostLayer
         * @param options Optional options
         * @returns success of the add
         * @preserve (Part of the public API)
         */
        static addEx<E extends HTMLElement>(element: E | undefined | null, options?: TopMostLayer.IOptionsEx<E>): boolean;
        /**
         * Appends the elements to the top layer above the normal visualization (not control namespaced)
         * A reference to the element should be kept to be able to call remove() function
         * The parent element will be a div with style="width:<browserwindowwidth>;height:<browserwindowheight>;"
         * Your element could have style="min-width:50%;min-height:50%;"
         * @param element jQuery Collection with exactly one element which should be moved to TopMostLayer
         * @param options Optional options
         * @returns success of the add
         * @preserve (Part of the public API)
         */
        static addEx(element: JQuery | undefined | null, options?: TopMostLayer.IOptionsEx): boolean;
        /**
         * Removes the element from the top layer and returns it for later use by the caller (not control namespaced)
         * If the element is not inside the TopMostLayer it will be returned without change.
         * @param element HTML element which should be removed from TopMostLayer
         * @returns The removed HTML element
         * @preserve (Part of the public API)
         */
        static removeEx<E extends HTMLElement>(element: E): E;
        /**
         * Removes the element from the top layer and returns it for later use by the caller (not control namespaced)
         * If the element is not inside the TopMostLayer it will be returned without change.
         * @param element jQuery Collection with the element which should be removed from TopMostLayer
         * @returns jQuery Collection
         * @preserve (Part of the public API)
         */
        static removeEx(element: JQuery): JQuery;
    }
    namespace TopMostLayer {
        interface IOptionsBase {
            /** Center the element on the screen. Default is false. */
            centerHorizontal?: boolean | null | undefined;
            /** Center the element on the screen. Default is false. */
            centerVertical?: boolean | null | undefined;
            /** Should the overlay be darken over the background. Default is true. */
            dimBackground?: boolean | null | undefined;
            /** Prevents pointer events from passing through the overlay and prohibits interaction with elements behind the overlay. Default is true. */
            modal?: boolean | null | undefined;
            /** Should a click on the overlay close the TopMostLayer? Default is true. */
            closeOnBackground?: boolean | null | undefined;
            /** All further calls moves element to top instead of abort. Default is false. */
            allowMultipleCall?: boolean;
            /**
             * Add to the TopMostLayer just above the reference element. This will result in the added element being as
             * low as possible in the TopMostLayer order while still being above the reference. If two or more elements
             * want to be the lowest element you can specify the conflict resolution behavior to either insert the newly
             * added element above or below the other elements that want to be at the bottom. If the conflict resolution
             * is not specifed it defaults to Up, which results in conflicting elements being inserted so that the last
             * added element is at the highest postion of all conflicting elements.
             */
            justAbove?: {
                reference: Element;
                conflictResolution?: ConflictResolution;
            };
        }
        enum ConflictResolution {
            Up = 0,
            Down = 1
        }
        /**
         * Options for control based API
         */
        interface IOptions<E extends HTMLElement | JQuery = JQuery> extends IOptionsBase {
            /**
             * Callback which will be called when the element has been potentially being resized.
             * Its parameter gets information about the parents dimension.
             */
            resizeCb?: ((this: TcHmi.Controls.System.baseTcHmiControl, data: TopMostLayer.IResizeResultObject<E>) => void) | null | undefined;
            /**
             * Callback which will be called when the element has been removed.
             * Its parameter has information if the element was not removed by a
             * remove API call but for example with a click beside the element.
             */
            removeCb?: ((this: TcHmi.Controls.System.baseTcHmiControl, data: TopMostLayer.IElemRemoveResultObject<E>) => void) | null | undefined;
        }
        /**
         * Options for non-control based API
         */
        interface IOptionsEx<E extends HTMLElement | JQuery = JQuery> extends IOptionsBase {
            /** Callback which will be called when the element has been potentially being resized */
            resizeCb?: ((this: typeof globalThis, data: TopMostLayer.IResizeResultObject<E>) => void) | null | undefined;
            /** Callback which will be called when the element has been removed*/
            removeCb?: ((this: typeof globalThis, data: TopMostLayer.IElemRemoveResultObject<E>) => void) | null | undefined;
        }
        interface IResizeResultObject<E extends HTMLElement | JQuery = JQuery> extends TcHmi.IResultObject {
            /** The given element in the TopMostLayer */
            element: E;
            parentPixelSize: {
                width: number;
                height: number;
            };
        }
        interface IElemRemoveResultObject<E extends HTMLElement | JQuery = JQuery> extends TcHmi.IResultObject {
            /** The detached element which was in the TopMostLayer */
            element: E;
            /** The removal was NOT triggered by an API call but for example by user click beside the element. */
            canceled: boolean;
        }
    }
}
declare namespace TcHmi.Trigger {
    /**
     * Class to handle actions as used in triggers.
     * @preserve (Part of the public API)
     */
    class Actions {
        /**
         * Runs a list of actions. Returns a Promise that is resolved or rejected when the actions finish or run into an
         * error, so this method can be awaited. If you need a callback that is called synchronously in cases where the
         * action list also runs synchronously, you can use the ctx parameters success and error callbacks.
         * @param actions The actions to run.
         * @param ctx A context object. Used for callbacks and if an action wants to access ctx symbols.
         */
        static run<T>(actions: Trigger.Action[], ctx?: Context<T>): Promise<T | undefined>;
    }
}
declare namespace TcHmi.Type {
    /**
     * Returns the schema object for a type definition.
     * Can be used for example with 'tchmi:general#/definitions/String'
     * Returns null on error
     * For schema information on Symbols use its resolveSchema()
     * or for SymbolExpressions use TcHmi.Symbol.resolveSchema()
     * @param typeName Name of the type reference (for example 'tchmi:general#/definitions/String')
     * @preserve (Part of the public API)
     */
    function getSchema(typeName: string): JsonSchema | null;
    namespace Schema {
        /**
         * Generates a Javascript object or data primitive from the default values of a schema object.
         * Hint:
         * If you have a type definition string you can use TcHmi.Type.getSchema() API to get the schema object.
         * @param schema Schema so resolve
         * @preserve (Part of the public API)
         */
        function resolveDefault(schema: TcHmi.JsonSchema): any;
        /**
         * Resolves the effective type value/s of a schema except those with additional conversion rules.
         * Hint:
         * If you have a type definition string you can use TcHmi.Type.getSchema() API to get the schema object.
         * @param schema Schema to resolve
         * @preserve (Part of the public API)
         */
        function resolveType(schema: TcHmi.JsonSchema): undefined | JsonDataTypeNames | JsonDataTypeNames[];
        /**
         * Recurse a schema with its corresponding data
         * @param schema Schema to iterate
         * @param data data which is defined by the schema
         * @param action callback to call on each part
         */
        function recurseThroughSchema<T = unknown>(schema: JsonSchema, data: T, action: (subschema: JsonSchema, subdata: unknown, path: string) => RecurseSchemaResult<unknown>): RecurseSchemaResult<T>;
        interface RecurseSchemaResult<T extends any = any> {
            changedValue: boolean;
            value: T;
        }
        /**
         * Tests whether the given value fits into the type specified by the provided schema.
         * @param value The value to test.
         * @param schema The schema to test against.
         */
        function matchesSchemaType(value: any, schema: JsonSchema): boolean;
    }
}
declare namespace TcHmi {
    /**
     * Provides an interface for Ui Provider.
     * @preserve (Part of the public API)
     */
    namespace UiProvider {
        /**
         * Register a provider
         * @param provider Provider to register
         */
        function register(provider: TypeProviderMap[keyof TypeProviderMap]): void;
        /**
         * Returns a Map of all registered providers for a given type
         * @param type The provider type.
         */
        function getProviders<T extends keyof TypeProviderMap>(type: T): Map<string, TypeProviderMap[T]>;
        /**
         * Returns a registered provider for a given type and id
         * @param type The type of the provider
         * @param providerName The name of the provider
         */
        function getProvider<T extends keyof TypeProviderMap>(type: T, providerName: string): TypeProviderMap[T] | undefined;
        /**
         * Returns the provider for the given type that was configured in tchmiconfig.json.
         * Returns undefined if no provider was configured.
         * Throws an error if the configured provider is not registered.
         * @param type The type of the provider to get.
         */
        function getPreferredProvider<T extends keyof TypeProviderMap>(type: T): TypeProviderMap[T] | undefined;
        /**
         * Abstract base class for all UiProvider
         */
        abstract class BaseProvider {
            abstract readonly type: keyof TypeProviderMap;
            readonly providerName: string;
            /**
             * Base class for all UiProvider
             * @param providerName Name of the provider
             * @param type Type of the provider.
             */
            constructor(providerName: string, type: keyof TypeProviderMap);
        }
        /**
         * Abstract class for all KeyboardProvider
         */
        abstract class KeyboardProvider extends BaseProvider {
            readonly type = "keyboard";
            /**
             * Create a new Keyboard provider.
             * @param providerName The name of this provider.
             */
            constructor(providerName: string);
            /**
             * Open a keyboard with a specific target element.
             * @param textElement
             */
            abstract open(textElement: HTMLInputElement | HTMLTextAreaElement): IErrorDetails;
            /**
             * Will be called when the config has changed.
             */
            abstract refreshConfig(): void;
            /**
             * Closes a keyboard.
             * @param textElement
             */
            abstract close(): IErrorDetails;
            /**
             * Returns whether the keyboard is currently being interacted with by mouse, touch or physical keyboard.
             */
            hasActiveUserInteraction?(): boolean;
        }
        /**
         * Abstract class for all PopupProvider
         */
        abstract class PopupProvider extends BaseProvider {
            readonly type = "popup";
            /**
             * Create a new Popup provider.
             * @param providerName The name of this provider.
             */
            constructor(providerName: string);
            /**
             * Creates an instance of the PopupProvider.MessageBox class which allows interaction with the underlying popup implementation.
             * @param header The localization for the header text.
             * @param content The localization for the content text.
             * @param buttons The buttons to show.
             * @param parentControl Optional reference to a control which is the 'owner' of the underlying popup instnace and which lifecycle will be bound to the lifecycle of the popup.
             * @template T A popup prompt() will result with this value type
             */
            createMessageBox?<T>(header: Localizable, content: Localizable, buttons: Dictionary<{
                value: T;
                width: number;
                height: number;
                widthMode?: 'Value' | 'Content';
                heightMode?: 'Value' | 'Content';
                minWidth?: number;
                maxWidth?: number;
                minHeight?: number;
                maxHeight?: number;
                textPadding?: FourSidedCss;
                text: Localizable;
                tooltip?: Localizable;
                keepPopupOpen?: boolean;
                actions?: TcHmi.Trigger.Action[];
            }>, parentControl?: TcHmi.Controls.System.baseTcHmiControl | null): PopupProvider.MessageBox<T>;
            /**
             * Creates an instance of the PopupProvider.HtmlElementBox class which allows interaction with the underlying popup implementation.
             * @param header The localization for the header text.
             * @param content The html content.
             * @param buttons The buttons to show.
             * @param parentControl Optional reference to a control which is the 'owner' of the underlying popup instnace and which lifecycle will be bound to the lifecycle of the popup.
             * @template T A popup prompt() will result with this value type
             */
            createHtmlElementBox?<T>(header: Localizable, content: HTMLElement, buttons: Dictionary<{
                value: T;
                width: number;
                height: number;
                widthMode?: 'Value' | 'Content';
                heightMode?: 'Value' | 'Content';
                minWidth?: number;
                maxWidth?: number;
                minHeight?: number;
                maxHeight?: number;
                textPadding?: FourSidedCss;
                text: Localizable;
                tooltip?: Localizable;
                keepPopupOpen?: boolean;
                actions?: TcHmi.Trigger.Action[];
            }>, parentControl?: TcHmi.Controls.System.baseTcHmiControl | null): PopupProvider.HtmlElementBox<T>;
            /**
             * Creates an instance of the PopupProvider.InputPrompt class which allows interaction with the underlying popup implementation.
             * @param header The localization for the header text.
             * @param label The localization for the label text.
             * @param validation Optional list of regex patterns that the input must or must not match
             * @param parentControl Optional reference to a control which is the 'owner' of the underlying popup instnace and which lifecycle will be bound to the lifecycle of the popup.
             */
            createInputPrompt?(header: Localizable, label: Localizable, validation?: {
                pattern: RegExp;
                expectedTestResult: boolean;
            }[] | null, parentControl?: TcHmi.Controls.System.baseTcHmiControl | null): PopupProvider.InputPrompt;
            /**
             * Creates an instance of the PopupProvider.InteractiveWritePrompt class which allows interaction with the underlying popup implementation.
             * @param symbols A list of symbol data which is shown in the popup.
             * @param options Options
             * @param parentControl Optional reference to a control which is the 'owner' of the underlying popup instnace and which lifecycle will be bound to the lifecycle of the popup.
             */
            createInteractiveWritePrompt?(symbol: PopupProvider.InteractiveWritePrompt.Symbol, options?: PopupProvider.InteractiveWritePrompt.Options | null, parentControl?: TcHmi.Controls.System.baseTcHmiControl | null): PopupProvider.InteractiveWritePrompt;
        }
        namespace PopupProvider {
            type BackgroundAction<A extends string> = {
                close: false;
            } | {
                close: true;
                action?: A;
            };
            type PromptAction<A extends string> = {
                action?: A;
            };
            enum PositioningMode {
                Centered = 1,
                Floating = 2
            }
            enum BackgroundMode {
                None = 1,
                Dimmed = 2
            }
            interface Bounds {
                width?: number | null;
                widthUnit?: 'px' | '%';
                height?: number | null;
                heightUnit?: 'px' | '%';
                left?: number | null;
                leftUnit?: 'px' | '%';
                top?: number | null;
                topUnit?: 'px' | '%';
                bottom?: number | null;
                bottomUnit?: 'px' | '%';
                right?: number | null;
                rightUnit?: 'px' | '%';
            }
            interface StorageSettings {
                /** The name of the storage instance. */
                name: string;
                /** Defines if the last bounds after moving the popup will be restored when opened the next time. */
                restoreBounds?: boolean;
            }
            /**
             * A generic popup
             * @template T A popup prompt() will result with this value type
             */
            abstract class Popup<T = any> {
                /**
                 * Handles callbacks to get called after the popup is shown
                 */
                abstract onShow: {
                    add: (callback: () => void) => DestroyFunction;
                    remove: (callback: () => void) => void;
                };
                /**
                 * Handles callbacks to get called after the popup is hidden.
                 */
                abstract onHide: {
                    add: (callback: () => void) => DestroyFunction;
                    remove: (callback: () => void) => void;
                };
                /**
                 * Handles callbacks to get called after position or size has changed
                 */
                abstract onBoundsChange: {
                    add: (callback: (data: {
                        /** Bounds in UiProvider coordinates */
                        bounds: TcHmi.UiProvider.PopupProvider.Bounds | null;
                    }) => void) => DestroyFunction;
                    remove: (callback: (data: {
                        /** Bounds in UiProvider coordinates */
                        bounds: TcHmi.UiProvider.PopupProvider.Bounds | null;
                    }) => void) => void;
                };
                /**
                 * Base constructor
                 */
                constructor();
                abstract destroy(): void;
                /**
                 * Shows the popup.
                 */
                abstract show(): void;
                /**
                 * Hides the popup.
                 */
                abstract hide(): void;
                /**
                 * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
                 */
                abstract prompt(): Promise<T>;
                /**
                 * Aborts a prompted popup and rejects the promise.
                 * @param action The action to perform to answer the prompt.
                 */
                abstract abort(action?: UiProvider.PopupProvider.PromptAction<string>): void;
                /**
                 * Sets texts which can either be localizable or static.
                 */
                abstract setTexts(texts: Partial<Popup.LocalizableTexts>): void;
                /**
                 * Sets the background action.
                 * @param action
                 */
                abstract setBackgroundAction(action: UiProvider.PopupProvider.BackgroundAction<string>): void;
                /**
                 * Sets the background mode of the TopMostLayer used for displaying the popup.
                 * @param mode
                 */
                abstract setBackgroundMode(mode: UiProvider.PopupProvider.BackgroundMode): void;
                /**
                 * Sets the positioning mode of the popup in the TopMostLayer.
                 * @param mode
                 */
                abstract setPositioningMode(mode: UiProvider.PopupProvider.PositioningMode): void;
                /**
                 * Sets the bounds of the popup. Does only have any effect if PositioningMode.Floating is used.
                 * @param bounds
                 */
                abstract setBounds(bounds: UiProvider.PopupProvider.Bounds): void;
                /**
                 * Sets the movable option.
                 * Does only have an effect when setPositioningMode is also set:
                 * `popup.setPositioningMode(TcHmi.UiProvider.PopupProvider.PositioningMode.Floating)`
                 */
                abstract setMovable(movable: boolean): void;
                /**
                 * Determines if the popup is currently showing or not.
                 */
                abstract isShowing(): boolean;
                /**
                 * Sets the local storage settings.
                 */
                abstract setStorageSettings(settings: UiProvider.PopupProvider.StorageSettings): void;
                /**
                 * Resets the size and position of the Popup and clears that data from localStorage.
                 */
                abstract resetBounds(): void;
                /**
                 * Sets if the close button should be used or not.
                 * @param closeButton
                 */
                abstract setCloseButton(closeButton: boolean): void;
                /**
                 * Sets what action to take to answer the prompt when the close button is clicked.
                 * @param action The action to take to answer the prompt, or null if the prompt should not be answered
                 * in that case.
                 */
                setCloseButtonAction?(action: UiProvider.PopupProvider.PromptAction<string> | null): void;
                /**
                 * Display the popup just above the given reference element.
                 * @param reference The popup will be as close as possible in the TopMostLayer stack to this element.
                 * @param conflictResolution If there are multiple elements that want to be just above the reference, you can
                 * specify in which direction conflicts should be resolved. Defaults to Up.
                 */
                setJustAbove?(reference: Element, conflictResolution?: TopMostLayer.ConflictResolution): void;
                /**
                 * Reset the justAbove handling.
                 * @param reference Pass null to reset the justAbove handling.
                 */
                setJustAbove?(reference: null): void;
                /**
                 * Returns whether the popup is currently being interacted with by mouse, touch or keyboard.
                 */
                hasActiveUserInteraction?(): boolean;
                /**
                 * Gets the root element of the popup.
                 */
                getElement?(): HTMLElement;
            }
            namespace Popup {
                interface LocalizableTexts {
                    headerText: Localizable;
                    buttons: Dictionary<{
                        text?: Localizable;
                        tooltip?: Localizable;
                    }>;
                }
            }
            /**
             * A generic MessageBox
             * @template T A popup prompt() will result with this value type
             */
            abstract class MessageBox<T = any> extends Popup<T> {
                /**
                 * Handles callbacks to get called when a button is pressed
                 */
                onButtonPressed?: {
                    add: (callback: (name: string, value: T) => void) => DestroyFunction;
                    remove: (callback: (name: string, value: T) => void) => void;
                };
                /**
                 * Base constructor
                 */
                constructor();
                /**
                 * Aborts a prompted popup and rejects the promise.
                 * @param action The action to perform to answer the prompt.
                 */
                abstract abort(action?: UiProvider.PopupProvider.MessageBox.PromptAction<T>): void;
                /**
                 * Sets texts which can either be localizable or static.
                 */
                abstract setTexts(texts: Partial<MessageBox.LocalizableTexts>): void;
                /**
                 * Sets the background action.
                 * @param action
                 */
                abstract setBackgroundAction(action: UiProvider.PopupProvider.MessageBox.BackgroundAction<T>): void;
                /**
                 * Sets what action to take to answer the prompt when the close button is clicked.
                 * @param action The action to take to answer the prompt, or null if the prompt should not be answered
                 * in that case.
                 */
                setCloseButtonAction?(action: UiProvider.PopupProvider.MessageBox.PromptAction<T> | null): void;
            }
            namespace MessageBox {
                interface LocalizableTexts extends Popup.LocalizableTexts {
                    contentText: Localizable;
                }
                type BackgroundAction<R = any> = PopupProvider.BackgroundAction<string> | {
                    close: true;
                    result: R;
                };
                type PromptAction<R = any> = UiProvider.PopupProvider.PromptAction<string> | {
                    result: R;
                };
            }
            /**
             * A generic HtmlElementBox
             * @template T A popup prompt() will result with this value type
             */
            abstract class HtmlElementBox<T = any> extends Popup<T> {
                /**
                 * Handles callbacks to get called when a button is pressed
                 */
                onButtonPressed?: {
                    add: (callback: (name: string, value: T) => void) => DestroyFunction;
                    remove: (callback: (name: string, value: T) => void) => void;
                };
                /**
                 * Base constructor
                 */
                constructor();
                /**
                 * Aborts a prompted popup and rejects the promise.
                 * @param action The action to perform to answer the prompt.
                 */
                abstract abort(action?: UiProvider.PopupProvider.HtmlElementBox.PromptAction<T>): void;
                /**
                 * Sets the background action.
                 * @param action
                 */
                abstract setBackgroundAction(action: UiProvider.PopupProvider.HtmlElementBox.BackgroundAction<T>): void;
                /**
                 * Sets what action to take to answer the prompt when the close button is clicked.
                 * @param action The action to take to answer the prompt, or null if the prompt should not be answered
                 * in that case.
                 */
                setCloseButtonAction?(action: UiProvider.PopupProvider.HtmlElementBox.PromptAction<T> | null): void;
                /**
                 * Sets the content.
                 * @param element
                 */
                abstract setContentElement(element: HTMLElement): void;
            }
            namespace HtmlElementBox {
                type BackgroundAction<R = any> = PopupProvider.BackgroundAction<string> | {
                    close: true;
                    result: R;
                };
                type PromptAction<R = any> = UiProvider.PopupProvider.PromptAction<string> | {
                    result: R;
                };
            }
            /**
             * A generic Inputprompt
             */
            abstract class InputPrompt extends Popup<{
                isOk: true;
                value: string;
            } | {
                isOk: false;
            }> {
                /**
                 * Base constructor
                 */
                constructor();
                /**
                 * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
                 */
                abstract prompt(forbiddenValues?: Iterable<string> | null, defaultValue?: string): Promise<{
                    isOk: true;
                    value: string;
                } | {
                    isOk: false;
                }>;
                /**
                 * Aborts a prompted popup and rejects the promise.
                 * @param action The action to perform to answer the prompt.
                 */
                abstract abort(action?: PopupProvider.InputPrompt.PromptAction): void;
                /**
                 * Sets the background action.
                 * @param action
                 */
                abstract setBackgroundAction(action: PopupProvider.InputPrompt.BackgroundAction): void;
                /**
                 * Sets what action to take to answer the prompt when the close button is clicked.
                 * @param action The action to take to answer the prompt, or null if the prompt should not be answered
                 * in that case.
                 */
                setCloseButtonAction?(action: PopupProvider.InputPrompt.PromptAction | null): void;
                /**
                 * Sets texts which can either be localizable or static.
                 */
                abstract setTexts(texts: Partial<InputPrompt.LocalizableTexts>): void;
            }
            namespace InputPrompt {
                interface LocalizableTexts extends Popup.LocalizableTexts {
                    labelText: Localizable;
                    headerText: Localizable;
                }
                type BackgroundAction = PopupProvider.BackgroundAction<'ok' | 'cancel'>;
                type PromptAction = PopupProvider.PromptAction<'ok' | 'cancel'>;
            }
            /**
             * InteractiveWritePrompt
             */
            abstract class InteractiveWritePrompt extends Popup<{
                isOk: true;
                value: InteractiveWritePrompt.Value;
            } | {
                isOk: false;
                value?: InteractiveWritePrompt.Value;
            }> {
                /**
                 * Base constructor
                 */
                constructor();
                /**
                 * Shows the popup and waits for the user to answer the prompt. A Promise is returned that will be resolved with the value the user provides.
                 */
                abstract prompt(): Promise<{
                    isOk: true;
                    value: InteractiveWritePrompt.Value;
                } | {
                    isOk: false;
                    value?: InteractiveWritePrompt.Value;
                }>;
                /**
                 * Aborts a prompted popup and rejects the promise.
                 * @param action The action to perform to answer the prompt.
                 */
                abstract abort(action?: PopupProvider.InteractiveWritePrompt.PromptAction): void;
                /**
                 * Sets the background action.
                 * @param action
                 */
                abstract setBackgroundAction(action: PopupProvider.InteractiveWritePrompt.BackgroundAction): void;
                /**
                 * Sets what action to take to answer the prompt when the close button is clicked.
                 * @param action The action to take to answer the prompt, or null if the prompt should not be answered
                 * in that case.
                 */
                setCloseButtonAction?(action: PopupProvider.InteractiveWritePrompt.PromptAction | null): void;
            }
            namespace InteractiveWritePrompt {
                interface Symbol {
                    name: string;
                    writeValue: any;
                    comment?: string;
                    metaData: SymbolMetaData;
                }
                interface AuthOptions {
                    usernameSelection?: 'Combobox' | 'Input';
                    usernameSelected?: string;
                }
                interface Options {
                    requestOptions?: TcHmi.Server.IRequestOptions | null;
                    authOptions?: AuthOptions | null;
                }
                interface Value {
                    result?: TcHmi.Server.IValueResultObject;
                }
                interface SymbolMetaData {
                    reauthenticationRequired?: boolean;
                    auditTrail?: {
                        enabled?: boolean;
                        commentRequired?: boolean;
                    };
                }
                type BackgroundAction = PopupProvider.BackgroundAction<'ok' | 'cancel'>;
                type PromptAction = PopupProvider.PromptAction<'ok' | 'cancel'>;
            }
        }
        interface TypeProviderMap {
            keyboard: KeyboardProvider;
            popup: PopupProvider;
        }
    }
}
declare namespace TcHmi {
    /**
     * Allows converting of values from any type to any type if types are compatible.
     * @preserve (Part of the public API)
     */
    class ValueConverter {
        static AngleUnitList: {
            readonly deg: "deg";
            readonly rad: "rad";
            readonly turn: "turn";
            readonly grad: "grad";
        };
        static BorderStyleValueList: {
            readonly Solid: "Solid";
            readonly Dashed: "Dashed";
            readonly Dotted: "Dotted";
            readonly None: "None";
        };
        static DimensionUnitList: {
            readonly px: "px";
            readonly '%': "%";
        };
        static FontSizeUnitList: {
            readonly px: "px";
            readonly '%': "%";
            readonly em: "em";
            readonly rem: "rem";
        };
        static FontStyleList: {
            readonly Normal: "Normal";
            readonly Italic: "Italic";
            readonly Oblique: "Oblique";
            readonly Auto: "Auto";
        };
        static FontWeightList: {
            readonly Normal: "Normal";
            readonly Bold: "Bold";
            readonly Auto: "Auto";
        };
        static HorizontalAlignmentList: {
            readonly Left: "Left";
            readonly Center: "Center";
            readonly Right: "Right";
        };
        static ScaleModeStringList: {
            readonly None: "None";
            readonly ScaleToFill: "ScaleToFill";
            readonly ScaleToFit: "ScaleToFit";
            readonly ScaleToFitWidth: "ScaleToFitWidth";
            readonly ScaleToFitHeight: "ScaleToFitHeight";
        };
        static SizeModeList: {
            readonly Value: "Value";
            readonly Parent: "Parent";
        };
        static SizeModeWithContentList: {
            readonly Value: "Value";
            readonly Parent: "Parent";
            readonly Content: "Content";
        };
        static ToggleStateList: {
            readonly Normal: "Normal";
            readonly Active: "Active";
        };
        static VerticalAlignmentList: {
            readonly Top: "Top";
            readonly Center: "Center";
            readonly Bottom: "Bottom";
        };
        static VisibilityList: {
            readonly Visible: "Visible";
            readonly Hidden: "Hidden";
            readonly Collapsed: "Collapsed";
        };
        /**
         * Converts a value to {Object/Array} and returns the {Object/Array} or null if the type of value is not compatible to {Object/Array}.
         * No content check will be done!
         * @param value The value to convert.
         * @template T Type of the resulting object.
         * @preserve (Part of the public API)
         */
        static toObject<T extends object | undefined | null>(value: any): T | null;
        /**
         * Converts a value to {Object/Array} and returns the {Object/Array} or null if the type of value is not compatible to {Object/Array}.
         * No content check will be done!
         * @param value The value to convert.
         * @param defaultValue The fallback value
         * @template T Type of the resulting object.
         * @preserve (Part of the public API)
         */
        static toObject<T extends object | undefined | null>(value: any, defaultValue: T): T;
        /**
         * Converts a value to {Object/Array} and returns the {Object/Array} or null if the type of value is not compatible to {Object/Array}. Returns a result object for error detection.
         * No content check will be done!
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @template T Type of the resulting object.
         * @preserve (Part of the public API)
         */
        static toObjectEx<T extends object | undefined | null>(value: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: T | null;
        }): ValueConverter.IResultObject<T | null>;
        /** Returns a string representation of a function. */
        static toString(): ReturnType<typeof Object.toString>;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @template T Literal types (aka a specific string) for the resulting string.
         * @preserve (Part of the public API)
         */
        static toString<T extends string = string>(value: T): T | null;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @template T Literal types (aka a specific string) for the resulting string.
         * @preserve (Part of the public API)
         */
        static toString<T extends string | null | undefined = string>(value: any | null | undefined): NonNullable<T> | null;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toString(value: any): string | null;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to string (null if not given)
         * @template T Literal types (aka a specific string) for the resulting string.
         * @preserve (Part of the public API)
         */
        static toString<T extends string = string>(value: T, defaultValue: string | null): T | null;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to string (null if not given)
         * @template T Literal types (aka a specific string) for the resulting string.
         * @preserve (Part of the public API)
         */
        static toString<T extends string | null | undefined = string>(value: any | null | undefined, defaultValue: string | null): NonNullable<T> | null;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to string (null if not given)
         * @preserve (Part of the public API)
         */
        static toString(value: any, defaultValue: string | null): string | null;
        /**
         * Converts a value to {string} and returns the {string} or null if the type of value is not compatible to {string}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toStringEx(value?: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: string | null;
        }): ValueConverter.IResultObject<string | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toDimensionUnit(value: DimensionUnit | null): DimensionUnit | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toDimensionUnit(value: DimensionUnit | null, defaultValue: DimensionUnit): DimensionUnit;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toDimensionUnitEx(value: DimensionUnit | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: DimensionUnit | null;
        }): ValueConverter.IResultObject<DimensionUnit | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toAngleUnit(value: AngleUnit | null): AngleUnit | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toAngleUnit(value: AngleUnit | null, defaultValue: AngleUnit): AngleUnit;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toAngleUnitEx(value: AngleUnit | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: AngleUnit | null;
        }): ValueConverter.IResultObject<AngleUnit | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toBorderStyleValue(value: BorderStyleValue | null): BorderStyleValue | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toBorderStyleValue(value: BorderStyleValue | null, defaultValue: BorderStyleValue): BorderStyleValue;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toBorderStyleValueEx(value: BorderStyleValue | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: BorderStyleValue | null;
        }): ValueConverter.IResultObject<BorderStyleValue | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toFontStyle(value: FontStyle | null): FontStyle | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontStyle(value: FontStyle | null, defaultValue: FontStyle): FontStyle;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontStyleEx(value: FontStyle | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: FontStyle | null;
        }): ValueConverter.IResultObject<FontStyle | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toFontSizeUnit(value: FontSizeUnit | null): FontSizeUnit | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontSizeUnit(value: FontSizeUnit | null, defaultValue: FontSizeUnit): FontSizeUnit;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontSizeUnitEx(value: FontSizeUnit | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: FontSizeUnit | null;
        }): ValueConverter.IResultObject<FontSizeUnit | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toFontWeight(value: FontWeight | null): FontWeight | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontWeight(value: FontWeight | null, defaultValue: FontWeight): FontWeight;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontWeightEx(value: FontWeight | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: FontWeight | null;
        }): ValueConverter.IResultObject<FontWeight | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toHorizontalAlignment(value: HorizontalAlignment | null): HorizontalAlignment | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toHorizontalAlignment(value: HorizontalAlignment | null, defaultValue: HorizontalAlignment): HorizontalAlignment;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toHorizontalAlignmentEx(value: HorizontalAlignment | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: HorizontalAlignment | null;
        }): ValueConverter.IResultObject<HorizontalAlignment | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toScaleModeString(value: ScaleModeString | null): ScaleModeString | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toScaleModeString(value: ScaleModeString | null, defaultValue: ScaleModeString): ScaleModeString;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toScaleModeStringEx(value: ScaleModeString | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: ScaleModeString | null;
        }): ValueConverter.IResultObject<ScaleModeString | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toSizeMode(value: SizeMode | null): SizeMode | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toSizeMode(value: SizeMode | null, defaultValue: SizeMode): SizeMode;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toSizeModeEx(value: SizeMode | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: SizeMode | null;
        }): ValueConverter.IResultObject<SizeMode | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toSizeModeWithContent(value: SizeModeWithContent | null): SizeModeWithContent | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toSizeModeWithContent(value: SizeModeWithContent | null, defaultValue: SizeModeWithContent): SizeModeWithContent;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toSizeModeWithContentEx(value: SizeModeWithContent | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: SizeModeWithContent | null;
        }): ValueConverter.IResultObject<SizeModeWithContent | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toVerticalAlignment(value: VerticalAlignment | null): VerticalAlignment | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toVerticalAlignment(value: VerticalAlignment | null, defaultValue: VerticalAlignment): VerticalAlignment;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toVerticalAlignmentEx(value: VerticalAlignment | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: VerticalAlignment | null;
        }): ValueConverter.IResultObject<VerticalAlignment | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toVisibility(value: Visibility | null): Visibility | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toVisibility(value: Visibility | null, defaultValue: Visibility): Visibility;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toVisibilityEx(value: Visibility | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: Visibility | null;
        }): ValueConverter.IResultObject<Visibility | null>;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toToggleState(value: ToggleState | null): ToggleState | null;
        /**
         * Converts a value to enum value and returns the string or the given default value if the type of value is not compatible to the enum.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toToggleState(value: ToggleState | null, defaultValue: ToggleState): ToggleState;
        /**
         * Converts a value to enum value and returns the string or null if the type of value is not compatible to the enum. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toToggleStateEx(value: ToggleState | null, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: ToggleState | null;
        }): ValueConverter.IResultObject<ToggleState | null>;
        /**
         * Converts a value to fontFamily value and returns the string or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toFontFamily(value: FontFamily | null | undefined): FontFamily | null;
        /**
         * Converts a value to fontFamily value and returns the string or null if the type of value is not compatible to {string}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontFamily(value: FontFamily | null | undefined, defaultValue: FontFamily): FontFamily;
        /**
         * Converts a value to fontFamily value and returns the string or null if the type of value is not compatible to {string}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toFontFamilyEx(value: FontFamily | null | undefined, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: FontFamily | null;
        }): ValueConverter.IResultObject<FontFamily | null>;
        /**
         * Converts a value to {number}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toNumber(value: any): number | null;
        /**
         * Converts a value to {number}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to number (null if not given)
         * @preserve (Part of the public API)
         */
        static toNumber(value: any, defaultValue: number): number;
        /**
         * Converts a value to {number}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toNumberEx(value: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: number | null;
        }): ValueConverter.IResultObject<number | null>;
        /**
         * Converts a value to {boolean} and returns the {boolean} or null if the type of value is not compatible to {boolean}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toBoolean(value: any): boolean | null;
        /**
         * Converts a value to {boolean} and returns the {boolean} or null if the type of value is not compatible to {boolean}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to boolean (null if not given)
         * @preserve (Part of the public API)
         */
        static toBoolean(value: any, defaultValue: boolean): boolean;
        /**
         * Converts a value to {boolean} and returns the {boolean} or null if the type of value is not compatible to {boolean}.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toBooleanEx(value: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: boolean | null;
        }): ValueConverter.IResultObject<boolean | null>;
        /**
         * Converts a value to {BigInt} and returns the {BigInt} or null if the type of value is not compatible to {BigInt}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toBigInt(value: any): bigint | null;
        /**
         * Converts a value to {BigInt} and returns the {BigInt} or null if the type of value is not compatible to {BigInt}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to boolean (null if not given)
         * @preserve (Part of the public API)
         */
        static toBigInt(value: any, defaultValue: bigint): bigint;
        /**
         * Converts a value to {BigInt} and returns the 64 bit {BigInt} or null if the type of value is not compatible to {BigInt}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toBigIntEx(value: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: bigint | null;
        }): ValueConverter.IResultObject<bigint | null>;
        /**
         * Converts a value to 64 bit {BigInt} (clamping the BigInt value to 64 bits) and returns the 64 bit {BigInt} or null if the type of value is not compatible to 64 bit {BigInt}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toBigInt64(value: any): bigint | null;
        /**
         * Converts a value to 64 bit {BigInt} (clamping the BigInt value to 64 bits) and returns the 64 bit {BigInt} or null if the type of value is not compatible to 64 bit {BigInt}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to boolean (null if not given)
         * @preserve (Part of the public API)
         */
        static toBigInt64(value: any, defaultValue: bigint): bigint;
        /**
         * Converts a value to 64 bit {BigInt} (clamping the BigInt value to 64 bits) and returns the 64 bit {BigInt} or null if the type of value is not compatible to 64 bit {BigInt}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toBigInt64Ex(value: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: bigint | null;
        }): ValueConverter.IResultObject<bigint | null>;
        /**
         * Converts a value to unsigned 64 bit {BigInt} (clamping the BigInt value to 64 bits) and returns the 64 bit {BigInt} or null if the type of value is not compatible to 64 bit {BigInt}.
         * @param value The value to convert.
         * @preserve (Part of the public API)
         */
        static toUnsignedBigInt64(value: any): bigint | null;
        /**
         * Converts a value to unsigned 64 bit {BigInt} (clamping the BigInt value to 64 bits) and returns the 64 bit {BigInt} or null if the type of value is not compatible to 64 bit {BigInt}.
         * @param value The value to convert.
         * @param defaultValue Value which should be returned if value is not compatible to boolean (null if not given)
         * @preserve (Part of the public API)
         */
        static toUnsignedBigInt64(value: any, defaultValue: bigint): bigint;
        /**
         * Converts a value to unsigned 64 bit {BigInt} (clamping the BigInt value to 64 bits) and returns the 64 bit {BigInt} or null if the type of value is not compatible to 64 bit {BigInt}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toUnsignedBigInt64Ex(value: any, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: bigint | null;
        }): ValueConverter.IResultObject<bigint | null>;
        /**
         * Converts a value to its enum value (reduced allowed value set) and
         * returns the corresponding number (numeric enums) or string (string enums or js objects)
         * or null if the type of value is not compatible to the enum.
         * This overload is: string input for Typescript string enum or js object "enum"
         * @param value The value to convert.
         * @param enumType Typescript string enum object or js object "enum"
         * @preserve (Part of the public API)
         */
        static toEnum<T extends Record<string, string>>(value: undefined | null | string, enumType: T): keyof T | null;
        /**
         * Converts a value to its enum value (reduced allowed value set) and
         * returns the corresponding number (numeric enums) or string (string enums or js objects)
         * or null if the type of value is not compatible to the enum.
         * This overload is: number or string input for Typescript number enum
         * @param value The value to convert.
         * @param enumType Typescript number enum object
         * @preserve (Part of the public API)
         */
        static toEnum<T extends Record<string, number | string>>(value: undefined | null | number | string, enumType: T): T[keyof T] | null;
        /**
         * Converts a value to its enum value (reduced allowed value set) and
         * returns the corresponding number (numeric enums) or string (string enums or js objects)
         * or the given default value if the type of value is not compatible to the enum.
         * This overload is: string input for Typescript string enum or js object "enum" with given defaults
         * @param value The value to convert.
         * @param enumType Typescript number enum object
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toEnum<T extends Record<string, string>, D>(value: undefined | null | string, enumType: T, defaultValue: D): keyof T;
        /**
         * Converts a value to its enum value (reduced allowed value set) and
         * returns the corresponding number (numeric enums) or string (string enums or js objects)
         * or the given default value if the type of value is not compatible to the enum.
         * This overload is: number or string input for Typescript number enum with given defaults
         * @param value The value to convert.
         * @param enumType Typescript number enum object
         * @param defaultValue Value which should be returned if value is not compatible with the enum (null if not given)
         * @preserve (Part of the public API)
         */
        static toEnum<T extends Record<string, number | string>, D>(value: undefined | null | number | string, enumType: T, defaultValue: D): T[keyof T];
        /**
         * Converts a value to enum {number} and returns the enum {number} or null if the type of value is not compatible to enum {Object}. Returns a result object for error detection.
         * @param value The value to convert.
         * @param enumType Enum value to convert to
         * @param options options. For exmaple the default value
         * @param options.defaultValue The fallback value (null if not given)
         * @preserve (Part of the public API)
         */
        static toEnumEx<T extends Dictionary<any> = any>(value: any, enumType: T, options?: {
            /** The fallback value (null if not given) */
            defaultValue?: any | null;
        }): ValueConverter.IResultObject<keyof T | null>;
        /**
         * Converts a value to the best effort value related to schema addressed by its name or null if no schema related type is matching or schema is unknown.
         * @param value The value to convert.
         * @param typeName TcHmi type name
         * @param options options. For exmaple the conversion direction
         * @param options.convertDirection Direction of conversion.
         * @preserve (Part of the public API)
         */
        static toType(value: any, typeName: string, options?: {
            readonly convertDirection?: ValueConverter.ConvertDirection;
        }): any | null;
        /**
         * Converts a value to the best effort value related to schema addressed by its name or null if no schema related type is matching or schema is unknown. Returns a result object for error detection.
         * @param value The value to convert.
         * @param typeName TcHmi type name
         * @param options options. For exmaple the conversion direction
         * @param options.convertDirection Direction of conversion.
         * @preserve (Part of the public API)
         */
        static toTypeEx<T>(value: any, typeName: string, options?: {
            readonly convertDirection?: ValueConverter.ConvertDirection;
        }): ValueConverter.IResultObject<T | null>;
        /**
         * Converts a value to the best effort value related to schema or null if no schema related type is matching.
         * @param value The value to convert.
         * @param schema json schema as an object
         * @param options options. For exmaple the conversion direction
         * @param options.convertDirection Direction of conversion.
         * @param options.resolveFunctionWriteValue A schema which describes a function on the server will describe the type of return value on root level. Set this option to true to resolve the writeValue schema instead.
         * @preserve (Part of the public API)
         */
        static toSchemaType(value: any, schema: TcHmi.JsonSchema | null | undefined, options?: {
            /** Direction of conversion. */
            readonly convertDirection?: ValueConverter.ConvertDirection;
            /** A schema which describes a function on the server will describe the type of return value on root level. Set this option to true to resolve the writeValue schema instead. */
            readonly resolveFunctionWriteValue?: boolean;
        }): any | null;
        /**
         * Converts a value to the best effort value related to schema or null if no schema related type is matching. Returns a result object for error detection.
         * @param value The value to convert.
         * @param schema json schema as an object
         * @param options options. For exmaple the conversion direction
         * @param options.convertDirection Direction of conversion.
         * @param options.resolveFunctionWriteValue A schema which describes a function on the server will describe the type of return value on root level. Set this option to true to resolve the writeValue schema instead.
         * @preserve (Part of the public API)
         */
        static toSchemaTypeEx(value: any, schema: TcHmi.JsonSchema | null | undefined, options?: {
            /** Direction of conversion. */
            readonly convertDirection?: ValueConverter.ConvertDirection;
            /** A schema which describes a function on the server will describe the type of return value on root level. Set this option to true to resolve the writeValue schema instead. */
            readonly resolveFunctionWriteValue?: boolean;
        }): ValueConverter.IResultObject;
    }
    namespace ValueConverter {
        interface IResultObject<T extends any = any> extends TcHmi.IResultObject {
            value: T | null;
        }
        enum ConvertDirection {
            Forward = 0,
            Backward = 1
        }
    }
}
declare namespace TcHmi {
    /**
     * Provides functions to set partials as view.
     * @preserve (Part of the public API)
     */
    class View {
        /**
         * Loads a view partial into the dom.
         * @param url URL of the view file to load
         * @param callback Callback will be called on success or failure
         * @preserve (Part of the public API)
         */
        static load(url: string, callback?: null | ((data: TcHmi.IResultObject) => void)): void;
        /**
         * Returns the current view object.
         * @preserve (Part of the public API)
         */
        static get(): TcHmi.Controls.System.baseTcHmiControl | null;
        /**
         * Sets the view scale mode.
         * @param scaleMode new value
         * @preserve (Part of the public API)
         */
        static setScaleMode(scaleMode: ScaleModeString): void;
        /**
         * Adds a viewport element such as header or footer or over main.
         * Every header or footer gets its own space.
         * Elements targeting 'main' will get covering each other.
         * @param element The viewport element that should be added.
         * @param options optional stuff
         * @param options.name Optional friendly name.
         * @param options.area Target area for the element.
         */
        static addViewportElement(element: HTMLElement, options: {
            /** Optional friendly name. */
            name?: string;
            /** Target area for the element. */
            area: 'header' | 'main' | 'footer';
        }): IErrorDetails;
        /**
         * Removes a viewport element such as the header or footer.
         * @param element The viewport element that should be removed.
         */
        static removeViewportElement(element: HTMLElement): IErrorDetails;
        /**
         * Returns a DOMRect object providing information about the size of an
         * hmi viewport area (or main area) and its position relative to the viewport.
         * @param area Target area to query.
         */
        static getViewportElementDimension(area?: 'header' | 'main' | 'footer'): DOMRect | null;
    }
}
declare namespace TcHmi {
    /**
     * Provides functionality to control global intervals.
     */
    class Interval {
        /**
         * Starts a globally configured interval.
         * @param name The name of the interval to start.
         */
        static start(name: string): void;
        /**
         * Stops a globally configured interval.
         * @param name The name of the interval to stop.
         */
        static stop(name: string): void;
    }
}
/** Unique ID of this HMI Instance */
declare var TCHMI_DYNAMIC_INSTANCE_ID: string;
/** The timestamp in milliseconds based on JavaScript Date object when TcHmiFramework.js file was initialy handled by the JavaScript interpreter. */
declare var TCHMI_DEBUG_TIME_LOAD_LIBRARY: number;
/**
 * Engineering instance. Designer instance or LiveView instance.
 **/
declare var TCHMI_ENGINEERING: boolean;
/**
 * Engineering instance. Designer instance.
 **/
declare var TCHMI_DESIGNER: boolean;
/**
 * Engineering instance. LiveView instance.
 **/
declare var TCHMI_LIVEVIEW: boolean;
/**
 * Runtime
 **/
declare var TCHMI_RUNTIME: boolean;
/**
 * Only one control should be shown
 */
declare var TCHMI_SINGLECONTROL: boolean;
/**
 * Websocket used for communication with engineering.
 * If unset we have a VS newer then 2025-05 which communicates via server events.
 **/
declare var TCHMI_ENGINEERING_WEBSOCKET: string | undefined;
/**
 * Defines which partial is opened in a designer instance.
 **/
declare var TCHMI_TARGET_PARTIAL: string;
/**
 * Config override used in engineering instances.
 * */
declare var TCHMI_CONFIG_OVERRIDE: TcHmi.System.IConfigOverride | null | undefined;
/**
 * DEPRECATED
 * Replaced by: TCHMI_ENGINEERING
 * @deprecated Please use TCHMI_ENGINEERING
 **/
declare var TCHMI_ENABLE_DESIGNER_MODE: boolean;
/**
 * DEPRECATED
 * Replaced by: TCHMI_DESIGNER
 * @deprecated Please use TCHMI_DESIGNER
 **/
declare var TCHMI_ENABLE_DESIGNER_MODE_MASTER: boolean;
/**
 * DEPRECATED
 * Replaced by: TCHMI_LIVEVIEW
 * @deprecated Please use TCHMI_LIVEVIEW
 **/
declare var TCHMI_ENABLE_DESIGNER_MODE_SLAVE: boolean;
/**
 * DEPRECATED
 * Replaced by: TCHMI_CONFIG_OVERRIDE
 * @deprecated Please use TCHMI_CONFIG_OVERRIDE
 **/
declare var TCHMI_ENABLE_DESIGNER_MODE_FALLBACK_CONFIG_JSON: TcHmi.System.IConfigOverride | null | undefined;
/**
 * DEPRECATED
 * Replaced by: TCHMI_TARGET_PARTIAL
 * @deprecated Please use TCHMI_TARGET_PARTIAL
 **/
declare var TCHMI_ENABLE_DESIGNER_MODE_TARGET_PARTIAL: string;
/**
 * DEPRECATED
 * Replaced by: TCHMI_PERSISTENT_LOG_LEVEL
 * @deprecated Please use TCHMI_PERSISTENT_LOG_LEVEL
 **/
declare var TCHMI_CONSOLE_LOG_PERSISTENT: boolean;
/**
 * DEPRECATED
 * Replaced by: TCHMI_PERSISTENT_LOG_MAX_ENTRIES
 * @deprecated Please use TCHMI_PERSISTENT_LOG_MAX_ENTRIES
 **/
declare var TCHMI_CONSOLE_LOG_PERSISTENT_MAX_ENTRIES: number;
/**
 * DEPRECATED
 * Replaced by: TCHMI_LOG_TCHMISERVER_MESSAGES
 * @deprecated Please use TCHMI_LOG_TCHMISERVER_MESSAGES
 **/
declare var TCHMI_CONSOLE_LOG_TCHMISERVER_MESSAGES: boolean;
/**
 * DEPRECATED
 * Replaced by: TCHMI_LOG_ENGINEERING_COM_MESSAGES
 * @deprecated Please use TCHMI_LOG_ENGINEERING_COM_MESSAGES
 **/
declare var TCHMI_CONSOLE_LOG_ENGINEERING_COM_MESSAGES: boolean;
/**
 * DEPRECATED
 * Replaced by: TCHMI_LOG_ENGINEERING_COM_MESSAGES
 * @deprecated Please use TCHMI_LOG_ENGINEERING_COM_MESSAGES
 **/
declare var TCHMI_CONSOLE_LOG_DESIGNER_MODE_COM_MESSAGES: boolean;
/**
 * 0: None
 * 1: Error
 * 2: Warning
 * 3: Info
 * 4: Debug
 */
declare var TCHMI_CONSOLE_LOG_LEVEL: TcHmi.LOG_LEVEL;
/**
 * 0: None
 * 1: Error
 * 2: Warning
 * 3: Info
 * 4: Debug
 */
declare var TCHMI_PERSISTENT_LOG_LEVEL: TcHmi.LOG_LEVEL;
/** Max entries created in IndexedDB. */
declare var TCHMI_PERSISTENT_LOG_MAX_ENTRIES: number;
/** Defines the interval after which log entries are written from memory to the database. */
declare var TCHMI_PERSISTENT_LOG_CACHE_INTERVAL: number;
/** Activate Trace Log of Communication Messages between Framework and Server */
declare var TCHMI_LOG_TCHMISERVER_MESSAGES: boolean;
/** Activate Trace Log of Communication Messages between Framework and Creator */
declare var TCHMI_LOG_ENGINEERING_COM_MESSAGES: boolean;
declare var TCHMI_NUGET_METADATA: TcHmi.Dictionary<TcHmi.Config.NugetPackageMetadata>;
/** Does we run inside a unit test? */
declare var TCHMI_UNITTEST_MODE: boolean;
/**
 * Browsers without addEventListener option object api are not supported anymore in TcHmi.
 * Check can be removed because it is always true now.
 * @deprecated Can be removed because it is always true now.
 */
declare var TCHMI_EVENT_OPTION_OBJECT_SUPPORTED: boolean;
declare var TCHMI_SERVER_STATE_WATCH_INTERVAL: number;
declare var TCHMI_DIAGNOSTICS_SERVER: boolean;
declare var TCHMI_DIAGNOSTICS_SERVER_REQUEST_HISTORY_MAX_BUFFER: number;
declare var TCHMI_DIAGNOSTICS_SERVER_REQUEST_RESPONSE_HISTORY_MAX_BUFFER: number;
declare var TCHMI_DIAGNOSTICS_SERVER_REQUEST_RESPONSE_HISTORY_MESSAGES: boolean;
/**
 * Used to override the value of static defined flags dynamically.
 * Data is read from localStorage at runtime.
 * Can be controlled from Client tab on the server config page.
 */
declare var TCHMI_FLAG_OVERRIDES: {
    TCHMI_CONSOLE_LOG_LEVEL?: number;
    TCHMI_PERSISTENT_LOG_LEVEL?: number;
    TCHMI_PERSISTENT_LOG_MAX_ENTRIES?: number;
    TCHMI_PERSISTENT_LOG_CACHE_INTERVAL?: number;
    TCHMI_PERSISTENT_LOG_MAX_SERVER_ENTRIES?: boolean;
    TCHMI_LOG_TCHMISERVER_MESSAGES?: boolean;
    /**
     * DEPRECATED
     * Replaced by: TCHMI_PERSISTENT_LOG_LEVEL
     * @deprecated Please use TCHMI_PERSISTENT_LOG_LEVEL
     **/
    TCHMI_CONSOLE_LOG_PERSISTENT?: boolean;
    /**
     * DEPRECATED
     * Replaced by: TCHMI_PERSISTENT_LOG_MAX_ENTRIES
     * @deprecated Please use TCHMI_PERSISTENT_LOG_MAX_ENTRIES
     **/
    TCHMI_CONSOLE_LOG_PERSISTENT_MAX_ENTRIES?: number;
    /**
     * DEPRECATED
     * Replaced by: TCHMI_LOG_TCHMISERVER_MESSAGES
     * @deprecated Please use TCHMI_LOG_TCHMISERVER_MESSAGES
     **/
    TCHMI_CONSOLE_LOG_TCHMISERVER_MESSAGES?: boolean;
} | null | undefined;
/**
 * Converts string "\t"/"\n" (symbol world) to tab/newline (HTML world).
 * This supports escaping with "\\n"
 *
 * @param text The text to escape
 * @returns The decoded representation of parameter text.
 * @preserve (Part of the public API)
 */
declare function tchmi_decode_control_characters(text: string | null | undefined): string;
/**
 * Converts string "\t"/"\n" (symbol world) to tab/newline (HTML world).
 * This supports escaping with "\\n"
 *
 * Some controls converted newline to space in all released tchmi versions.
 * So this helper can do this with the options.newlineToSpace, but
 * do not use that parameter for new controls.
 *
 * You also probably do not need options.preserveBackslash for controls.
 *
 * @param text The text to escape
 * @param options options
 * @param options.newlineToSpace Convert Newline to space
 * @param options.preserveBackslash Preserve an escaped backslash
 * @returns The decoded representation of parameter text.
 * @preserve (Part of the public API)
 */
declare function tchmi_decode_control_characters(text: string | null | undefined, options?: {
    newlineToSpace?: boolean;
    preserveBackslash?: boolean;
}): string;
/**
 * Converts tab/newline (HTML world) to string "\t"/"\n" (symbol world).
 * This supports escaping with "\\t"
 *
 * @param text The text to encode
 * @returns The encoded representation of parameter text.
 * @preserve (Part of the public API)
 */
declare function tchmi_encode_control_characters(text: string | null | undefined): string;
/**
 * Encodes HTML
 * @param html The html to encode
 * @returns The encoded representation of parameter html.
 * @preserve (Part of the public API)
 */
declare function tchmi_encode_html(html: string): string;
/**
 * Decodes HTML
 * @param text The text to decode
 * @returns The decoded representation of parameter text.
 * "&#176;!\"&#167;$%&/()=?~#|&#233;&#232;€…™&#174;&#169;"
 * "°     !\"§     $%&/()=?~#|é     è     €…™®     ©"
 * @preserve (Part of the public API)
 */
declare function tchmi_decode_html(text: string): string;
/**
 * Encodes parts of uris including most reserved characters but will not encode '/' in path or '?', '&' and '=' in search parameters for example.
 * Only path will be encoded by default. Encoding of serch parameter values or hash can be activated optionally.
 * @param uri Uri
 * @param options Options
 * @param options.encodePath Is true by default. When true the path (except '/') will be encoded.
 * @param options.encodeSearchParams Is false by default. When true search parameter values will be encoded by default.
 * @param options.encodeHash Is false by default. When true the hash value will be encoded (except first '#') by default.
 * @preserve (Part of the public API)
 */
declare function tchmi_encode_uri_components(uri: string, options?: {
    encodePath?: boolean;
    encodeSearchParams?: boolean;
    encodeHash?: boolean;
}): string;
/**
 * Converts formatted text to formatted html.
 * @param text The text which contains the formatting placeholders which shall be encoded.
 * @returns The encoded representation of parameter text.
 * @preserve (Part of the public API)
 */
declare function tchmi_text_to_html(text: string): string;
/**
 * Decode base64 strings
 * Attention: JS strings are UTF16!
 * Consider using this API for UTF8 support:
 * new TcHmi.Base64BinaryReader(input).readString()
 * @param input String to decode
 * @returns Returns the String or null
 * @preserve (Part of the public API)
 */
declare function tchmi_base64decode(input: string): string | null;
/**
 * Encode base64 strings
 * Attention: JS strings are UTF16!
 * Consider using this API for UTF8 support:
 * new TcHmi.Base64BinaryWriter().writeString(input).getEncodedString()
 * @param input String to encode
 * @returns Returns the String or null
 * @preserve (Part of the public API)
 */
declare function tchmi_base64encode(input: string): string;
/**
 * Creates a Guid string.
 * @returns Guid
 * @preserve (Part of the public API)
 */
declare function tchmi_create_guid(): string;
/**
 * Compares 2 values for equality.
 * @param a Value 1
 * @param b Value 2
 * @param typeSafeOrOptions A boolean or option object to define how the values should be compared.
 * If it is a boolean, a value of false will perform a type unsafe comparison, i.e. 1 == "1", while
 * a value of true will cause the function to only consider the values equal if their types are also equal.
 * @preserve (Part of the public API)
 */
declare function tchmi_equal(a: any, b: any, typeSafeOrOptions?: boolean | {
    /**
     * A value of true will perform a type unsafe comparison, i.e. 1 == "1", while
     * a value of false will cause the function to only consider the values equal if their types are also equal.
     * Defaults to false if not specified.
     */
    convertPrimitives?: boolean;
    /**
     * If set, will cause the function to perform deep equality checking for maps.
     * To be considered equal, maps must have the same number and order of keys and values, which must be equal.
     * Use compareMaps.deepCompareKeys and compareMaps.deepCompareValues to specify how keys and values should be compared.
     * If not set, maps will only be considered equal if they are reference equal.
     */
    compareMaps?: {
        /**
         * A value of true will perform deep equality checks for map keys.
         * Otherwise maps are only considered equal if all their keys are reference equal.
         */
        deepCompareKeys: boolean;
        /**
         * A value of true will perform deep equality checks for map values.
         * Otherwise maps are only considered equal if all their values are reference equal.
         */
        deepCompareValues: boolean;
    };
    /**
     * If set, will cause the function to perform deep equality checking for sets.
     * To be considered equal, sets must have the same number and order of values, which must be equal.
     * Use compareSets.deepCompareValues to specify how values should be compared.
     * If not set, sets will only be considered equal if they are reference equal.
     */
    compareSets?: {
        /**
         * A value of true will perform deep equality checks for set values.
         * Otherwise sets are only considered equal if all their values are reference equal.
         */
        deepCompareValues: boolean;
    };
    /**
     * A value of true will compare dates by their unix epoch time in milliseconds.
     * Otherwise dates will only be considered equal if they are reference equal.
     * Defaults to false if not specified.
     */
    compareDates?: boolean;
}): boolean;
/**
 * Checks if the given object inherits from another object by comparing its prototype to the native object and array prototypes.
 * Internal function. Should only be used by the framework core.
 * @param obj The object to check.
 */
declare const __tchmi_is_instanced_object: {
    (obj: unknown): obj is {
        new (...args: unknown[]): unknown;
        readonly prototype: unknown;
    };
    __objectPrototype?: any;
    __arrayPrototype?: any;
};
/**
 * Clones the data {Object} in param obj and returns a clone of it.
 * This function will not create clones of objects based on a prototype definition (like class instances) and function references
 * and return the original reference instead.
 * String, null, undefined are returned directly as they are immutable / handled by value.
 * @param obj The object to clone.
 * @param options Options to define what should be cloned and how it should be cloned.
 * @param options.cloneMaps If set, maps will be cloned. Otherwise maps will be returned unchanged.
 * @param options.cloneMaps.deepCloneKeys Set to true to also clone map keys. Otherwise map keys will be reference equal to the keys in the original map.
 * @param options.cloneMaps.deepCloneValues Set to true to also clone map values. Otherwise map values will be reference equal to the values in the original map.
 * @param options.cloneSets If set, sets will be cloned. Otherwise sets will be returned unchanged.
 * @param options.cloneSets.deepCloneValues Set to true to also clone set values. Otherwise set values will be reference equal to the values in the original set.
 * @param options.cloneDates If true, dates will be cloned. Otherwise dates will be returned unchanged.
 * @param options.resolveRecursiveReferences If true, the function will keep track of all objects that are cloned and thus be able to detect and properly clone recursive references.
 * @returns Clone of param obj.
 * @template T defines the type of the target object
 * @preserve (Part of the public API)
 */
declare function tchmi_clone_object<T>(obj: T, options?: {
    /**
     * If set, maps will be cloned. Otherwise maps will be returned unchanged.
     */
    cloneMaps?: {
        /**
         * Set to true to also clone map keys. Otherwise map keys will be reference equal to the keys in the original map.
         */
        deepCloneKeys: boolean;
        /**
         * Set to true to also clone map values. Otherwise map values will be reference equal to the values in the original map.
         */
        deepCloneValues: boolean;
    };
    /**
     * If set, sets will be cloned. Otherwise sets will be returned unchanged.
     */
    cloneSets?: {
        /**
         * Set to true to also clone set values. Otherwise set values will be reference equal to the values in the original set.
         */
        deepCloneValues: boolean;
    };
    /**
     * If true, dates will be cloned. Otherwise dates will be returned unchanged.
     * Defaults to false if not specified.
     */
    cloneDates?: boolean;
    /**
     * If true, the function will keep track of all objects that are cloned and thus be able to detect recursive references.
     * This enables the function to clone objects that contain themselves.
     * Defaults to false if not specified.
     */
    resolveRecursiveReferences?: boolean;
}): T;
/**
 * Compares two objects (not class instances) and returns an array of object path strings for the changed properties.
 * This array can directly be used in apis where the "dirtyPaths" argument is allowed like the onPropertyChanged control event.
 * returns null when changed properties can not be checked.
 * @param o1 First object
 * @param o2 Second object
 * @param entryPath sub path
 */
declare function tchmi_compare_object(o1: Record<string, any>, o2: Record<string, any>, entryPath?: string | null): string[] | null;
/**
 * Unify a path string.
 * Replace all backslashes with slashes, replace multiple slashes with single slashes, remove leading slash
 * @param path The path.
 * @returns Unified path.
 */
declare function tchmi_path(path: string): string;
declare function tchmi_path<T>(path: T): T;
/**
 * Converts a String to a valid CSS id pattern by escaping all reserved characters.
 * @param id The target id.
 * @returns Converted id.
 * @preserve (Part of the public API)
 */
declare function tchmi_css_escape_selector(id: string): string;
/**
 * tchmi_escape_regex
 * @param text text to escape
 * @preserve (Part of the public API)
 */
declare function tchmi_escape_regex(text: string): string;
/**
 * Format a string.
 * Placeholder syntax in format string: '{' to begin placeholder, optional parameter-index with | as seperator, description and '}' to close the placeholder.
 * Example: {0|.1f}
 * @param formatString text to format
 * @param args params for the placeholders
 */
declare function tchmi_format_string(formatString: string, ...args: any[]): string;
/**
 * Compares two version strings and returns -1 if b is newer than a, 0 if a is equal to b and 1 if b is newer than a.
 * @param a Version a
 * @param b Version b
 */
declare function tchmi_compare_version(a: string, b: string): -1 | 0 | 1;
/**
 * TwinCAT HMI API
 * Check out
 * https://infosys.beckhoff.com/content/1031/te2000_tc3_hmi_engineering/3730606987.html?id=1426887615595781518
 * for an API reference.
 * @preserve (Part of the public API)
 */
declare namespace TcHmi {
    /**
     * Turns a subset of optional properties of an object type into required properties.
     * Example: SelectableRequired<TcHmi.Context, 'success' | 'error'>
     * This will turn success and error to required and keep everything else as it is defined in TcHmi.Context.
     * @preserve (Part of the public API)
     */
    type SelectableRequired<T, K extends keyof T> = {
        [S in K]-?: T[S];
    } & {
        [P in keyof T]: T[P];
    };
    /**
     * Turns a subset of required properties of an object type into optional properties.
     * Example: SelectableOptional<Events.Message, 'sourceDomain'>
     * This will turn deprecated sourceDomain to optional and keep everything else as it is defined in TcHmi.Message.
     * @preserve (Part of the public API)
     */
    type SelectableOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
    /**
     * Add null to all properties of T
     * @preserve (Part of the public API)
     **/
    type Nullable<T> = {
        [P in keyof T]: T[P] | null;
    };
    /**
     * Creates an exact result type for Object.entries() with precise type for the key and value.
     * Use like this:
     * Object.entries(myVar) as ObjectEntries<typeof myVar>
     * @preserve (Part of the public API)
     */
    type ObjectEntries<T> = [keyof T, Required<T>[keyof T]][];
    /**
     * A generic Context interface.
     * @preserve (Part of the public API)
     */
    interface Context<T1 = any> {
        /** Should be called if there is no error with an optional result. */
        success?: (result?: T1) => void;
        /**
         * Should be called if there is an error.
         * Must provide an error code and optional more details.
         */
        error?: (error: TcHmi.Errors, details?: IErrorDetails) => void;
        /** Contains event argument data if current context is an event trigger. */
        args?: any[];
        /** Optional additional properties */
        [additionalProperty: string]: any;
    }
    const enum LOG_LEVEL {
        Performance = -1,
        None = 0,
        Error = 1,
        Warning = 2,
        Info = 3,
        Debug = 4
    }
    interface EventContext<T1 = any> extends Context<T1> {
        /** Name of the event which is being handled. */
        name: string;
    }
    interface FunctionExpressionContext<T1 = any> extends Context<T1> {
        /** Determines if the caller expects the called context to watch symbol references on its own and reports changes back via success function. */
        delegatedWatch?: boolean;
        /** Function which can be injected in the context object by the called context. It will be called by the context caller when the context has to be destroyed.*/
        destroy?: DestroyFunction;
    }
    /**
     * IErrorDetails extends the server error object to allow framework specific error details and server specific error details in one object.
     * Objects of this type are optionally extended with framework specific properties.
     * Based on Protocol.Schema.json#/definitions/errorDetails of TcHmiServer
     */
    interface IErrorDetails {
        /** The error code. */
        code: TcHmi.Errors | number;
        /** The enum name of error code and not a plain-text message. Use reason for a plaintext description of the error. */
        message?: string;
        /** Plaintext description of the error. */
        reason?: string;
        /** The name of the server or framework domain where the error occurred. */
        domain?: string;
        /** Optional Error object for exceptions */
        exception?: Error;
        /** A list of errors which lead to the current error. */
        errors?: IErrorDetails[] | undefined;
    }
    /** () => void */
    interface DestroyFunction {
        (): void;
    }
    type FontFamily = string;
    type AngleUnit = 'deg' | 'rad' | 'turn' | 'grad';
    type BorderStyleValue = 'Solid' | 'Dashed' | 'Dotted' | 'None';
    type DimensionUnit = 'px' | '%';
    type FontSizeUnit = 'px' | '%' | 'em' | 'rem';
    type FontStyle = 'Normal' | 'Italic' | 'Oblique' | 'Auto';
    type FontWeight = 'Normal' | 'Bold' | 'Auto';
    type HorizontalAlignment = 'Left' | 'Center' | 'Right';
    type ScaleModeString = 'None' | 'ScaleToFill' | 'ScaleToFit' | 'ScaleToFitWidth' | 'ScaleToFitHeight';
    type SizeMode = 'Value' | 'Parent';
    type SizeModeWithContent = 'Value' | 'Parent' | 'Content';
    type ToggleState = 'Normal' | 'Active';
    type VerticalAlignment = 'Top' | 'Center' | 'Bottom';
    /** Hidden still uses space in fluid calculations, collapsed is ignored there.*/
    type Visibility = 'Visible' | 'Hidden' | 'Collapsed';
    interface Version {
        full: string;
        major: number;
        minor: number;
        build: number;
        revision: number;
    }
    interface IResultObject {
        /** Global error code of this result object */
        error: Errors;
        /** Detailed (recursive?) error of this result object */
        details?: IErrorDetails | undefined;
    }
    interface baseColor {
    }
    type Color = SolidColor | LinearGradientColor;
    interface SolidColor extends baseColor {
        /**
         * <color> CSS data type for a solid color.
         * It is defined with 'none' instead of 'transparent'.
         * Therefor use StyleProvider.resolveSolidColorAsCssValue API before pushing it into the DOM.
         */
        color: string;
    }
    interface LinearGradientColor extends baseColor {
        angle: number | string;
        stopPoints: StopPoint[];
    }
    interface StopPoint {
        color: string;
        stop?: string;
    }
    /** A color as an object with rgba parts from 0 to 255 */
    interface RGBAColor {
        /** part red of the color from 0 to 255 */
        r: number;
        /** part green of the color from 0 to 255 */
        g: number;
        /** part blue of the color from 0 to 255 */
        b: number;
        /** part alpha of the color from 0 to 255 */
        a: number;
    }
    interface baseFourSidedCss {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
    interface FourSidedCss extends baseFourSidedCss {
        leftUnit?: DimensionUnit;
        topUnit?: DimensionUnit;
        rightUnit?: DimensionUnit;
        bottomUnit?: DimensionUnit;
    }
    interface PixelFourSidedCss extends baseFourSidedCss {
        leftUnit?: 'px';
        topUnit?: 'px';
        rightUnit?: 'px';
        bottomUnit?: 'px';
    }
    type BorderWidth = PixelFourSidedCss;
    interface BorderStyle {
        left: BorderStyleValue;
        top: BorderStyleValue;
        right: BorderStyleValue;
        bottom: BorderStyleValue;
    }
    interface BorderRadius {
        topLeft: number;
        topLeftUnit?: DimensionUnit;
        topRight: number;
        topRightUnit?: DimensionUnit;
        bottomRight: number;
        bottomRightUnit?: DimensionUnit;
        bottomLeft: number;
        bottomLeftUnit?: DimensionUnit;
    }
    interface BoxShadow {
        /** Color of this Box Shadow */
        color: SolidColor | null;
        /** The Shadow Offset */
        offsetX?: number | null;
        offsetXUnit?: DimensionUnit;
        /** The Shadow Offset */
        offsetY?: number | null;
        offsetYUnit?: DimensionUnit;
        /** Inset shadows are drawn inside the border (even transparent ones), above the background, but below content. */
        inset?: boolean;
        /** The larger this value, the bigger the blur, so the shadow becomes bigger and lighter. */
        blur?: number | null;
        blurUnit?: DimensionUnit;
        /** Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink. */
        spread?: number | null;
        spreadUnit?: DimensionUnit;
    }
    interface Background {
        color: Color | null;
        image: string | null;
        imageWidth: number | null;
        imageWidthUnit: DimensionUnit;
        imageHeight: number | null;
        imageHeightUnit: DimensionUnit;
        imageHorizontalAlignment: HorizontalAlignment;
        imageVerticalAlignment: VerticalAlignment;
        imagePadding: FourSidedCss | null;
    }
    /**
     * The base transform interface. All transform operations must extend this interface and set transformType accordingly.
     */
    interface baseTransform {
        /**
         * Specifies which type of transform should be performed.
         * Currently supported values: Translate, Rotate, Scale, Skew, Origin, Perspective.
         */
        transformType: string;
    }
    type Transform = Translate | Rotate | Scale | Skew | Origin | Perspective;
    /**
     * Translate an element. transformType must be "Translate".
     */
    interface Translate extends baseTransform {
        transformType: 'Translate';
        /**
         * Translate in x axis direction. Defaults to 0 if not provided.
         */
        x?: number;
        /**
         * The unit to use for the translation in x axis direction. Supported values: px, %. Defaults to px if not provided.
         */
        xUnit?: DimensionUnit;
        /**
         * Translate in y axis direction. Defaults to 0 if not provided.
         */
        y?: number;
        /**
         * The unit to use for the translation in y axis direction. Supported values: px, %. Defaults to px if not provided.
         */
        yUnit?: DimensionUnit;
        /**
         * Translate in z axis direction. Defaults to 0 if not provided.
         */
        z?: number;
        /**
         * The unit to use for the translation in z axis direction. Supported values: px, %. Defaults to px if not provided.
         */
        zUnit?: DimensionUnit;
    }
    /**
     * Rotate an element. transformType must be "Rotate".
     */
    interface Rotate extends baseTransform {
        transformType: 'Rotate';
        /**
         * The angle to rotate the element.
         */
        angle: number;
        /**
         * The unit to use for the rotation. Supported values: deg, rad, turn, grad. Defaults to deg if not provided.
         */
        angleUnit?: AngleUnit;
        /**
         * The vector to rotate around. Defaults to { x: 0, y: 0, z: 1} if not provided.
         */
        vector?: {
            x: number;
            y: number;
            z: number;
        };
    }
    /**
     * Scale an element. transformType must be "Scale".
     */
    interface Scale extends baseTransform {
        transformType: 'Scale';
        /**
         * Scale in x axis direction. Defaults to 1 if not provided.
         */
        x?: number;
        /**
         * Scale in y axis direction. Defaults to 1 if not provided.
         */
        y?: number;
        /**
         * Scale in z axis direction. Defaults to 1 if not provided.
         */
        z?: number;
    }
    /**
     * Skew an element. transformType must be "Skew".
     */
    interface Skew extends baseTransform {
        transformType: 'Skew';
        /**
         * Skew x axis. Defaults to 0 if not provided.
         */
        xAngle?: number;
        /**
         * The unit to use for the x axis skew. Supported values: deg, rad, turn, grad. Defaults to deg if not provided.
         */
        xAngleUnit?: AngleUnit;
        /**
         * Skew y axis. Defaults to 0 if not provided.
         */
        yAngle?: number;
        /**
         * The unit to use for the y axis skew. Supported values: deg, rad, turn, grad. Defaults to deg if not provided.
         */
        yAngleUnit?: AngleUnit;
    }
    /**
     * Set the origin of transforms for an element. Should be only used once per transform list. If multiple origins are specified only the last one is used.
     * transformType must be "Origin".
     */
    interface Origin extends baseTransform {
        transformType: 'Origin';
        /**
         * The transform origin x coordinate. Defaults to 50 if not provided. If this and xUnit are not provided, xUnit will default to % to center the origin on the element.
         */
        x?: number;
        /**
         * The unit of the transform origin x coordinate. Defaults to % if x is not provided. Otherwise defaults to px.
         */
        xUnit?: TcHmi.DimensionUnit;
        /**
         * The transform origin y coordinate. Defaults to 50 if not provided. If this and yUnit are not provided, yUnit will default to % to center the origin on the element.
         */
        y?: number;
        /**
         * The unit of the transform origin y coordinate. Defaults to % if y is not provided. Otherwise defaults to px.
         */
        yUnit?: TcHmi.DimensionUnit;
        /**
         * The transform origin z coordinate. Defaults to 0 if not provided.
         */
        z?: number;
        /**
         * The unit of the transform origin z coordinate. Defaults to px if not provided.
         */
        zUnit?: TcHmi.DimensionUnit;
    }
    /**
     * Sets the perspective for 3D transforms on an element. Should be only used once per transform list. If multiple perspectives are specified only the last one is used.
     * transformType must be "Perspective".
     */
    interface Perspective extends baseTransform {
        transformType: 'Perspective';
        /**
         * The distance to use for the perspective. Visualize this as the distance between the user and the transformed element. The shorter the distance, the extremer the transforms appear.
         */
        distance: number;
        /**
         * The unit of the distance. Supported values: px, %. Defaults to px if not provided.
         */
        distanceUnit?: TcHmi.DimensionUnit;
        /**
         * The origin of the perspective. Default behaviour is the same as transform origin.
         */
        origin?: {
            x?: number;
            xUnit?: TcHmi.DimensionUnit;
            y?: number;
            yUnit?: TcHmi.DimensionUnit;
        };
    }
    /**
     * Key/Value pair in a plain JS Object
     */
    interface Dictionary<T> {
        [index: string]: T;
    }
    /**
     * @template R Type of the result of the function
     */
    interface IFunction<R = any> {
        objectType: 'Function';
        /** Should function be active? */
        active?: boolean;
        /** Registered name of the Function. */
        fn: string;
        fnParams: IFunction.Value[];
    }
    namespace IFunction {
        interface baseValue {
        }
        type Value = StaticValue | Symbol | EventDataObject | FunctionExpression;
        interface StaticValue extends baseValue {
            objectType: 'StaticValue';
            /** Contains a value based on the defined valuetype. A value can be a string, number, boolean, array or an object. */
            value: any;
            /** Information about the used type as a tchmi reference name for re-edit scenarios while Engineering. */
            valueType?: string;
        }
        interface Symbol extends baseValue {
            objectType: 'Symbol';
            /** A tchmi binding symbol expression string. Example: "%s%ADS::test1%s%" */
            symbolExpression: string;
        }
        interface EventDataObject extends baseValue {
            objectType: 'EventDataObject';
            /** The name of the prooperty of the event object. */
            propertyPath: string;
        }
        interface FunctionExpression extends baseValue {
            objectType: 'FunctionExpression';
            functionExpression: string;
        }
    }
    /**
     * JSON Schema defines a JSON based format for defining the structure of JSON data.
     */
    interface nativeJsonSchema {
        $ref?: string;
        /**
         * This is important because it tells refs where
         * the root of the document is located
         */
        id?: string;
        /**
         * It is recommended that the meta-schema is
         * included in the root of any JSON Schema
         */
        $schema?: string;
        /**
         * Title of the schema
         */
        title?: string;
        /**
         * Schema description
         */
        description?: string;
        /**
         * Default json for the object represented by
         * this schema
         */
        default?: any;
        /**
         * The value must be a multiple of the number
         * (e.g. 10 is a multiple of 5)
         */
        multipleOf?: number;
        maximum?: number;
        /**
         * If true maximum must be > value, >= otherwise
         */
        exclusiveMaximum?: boolean;
        minimum?: number;
        /**
         * If true minimum must be < value, <= otherwise
         */
        exclusiveMinimum?: boolean;
        maxLength?: number;
        minLength?: number;
        /**
         * This is a regex string that the value must
         * conform to
         */
        pattern?: string;
        format?: 'date-time' | 'timespan' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'uri' | 'int64' | 'base64';
        /**
         * Defines what type additional item have
         * when they are not described in `items` schema array.
         */
        additionalItems?: boolean | JsonSchema;
        /**
         * Defines the array items.
         * If this is an array the first schema describes the first item in the array and so on.
         */
        items?: JsonSchema | JsonSchema[];
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
        required?: string[];
        additionalProperties?: boolean | JsonSchema;
        /**
         * Holds simple JSON Schema definitions for
         * referencing from elsewhere.
         */
        definitions?: {
            [key: string]: JsonSchema;
        };
        /**
         * The keys that can exist on the object with the
         * json schema that should validate their value
         */
        properties?: {
            [property: string]: JsonSchema;
        };
        /**
         * The key of this object is a regex for which
         * properties the schema applies to
         */
        patternProperties?: {
            [pattern: string]: JsonSchema;
        };
        /**
         * If the key is present as a property then the
         * string of properties must also be present.
         * If the value is a JSON Schema then it must
         * also be valid for the object if the key is
         * present.
         */
        dependencies?: {
            [key: string]: JsonSchema | string[];
        };
        /**
         * Indicates that a value should not be modified
         */
        readOnly?: boolean;
        /**
         * Enumerates the values that this schema can be
         * e.g.
         * {"type": "string", "enum": ["red", "green", "blue"]}
         */
        enum?: any[];
        /**
         * The basic type of this schema, can be one of
         * [string, number, object, array, boolean, null]
         * or an array of the acceptable types
         */
        type?: JsonDataTypeNames | JsonDataTypeNames[];
        allOf?: JsonSchema[];
        anyOf?: JsonSchema[];
        oneOf?: JsonSchema[];
        /**
         * The entity being validated must not match this schema
         */
        not?: JsonSchema;
    }
    type JsonDataTypeNames = 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null' | 'integer';
    /**
     * JSON Schema defines a JSON based format for defining the structure of JSON data.
     */
    interface JsonSchema extends nativeJsonSchema {
        /** Custom server related extension to model the beginning of the plc index. */
        startOffset?: number;
        /** Custom server related extension to describe symbol related attributes. */
        attributes?: Dictionary<any>;
        /** Custom server related extension to describe symbol related format maximum. */
        formatMaximum?: string;
        /**
         * Custom framework related extension to describe an instanceof class while type is 'object'.
         * See tchmi:framework#/definitions/Symbol for further information.
         */
        frameworkInstanceOf?: string;
        /**
         * If frameworkInstanceOf relates to TcHmi.Symbol frameworkSymbolSubType will contain the expected value type of the symbol.
         */
        frameworkSymbolSubType?: JsonSchema;
        /**
         * If frameworkInstanceOf relates to TcHmi.Controls.System.TcHmiControl frameworkControlType will contain the expected value type of the control.
         */
        frameworkControlNamespace?: string;
        /**
         * If frameworkInstanceOf relates to TcHmi.Controls.System.TcHmiControl frameworkControlType will contain the expected value type of the control.
         */
        frameworkControlType?: string;
        /**
         * If frameworkInstanceOf relates to TcHmi.Controls.System.TcHmiControl and frameworkControlType relates to TcHmi.Controls.System.TcHmiUserControl frameworkUserControlConfig will contain the path to the expected usercontrol config.
         */
        frameworkUserControlConfig?: string;
        /**
         * Extension to identify types that should be handled by custom editors.
         */
        frameworkMetaType?: string;
        /**
         * Used by server to describe parameter of a function. The schema which holds writeValue will describe the return value of the function.
         */
        writeValue?: JsonSchema;
        /**
         * PLC comment
         */
        comment?: string;
        /**
         * Used to describe a conversion rules.
         */
        convert?: 'string' | 'number' | 'boolean' | 'bigint' | 'bigint64' | 'unsignedbigint64';
        /**
         * Used to describe members of an enum. This is optional for an enum definition in the server.
         */
        options?: {
            label: string;
            value: number;
        }[];
        addSymbol?: boolean;
        /**
         * Which properties to show as columns in the editor.
         */
        engineeringColumns?: string[];
        /**
         * Metadata about object properties that isn't covered by JSON Schema.
         */
        propertiesMeta?: {
            name: string;
            displayName: string;
            refTo?: string;
            category?: string;
            displayPriority?: number;
            description: string;
            defaultValue?: any;
            defaultValueInternal?: any;
        }[];
        /**
         * Used by server to describe available versions of a symbol.
         */
        versions?: number[];
        /**
         * Used by server to describe if a symbol is a function.
         */
        function?: boolean;
    }
    /**
     * One rule for a right corresponding to a group
     * example:
     * {
     * "accessright": "operate",
     * "group": "Admins",
     * "permission": "Allow"
     * }
     * or
     * {
     * "accessright" : "observe",
     * "group" : "Users",
     * "permission": "Allow"
     * }
     */
    interface AccessControl {
        /** Right which this rule defines. */
        accessright: string;
        /** Group to which this access right is given. */
        group: string;
        /** Permission for this access rule.
         * Allow of one group overrides Deny/Inherit of another group.
         * Deny will result in deny if we have no Allow of another group.
         * Inherit will ask parent control when we got no Allow/Deny.
         * If the parent does not define something there will be a specified default.
         */
        permission: 'Allow' | 'Deny' | 'Inherit';
    }
    /**
     * Allows a mapping of rights to parent control virtual rights. For example the 'operate' right of this control can be configured to react on a custom 'canStartPump' right of a parent control.
     * Example:
     * {
     * "virtualControlRight": "canStartPump",
     * "controlRight": "operate"
     * }
     */
    interface VirtualControlRightMapping {
        /** Name of the right which is configured on a parent control (aka outer right). */
        virtualControlRight: string;
        /** Name of the right which is working on this control (aka inner right). */
        controlRight: string;
    }
    /**
     * Endianness dictates the order in which the bytes encoding a number are stored.
     * Little Endian stores the least significant byte first, for example the number 41394 (Hex: 0xA1B2) will be stored as [0xB2, 0xA1].
     * Big Endian stores the most significant byte first, for example the number 41394 (Hex: 0xA1B2) will be stored as [0xA1, 0xB2].
     */
    enum Endianness {
        LittleEndian = 0,
        BigEndian = 1
    }
    interface SortingInfo {
        name?: string;
        order: 'Ascending' | 'Descending';
    }
    /**
     * Maps the filtered, sorted, and paged values of hierarchical data structures to their original positions
     * The index is hierarchical and is build by the indices of all preceeding parent element and the index of the element itself.
     * Example:
     * ```json
     * [
     *      {
     *          "index": [0],
     *          "children": [
     *              {
     *                  "index": [0, 0]
     *              },
     *              {
     *                  "index": [0, 1],
     *                  "children": [
     *                      {
     *                          "index": [0, 1, 0]
     *                      }
     *                  ]
     *              }
     *          ]
     *      },
     *      {
     *          "index": [1],
     *          "children": [
     *              {
     *                  "index": [1, 0]
     *              },
     *              {
     *                  "index": [1, 1]
     *              }
     *          ]
     *      }
     * ]
     * ```
     */
    interface HierarchicalFilterMap {
        /** List of indices to address a data object in a nested array or object */
        index: number[];
        children?: HierarchicalFilterMap[];
    }
    interface Filter extends Array<Comparison | LogicOperator | Filter> {
    }
    interface Comparison {
        path?: string;
        comparator: '==' | '!=' | '<' | '>' | '<=' | '>=' | 'contains' | 'contains not' | '== [ignore case]' | '!= [ignore case]' | 'contains [ignore case]' | 'contains not [ignore case]';
        value: string | number | Date | boolean | null;
    }
    interface LogicOperator {
        logic: 'AND' | 'OR';
    }
    enum PartialType {
        Invalid = 0,
        View = 1,
        Content = 2,
        UserControl = 3
    }
    /**
     * A trigger is based on an event, which is defined by a global unique identifier.
     * Events raised by controls are always defined with the following pattern: [Control_ID].[EVENT_NAME]
     * The available control events are defined in the associated control markup file.
     */
    interface Trigger {
        /** A string value which contains the target event name. */
        event: string;
        /** preventDefault() should be called in this trigger */
        preventDefault?: true;
        /** An array of {Action} objects. Each Event can contain 1 ... n {Action} objects. */
        actions: TcHmi.Trigger.Action[];
        /** Context for the trigger that can be accessed via %ctx% expressions */
        ctx?: TcHmi.Trigger.RegisterContext;
    }
    namespace Trigger {
        interface RegisterContext<T1 = any> extends TcHmi.Context<T1> {
            /**
             * The control that registers this trigger. The control will always set this to itself.
             */
            owner?: TcHmi.Controls.System.baseTcHmiControl;
        }
        interface baseAction {
            /** Should action be active? Defaults to true. */
            active?: boolean;
            /** Should action be collapsed? Not used in runtime */
            collapsed?: boolean;
            /** Async Wait */
            asyncWait: boolean;
            /** Success callback action list. */
            success: Action[];
            /** Error callback action list. */
            error: Action[];
        }
        type Action = Condition | Comment | SwitchCase | ControlApiFunction | WriteToSymbol | TAFunction | JavaScript | ActionTemplate | FunctionExpression;
        interface ConditionIf {
            if: Expression[];
            then?: Action[] | null;
            /** Used by creator only. */
            showThenActions?: boolean;
        }
        interface ConditionElseIf {
            elseif: Expression[];
            then?: Action[] | null;
            /** Used by creator only. */
            showThenActions?: boolean;
        }
        interface ConditionElse {
            else: Action[];
            /** Used by creator only. */
            showThenActions?: boolean;
        }
        interface Condition extends baseAction {
            /** Definition of the action type. */
            objectType: 'Condition';
            parts: (ConditionIf | ConditionElseIf | ConditionElse)[];
        }
        interface SwitchCase extends baseAction {
            /** Definition of the action type. */
            objectType: 'SwitchCase';
            /** An object of type {Compare} which contains the target switch value. */
            compare: IFunction.Value;
            /** */
            cases: VCase[];
            caseDefault: DCase;
        }
        interface ControlApiFunction extends baseAction {
            /** Definition of the action type. */
            objectType: 'ControlApiFunction';
            /** The id of the target control as string value. */
            control: string;
            /** The name of the target api function. */
            fn: string;
            /** An array of {ParamValue} objects. Each element in the array represents a parameter of the function defined in "fn". */
            fnParams: IFunction.Value[];
        }
        interface WriteToSymbol extends baseAction {
            /** Definition of the action type. */
            objectType: 'WriteToSymbol';
            /** The target binding symbol as binding expression. */
            symbolExpression: string | null;
            /** An object of type {Value}. */
            value: IFunction.Value;
        }
        /** Free comment. Will be ignored on runtime. */
        interface Comment {
            /** Definition of the action type. */
            objectType: 'Comment';
            /** Free comment. Will be ignored on runtime. */
            comment?: string;
            active?: undefined;
            success?: undefined;
            error?: undefined;
            asyncWait?: undefined;
        }
        interface TAFunction extends baseAction {
            /** Definition of the action type. */
            objectType: 'Function';
            /** The name of the target setter function which is public accessible in the control defined in "Control". */
            fn: string;
            /** An array of {ParamValue} objects. Each element in the array represents a parameter of the setter function defined in "Fn". */
            fnParams: IFunction.Value[];
        }
        interface JavaScript extends baseAction {
            /** Definition of the action type. */
            objectType: 'JavaScript';
            /**
             * An array of string objects. Each string in the array represents one line of code.
             * To avoid invalidation of the TcHmiConfig it is important to escape quotationmarks.
             */
            sourceLines: string[];
            /** Tells the system if the function is finished synchronous or if the user will call a feedback function of the context object. */
            waitMode?: 'Synchronous' | 'Asynchronous';
        }
        interface ActionTemplate extends baseAction {
            /** Definition of the action type. */
            objectType: 'ActionTemplate';
            /** The name of the target ActionTemplate.*/
            templateName: string;
            /** A long description of this Action Template. */
            description: string;
            /** An array of {ParamValue} objects. Each element in the array represents a parameter which will be used inside the ActionTemplate */
            fnParams: IFunction.Value[];
        }
        interface FunctionExpression extends baseAction {
            /** Definition of the action type. */
            objectType: 'FunctionExpression';
            functionExpression: string | null;
        }
        interface BindingTarget {
            /**
             * The object type name as {string}.
             * Extensions:
             * {BindingTarget}.objectType = "ControlAttributeBindingTarget"
             */
            objectType: string;
        }
        interface ControlAttributeBindingTarget extends BindingTarget {
            objectType: 'ControlAttributeBindingTarget';
            attributeExpression: string | null;
        }
        interface Expression {
            /** An object of type {Value} which represents a value which will be compared. */
            compare1: IFunction.Value;
            /** An object of type {Value} which represents a value which will be compared. */
            compare2: IFunction.Value;
            /**
             * A string value which contains the compare operator string (JavaScript) which will be used to compare the values behind the properties "Compare1" and "Compare2".
             */
            compareOperator: '==' | '===' | '!=' | '!==' | '<' | '<=' | '>' | '>=';
            /**
             * A string|null value which defines the logical binding of the current element to the previous element.
             *
             * The property has to be set to null if its the first {Expression} object in the Expressions array.
             */
            logic: 'AND' | 'OR' | null;
        }
        interface Case {
            actions: Action[];
        }
        /** Value Case */
        interface VCase extends Case {
            /** Configured Value to compare */
            caseValue: IFunction.Value;
        }
        /** Default Case */
        interface DCase extends Case {
        }
    }
    /**
     * Defines tchmiconfig.json
     */
    interface IConfig {
        /** Project version as defined by the customer */
        projectVersion: string;
        /** Splash screen settings */
        splash: {
            versionSource: 'None' | 'Project' | 'Framework';
        };
        /** Path to the Framework Directory. */
        basePath: string;
        /** Scalemode of the full Application. */
        scaleMode: ScaleModeString;
        /** Name of the View which is active while loading the Application. */
        startupView: string;
        /** Path to a custom login page. */
        loginPage?: string;
        /** Project based include files. */
        dependencyFiles?: (StylesheetFileDescription | JavaScriptFileDescription)[];
        /** Name of the Theme which is active while loading the Application. */
        activeTheme: string;
        /** List of Themes of this Application. Key is the themename. */
        themes: Dictionary<ProjectThemeDescription>;
        /** Configuration of the server communication. */
        tcHmiServer: {
            /** Default subscription interval time. */
            websocketIntervalTime: number;
            /** General websocket request/response timeout. */
            websocketTimeout: number;
            /** System websocket request/response timeout. */
            websocketSystemTimeout: number;
            /** Default symbol subscription mode. */
            websocketSubscriptionMode?: 'Change' | 'Poll' | 'ClientPoll' | 'ClientWriteConfirm';
        };
        /** Definition of all project based symbols. */
        symbols: ISymbolConfig;
        /** Definition of global triggers. */
        trigger: Trigger[];
        /** Definition of global intervals. */
        intervals: IIntervalConfig;
        /** List of packages.*/
        packages: IPackageInfo[];
        /** List of all available view files. */
        views: IView[];
        /** List of all available user function files. */
        userFunctions: IUserFunction[];
        /** List of all available Usercontrols. */
        userControls: IUserControl[];
        /** List of all available content files. */
        content: IContent[];
        /** Definition of all available actionTemplates. */
        actionTemplates: ActionTemplate[];
        /** List of all available application level localization files (LocalizedText symbols). */
        languages: ILanguageFileMap;
        /** List of all available framework core localization file overrides. */
        languagesForFramework?: ILanguageFileMap;
        /** List of all available package localization file overrides. */
        languagesForPackages?: IModuleLanguageFileMapsMap;
        /** List of all available control module localization file overrides. */
        languagesForControls?: IModuleLanguageFileMapsMap;
        /** List of all available function module localization file overrides. */
        languagesForFunctions?: IModuleLanguageFileMapsMap;
        /**
         * Language file used if a language file or a key within a language file is missing.
         * Attention: Can be empty string!
         */
        languageFallback?: string;
        /** List of all available keyboard layout files in project. */
        keyboardLayouts: IProjectKeyboardLayout[];
        /** Disable various loading optimizations */
        disableLoadingOptimization?: boolean;
        tcSpeech?: TcHmi.TcSpeech.BaseConfig;
        /** Definition of engineering settings. */
        creatorSettings: {
            /** Definition of the viewport emulation. */
            viewport: {
                /** Width as a Pixel Number. */
                defaultWidth: number;
                /** Height as a Pixel Number. */
                defaultHeight: number;
            };
        };
        /** Definition of global binding settings. */
        binding: {
            /**
             * Determines how a binding will handle symbol related read/watch errors.
             * Possible values:
             * - Ignore: Ignore the error.
             * - Reset: Forward the default toggle switch (null) to force the control attribute to reset to default value.
             */
            symbolError: 'Ignore' | 'Reset';
            /**
             * Determines how a binding will handle symbol related write errors.
             * Possible values:
             * - Ignore: Ignore the error.
             * - ReadBack: Read back the current symbol value after write attempt failure and forward it to the control.
             */
            symbolWriteError: 'Ignore' | 'ReadBack';
        };
        /** Defines the system keyboard */
        systemKeyboard?: {
            /** Defines if the system keyboard should open on focus of a textarea or input element. */
            autoOpen?: boolean;
            /** Id of the keyboard provider */
            providerName: string;
            /** Definition of the keyboard mappings. Key is the locale. */
            projectKeyboardMapping?: Dictionary<Keyboard.InputModeMapping>;
            /** Layout of the system keyboard. */
            layout?: Keyboard.ContainerLayout;
        };
        systemPopups?: {
            /** Id of the popups provider. */
            providerName: string;
        };
    }
    type LanguageFileMapEntry = string | string[];
    /** Mapping between locale (Key is Language and Region as in ISO 639/BCP 47 with '-' separator) and file path (or file path array) as a value. */
    interface ILanguageFileMap extends Dictionary<LanguageFileMapEntry> {
    }
    /** Mapping between control and function type identifier to language filemap (which itself maps a language key to a file path (or file path array) value). */
    interface IModuleLanguageFileMapsMap extends Dictionary<ILanguageFileMap> {
    }
    interface ISymbolConfig {
        /** Definition of all project based internal symbols (available via %i%symbolname%/i%). Key is the symbol name.*/
        internal: {
            [symbolname: string]: IInternalSymbolItem;
        };
        /** Definition of all project based themedResource symbols (available via %tr%symbolname%/tr%). Key is the symbol name. */
        themedResources: {
            [symbolname: string]: IThemedResourceItem;
        };
        /** Definition of all project based timer symbols (available via %t%timer%/t%). Key is the symbol name.*/
        timer: {
            [symbolname: string]: ITimerSymbolItem;
        };
    }
    /** Definition of the internal symbol. */
    interface IInternalSymbolItem {
        /** Value for this internal symbol. */
        value?: any;
        /** Information about the expected type as a tchmi reference name. */
        type: string;
        /** The change of value is saved in the client and available after reload. Defaults to false if not provided. */
        persist?: boolean;
        /** The symbol can not be changed. Defaults to false if not provided. */
        readonly?: boolean;
    }
    /** Definition of the themedResource symbol. */
    interface IThemedResourceItem {
        /** Information about the expected type as a tchmi reference name */
        type: string;
        /** A Map containing a value for each theme. Key is the themename. */
        values: Dictionary<any>;
        /** A description of the themed resource. */
        description?: string;
    }
    /** Definition of the timer symbol. */
    interface ITimerSymbolItem {
        /** Value pattern for this timer symbol. */
        pattern: (ITimerSymbolValuePatternItem | ITimerSymbolSymbolPatternItem)[];
        /** SymbolExpression (Boolean) which controls the state of the timer. */
        runSymbol?: string;
        /** Value which is active when the timer is stopped. */
        stopValue?: any;
        /** Information about the expected type as a tchmi reference name. */
        type: string;
    }
    /** Definition of a timer symbol pattern. */
    interface ITimerSymbolPatternItem {
        /** Duration in milliseconds for this pattern part. */
        duration: number;
    }
    /** Definition of a timer symbol value pattern. */
    interface ITimerSymbolValuePatternItem extends ITimerSymbolPatternItem {
        /** Value for this pattern part. */
        value: any;
    }
    /** Definition of a timer symbol symbol pattern. */
    interface ITimerSymbolSymbolPatternItem extends ITimerSymbolPatternItem {
        /** SymbolExpression which represents the value for this timer symbol pattern part. */
        symbol: string;
    }
    /**
     * Defines every <LangugageCode>.localization
     */
    interface ILocalization {
        /** Identifier of the describing schema. */
        $schema?: string;
        /** Definition of this Language and Region as in ISO 639/BCP 47 with '-' separator. */
        locale: string;
        /**
         * Identifies the target scope of this localization file.
         * Required in engineering environment if file is used for override.
         */
        scope?: 'Application' | 'Framework' | 'Control' | 'Function' | 'Server';
        /**
         * Identifies the localization file source for project level override.
         * Required in engineering environment if file is used to override localization files with Control or Function scope.
         * Example: 'TcHmi.Controls.System.TcHmiControl'
         */
        source?: string;
        /** List of localized Text. */
        localizedText: ILocalizedTextMap;
    }
    /** Mapping between localization key and value. */
    type ILocalizedTextMap<K extends string = string> = Record<K, string | null>;
    interface baseDependencyFileDescription {
        /** Path to the file with the project/control directory as base path. Can be .js, .theme or .css depending on "type" property. */
        name: string;
        /** A long description of this file. */
        description?: string;
    }
    /** project tchmiconfig.json, control Description.json#DependencyFile and function FunctionDescription#DependencyFile section */
    interface JavaScriptFileDescription extends baseDependencyFileDescription {
        /** Type of the control asset. */
        type: 'JavaScript' | 'EsModule';
    }
    /**
     * Control Description.json#dependencyFiles
     * tchmiconfig.json#dependencyFiles
     */
    interface StylesheetFileDescription extends baseDependencyFileDescription {
        /** Type of the control asset. */
        type: 'Stylesheet';
    }
    /**
     * Control Description.json#themeFiles
     * tchmiconfig.json#dependencyFiles
     */
    interface ThemedValuesFileDescription extends baseDependencyFileDescription {
        /** Type of the control asset. */
        type: 'ThemedValues';
    }
    /** Description of a function */
    interface FunctionDescription {
        /** Identifier of the describing schema. */
        $schema?: string;
        apiVersion?: number;
        version: Version;
        dependencyFiles: JavaScriptFileDescription[];
        function: FunctionDefinition;
        dataTypes?: DataTypeDescription[];
        /** List of all available function localization files. */
        languages?: ILanguageFileMap;
    }
    /** List of custom data types. */
    interface DataTypeDescription {
        /** Name for the datatype file (property will not be used). */
        name?: string;
        /** Path to the schema describing the datatypes. */
        schema: string;
    }
    interface FunctionDefinition {
        name: string;
        namespace?: string;
        displayName?: string;
        description: string;
        category: string;
        visible: boolean;
        /** If set to true a context object will be injected into the JavaScript scope which can be used to tell the system that an asynchronous operation has finished. */
        injectContextObject?: boolean;
        /** Tells the system if the function is finished synchronous or if the user will call a feedback function of the context object. */
        waitMode?: 'Synchronous' | 'Asynchronous';
        /** Return value type as a tchmi reference name or null if the function has no return value. */
        returnValue?: {
            /** Return value type as a tchmi reference name. */
            type: string;
            description?: string;
        } | null;
        arguments: FunctionArgument[];
    }
    interface FunctionArgument {
        /** Variable name in the function. */
        name: string;
        /** Name which should be presented the user. */
        displayName?: string;
        /** Information about the expected type as a tchmi reference name. */
        type: string;
        /** A long description of this argument. */
        description: string;
        /** This parameter is mandatory for this function. */
        required: boolean;
        /** This parameter can be binded to a symbol. */
        bindable: boolean;
        /** This parameter can have the same binding options as a control attribute. */
        allowControlAttributeBindingOptions?: boolean;
        /** Determines if symbol references injected via this parameter will be watched by the function itself if 'delegatedWatch: true' is defined in the context object when calling the function. */
        allowSymbolReferenceWatchDelegation?: boolean;
        /** TcHmiCreator ui state.*/
        asReference?: boolean;
        /** This value will be used as initial value while function is generated in engineering. */
        defaultValue?: any;
        /** Specified the argument as rest parameter (variable number of arguments). */
        restParameter?: boolean;
    }
    interface baseThemeDescription {
        /** References to Resources of this Theme. */
        resources: (ThemedValuesFileDescription | StylesheetFileDescription)[];
    }
    interface ControlThemeDescription extends baseThemeDescription {
    }
    interface ProjectThemeDescription extends baseThemeDescription {
        /** Do not load theme files (.theme and .css) for this controls */
        replacesThemeForControls?: string[];
        /**
         * Project only: Do not load .css files for these package components (as 'packageId/componentName').
         * For example 'Beckhoff.TwinCAT.HMI.Controls/ContentTabs' or for all global resources 'Beckhoff.TwinCAT.HMI.ResponsiveNavigation' */
        replacesThemeForPackageComponents?: string[];
    }
    /** Package information as given in tchmiconfig */
    interface IPackageInfo {
        /** Package name like Beckhoff.TwinCAT.HMI.Controls */
        name: string;
        /** Base url path for this package like /Beckhoff.TwinCAT.HMI.Controls or /framework */
        basePath: string;
    }
    interface IUserFunction {
        /** Path to the user function js file. */
        url: string;
    }
    interface IPartial {
        /** Path to the Partial main file. */
        url: string;
    }
    interface IView extends IPartial {
        /** Defines if the file should be loaded and compiled before usage to accelerate later usage. */
        preload: boolean;
        /** Defines if the objects related to the target partial should be kept alive after destroy to avoid addition compile. */
        keepAlive: boolean;
        /**
         * Defines if bindings on controls within this file should be preloaded before its content is displayed
         * to have proper values when the content is displayed.
         * Requires Preload to be activated.
         */
        preloadBindings?: boolean;
    }
    interface IContent extends IPartial {
        /** Defines if the file should be loaded and compiled before usage to accelerate later usage. */
        preload: boolean;
        /** Defines if the objects related to the target partial should be kept alive after destroy to avoid addition compile. */
        keepAlive: boolean;
        /** Defines if the content should be loaded synchronous. */
        loadSync?: boolean;
        /**
         * Defines if bindings on controls within this file should be preloaded before its content is displayed
         * to have proper values when the content is displayed.
         * Requires Preload to be activated.
         */
        preloadBindings?: boolean;
    }
    interface IUserControl extends IPartial {
    }
    interface IIntervalConfig {
        [intervalName: string]: IIntervalItem;
    }
    interface IIntervalItem {
        interval: number;
        actions: Trigger.Action[];
    }
    interface ActionTemplate {
        /** Name of the Action Template. */
        name: string;
        category: string;
        actions: Trigger.Action[];
        parameters: TemplateParameter[];
    }
    interface TemplateParameter {
        name: string;
        /** Information about the expected type as a tchmi reference name */
        type: string;
        description: string;
        structDataType: any;
    }
    interface IProjectKeyboardLayout {
        url: string;
    }
    interface EnumMapping {
        [index: number]: string;
    }
    /**
     * A symbol expression referencing a text or
     * an object with a symbol expression and some values useful for this text.
     */
    type Localizable = string | FormattedLocalizable;
    /**
     * Object with a symbol expression referencing a text.
     * This text can contain placeholders which can be filled with values from formatValues.
     */
    interface FormattedLocalizable {
        /**
         * Symbol expression referencing a text.
         * This can contain placeholders which can be filled with values from formatValues.
         */
        symbolExpression: string;
        /** A list of values which can be used to replace the placeholders in the text value. */
        formatValues: any[];
    }
    namespace Controls {
        interface ControlAttributeList extends Dictionary<TcHmi.ControlAttribute> {
            'data-tchmi-type': TcHmi.ControlAttribute<string>;
            'id': TcHmi.ControlAttribute<string>;
        }
        /** Description of (virtual) control rights */
        interface ControlAccessDescription {
            /** Name of the access definition in the HTML. */
            name: string;
            /** Name which should be presented the user. */
            displayName?: string;
            /** A long description of this access definition. */
            description?: string;
            /** Determine if an access definition is shown to the user in engineering. */
            visible?: boolean;
            /** Defines the default of this control access right. This will be used if the check for this access right does not return a result. */
            defaultValueInternal: boolean | null;
            /** Names of access rights which must be valid, if this right should be granted. For example 'create' should work only when 'operate' is granted. */
            dependsOn?: string[];
        }
    }
    interface ControlAttribute<T = any> {
        /** Name from HTML, so guaranteed to be lowercase only with simple attributes! */
        name: string;
        /** Value for this attribute from "HTML" */
        value: T;
        descr: ControlAttributeDescription | null;
    }
    interface ControlAttributeDescription {
        /** Name of the attribute in the HTML. This comes from JSON of the user! Casing can be uppercase even if HTML is lowercase only */
        name: string;
        /** Name of the attribute property. */
        propertyName: string;
        /** Name of the attribute property setter (can be empty string or missing if the attribute is readonly). */
        propertySetterName?: string;
        /** Name of the attribute property getter. */
        propertyGetterName: string;
        /** Reference to a corresponding other propertyName */
        refTo?: string;
        /** Name which should be presented the user. */
        displayName?: string;
        /** Determine if an attribute is shown to the user. */
        visible: boolean;
        /** Determine if the attribute can be changed by a theme. Defaults to standard. */
        themeable: 'None' | 'Standard' | 'Advanced';
        /** Information about the expected type as a tchmi reference name */
        type: string;
        /** Name of the area this attribute will be listed in the creator. */
        category: string;
        /** Display priority of the Attribute */
        displayPriority?: number;
        /** A long description of this attribute. */
        description: string;
        /** This property was defined but not enforced till 1.10 and therefore wrong used by many controls @deprecated */
        required?: boolean;
        /** The attribute has to be set in the HTML. Otherwise the control is not valid. */
        requiredOnCompile?: boolean;
        /** Readonly attributes do not need a setter. */
        readOnly: boolean;
        /** A definition of functions which are allowed to use here. The functions must match the requiredArguments signature. */
        allowedFunctions?: {
            /** The type of the attribute gives the tchmi creator a hint to use a custom editor for this attribute. */
            returnType: string | null;
            requiredArguments: {
                /** Information about the expected type as a tchmi reference name */
                type: string;
            }[];
            /** A compatible function must match this waitmode. */
            requiredWaitMode: 'Synchronous' | 'Asynchronous';
        };
        /** Defines if this is bindable to a Symbol. */
        bindable: boolean;
        /** Defines if heritable. */
        heritable: boolean;
        /** This will be used as default BindingMode on bindings to this attribute if no BindingMode is defined in the symbol expression. Defaults to 'OneWay'. */
        defaultBindingMode?: 'OneWay' | 'TwoWay';
        /**
         * This property indicates the default value for the attribute that is used in the
         * Engineering Properties window when instantiating the control and written to the HTML code.
         */
        defaultValue: any;
        /**
         * This property specifies the internal default value for the attribute.
         * This value is passed to the Setter function when the control has no other value in HTML code.
         * The internal default aka runtime default may differ from the normal default (drop default).
         */
        defaultValueInternal: any;
        /** Allows symbol expressions in properties of object or array values. */
        allowSymbolExpressionsInObject?: boolean;
        /** Allows injection of symbol references before initialization of the control has finished. */
        allowEarlySymbolReferenceInjection?: boolean;
        /** Allows delegation of symbol reference preloading. */
        allowSymbolReferencePreloading?: boolean;
    }
    namespace Config {
        /**
         * Information about a nuget package
         */
        interface NugetPackageMetadata {
            /** A comma-separated list of packages authors, matching the profile names on nuget.org. */
            authors: string;
            /** A description of the package for UI display. */
            description: string;
            /** A human-friendly title of the package which may be used in some UI displays. */
            title: string;
            /** The version of the package, following the major.minor.patch pattern. Version numbers may include a pre-release suffix as described in Package versioning. */
            version: string;
        }
    }
    namespace Keyboard {
        /**
         * Mapping from input mode string to project based keyboard layout.
         *
         * The TcHmiKeyboard provider supports this config:
         *
         * A focused HTMLInput or HTMLTextarea element can have following
         * properties to request a specific keyboard layout:
         * HTML attribute 'data-tchmi-input-mode' to force a specific tchmi input mode (could be any string if mapping is provided in project)
         * HTML attribute inputmode === ('numeric' || 'decimal')
         * HTML attribute type === ('number')
         */
        interface InputModeMapping extends Dictionary<string> {
            /**
             * Keyboard layout path for texts and unknown input elements.
             * Could be the empty string. Will fall back to 'text' of fallback language.
             */
            text: string;
            /**
             * Keyboard layout path for decimal input elements (potential fractional input).
             * Could be the empty string. Will fall back to 'decimal' of fallback language,
             * 'text' keyboard file of this language or 'text' of fallback language.
             */
            decimal: string;
            /**
             * Keyboard layout path for numeric input elements (non-fractional input).
             * Could be empty. Will fall back to 'decimal' of this language,
             * 'numeric' / 'decimal' of fallback language,
             * 'text' keyboard file of this language or 'text' of fallback language.
             */
            numeric: string;
        }
        /**
         * Possible input modes for keyboard handling.
         * The list is extensible in the project, but there are some well known values:
         *
         * - 'skip' is no keyboard. Current keyboard will be NOT closed.
         * - 'none' is no keyboard. Current keyboard will be closed.
         *
         * - 'numeric' is a numeric keyboard to use with non-fractional input
         * - 'decimal' is a numeric keyboard to use with potential fractional input
         *
         * - 'text' is a text keyboard and used as a fallback for unknown input modes
         */
        type KeyboardInputMode = 'skip' | 'none' | Exclude<keyof InputModeMapping, number>;
        /**
         * Possible positions for the system keybaord.
         *
         * - 'popup' The keyboard will be opened in a popup.
         * - 'footer' The keyboard will be displayed in a footer.
         */
        type Position = 'popup' | 'footer';
        /**
         * The height and position describing the system keyboards container layout.
         */
        interface ContainerLayout {
            /**
             * Pixel height of the system keyboard.
             * If empty the defined height of the keyboard layout will be used.
             */
            height?: number | null;
            /**
             * Position of the system keyboard.
             * If not defined will use popup.
             */
            position?: Position;
        }
    }
    /**
     * Functions for interaction with TcSpeech.
     * @preserve (Part of the public API)
     */
    namespace TcSpeech {
        /** Configuration for TcSpeech Integration in tchmiconfig.json */
        interface BaseConfig {
            /** Name of the TcSpeech extension on the server. Defaults to 'TcHmiSpeech' */
            domain: string;
            /** Our speaker should be used. */
            enableSpeaker: boolean;
            /** Our microphone should be used. */
            enableMicrophone: boolean;
            /** Default audio volume */
            defaultVolume: number;
            /**
             * Ignore detected speech commands with a lower relative measure of the certainty of correct recognition of a phrase.
             * The value is from 0.0 to 1.0, for low to high confidence, respectively.
             **/
            confidenceThreshold: number;
        }
        interface ConnectionOptions {
            /** Target a specific remote TwinCAT speech engine to connect */
            remoteSocketId?: number;
            /** Constraint for Microphone */
            sourceConstraints?: MediaStreamConstraints['audio'];
            /** Constraint for Speaker */
            sinkConstraints?: {
                /** Device id of audiooutput */
                deviceId?: string;
            };
        }
        enum AudioEntityPriority {
            Low = 5,
            Normal = 10,
            High = 15
        }
        interface SpeechSynthesisResult extends TcHmi.IResultObject {
            /** GUID for this request. */
            guid?: string;
            state?: 'Queued' | 'Playing' | 'Stopped';
        }
        interface IEventCallbackParameter {
            /** Recognition Tag of the active SRGS file which was detected. */
            Command: string;
            /**
             * A relative measure of the certainty of correct recognition of a phrase.
             * The value is from 0.0 to 1.0, for low to high confidence, respectively. */
            Confidence: number;
            /** Parameter which was detected by speech recognition. Type depends on SRGS file. */
            Parameter: unknown;
        }
    }
    /**
     * The names of the enumeration exist at runtime.
     * For example, you can (and should) use TcHmi.Errors.NONE directly in a comparison.
     * @preserve (Part of the public API)
     */
    enum Errors {
        NONE = 0,
        ERROR = 1,
        E_PARAMETER_INVALID = 2,
        E_TIMEOUT = 3,
        E_EXCEPTION = 4,
        E_INVALID = 5,
        E_NOT_UNIQUE = 6,
        E_OUT_OF_RANGE = 7,
        E_DESTROYED = 8,
        E_NOT_SUPPORTED = 100,
        E_SYSTEM_NOT_READY = 105,
        E_NOT_ALLOWED = 110,
        E_UNKNOWN = 115,
        E_UNKNOWN_TYPE = 120,
        E_KEY_NOT_FOUND = 130,
        E_TYPE_INVALID = 150,
        E_VALUE_INVALID = 160,
        E_REGISTRATION_MISSING = 180,
        E_REGISTRATION_ERROR = 190,
        E_MODULE_MISSING = 200,
        E_MODULE_ERROR = 210,
        E_WEBSOCKET_NOT_READY = 1000,
        E_WEBSOCKET_CLOSED = 1001,
        E_WEBSOCKET_NOT_SUPPORTED = 1404,
        E_WEBSOCKET_OPEN_SERVER_LICENSE_CHECK_FAILED = 1500,
        E_WEBSOCKET_OPEN_SERVER_LICENSE_MISSING = 1501,
        E_WEBSOCKET_OPEN_SERVER_NO_ACCESS = 1502,
        E_SYMBOL_STATE_INVALID = 2000,
        E_SYMBOL_VALUE_INVALID = 2001,
        E_SYMBOL_RESOLVE_SCHEMA = 2002,
        E_SYMBOL_READONLY = 2003,
        E_SYMBOL_UNKNOWN = 2010,
        E_SYMBOL_INVALID_DATA_PROVIDER_ENTRY = 2020,
        E_SYMBOL_INVALID_PATH = 2030,
        E_SYMBOL_SUBSYMBOL_ERROR = 2040,
        E_SYMBOL_SUBVALUE_ERROR = 2045,
        E_SYMBOL_OBJECT_RESOLVE = 2050,
        E_SYMBOL_RESOLVE_META_DATA = 2060,
        E_SYMBOL_UNKNOWN_ATTRIBUTE = 2100,
        E_SYMBOL_RESOLVE_EXPRESSION = 2150,
        E_SERVER_RESPONSE_ERROR = 3000,
        E_SERVER_COMMAND_ERROR = 3005,
        E_SERVER_INVALID_RESPONSE = 3010,
        E_SERVER_COMMANDS_MISSING = 3015,
        E_SERVER_COMMAND_MISSING = 3016,
        E_SERVER_READVALUE_MISSING = 3020,
        E_SERVER_WRITEVALUE_MISSING = 3025,
        E_SERVER_RESPONSE_MISSING = 3030,
        E_SERVER_DOMAIN_UNKNOWN = 3100,
        E_SERVER_HANDSHAKE = 3200,
        E_FUNCTION_MISSING_FUNCTION_REFERENCE = 4000,
        E_FUNCTION_MISSING_FUNCTION_DESCRIPTION = 4005,
        E_FUNCTION_INVALID_CONFIGURATION = 4010,
        E_FUNCTION_EXCEPTION = 4020,
        E_FUNCTION_UNKNOWN = 4030,
        E_FUNCTION_RESTPARAMETER_DEFINITION_MISSING = 4040,
        E_FUNCTION_RESOLVING_PARAMETER_FAILED = 4050,
        /** Value of the FunctionExpression is known synchronous. The caller is responsible for the value! */
        E_FUNCTION_HANDLED_VIA_RETURN_VALUE = 4060,
        E_FUNCTION_EXPRESSION_PARSER_ERROR = 4100,
        E_FUNCTION_EXPRESSION_EXCEPTION = 4120,
        E_FUNCTION_CALL_ABORTED = 4130,
        E_FUNCTION_DESTROYED = 4140,
        E_TRIGGER_ACTION_EXCEPTION = 5050,
        E_TRIGGER_JAVASCRIPT_EVAL_EXCEPTION = 5055,
        E_TRIGGER_FUNCTION_EXPRESSION_EXCEPTION = 5060,
        E_TRIGGER_RESOLVE_CONDITION_EXPRESSION_EXCEPTION = 5065,
        E_TRIGGER_CONDITION_INVALID = 5200,
        E_CONTROL_INSTANCE_NOT_FOUND = 6000,
        E_CONTROL_INVALID_CONFIGURATION = 6001,
        E_CONTROL_ATTRIBUTE_NOT_FOUND = 6005,
        E_CONTROL_ATTRIBUTE_INVALID_CONFIGURATION = 6010,
        E_CONTROL_INSTANCE_NO_LONGER_AVAILABLE = 6020,
        E_SCHEMA_INVALID = 7000,
        E_SCHEMA_INVALID_PATH = 7010,
        E_SCHEMA_INVALID_REF_ID = 7020,
        /** Deprecated. Use E_SCHEMA_UNKNOWN_SOURCE instead. */
        E_SCHEMA_UNKNOWN_FILE = 7030,
        E_SCHEMA_UNKNOWN_SOURCE = 7030,// Replaces E_SCHEMA_UNKNOWN_FILE but keeps value for compatibility.
        E_SCHEMA_UNKNOWN_DEFINITION = 7040,
        E_SCHEMA_NOT_RESOLVED = 7050,
        E_PACKAGE = 8000,
        E_LOCALIZATION_UNKNOWN_KEY = 9000,
        E_INTERACTIVE_WRITE_ABORT = 10100
    }
    const enum HttpStatusCode {
        Continue = 100,
        Switching = 101,
        Ok = 200,
        Created = 201,
        No_Content = 204,
        Partial_Content = 206,
        Multiple_Choices = 300,
        Moved_Permanently = 301,
        Redirect = 302,
        Not_Modified = 304,
        Temporary_Redirect = 307,
        Permanent_Redirect = 308,
        Bad_Request = 400,
        Unauthorized = 401,
        Payment_Required = 402,
        Forbidden = 403,
        Not_Found = 404,
        Method_Not_Allowed = 405,
        Request_Timeout = 408,
        Gone = 410,
        Length_Required = 411,
        Precondition_Failed = 412,
        Request_Payload_too_Large = 413,
        Range_Not_Satisfiable = 416,
        Expectation_Failed = 417,
        Upgrade_Required = 426,
        Too_Many_Requests = 429,
        Custom_License_Expired = 460,
        Custom_Login_Timeout = 461,
        Custom_Too_Many_Connections = 463,
        Custom_Server_Starting = 464,
        Custom_License_Limit_Exceeded = 465,
        Custom_Missing_Parameter = 466,
        Internal_Server_Error = 500,
        Not_Implemented = 501,
        Service_Unavailable = 503,
        Version_not_Supported = 505,
        Custom_Extension_not_Loaded = 520,
        Custom_Syntax_Error = 521,
        Custom_Forced_Disconnect = 522
    }
}
declare namespace TcHmi {
    /**
     * Checks if the parameter is a TcHmi.SolidColor
     * @param colorObject The SolidColor to check.
     */
    function isSolidColor(colorObject: Color | null | undefined): colorObject is SolidColor;
    /**
     * Checks if the parameter is a TcHmi.LinearGradientColor
     * @param colorObject The SolidColor to check.
     */
    function isLinearGradientColor(colorObject: Color | null | undefined): colorObject is LinearGradientColor;
    /**
     * Checks if the parameter is a TcHmi.Background
     * @param obj object to test
     * @preserve (Part of the public API)
     */
    function isBackground(obj: Background | null | undefined): obj is Background;
    /**
     * Checks if the parameter is a TcHmi.checkTransform
     * @param transformObject object to test
     * @preserve (Part of the public API)
     */
    function isTranslate(transformObject: Transform | null | undefined): transformObject is Translate;
    /**
     * Checks if the parameter is a TcHmi.Rotate
     * @param transformObject object to test
     * @preserve (Part of the public API)
     */
    function isRotate(transformObject: Transform | null): transformObject is Rotate;
    /**
     * Checks if the parameter is a TcHmi.Scale
     * @param transformObject object to test
     * @preserve (Part of the public API)
     */
    function isScale(transformObject: Transform | null): transformObject is Scale;
    /**
     * Checks if the parameter is a TcHmi.Skew
     * @param transformObject object to test
     * @preserve (Part of the public API)
     */
    function isSkew(transformObject: Transform | null): transformObject is Skew;
    /**
     * Checks if the parameter is a TcHmi.Origin
     * @param transformObject object to test
     * @preserve (Part of the public API)
     */
    function isOrigin(transformObject: Transform | null): transformObject is Origin;
    /**
     * Checks if the parameter is a TcHmi.Perspective
     * @param transformObject object to test
     * @preserve (Part of the public API)
     */
    function isPerspective(transformObject: Transform | null): transformObject is Perspective;
    /**
     * Check if an object is a Comparison.
     * @param value object to test
     */
    function isComparison(value: any): value is Comparison;
    /**
     * Check if an object is a Comparison
     * @param value object to test
     */
    function isLogicOperator(value: Comparison | LogicOperator | Filter): value is LogicOperator;
    namespace IFunction {
        /**
         * Function Parser Type Guard which checks 'objectType' of Value
         * @param value object to test
         */
        function isStaticValue(value: Value): value is StaticValue;
        /**
         * Function Parser  Type Guard which checks 'objectType' of Value
         * @param value object to test
         */
        function isSymbol(value: Value): value is Symbol;
        /**
         * Function Parser Type Guard which checks 'objectType' of Value
         * @param value object to test
         */
        function isEventDataObject(value: Value): value is EventDataObject;
        /**
         * Function Parser  Type Guard which checks 'objectType' of Value
         * @param value object to test
         */
        function isFunctionExpression(value: Value): value is FunctionExpression;
    }
    namespace Trigger {
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isCondition(obj: Action): obj is Condition;
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isSwitchCase(obj: Action): obj is SwitchCase;
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isControlApiFunction(obj: Action): obj is ControlApiFunction;
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isWriteToSymbol(obj: Action): obj is WriteToSymbol;
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isComment(obj: Action): obj is Comment;
        /**
         * Check if an object is a Function.
         * @param obj object to test
         */
        function isFunction(obj: Action): obj is TAFunction;
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isJavaScript(obj: Action): obj is JavaScript;
        /**
         * Trigger Parser Type Guard which checks 'objectType' of Action
         * @param obj object to test
         */
        function isActionTemplate(obj: Action): obj is ActionTemplate;
        /**
         * Check if an object is a FunctionExpression.
         * @param obj object to test
         */
        function isFunctionExpression(obj: Action): obj is FunctionExpression;
        /**
         * Check if an object is a ControlAttributeBindingTarget.
         * @param obj object to test
         */
        function isControlAttributeBindingTarget(obj: BindingTarget): obj is ControlAttributeBindingTarget;
    }
}
declare namespace TcHmi {
    /**
     * For internal use only.
     * Do not use or manipulate resources from within TcHmi.System in your code.
     * @preserve (Part of the public API)
     */
    namespace System {
    }
}
declare namespace TcHmi.System {
    interface IConfigOverride {
        basePath?: string;
        tcHmiServer?: {
            websocketIntervalTime?: number;
            websocketOverwrite?: {
                host?: string;
                port?: number;
            };
        };
    }
    const enum LifeCycleState {
        AttributesInitialized = 15,
        Attached = 30,
        /** Will be detached in the near future. */
        StartDetaching = 36,
        /** Will not be detached in near the future. */
        StopDetaching = 37,
        Detached = 40
    }
    enum ControlAttributeType {
        Invalid = 0,
        General = 1,// Attributes which are not defined in Description.json or *.usercontrol.json. General HTML attributes...
        Control = 2,// Attributes which are defined in Description.json as control attribute.
        UserControlParameter = 3
    }
    enum ControlAttributeValueType {
        Invalid = 0,
        Simple = 1,
        Complex = 2,
        Unknown = 3
    }
    interface ControlAttribute<T = any> extends TcHmi.ControlAttribute<T> {
        valueType: ControlAttributeValueType;
        type: ControlAttributeType;
    }
    interface ControlAttributeList extends Dictionary<TcHmi.System.ControlAttribute> {
        'data-tchmi-type': TcHmi.System.ControlAttribute<string>;
        'id': TcHmi.System.ControlAttribute<string>;
    }
    interface IControlRegistrationBase {
        error: TcHmi.Errors;
        errorDetails?: TcHmi.IErrorDetails;
    }
    interface IControlRegistration<C extends TcHmi.Controls.System.baseTcHmiControl = TcHmi.Controls.System.baseTcHmiControl> extends IControlRegistrationBase {
        /** API 0 (1.10), API 1 (1.12) */
        apiVersion: 0 | 1;
        /** Registration name of the control.
         * May not be set in case of error or apiVersion. */
        name?: string;
        /** Since API 1 (1.12)
         * May not be set in case of error or apiVersion. */
        namespace?: string;
        /** With API 0 (1.10), API 1 (1.12)
         * May not be set in case of error or apiVersion. */
        ctrlConstructor?: TcHmi.Controls.baseTcHmiControlConstructor<C>;
        /** Control class is a native ES6 class?
         * May not be set in case of error or apiVersion. */
        nativeEs6Control?: boolean;
        /** The nearest native ES6 class constructor. For details see TcHmi.System.ControlManager.__procConstructor
         * May not be set in case of error or apiVersion. */
        nearestEs6Constructor?: TcHmi.Controls.baseTcHmiControlConstructor;
        /** Only with API 0 (1.10)
         * May not be set in case of error or apiVersion. */
        directory?: string;
        /** Only with API 0 (1.10)
         * May not be set in case of error or apiVersion. */
        template?: string | null;
    }
    interface IFunctionRegistrationBase {
        error: TcHmi.Errors;
        errorDetails?: TcHmi.IErrorDetails;
    }
    /**
     * @template R Type of the result of the function
     */
    interface IFunctionRegistration<R = any> extends IFunctionRegistrationBase {
        /** Registration name of function
         * May not be set in case of error. */
        name?: string;
        /** Namespace of the function.
         * May not be set in case of error. */
        namespace?: string;
        /** JS Function implementation
         * May not be set in case of error. */
        func?: (...args: any[]) => R;
    }
    type TcHmiAutomationCommand = {
        messageType: 'SetSingleControlMode';
    } | {
        messageType: 'AckSingleControlMode';
    } | {
        messageType: 'InitStageFinished';
        stage: string;
    } | {
        messageType: 'ControlGeneration';
        /** The type of the control. */
        controlType: string;
        /** The identifier of the control. */
        controlId: string;
        /** A dictionary for the attributes with the html attribute names as keys */
        controlAttributes: null | Record<string, any>;
    } | {
        messageType: 'SetTheme';
        themename: 'Base' | 'Base-Dark';
    } | {
        messageType: 'FrameworkLoaded';
    } | {
        messageType: 'FinishedControlGeneration';
    } | {
        messageType: 'Error';
        reason: string;
    } | {
        messageType: 'Timeout';
        reason: string;
    };
    /** Object to store all package data. */
    interface IPackage {
        /** Package name like Beckhoff.TwinCAT.HMI.Controls */
        name: string;
        /** Base url path for this package like Beckhoff.TwinCAT.HMI.Controls or framework */
        basePath: string;
        /** Content of the Manifest file for this package */
        manifest: IManifest;
    }
    interface IControlModuleBase {
        error: TcHmi.Errors;
        errorDetails?: TcHmi.IErrorDetails;
    }
    interface IControlModule<C extends TcHmi.Controls.System.baseTcHmiControl = TcHmi.Controls.System.baseTcHmiControl> extends IControlModuleBase {
        /** Registration data of this control
         * May not be set in case of error and may be filled lazy. */
        reg?: IControlRegistration<C>;
        manifestData?: IManifestControlModuleData;
        /** Package object this control belongs to.
         * May not be set in case of error. */
        package?: IPackage;
        /** Control description.json object for this control
         * May not be set in case of error. */
        description?: ControlDescription;
        /** Resolved Controldescription object for this control
         * May not be set in case of error. */
        descriptionExpanded?: ControlDescriptionWithInheritance;
    }
    interface IFunctionModuleBase {
        error: TcHmi.Errors;
        errorDetails?: TcHmi.IErrorDetails;
    }
    interface IFunctionModule<R = any> extends IFunctionModuleBase {
        /**
         * Registration data of this function
         * May not be set in case of error and may be filled lazy.
         **/
        reg?: IFunctionRegistration<R>;
        /** May not be set in case of error or if function is not provided by package. */
        manifestData?: IManifestFunctionModuleData;
        /** May not be set in case of error or if function is not provided by package. */
        package?: IPackage;
        /** Function description as an object.
         * May not be set in case of error. */
        description?: TcHmi.FunctionDescription;
    }
    /**
     * Defines every <UserControl>.usercontrol.json
     */
    interface UserControlConfig {
        parameters: TcHmi.ControlAttributeDescription[];
        /**
         * Additional virtual rights for the User Control.
         * For example the 'operate' right of an embedded button can be configured to react on 'canStartPump' right of this User Control.
         **/
        virtualRights?: TcHmi.Controls.ControlAccessDescription[];
    }
    /**
     * DEPRECATED
     * Defines Function
     * Please use TcHmi.FunctionDescription
     * @deprecated Please use TcHmi.FunctionDescription
     */
    type IFunctionDescription = TcHmi.FunctionDescription;
    /**
     * Defines all Controls
     */
    interface ControlDescription {
        /** Identifier of the describing schema. */
        $schema?: string;
        /**
         * 0: 1.10 style controls
         * 1: 1.12 style controls:
         */
        apiVersion?: number;
        /** Control name without namespace like TcHmiButton */
        name: string;
        /** Control namespace like TcHmi.Controls.Beckhoff */
        namespace: string;
        /** Name which should be presented the user. */
        displayName?: string;
        version: Version;
        /** Determine if a control is shown to the user. */
        visible: boolean;
        /** Determine if the control can be changed by a theme. Defaults to standard. */
        themeable: 'None' | 'Standard' | 'Advanced';
        /** FQN of inheritance parent. */
        base: string;
        uses: string[];
        category: string;
        displayPriority?: number;
        heritable: boolean;
        /** A long description of this control. */
        description: string;
        /** The event which is manipulated on double click in designer. */
        defaultDesignerEvent?: string;
        properties: {
            /** Can contain other controls. */
            containerControl: boolean;
            /** Default size of control after instantiation */
            geometry: {
                width: number;
                height: number;
            };
        };
        icons: IconDescription[];
        template?: string;
        /** JS files the creator includes in our HTML and CSS files the framework loads itself. */
        dependencyFiles: (TcHmi.JavaScriptFileDescription | TcHmi.StylesheetFileDescription)[];
        /** Files the framework fetches potentially. Key is the themename. */
        themes?: Dictionary<ControlThemeDescription>;
        /** A list of attributes of this control. */
        attributes: TcHmi.ControlAttributeDescription[];
        /** Resources of the control. */
        themedResources: ControlResourceDescription[];
        /** A list of API Functions of this Control. */
        functions?: ControlFunctionDescription[];
        attributeCategories?: {
            name: string;
            displayPriority: number;
            defaultCollapsed?: boolean;
            description: string;
        }[];
        /** A list of access rights which is checked by this control. Will be checked by its child controls, too, if they are configured with a matching virtual mapping */
        access?: TcHmi.Controls.ControlAccessDescription[];
        /** A list of events associated to this control. */
        events?: ControlEventDescription[];
        /** List of custom data types. */
        dataTypes?: TcHmi.DataTypeDescription[];
        /** Mapping between locale (Key is Language and Region as in ISO 639/BCP 47 with '-' separator) and file path (or file path array) as a value. */
        languages?: ControlLanguages;
    }
    /**
     * ControlDescription with resolved Inheritance for easier handling in runtime
     */
    interface ControlDescriptionWithInheritance extends ControlDescription {
        inheritationResolved: boolean;
        /** List of custom data types (but including all data from inheritance parents). */
        inheritedTypes: string[];
        /** A list of attributes of this control (but including all data from inheritance parents). */
        inheritedAttributes: ControlAttributeDescriptionWithInheritance[];
        /** lowercase name based map (but including all data from inheritance parents) */
        inheritedAttributesNameMap: Map<string, ControlAttributeDescriptionWithInheritance>;
        /** lowercase PropertyName based map (but including all data from inheritance parents) */
        inheritedAttributesPropertyNameMap: Map<string, ControlAttributeDescriptionWithInheritance>;
        /** lowercase PropertyGetterName based map (but including all data from inheritance parents) */
        inheritedAttributesPropertyGetterNameMap: Map<string, ControlAttributeDescriptionWithInheritance>;
        /** lowercase PropertySetterName based map (but including all data from inheritance parents) */
        inheritedAttributesPropertySetterNameMap: Map<string, ControlAttributeDescriptionWithInheritance>;
        /** A list of access rights which is checked by this control (but including all data from inheritance parents). Will be checked by its child controls, too, if they are configured with a matching virtual mapping. */
        inheritedAccess: TcHmi.Controls.ControlAccessDescription[];
        /** A list of events associated to this control (but including all data from inheritance parents). */
        inheritedEvents: ControlEventDescriptionWithInheritance[];
        /** A list of API Functions of this Control (but including all data from inheritance parents). */
        inheritedFunctions: ControlFunctionDescriptionWithInheritance[];
        /** Mapping between locale (Key is Language and Region as in ISO 639/BCP 47 with '-' separator) and file path as a value (but including all data from inheritance parents). */
        inheritedLanguages: ControlLanguagesWithInheritance;
        /** Url of the template (but including all data from inheritance parents) */
        inheritedTemplate?: string;
    }
    interface FrameworkDescription {
        version: Version;
        events: FrameworkEventDescription[];
        dataTypes: TcHmi.DataTypeDescription[];
        /**
         * List of all available framework localization files.
         * Key is Language and Region as in ISO 639/BCP 47 with '-' separator.
         */
        languages?: ILanguageFileMap;
    }
    interface IconDescription {
        name: string;
        width: number;
        height: number;
    }
    /**
     * DEPRECATED
     * Please use TcHmi.ControlAttributeDescription
     * @deprecated Please use TcHmi.ControlAttributeDescription
     */
    type ControlAttributeDescription = TcHmi.ControlAttributeDescription;
    interface ControlAttributeDescriptionWithInheritance extends TcHmi.ControlAttributeDescription {
        /** Inherited from (not implemented right now) */
        inheritControl?: string;
    }
    interface ControlResourceDescription {
        /** Name of the resource. */
        name: string;
        /** Name which should be presented the user. */
        displayName?: string;
        /** A long description of this resource. */
        description?: string;
        /** The type of the resource gives the tchmi creator a hint to use a custom editor for this attribute.\nThe corresponding schemas are described as dataTypes. */
        type: string;
    }
    interface ThemeFile {
        /** Dictionary of control type attribute values in this file. Key is the full qualified controltype name. */
        controlTypeValues?: Dictionary<AttributeValue>;
        /** Dictionary of class attribute values in this file. Key is the control class name. */
        controlClassValues?: Dictionary<AttributeValue>;
    }
    interface AttributeValue {
        /** Value of the TcHmi attribute. Key is the attribute name. */
        attributes?: Dictionary<any>;
        /** Value of the resource. Key is the resource name. */
        themedResources?: Dictionary<any> | null;
    }
    interface ControlFunctionDescription {
        /** Internal name of function. */
        name: string;
        /** Name which should be presented the user. */
        displayName?: string;
        /** Determine if a function is shown to the user. */
        visible: boolean;
        /** A long description of this function. */
        description: string;
        category: string;
        params?: {
            /** Name of the parameter */
            name: string;
            /** Name which should be presented the user. */
            displayName?: string;
            /** A long description of this parameter. */
            description: string;
            /** Information about the expected type as a tchmi reference name. */
            type: string;
            /** Defines if this is bindable to a Symbol. */
            bindable: boolean;
            /** Determine if a parameter is shown to the user. */
            visible: boolean;
        }[];
        /** Return value type as a tchmi reference name or null if the function has no return value. */
        type?: string | null;
        heritable: boolean;
        /** If set to true a context object will be injected into the JavaScript scope which can for example be used to tell the system that an asynchronous operation has finished. */
        injectContextObject?: boolean;
        /**
         * This property defines search terms for the Engineering that are to optimize the search function within the Actions & Conditions Editor.
         * This makes it possible to find the function using terms other than the function name.
         * For example, if the strings "MyFunction" and "1234" are added to the array, the function can also be found under these terms. */
        searchTerms?: string[];
        /** Tells the system if the function is finished synchronous or if the user will call a feedback function in the context object of the context object to signal finish. */
        waitMode?: 'Synchronous' | 'Asynchronous';
    }
    interface ControlFunctionDescriptionWithInheritance extends ControlFunctionDescription {
        /** Inherited from (not implemented right now) */
        inheritControl?: string;
    }
    /**
     * DEPRECATED
     * Please use FunctionDefinition
     * @deprecated Please use FunctionDefinition
     */
    type IFunction = FunctionDefinition;
    /**
     * DEPRECATED
     * Please use FunctionArgument
     * @deprecated Please use FunctionArgument
     */
    type IFunctionArgument = FunctionArgument;
    interface baseEventDescription {
        /** Internal name of the event like ".onPressed" on controls. */
        name: string;
        /** Name which should be presented the user. */
        displayName?: string;
        /** A long description of this event. */
        description: string;
        /** The event can have the option preventDefault. */
        allowsPreventDefault?: boolean;
    }
    interface FrameworkEventDescription extends baseEventDescription {
        /** category of this event */
        category: 'Framework';
    }
    interface ControlEventDescription extends baseEventDescription {
        /** Determine if an event is shown to the user. */
        visible: boolean;
        heritable: boolean;
        /** category of this event */
        category: 'Operator' | 'Control' | 'Framework';
        /**
         * An optional display priority of the event. Most users will only use events with a low number.\nEvents without this value are very rare used.
         * 10 is load, unload, pressed. 15 are major interaction events like click, right click, double click. 50 are enter, leave, mousedown, mouseup.
         */
        displayPriority?: number;
    }
    interface ControlEventDescriptionWithInheritance extends ControlEventDescription {
        /** Inherited from (not implemented right now) */
        inheritControl?: string;
    }
    /**
     * DEPRECATED
     * List of custom data types.
     * Please use TcHmi.DataTypeDescription
     * @deprecated Please use TcHmi.DataTypeDescription
     */
    type DataTypeDescription = TcHmi.DataTypeDescription;
    /** Mapping between locale (Key is Language and Region as in ISO 639/BCP 47 with '-' separator) and file path (or file path array) as a value. */
    interface ControlLanguages extends ILanguageFileMap {
    }
    /** Mapping between locale (Key is Language and Region as in ISO 639/BCP 47 with '-' separator) and file path (or file path array) as a value (but including all data from inheritance parents). */
    interface ControlLanguagesWithInheritance extends ControlLanguages {
    }
    /**
     * DEPRECATED
     * Please use TcHmi.LOG_LEVEL
     * @deprecated Please use TcHmi.LOG_LEVEL
     */
    const enum LOG_LEVEL {
        Performance = -1,
        None = 0,
        Error = 1,
        Warning = 2,
        Info = 3,
        Debug = 4
    }
    /** Manifest file for a package which references controls, functions and other stuff */
    interface IManifest {
        /** Identifier of the describing schema. */
        $schema?: string;
        /**
         * 0: 1.10 style
         * 1: 1.12 style
         */
        apiVersion: 0 | 1;
        /** List of all referenced  controls, functions and other stuff in this manifest */
        modules: (IManifestPackageModuleData | IManifestControlModuleData | IManifestFunctionModuleData | IManifestResourceModuleData | IManifestLanguageModuleData)[];
        provideMetadata?: IManifestMetaData;
        /**
         * Allows mapping of an import keyword, path prefixes or full path to a real path inside this hmi package.
         * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
         */
        esmoduleImports?: {
            /**
             * Optional base path for this mapping.
             * Can be used to restrict an entry to a single control.
             */
            moduleScope?: string;
            /**
             * Path to map this import keyword, path prefixes or full path to.
             * This path is relative to the package root (where this manifest is located).
             */
            imports: Dictionary<string>;
        }[];
    }
    /** Describes a reference to a package. */
    interface IManifestPackageModuleData {
        /** Describes a reference to a package. */
        type: 'Package';
        /** This is the NugetId of the referenced package. The resources of the referenced package are used before the rest of the modules. */
        nugetId: string;
    }
    /** Describes a tchmi control. */
    interface IManifestControlModuleData {
        /** Describes a tchmi control. */
        type: 'Control';
        /** The base path to find all control files. */
        basePath: string;
        /** Name of the description file for the control: Description.json in most cases. */
        descriptionFile: string;
        toolboxCategory?: string;
    }
    /** Describes a tchmi function. */
    interface IManifestFunctionModuleData {
        /** Describes a tchmi function. */
        type: 'Function';
        /** The base path to find the function <functionName>.js and <functionName>.function.json files. */
        basePath: string;
        /** Name of the description file for the function. This is <functionName>.function.json in most cases. */
        descriptionFile: string;
    }
    interface IManifestResourceModuleData {
        /**
         * Defines we are refering to a (non-control and non-function) resource. This can be a CSS Stylesheet or a JS file.
         * Javascript module files can be import'ed in controls and functions without referencing them here.
         */
        type: 'Resource';
        /**
         * Url of the resource. This can be a CSS Stylesheet or a JS file.
         * Javascript module files can be import'ed in controls and functions without referencing them here.
         */
        path: string;
        /** Restricts the CSS Resource to be used only for one specific theme name. Will be used for all themes if unset. (not valid for JS files) */
        theme?: string;
        /** Groups the resource for theme override in project. (not valid for JS files) */
        component?: string;
    }
    interface IManifestLanguageModuleData {
        /** Defines we are refering to a language file." */
        type: 'Language';
        /** Determines the language code of the language file. */
        locale: string;
        /** Url of a language file or an array of language file urls. */
        files: TcHmi.LanguageFileMapEntry;
    }
    /**
     * Example:
     * ---------------------------------------
     * ```json
     * {
     *    "toolbox": {
     *       "MyIdentifier": {
     *          "200": "Test",
     *          "201": {
     *             "default": "Bühnentechnik",
     *             "de-DE": "Bühnentechnik",
     *             "en-US": "Stagecraft",
     *             "it-IT": "Scenotecnica",
     *             "nl-NL": "Theatertechniek"
     *          }
     *       }
     *    }
     * }
     * ```
     * ---------------------------------------
     * Can be used in control module toolboxCategory
     * ```json
     * {
     *    "basePath": "./",
     *    "descriptionFile": "Description.json",
     *    "toolboxCategory": "MyIdentifier:201",
     * }
     * ```
     * ---------------------------------------
     */
    interface IManifestMetaData {
        toolbox?: Dictionary<Dictionary<string | Dictionary<string>>>;
    }
    namespace ControlManager {
        /** Layout data of a control */
        interface ControlLayoutData {
            /** Control was moved (at least global). Can be resetted by the control itself. */
            moved: boolean;
            /** Control was moved compared to its parent. Can be resetted by the control itself. */
            movedLocal: boolean;
            /** Control was resized. Can be resetted by the control itself. */
            resized: boolean;
            bounds: {
                /** The number of pixels of the control as resulted from its getBoundingClientRect. */
                topGlobal: number | null;
                /** The number of pixels of the control as resulted from its getBoundingClientRect. */
                leftGlobal: number | null;
                /** The number of pixels that the upper left corner of the control is offset to the left within the parent control. */
                offsetTop: number | null;
                /** The number of pixels that the upper left corner of the control is offset to the top within the parent control. */
                offsetLeft: number | null;
                /** The number of pixels of the control as resulted from its getBoundingClientRect. */
                width: number | null;
                /** The number of pixels of the control as resulted from its getBoundingClientRect. */
                height: number | null;
            };
            /** Cached result of getComputedStyle of the control main element. */
            computedStyles: Pick<CSSStyleDeclaration, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>;
        }
    }
    namespace Trigger {
        interface TriggerContext<T1 = any> extends TcHmi.Trigger.RegisterContext<T1> {
            trigger?: TcHmi.Trigger;
            event?: TcHmi.EventProvider.Event;
        }
        interface ISwitchCaseResultObject extends TcHmi.IResultObject {
            value?: any;
        }
    }
    /**
     * DEPRECATED
     * Please use TcHmi.Trigger
     * @deprecated Please use TcHmi.Trigger
     */
    type Trigger = TcHmi.Trigger;
}
declare namespace TcHmi.System {
    interface ControlHierarchy {
        ctrl: TcHmi.Controls.System.baseTcHmiControl;
        children_hierarchy: ControlHierarchy[];
        pctrl: TcHmi.Controls.System.baseTcHmiControl | null;
    }
    /**
     * Resolves the control hierarchy of the control object in param ctrl.
     * @param ctrl The first level control object which will act as the entry point for hierarchy.
     * @param pctrl The parent control object which will associated to the first level control object in the return value.
     * @returns Control object hierarchy.
     */
    function resolveControlHierarchy(ctrl: Controls.System.baseTcHmiControl, pctrl?: Controls.System.baseTcHmiControl | null): ControlHierarchy;
    interface IResolveAttributesResultObject extends TcHmi.IResultObject {
        /** Keys of the dictionary can be mixed case! */
        value: TcHmi.System.ControlAttributeList;
    }
    /**
     * Resolves the attributes of the jquery object in param elem based on the current dom values as an array of name, value objects.
     */
    function resolveAttributesFromControlElement(elem: Element): TcHmi.System.IResolveAttributesResultObject;
    /**
     * Resolves qualified name.
     * @param name
     * @param namespace
     */
    function resolveQualifiedName(name: string, namespace?: string): string;
    function parseIdFromHtml(markup: string): string | undefined;
    /**
     * Decode base64 encoded utf8 strings
     * Only used for sync to creator where base64 is our overkill escaping solution
     * @param input
     * @returns returns the String or null
     */
    function tchmi_utf8str_base64decode(input: string): string | null;
    /**
     * Decode base64 encoded utf8 strings
     * Only used for sync to creator where base64 is our overkill escaping solution
     * @param input String to encode
     * @returns returns the String or null
     */
    function tchmi_utf8str_base64encode(input: string): string | null;
    /**
     * ElementStyleDimensions
     */
    interface ElementStyleDimensions {
        width: string;
        height: string;
        left: string;
        top: string;
        right: string;
        bottom: string;
    }
    /**
     * Used to compare server command processedStart and processedEnd ISO8601 time strings.
     * Important! This function is not mentioned to parse generic ISO8601 time strings. Its meant to parse
     * the mentioned server command time strings as fast as possible by making some expectations which
     * may not be given on generic ISO8601 time strings.
     *
     * Returns -1 if a is earlier than b, 0 if a is equal to b and 1 if a is later than b.
     */
    function compareISO8601ServerCommandDateTimeStrings(a: string, b: string): -1 | 0 | 1;
    /**
     * Used to compare server command processedStart and processedEnd ISO8601 time duration strings.
     * Important! This function is not mentioned to parse generic ISO8601 time strings. Its meant to parse
     * the mentioned server command time duration strings as fast as possible by making some expectations which
     * may not be given on generic ISO8601 time strings.
     *
     * Returns -1 if a is shorter than b, 0 if a is equal to b and 1 if a is longer than b.
     */
    function compareISO8601ServerCommandDurationStrings(a: string, b: string): -1 | 0 | 1;
    type ParameterType = 'object' | 'boolean' | 'number' | 'string' | 'symbol' | 'bigint' | 'function' | 'date';
    /**
     * Checks the javascript type of a variable and calls the given callback if it is invalid.
     * Returns a boolean indicating if the variable is valid.
     * @param parameter The parameter to check.
     * @param parameterName Parameter name for better reporting.
     * @param options Expected JS type and if null/undefined are valid
     * @param domain Domain which should be set in error detail
     * @param callback Function which will be called when the type check failed
     * @returns returns false if the type was valid and an errorDetail for invalid parameters
     */
    function isParameterTypeInvalid<T = any>(parameter: T | undefined | null, parameterName: string, options: {
        /** Expected JS datatype or list of types. Can be skipped if only isArray should be checked. */
        type?: ParameterType | ParameterType[];
        /** Expect an array. */
        expectArray?: boolean;
        minStringLength?: number;
        minArrayLength?: number;
        minValue?: number | bigint;
        /** Is this required (aka what about null and undefined)? */
        required: 'fullOptional' | 'undefinedOk' | 'nullOk' | 'valueNeeded';
    }, domain?: string, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): TcHmi.IErrorDetails | false;
    /**
     * Inject object at specific path.
     * Throws if there is already something at this position.
     * @param fullName path to the object in window
     * @param injectObj Object to inject
     */
    function injectInGlobalObject(fullName: string, injectObj: object): void;
    /**
     * Resolves a server symbol name into its base symbol name and its path.
     * @param symbolName The target server symbol name.
     */
    function resolveServerSymbolNameParts(symbolName: string): {
        name: string;
        pathTokens: null | string[];
    };
    /**
     * Parses an autoLogoff timespan roughly into milliseconds. Will calculate with 365 days per year and 30 days per month.
     * @param autoLogoff The parsed timespan.
     * @returns
     */
    function autoLogoffToMilliseconds(autoLogoff: string): number | null;
    /**
     * Resolves a promise or rejects with a timeout Error.
     * Timeout time defaults to config.tcHmiServer.websocketSystemTimeout
     * @param promise
     * @returns
     */
    function promiseTimeout<T>(promise: Promise<T>, option?: {
        timeout?: number;
        rejectDetails?: IErrorDetails;
        /** Will be used when no rejectDetails is given */
        rejectMessage?: string;
    }): Promise<Awaited<T>>;
    /**
     * DEPRECATED! Use TcHmi.ObjectPath.toPathTokens instead.
     * @deprecated Use TcHmi.ObjectPath.toPathTokens instead.
     * @param path
     */
    function resolveSymbolPathToTokenArray(path: string): string[];
    /**
     * Resolves css related dimensions for an element.
     * DEPRECATED
     * @deprecated
     * @param j
     */
    function resolveElementStyleDimensions(j: JQuery): ElementStyleDimensions;
    /**
     * DEPRECATED
     * @deprecated
     * @param text
     */
    function toCamelCase(text: string): string;
    /**
     * DEPRECATED
     * @deprecated
     * @param text
     */
    function toDashCase(text: string): string;
}
declare namespace TcHmi.System {
    namespace SharedResources {
        let jqWindow: JQuery<Window>;
        let jqDocument: JQuery<Document>;
        let jqBody: JQuery;
    }
}
declare namespace TcHmi.System {
    namespace Init {
        /** Promise which resolves on system initialization, just before showing the TcHmiView. */
        let initialized: Promise<void>;
        let initializedBaseConfig: Promise<void>;
        let initializedServices: Promise<void>;
        let initializedCommunication: Promise<void>;
    }
    namespace Services {
        let internalSymbolManager: TcHmi.System.InternalSymbolManager;
        let templateParamSymbolManager: TcHmi.System.TemplateParamSymbolManager;
        let timerSymbolManager: TcHmi.System.TimerSymbolManager;
        let splashScreen: TcHmi.System.SplashScreen;
        let dialogManager: TcHmi.System.DialogManager;
        let accessManager: TcHmi.System.AccessManager;
        let automationCommandManager: TcHmi.System.AutomationCommandManager;
        let triggerManager: TcHmi.System.TriggerManager;
        let bindingManager: TcHmi.System.BindingManager;
        let serverManager: TcHmi.System.ServerManager;
        let serverEventManager: TcHmi.System.ServerEventManager;
        let localizationManager: TcHmi.System.LocalizationManager;
        let controlManager: TcHmi.System.ControlManager;
        let themeManager: TcHmi.System.ThemeManager;
        let styleManager: TcHmi.System.StyleManager;
        let typeManager: TcHmi.System.Type.TypeManager;
        let animationProvider: TcHmi.System.AnimationProvider;
        let viewManager: TcHmi.System.ViewManager;
        let topMostLayer: TcHmi.System.TopMostLayer;
        let tcSpeechManager: TcHmi.System.TcSpeechManager;
        let localization: TcHmi.System.Locale.Framework;
        let keyboardManager: TcHmi.System.KeyboardManager;
        let intervalManager: TcHmi.System.IntervalManager;
        let symbolEventHandler: TcHmi.System.SymbolEventHandler;
    }
    namespace Data {
        /** Map key is the package name like Beckhoff.TwinCAT.HMI.Controls  */
        const packages: Map<string, IPackage>;
        namespace Modules {
            /** An Array and Map with key 1.10 legacy control type name, 1.12 control type name AND 1.12 qualified control type name */
            let controls: {
                /** Map key is the 1.10 legacy control type name, 1.12 control type name AND 1.12 qualified control type name */
                map: Map<string, IControlModule<Controls.System.baseTcHmiControl>>;
                /** All modules of all controls */
                array: IControlModule[];
                /** Map key is the URL of the description.json */
                urlMap: Map<string, IControlModule<Controls.System.baseTcHmiControl>>;
            };
            let functions: {
                /** Map key is the 1.10+1.12 function name AND 1.12 qualified function name */
                map: Map<string, IFunctionModule<any>>;
            };
        }
        namespace Registrations {
            /** An Array and Map with key 1.10 legacy control type name, 1.12 control type name and 1.12 qualified control type name */
            let controls: {
                /** Map key is the 1.10 legacy control type name, 1.12 control type name and 1.12 qualified control type name */
                map: Map<string, IControlRegistration<Controls.System.baseTcHmiControl>>;
                /** All registrations of all controls */
                array: IControlRegistration[];
            };
            /** An array and Map with key 1.10 legacy function type name, 1.12 function name and 1.12 qualified function name */
            let functions: {
                /** Map key is the 1.10 legacy function name and 1.12 qualified function name */
                map: Map<string, IFunctionRegistration<any>>;
                /** All registrations of all functions */
                array: IFunctionRegistration[];
            };
            /** An object with all known providers. */
            let uiProvider: {
                providers: {
                    [type in keyof UiProvider.TypeProviderMap]: Map<string, UiProvider.TypeProviderMap[type]>;
                };
            };
        }
        namespace Caches {
            /** Map key is the url */
            let templateMarkupCache: Map<string, string>;
            /** Map key is the url */
            let templateMarkupElementCache: Map<string, Node>;
            /** Map key is the url */
            let partialMarkupCache: Map<string, {
                markup: string;
                partialId?: string;
            }>;
            /** Map key is the url */
            let partialCompositeConfigCache: Map<string, UserControlConfig>;
            /** Map key is symbol name */
            let serverSymbolMetaDataCache: Map<string, Symbol.IServerSymbolMetaDataResultObject>;
            /** Map key is symbol name */
            let serverSymbolInteractiveWriteMetaDataCache: Map<string, Symbol.IServerSymbolMetaDataResultObject>;
        }
        /** Map key is the partial file url */
        let isKeepAlivePartial: Map<string, boolean>;
        /** Map key is the partial file url */
        let isLoadSyncContent: Map<string, boolean>;
        /** Map key is the partial file url */
        let isPreloadBindingPartial: Map<string, boolean>;
    }
    /** Content of tchmiconfig.json as an object */
    let config: IConfig;
    let nugetPackagesMetadata: Dictionary<Config.NugetPackageMetadata>;
    /**
     * Full url pointing to the base of the TcHmi Server like "https://192.0.2.1:2020" (with no pathname).
     * Could be different for reverse proxy scenarios (could be "https://192.0.2.1/TcHmiSrv").
     */
    let hostBaseUri: string;
    /**
     * path+query+hash of the hmi but as seen from the hmi server.
     * Could be different for reverse proxy scenarios.
     * Must be used for populating server redirects like /Logout?Location={1}
     */
    let serverSidePathAndQuery: string;
    /** Prefix to have a unique identifier for differenting / vs /bin path */
    let hostPrefix: string;
    /** ISO timestamp of the HTML generation of the HMI in local time or undefined when unknown */
    let buildtime: string | undefined;
    /** Content of Description.json of the Framework as an object */
    let description: FrameworkDescription;
    /**
     * Bool which represents system initialization.
     * Will be set to true just before showing the TcHmiView
     * followed by a EventProvider 'onInitialized' event
     */
    let isInitialized: boolean;
    /**
     * Bool which represents system preload status
     * Will be set to true after Content and Binding preload.
     */
    let isPreloaded: boolean;
    /** System is unloaded via internal system API call by creator. */
    let isUnloaded: boolean;
    let destroyGlobalTrigger: DestroyFunction | null;
    namespace Environment {
        /** This browser support fractionalSecondDigits in date formatters. */
        let dateFractionalSecondDigits: boolean;
    }
    /**
     * This browser needs viewport offset for fixed positioned elements
     * ref https://bugs.webkit.org/show_bug.cgi?id=257375
     *
     * null: unknown or unimportant right now (no visualViewort scaling)
     */
    let boundingClientRectNeedsViewPortOffset: boolean | null;
    /** Maps 'tchmi-button' to 'TcHmi.Controls.Beckhoff.TcHmiButton' */
    let mapControlNamesFromPackageManifestApi0ToApi1: Map<string, string>;
    /** Maps 'TcHmi.Controls.Beckhoff.TcHmiButton' to 'tchmi-button' */
    let mapControlNamesFromPackageManifestApi1ToApi0: Map<string, string>;
}
declare namespace TcHmi.System.Callback {
    /**
     * Creates a Task object which links callstacks
     * ref https://developer.chrome.com/docs/devtools/console/api/#createtask
     * https://developer.chrome.com/blog/devtools-better-angular-debugging/
     * Linking can be disabled with friendlyName set to false.
     * This can be useful to reduce callstack with active devTools
     * @param friendlyName Name for the callstack entry
     * @returns
     */
    function createTask(friendlyName: string | false): Callback.Task;
    /**
     * Interface for a call wrapper
     */
    interface Task {
        run<T>(f: () => T): T;
    }
}
declare namespace TcHmi.System {
    class InternalSymbolManager {
        constructor();
        add(name: string, item: TcHmi.IInternalSymbolItem): void;
        remove(name: string): void;
        update(name: string, item: TcHmi.IInternalSymbolItem): void;
        write(name: string, value: any, dirtyPaths?: string[] | null, callback?: (this: InternalSymbolManager, data: TcHmi.System.InternalSymbolManager.IWriteResultObject) => void): void;
        read(name: string, callback?: (this: InternalSymbolManager, data: TcHmi.System.InternalSymbolManager.IReadResultObject) => void): void;
        getType(name: string, callback: (this: InternalSymbolManager, data: InternalSymbolManager.ITypeResultObject) => void): void;
        watch<T = any>(name: string, callback: (this: void, data: TcHmi.System.InternalSymbolManager.IWatchResultObject<T>) => void): DestroyFunction;
    }
    namespace InternalSymbolManager {
        interface IInternalSymbolItemEx extends TcHmi.IInternalSymbolItem {
            callbacks: IInternalSymbolEntryCallback[];
        }
        interface IInternalSymbolEntryCallback {
            callback: ((this: void, data: TcHmi.System.InternalSymbolManager.IWatchResultObject) => void) | null;
            destroy: DestroyFunction;
        }
        interface ITypeResultObject extends TcHmi.IResultObject {
            /** Information about the expected type as a tchmi reference name */
            type?: string;
        }
        interface IReadResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            dirtyPaths?: string[];
        }
        interface IWriteResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            dirtyPaths?: string[];
        }
        interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            dirtyPaths?: string[];
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
    }
}
declare namespace TcHmi.System {
    class IntervalManager {
        /**
         * Adds a new TcHmi.IIntervalItem
         * @param name The name of the TcHmi.IIntervalItem to add.
         */
        add(name: string, item: TcHmi.IIntervalItem): void;
        /**
         * Removes a TcHmi.IIntervalItem
         * @param name The name of the TcHmi.IIntervalItem to remove.
         */
        remove(name: string): void;
        /**
         * Updates an existing TcHmi.IIntervalItem
         * @param name The name of the TcHmi.IIntervalItem to update.
         */
        update(name: string, itemNew: TcHmi.IIntervalItem): void;
        /**
         * Starts an interval by its name.
         * @param name The name of the interval to start.
         */
        start(name: string): void;
        /**
         * Stops an interval by its name.
         * @param name The name of the interval to stop.
         */
        stop(name: string): void;
    }
    namespace IntervalManager {
        interface IIntervalItemEx extends TcHmi.IIntervalItem {
            intervalId: number;
        }
    }
}
declare namespace TcHmi.System {
    class TemplateParamSymbolManager {
        constructor();
        add(name: string, type: string, value: any): void;
        remove(name: string): void;
        get(name: string): TemplateParamSymbolManager.ITemplateParamSymbolItem | undefined;
        destroy(): void;
        keepAlive(name: string): boolean;
    }
    namespace TemplateParamSymbolManager {
        interface ITemplateParamSymbolItem {
            name: string;
            type: string;
            value: any;
            callbacks: any[];
        }
    }
}
declare namespace TcHmi.System {
    class TimerSymbolManager {
        constructor();
        /**
         * Adds a timer symbol configuration item.
         * @param name Then name of the timer symbol.
         * @param item The configuration item.
         */
        add(name: string, item: TcHmi.ITimerSymbolItem, callbacks?: TimerSymbolManager.ITimerSymbolEntryCallback[]): void;
        /**
         * Removes a timer symbol configuration item.
         * @param name Then name of the timer symbol.
         */
        remove(name: string): void;
        /**
         * Updates a timer symbol configuration item
         * @param name Then name of the timer symbol.
         * @param item The new timer symbol configuration item
         * @returns
         */
        update(name: string, item: TcHmi.ITimerSymbolItem): void;
        /**
         * Reads the current value of a timer symbol.
         * @param name Then name of the timer symbol.
         * @param callback Callback that is raised when the result available.
         */
        read(name: string, callback?: (this: TimerSymbolManager, data: TcHmi.System.TimerSymbolManager.IReadResultObject) => void): void;
        /**
         * Watches the value of a timer symbol.
         * @param name Then name of the timer symbol.
         * @param callback Callback that is raised when the current value changes.
         * @returns {DestroyFunction} A destroy function that releases all watch related resources when called.
         */
        watch<T = any>(name: string, callback: (this: void, data: TcHmi.System.TimerSymbolManager.IWatchResultObject<T>) => void): DestroyFunction;
        /**
         * Returns the type of a timer symbol.
         * @param name Then name of the timer symbol.
         * @param callback Callback that is raised when the result available.
         */
        getType(name: string, callback: (this: TimerSymbolManager, data: TimerSymbolManager.ITypeResultObject) => void): void;
        /**
         * Starts the timer for all timer symbols.
         */
        run(): void;
        /**
         * Stops the timer for all symbols.
         */
        stop(): void;
    }
    namespace TimerSymbolManager {
        /**
         * Type Guard which checks TcHmi.ITimerSymbolPatternItem object for 'value' property
         * @param value object to test
         */
        function isValuePatternItem(value: TcHmi.ITimerSymbolPatternItem): value is TcHmi.ITimerSymbolValuePatternItem;
        /**
         * Type Guard which checks TcHmi.ITimerSymbolPatternItem object for 'symbol' property
         * @param value object to test
         */
        function isSymbolPatternItem(value: TcHmi.ITimerSymbolPatternItem): value is ITimerSymbolSymbolPatternItemEx;
        interface ITimerSymbolItemEx extends TcHmi.ITimerSymbolItem {
            callbacks: ITimerSymbolEntryCallback[];
            active: boolean;
            destroy: DestroyFunction;
        }
        interface ITimerSymbolSymbolPatternItemEx extends TcHmi.ITimerSymbolSymbolPatternItem {
            symbolPending?: boolean;
            symbolValue?: any;
        }
        interface ITimerSymbolEntryCallback {
            callback: ((this: void, data: TcHmi.System.TimerSymbolManager.IWatchResultObject) => void) | null;
            lastReportedValue?: any;
            destroy: DestroyFunction;
        }
        interface ITimerSymbolPatternMetaData {
            items: Map<string, TimerSymbolManager.ITimerSymbolItemEx>;
            pattern: number[];
            currentIndex: number;
            timeoutId: number;
        }
        interface ITypeResultObject extends TcHmi.IResultObject {
            /** Information about the expected type as a tchmi reference name */
            type?: string;
        }
        interface IReadResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            dirtyPaths?: string[];
        }
        interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            dirtyPaths?: string[];
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
    }
}
declare namespace TcHmi.Controls {
    /**
     * TwinCAT HMI System Controls
     * Check out
     * https://infosys.beckhoff.com/content/1031/te2000_tc3_hmi_engineering/3729751819.html?id=437693173022431772
     * for an API reference.
     * @preserve (Part of the public API)
     */
    namespace System {
    }
    /** Constructor which generates a TcHmi Control.
     * @template C defines the type for the control
     */
    interface baseTcHmiControlConstructor<C extends TcHmi.Controls.System.baseTcHmiControl = TcHmi.Controls.System.baseTcHmiControl> {
        new (element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList): C;
        readonly prototype: C;
    }
}
declare namespace TcHmi.Controls.System {
    /**
     * Abstract base class for all TwinCAT HMI Controls.
     * Needed for handling controls in Framework APIs.
     * Check out
     * https://infosys.beckhoff.com/content/1031/te2000_tc3_hmi_engineering/3845361931.html?id=3265481440996758836
     * for an API reference.
     * @preserve (Part of the public API)
     */
    abstract class baseTcHmiControl {
        /**
         * Constructor
         */
        constructor();
        /**
         * Main HTML Element of the Control as jQuery object.
         * @preserve (Part of the public API)
         */
        abstract getElement(): JQuery;
        /**
         * Precompiled copy of main JQuery element defining this control.
         * @preserve (Part of the public API)
         */
        abstract getPcElement(): JQuery;
        /**
         * Set __pcElement (with cleaned prevObj jQuery Stack)
         * @param value
         */
        abstract __setPcElement(value: JQuery): void;
        /**
         * List of attributes defined in html.
         * @preserve (Part of the public API)
         */
        abstract getAttrs(): TcHmi.Controls.ControlAttributeList;
        /**
         * Type of the control as full qualified name like 'TcHmi.Controls.Beckhoff.TcHmiButton'
         * @preserve (Part of the public API)
         */
        abstract getType(): string;
        /**
         * Control Id
         * @preserve (Part of the public API)
         */
        abstract getId(): string;
        /**
         * Get all children controls.
         * Only readable access to them is good practice for most parent controls.
         */
        abstract getChildren(): TcHmi.Controls.System.baseTcHmiControl[];
        /**
         * Get dynamic virtual access definition of an instance of a control
         * @param name name of the control right to fetch
         */
        getDescriptionAccessByName?(name: string): TcHmi.Controls.ControlAccessDescription | null;
        /**
         * Returns a boolean determining if the control is initialized.
         * @preserve (Part of the public API)
         */
        abstract getIsInitialized(): boolean;
        /**
         * Returns a boolean determining if the control is attached to the dom.
         * @preserve (Part of the public API)
         */
        abstract getIsAttached(): boolean;
        /**
         * Current life cycle states
         */
        abstract getLifeCycleState(): {
            initialized: boolean;
            attached: boolean;
            /** Detach in progress (in region switching for example) */
            detaching: boolean;
            destroyed: boolean;
        };
        /**
         * Returns a boolean determining if the control was already destroyed.
         * @preserve (Part of the public API)
         */
        abstract getIsDestroyed(): boolean;
        /**
         * Set the internal state of a control
         */
        abstract __setLifeCycleState(doNotCallThisApi: number): void;
        /**
         * Returns a boolean determining if the control should not be destroyed.
         * @preserve (Part of the public API)
         */
        abstract getKeepAlive(): boolean;
        /**
         * Sets __keepAlive
         * @param value
         */
        abstract __setKeepAlive(value: boolean): void;
        /**
         * Sets __keepAlive
         * @param value
         */
        abstract __getKeepAlive(): boolean;
        /**
         * Returns a boolean determining if the control is a container control.
         * @preserve (Part of the public API)
         */
        abstract getIsContainerControl(): boolean;
        /**
         * Parent control or null if there is (till now?) no parent control.
         * @preserve (Part of the public API)
         */
        abstract getParent(): TcHmi.Controls.System.baseTcHmiControl | null;
        /**
         * Sets __parent
         * @param value
         */
        abstract __setParent(value: TcHmi.Controls.System.baseTcHmiControl | null): void;
        /**
         * Adds a child to this control and handles the hierarchical management layer.
         * If this is a container control it will append child's DOM element to the container DOM.
         * @param control Class instance of the child.
         * @param pos Optional index of the position for the new child.
         */
        abstract __addChild(control: TcHmi.Controls.System.baseTcHmiControl, pos?: number | null): void;
        /**
         * Remove a child from a control if this is a container control.
         * @param control
         */
        abstract __removeChild(control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Returns the Row index of the Control inside a TcHmiGrid Container.
         * @preserve (Part of the public API)
         */
        abstract getGridRowIndex(): number | undefined;
        /**
         * Sets a new GridRow index
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setGridRowIndex(valueNew: number | null): void;
        /**
         * Returns the Column index of the Control inside a TcHmiGrid Container.
         * @preserve (Part of the public API)
         */
        abstract getGridColumnIndex(): number | undefined;
        /**
         * Sets a new GridColumn index
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setGridColumnIndex(valueNew: number | null): void;
        /**
         * Returns the configured defaultInternalValue of the control property
         * @param propertyName
         * @template T Type of the default value
         * @preserve (Part of the public API)
         */
        protected abstract getAttributeDefaultValueInternal<T = any>(propertyName: string): T | null;
        /**
         * Is raised before control attribute setters are called to allow initialization based on current attribute values.
         * @preserve (Part of the public API)
         */
        abstract __previnit(): void;
        /**
         * Is raised after control attribute setters have been called to allow initialization based on current attribute values.
         * @preserve (Part of the public API)
         */
        abstract __init(): void;
        /**
         * Is called of control is attached to the dom.
         * @preserve (Part of the public API)
         */
        abstract __attach(): void;
        /**
         * Is called if control is detached from the dom.
         * @preserve (Part of the public API)
         */
        abstract __detach(): void;
        /**
         * Destroy the current control instance.
         * Will be called automatically if system destroys control!
         * @preserve (Part of the public API)
         */
        abstract destroy(): void;
        /**
         * AccessConfig
         * @preserve (Part of the public API)
         */
        abstract getAccessConfig(): AccessControl[];
        /**
         * Sets the new AccessConfig
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setAccessConfig(valueNew: AccessControl[] | null): void;
        /**
         * Processes the current AccessConfig attribute value.
         * @preserve (Part of the public API)
         */
        abstract __processAccessConfig(): void;
        /**
         * Returns the VirtualControlRightMapping so it can react on parent control virtual rights.
         * @preserve (Part of the public API)
         */
        abstract getVirtualControlRightMappings(): VirtualControlRightMapping[];
        /**
         * Sets the new VirtualControlRightMapping so it can react on parent control virtual rights.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setVirtualControlRightMappings(valueNew: VirtualControlRightMapping[] | null): void;
        /**
         * Returns the effective value of isEnabled based on own and parent isEnabled variable.
         * @preserve (Part of the public API)
         */
        abstract getIsEnabled(): boolean | undefined;
        /**
         * Sets the isEnabled attribute and calls the associated process function (processIsEnabled).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setIsEnabled(valueNew: boolean | null): void;
        /**
         * Processes and publish the current isEnabled attribute value and of its children.
         */
        abstract __processIsEnabled(): void;
        /**
         * List of classes of the control.
         * @preserve (Part of the public API)
         */
        abstract getClassNames(): string[] | undefined;
        /**
         * Defines the classes the control is part of.
         * @param valueNew
         */
        abstract setClassNames(valueNew: string[] | null): void;
        abstract __injectRenderedDimensions(doNotCallThisApi: object): void;
        /**
         * Returns the current width of the Control.
         * @preserve (Part of the public API)
         */
        abstract getWidth(): number | null | undefined;
        /**
         * Width processor
         * @param callerControl
         */
        abstract __processWidth(callerControl?: baseTcHmiControl): void;
        /**
         * Returns the current width unit of the Control.
         * @preserve (Part of the public API)
         */
        abstract getWidthUnit(): DimensionUnit | undefined;
        /**
         * Returns the current width mode of the control.
         * @preserve (Part of the public API)
         */
        abstract getWidthMode(): SizeMode | SizeModeWithContent | undefined;
        /**
         * Returns if inner dimension depends on child controls.
         * @preserve (Part of the public API)
         */
        abstract innerWidthDependsOnChilds(): boolean;
        /**
         * Updates the inner dimension depending on child controls.
         * @preserve (Part of the public API)
         */
        abstract updateInnerWidthDependingOnChilds(): void;
        /**
         * Returns the current height of the Control.
         * @preserve (Part of the public API)
         */
        abstract getHeight(): number | null | undefined;
        /**
         * Processing of Height
         * @param callerControl
         */
        abstract __processHeight(callerControl?: baseTcHmiControl): void;
        /**
         * Returns the current height mode of the control.
         * @preserve (Part of the public API)
         */
        abstract getHeightMode(): SizeMode | SizeModeWithContent | undefined;
        /**
         * Returns if inner dimension depends on child controls.
         * @preserve (Part of the public API)
         */
        abstract innerHeightDependsOnChilds(): boolean;
        /**
         * Updates the inner dimension depending on child controls.
         * @preserve (Part of the public API)
         */
        abstract updateInnerHeightDependingOnChilds(): void;
        /**
         * Returns the current height unit of the Control.
         * @preserve (Part of the public API)
         */
        abstract getHeightUnit(): DimensionUnit | undefined;
        /**
         * Returns the current top coordinate of the Control.
         * @preserve (Part of the public API)
         */
        abstract getTop(): number | null | undefined;
        /**
         * Returns the current top coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        abstract getTopUnit(): DimensionUnit | undefined;
        /**
         * Returns the current left coordinate of the Control.
         * @preserve (Part of the public API)
         */
        abstract getLeft(): number | null | undefined;
        /**
         * Returns the current left coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        abstract getLeftUnit(): DimensionUnit | undefined;
        /**
         * Returns the current bottom coordinate of the Control.
         * @preserve (Part of the public API)
         */
        abstract getBottom(): number | null | undefined;
        /**
         * Returns the current bottom coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        abstract getBottomUnit(): DimensionUnit | undefined;
        /**
         * Returns the current right coordinate of the Control.
         * @preserve (Part of the public API)
         */
        abstract getRight(): number | null | undefined;
        /**
         * Returns the current right coordinate unit of the Control.
         * @preserve (Part of the public API)
         */
        abstract getRightUnit(): DimensionUnit | undefined;
        /**
         * Returns the current minwidth value.
         * @preserve (Part of the public API)
         */
        abstract getMinWidth(): number | null | undefined;
        /**
         * Returns the current minwidth unit.
         * @preserve (Part of the public API)
         */
        abstract getMinWidthUnit(): DimensionUnit | undefined;
        /**
         * Returns the current minheight value.
         * @preserve (Part of the public API)
         */
        abstract getMinHeight(): number | null | undefined;
        /**
         * Returns the current maxwidth value.
         * @preserve (Part of the public API)
         */
        abstract getMaxWidth(): number | null | undefined;
        /**
         * Returns the current maxwidth unit.
         * @preserve (Part of the public API)
         */
        abstract getMaxWidthUnit(): DimensionUnit | undefined;
        /**
         * Returns the current maxheight value.
         * @preserve (Part of the public API)
         */
        abstract getMaxHeight(): number | null | undefined;
        /**
         * Returns the current maxheight unit.
         * @preserve (Part of the public API)
         */
        abstract getMaxHeightUnit(): DimensionUnit | undefined;
        /**
         * Returns the current rendered left value in pixel.
         * @preserve (Part of the public API)
         */
        abstract getRenderedLeft(): number | null;
        /**
         * Returns the current rendered top value in pixel.
         * @preserve (Part of the public API)
         */
        abstract getRenderedTop(): number | null;
        /**
         * Returns the current rendered right value in pixel.
         * @preserve (Part of the public API)
         */
        abstract getRenderedRight(): number | null;
        /**
         * Returns the current rendered bottom value in pixel.
         * @preserve (Part of the public API)
         */
        abstract getRenderedBottom(): number | null;
        /**
         * Returns the current rendered width value in pixel.
         * @preserve (Part of the public API)
         */
        abstract getRenderedWidth(): number | null;
        /**
         * Returns the current rendered height value in pixel.
         * @preserve (Part of the public API)
         */
        abstract getRenderedHeight(): number | null;
        /**
         * Sets the value of the width attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setWidth(valueNew: number | null): void;
        /**
         * Sets the unit of the width attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setWidthUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the width mode attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setWidthMode(valueNew: SizeMode | null): void;
        /**
         * Sets the value of the height attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setHeight(valueNew: number | null): void;
        /**
         * Sets the value of the height mode attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setHeightMode(valueNew: SizeMode | null): void;
        /**
         * Sets the unit of the height attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setHeightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Returns the calculated width in pixel if self defined (not percent based) or based on the children.
         * max-width overrides width, but min-width overrides max-width.
         */
        abstract __getContentWidth(): number | null;
        /**
         * Returns the calculated height in pixel if self defined (not percent based) or based on the children.
         * max-height overrides height, but min-height overrides max-height.
         */
        abstract __getContentHeight(): number | null;
        /**
         * Sets the value of the top attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setTop(valueNew: number | null): void;
        /**
         * Sets the unit of the top attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setTopUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the left attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setLeft(valueNew: number | null): void;
        /**
         * Sets the unit of the left attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setLeftUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the bottom attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBottom(valueNew: number | null): void;
        /**
         * Sets the unit of the bottom attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBottomUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the right attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setRight(valueNew: number | null): void;
        /**
         * Sets the unit of the right attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setRightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the minwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMinWidth(valueNew: number | null): void;
        /**
         * Sets the unit of the minwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMinWidthUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the minheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMinHeight(valueNew: number | null): void;
        /**
         * Returns the current minheight unit.
         * @preserve (Part of the public API)
         */
        abstract getMinHeightUnit(): DimensionUnit | undefined;
        /**
         * Sets the unit of the minheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMinHeightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the maxwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMaxWidth(valueNew: number | null): void;
        /**
         * Sets the unit of the maxwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMaxWidthUnit(valueNew: DimensionUnit | null): void;
        /**
         * Sets the value of the maxheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMaxHeight(valueNew: number | null): void;
        /**
         * Sets the unit of the maxheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setMaxHeightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Returns the current zindex value.
         * @preserve (Part of the public API)
         */
        abstract getZindex(): number | null | undefined;
        /**
         * Sets the value of the zindex attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setZindex(valueNew: number | null): void;
        /**
         * Returns the current opacity value.
         * Sets the value of the zindex attribute.
         * @preserve (Part of the public API)
         */
        abstract getOpacity(): number | null | undefined;
        /**
         * Sets the value of the opacity attribute. The value must be between 0 (0%) and 1 (100%).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setOpacity(valueNew: number | null): void;
        /**
         * Returns the current visibility value.
         * @preserve (Part of the public API)
         */
        abstract getVisibility(): Visibility | undefined;
        /**
         * Sets the value of the visibility attribute.
         * @param valueNew The new visibility value.
         * @preserve (Part of the public API)
         */
        abstract setVisibility(valueNew: Visibility | null): void;
        /**
         * Returns the current transform value.
         * @preserve (Part of the public API)
         */
        abstract getTransform(): Transform[] | null | undefined;
        /**
         * Sets the value of the transform attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setTransform(valueNew: Transform[] | null): void;
        /**
         * Returns the current background value.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundColor(): SolidColor | LinearGradientColor | null | undefined;
        /**
         * Sets the background value and calls the associated process function (processBackground).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundColor(valueNew: Color | null): void;
        /**
         * Returns the current value of the member variable backgroundImage.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImage(): string | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImage" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImage) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImage(valueNew: string | null): void;
        /**
         * Returns the current value of the member variable backgroundImagePadding.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImagePadding(): FourSidedCss | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImagePadding" if the new value is not equal to the current value
         * and calls the associated process function (processBackgroundImagePadding) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImagePadding(valueNew: FourSidedCss | null): void;
        /**
         * Returns the current value of the member variable backgroundImageWidth.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImageWidth(): number | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImageWidth" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageWidth) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImageWidth(valueNew: number | null): void;
        /**
         * Returns the current value of the member variable backgroundImageWidthUnit.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImageWidthUnit(): DimensionUnit | undefined;
        /**
         * Sets the value of the member variable "backgroundImageWidthUnit" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageWidthUnit) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImageWidthUnit(valueNew: DimensionUnit | null): void;
        /**
         * Returns the current value of the member variable backgroundImageHeight.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImageHeight(): number | null | undefined;
        /**
         * Sets the value of the member variable "backgroundImageHeight" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageHeight) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImageHeight(valueNew: number | null): void;
        /**
         * Returns the current value of the member variable backgroundImageHeightUnit.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImageHeightUnit(): DimensionUnit | undefined;
        /**
         * Sets the value of the member variable "backgroundImageHeightUnit" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageHeightUnit) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImageHeightUnit(valueNew: DimensionUnit | null): void;
        /**
         * Returns the current value of horizontalBackgroundImageAligment.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImageHorizontalAlignment(): HorizontalAlignment | undefined;
        /**
         * Sets the backgroundImageHorizontalAlignment value and calls the associated process function (processBackgroundImageHorizontalAlignment).
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImageHorizontalAlignment(valueNew: TcHmi.HorizontalAlignment | null): void;
        /**
         * Returns the current value of backgroundImageVerticalAlignment.
         * @preserve (Part of the public API)
         */
        abstract getBackgroundImageVerticalAlignment(): VerticalAlignment | undefined;
        /**
         * Sets the backgroundImageVerticalAlignment value and calls the associated process function (processBackgroundImageVerticalAlignment).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBackgroundImageVerticalAlignment(valueNew: TcHmi.VerticalAlignment | null): void;
        /**
         * Returns the current border-color value.
         * @preserve (Part of the public API)
         */
        abstract getBorderColor(): Color | null | undefined;
        /**
         * Sets the border-color attribute value and calls the associated process function (processBorderColor).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBorderColor(valueNew: Color | null): void;
        /**
         * Returns the current border-width value.
         * @preserve (Part of the public API)
         */
        abstract getBorderWidth(): BorderWidth | null | undefined;
        /**
         * Sets the border-width attribute value and calls the associated process function (processBorderWidth).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBorderWidth(valueNew: BorderWidth | null): void;
        /**
         * Returns the current border-radius value.
         * @preserve (Part of the public API)
         */
        abstract getBorderRadius(): BorderRadius | null | undefined;
        /**
         * Sets the border-radius attribute value and calls the associated process function (processBorderRadius).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBorderRadius(valueNew: BorderRadius | null): void;
        /**
         * Internal reference to the attribute "data-tchmi-border-type".
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setBorderStyle(valueNew: BorderStyle | null): void;
        /**
         * Returns the current border-style value.
         * @preserve (Part of the public API)
         */
        abstract getBorderStyle(): BorderStyle | null | undefined;
        /**
         * Sets the internal reference to the attribute "data-tchmi-box-shadow".
         * @preserve (Part of the public API)
         */
        abstract setBoxShadow(valueNew: BoxShadow[] | null): void;
        /**
         * Returns the current box-shadow value.
         * @preserve (Part of the public API)
         */
        abstract getBoxShadow(): BoxShadow[] | null | undefined;
        /**
         * Returns the current value of tooltip.
         * @preserve (Part of the public API)
         */
        abstract getTooltip(): string | null | undefined;
        /**
         * Sets the tooltip attribute and calls the associated process function (processTooltip).
         * @param valueNew
         * @preserve (Part of the public API)
         */
        abstract setTooltip(valueNew: string | null): void;
        /**
         * Sets the focus to main html input / textarea element if available.
         */
        focus?(): void;
    }
}
declare namespace TcHmi.System {
    class AccessManager {
        /**
         */
        constructor();
        /**
         * Overrides a control access right to Deny state. Call with null to release the force again.
         * @param control
         * @param accessrightToOverride name of the access right
         * @param forcedRight
         */
        setControlRightOverride(control: Readonly<Controls.System.baseTcHmiControl>, accessrightToOverride: string, forcedRight: 'Deny' | null): void;
        /**
         * Returns a Set with a list of all overridden deny rights for a control.
         * Gives an empty Set when no right is overridden.
         * @param control Control to check
         */
        getControlRightOverrides(control: Readonly<Controls.System.baseTcHmiControl>): Set<string>;
        /**
         * Get current user config
         */
        getCurrentUserConfig(): Server.userConfigOnServer;
        /**
         * Reload on next logout aka user change to '__SystemGuest'
         * @param value Reload hmi after session login/logout
         */
        enableReload(value: boolean): void;
        /**
         * Returns true if the AccessManager has loaded server user data for at least the first time and is ready to use.
         */
        isReady(): boolean;
        /**
         * Unsubscribe from server symbols required for user related access handling.
         */
        unsubscribe(callback?: (this: void, data: TcHmi.IResultObject) => void): void;
        /**
         * Subscribe to server symbols required for user related access handling.
         * @param callback Will be called after successful register of the subscription
         */
        subscribe(callback?: (this: void, data: TcHmi.IResultObject) => void): void;
        /**
         * Checks if a right is allowed for the current user on this control or its parents
         * Rules for granting access:
         *      - Designer Mode Master => true
         *      - Server Auth is not restricted (IsAuthRequired == false in Server) => TRUE
         *      - Server Auth is not known right now => null
         *      - Server Auth loading error => false
         *      - On this control: 1 Group  has  ALLOW, 0-n Group have DENY => TRUE
         *      - On this control: 0 Groups have ALLOW, but 1 Group has DENY => FALSE
         *      - On this control: 0 Groups have ALLOW, 0 Groups have DENY => Ask Parent
         *      - use control default of the bottom most control with this right. TcHmi.Controls.System.TcHmiView has operate/observe set to TRUE
         *      - control has no parent (detached control) => null
         * @param control Control to check
         * @param requestedAccessright name of the access right
         * @returns true/false or null if the state is not known right now
         */
        checkAccess(control: Readonly<Controls.System.baseTcHmiControl>, requestedAccessright: string): boolean | null;
        /** Logout is async because of subscription handling. */
        private __logoutSent;
    }
}
declare namespace TcHmi.System {
    /**
     */
    class AnimationProvider {
        constructor();
        createAnimationController(animation: Animation, statusChangeCallback: (status: Animation.Status) => void): AnimationController;
    }
    interface AnimationController {
        isValid: () => boolean;
        run: () => void;
        pause: () => void;
        skip: () => void;
        reset: (callback?: () => void) => void;
        cleanup: () => void;
    }
}
declare namespace TcHmi.System {
    class AuditTrail {
        static isEnabled: boolean;
        private static __running;
        static run(done: (this: void) => void): void;
    }
}
declare namespace TcHmi.System {
    class AutomationCommandManager {
        constructor();
        postMessageToParent(message: TcHmiAutomationCommand): void;
    }
}
declare namespace TcHmi.System {
    namespace InteractiveWrite {
        class Queue {
            private static __inc;
            private static __queue;
            private static __current;
            private static __fetchId;
            private static __next;
            static add(symbol: UiProvider.PopupProvider.InteractiveWritePrompt.Symbol, options?: UiProvider.PopupProvider.InteractiveWritePrompt.Options | null, parentControl?: TcHmi.Controls.System.baseTcHmiControl | null): Queue.Item;
            static remove(id: number): void;
        }
        namespace Queue {
            interface Item {
                id: number;
                promise: Promise<{
                    isOk: true;
                    value: UiProvider.PopupProvider.InteractiveWritePrompt.Value;
                } | {
                    isOk: false;
                    value?: UiProvider.PopupProvider.InteractiveWritePrompt.Value;
                }>;
            }
        }
    }
}
declare namespace TcHmi.System {
    class Binding {
        private static __compareTiming;
        constructor(expression: string, propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl);
        private __lastReportedError;
        /**
         * Destroy the Binding
         */
        destroy(): void;
        getExpression(): string;
        getSymbol(): Symbol | null;
        getPropertyName(): string;
        getControl(): TcHmi.Controls.System.baseTcHmiControl | null;
        getState(): Binding.State;
        getPreload(): boolean;
        getPartial(): TcHmi.Controls.System.baseTcHmiControl | null;
        /**
         * Watches the binding for state changes.
         * @param callback
         */
        watchState(callback: (this: Binding, data: TcHmi.System.Binding.IWatchStateResultObject) => void): DestroyFunction;
    }
    namespace Binding {
        enum State {
            Invalid = 0,
            Error = 1,
            Initializing = 100,
            Resuming = 200,
            Preloading = 300,
            Initialized = 400,
            Ready = 500,
            Suspended = 600,
            Destroyed = 700
        }
        interface IWatchStateEntry {
            callback: (this: Binding, data: TcHmi.System.Binding.IWatchStateResultObject) => void;
            destroy?: TcHmi.DestroyFunction;
        }
        interface IWatchStateResultObject extends TcHmi.IResultObject {
            binding: TcHmi.System.Binding;
            state: Binding.State;
            stateOld: Binding.State;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
    }
}
declare namespace TcHmi.System {
    /**
     */
    class BindingManager {
        constructor();
        /**
         * @param partialUrl
         */
        getPreloadingBindings(): Set<Binding>;
        /**
         * @param partialUrl
         */
        getPreloadingBindingsByPartial(partial: TcHmi.Controls.System.baseTcHmiControl): Set<Binding>;
        /**
         * @param partialUrl
         */
        getPreloadingBindingsByControl(control: TcHmi.Controls.System.baseTcHmiControl): Set<Binding>;
        /**
         * @param partialUrl
         * @param callback
         */
        watchPreloadingBindings(callback: (this: BindingManager, data: BindingManager.IWatchPreloadingBindingsResultObject) => void): DestroyFunction;
        /**
         * @param partialUrl
         * @param callback
         */
        watchPreloadingBindingsByPartial(partial: TcHmi.Controls.System.baseTcHmiControl, callback: (this: BindingManager, data: BindingManager.IWatchPreloadingBindingsResultObject) => void): DestroyFunction;
        /**
         * @param partialUrl
         * @param callback
         */
        watchPreloadingBindingsByControl(control: TcHmi.Controls.System.baseTcHmiControl, callback: (this: BindingManager, data: BindingManager.IWatchPreloadingBindingsResultObject) => void): DestroyFunction;
        /**
         * @param propertyName
         * @param fnThis
         */
        getBinding(propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl): Binding | null;
        /**
         * @param control
         */
        getBindingsByControl(control: TcHmi.Controls.System.baseTcHmiControl): Map<string, Binding> | undefined;
        /**
         * Creates a binding between a symbol and a control attribute setter.
         * This function throws an exception if the binding is not valid.
         * @param expression
         * @param propertyName
         * @param control
         */
        createBinding(expression: string, propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl): Binding;
        /**
         * Removes a binding between a symbol and a control attribute setter.
         * @param propertyName
         * @param control
         * @param bResetSetter
         */
        removeBinding(propertyName: string, control: TcHmi.Controls.System.baseTcHmiControl, bResetSetter?: boolean): void;
    }
    namespace BindingManager {
        interface IWatchPreloadingBindingsEntry {
            callback: (this: BindingManager, data: BindingManager.IWatchPreloadingBindingsResultObject) => void;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
        interface IWatchPreloadingBindingsByPartialEntry {
            partial: TcHmi.Controls.System.baseTcHmiControl;
            callback: (this: BindingManager, data: BindingManager.IWatchPreloadingBindingsResultObject) => void;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
        interface IWatchPreloadingBindingsByControlEntry {
            control: TcHmi.Controls.System.baseTcHmiControl;
            callback: (this: BindingManager, data: BindingManager.IWatchPreloadingBindingsResultObject) => void;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
        interface IWatchPreloadingBindingsResultObject extends TcHmi.IResultObject {
            result: Set<Binding>;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
    }
}
declare namespace TcHmi.System {
    class ControlManager {
        #private;
        constructor();
        /** Resolves UserControl attribute meta data. */
        resolveUcAttributes(): void;
        /**
         * Will raise a detach for the control even if it's still part of the dom.
         * Caller has to grant that control will be removed from dom.
         */
        forceDetach(ctrl: TcHmi.Controls.System.baseTcHmiControl | undefined): void;
        /**
         * Checks dimension and position changes for a set of controls or all
         * @returns a list of all delayed controls for the user events
         */
        checkControlGeometry(options?: {
            geos?: TcHmi.System.ControlManager.ControlGeoData | Map<string, TcHmi.System.ControlManager.ControlGeoData> | Set<TcHmi.System.ControlManager.ControlGeoData>;
            /**
             * User events are not raised and returned in the return value.
             * The caller is responsible for raising them later!
             * Defaults to false */
            delayUserEvents?: boolean;
            /** Refresh check even when not dirty. Defaults to false */
            force?: boolean;
            checkReason?: string;
        }): {
            skippedResizedEventList: Controls.System.baseTcHmiControl[];
            skippedMovedEventList: Controls.System.baseTcHmiControl[];
        };
        /**
         * Checks dimension and position changes for a set of controls or all
         * @returns a list of all delayed controls for the user events
         */
        checkControlGeometryByControl(control: TcHmi.Controls.System.baseTcHmiControl): void;
        /** All current controls as a Map with its name as the map key */
        getControlsCache(): Map<string, TcHmi.Controls.System.baseTcHmiControl>;
        /**
         * Sets the a value of a property
         * If the value is null it will set the default value to the property and locks it with a watcher which will keep it on theme change.
         * @param control
         * @param propertyName
         * @param valueNew new value or null if lock to Theme
         */
        setControlProperty(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string, valueNew: any | null, dirtyPaths?: string[]): TcHmi.IErrorDetails;
        /**
         * These schema do not reference a file path.
         * Value is the schema id.
         */
        private __schemaWithNoPath;
        /**
         * Sets the a value of a property (Warning: this does not check for readonly flag!)
         * If the value is null it will set the default value to the property and locks it with a watcher which will keep it on theme change.
         * @param control
         * @param attribute
         * @param valueNew new value or null if lock to Theme
         */
        setControlPropertyByAttribute(control: TcHmi.Controls.System.baseTcHmiControl, attribute: TcHmi.ControlAttributeDescription, valueNew: any | null, dirtyPaths?: string[]): TcHmi.IErrorDetails;
        /** Destruct a control instance */
        destruct(control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * Creates a new control.
         * The new control HTMLElement, available via getElement(), can be attached to the DOM afterwards.
         * @template C defines the type for the control to compile
         */
        compile<C extends TcHmi.Controls.System.baseTcHmiControl>(elem: Element, parent?: TcHmi.Controls.System.baseTcHmiControl | null, options?: {
            pos?: number | null;
            designerIgnore?: boolean;
            overrideAttr?: Dictionary<any> | null;
        }): ControlManager.CompileResult<C>;
        /** Resolve the inheritation of a control description */
        resolveDescriptionInheritation(): void;
        getInheritanceTree(): ControlManager.InheritanceHierarchyEntry | undefined;
        /**
         * Get description by type
         * @param type
         */
        getDescription(type: string | undefined | null): ControlDescriptionWithInheritance | null;
        /**
         * Get a list of all types which the inheritance of the requested control type defines
         * @param type
         */
        getDescriptionTypes(type: string | undefined | null): string[];
        isRegisteredDescriptionType(type: string | undefined | null): boolean;
        /** Get Description path from DescriptionCacheEntry
         * @param type
         */
        getDescriptionPath(type: string | undefined | null): string | null;
        getDescriptionAttributes(type: string | undefined | null): TcHmi.ControlAttributeDescription[] | null;
        /**
         * Returns a list of access rights of a control type.
         * @param type control type name
         */
        getDescriptionAccess(type: string | undefined | null): TcHmi.Controls.ControlAccessDescription[] | null;
        /**
         * Get control attribute section from Description.json by name (will be lowercased for comparison)
         * @param type control type name
         * @param name
         */
        getDescriptionAttributeByName(type: string | null | undefined, name: string | null | undefined): TcHmi.ControlAttributeDescription | null;
        /**
         * Get control attribute section from Description.json by PropertyName
         * @param type control type name
         * @param propertyName
         */
        getDescriptionAttributeByPropertyName(type: string | undefined | null, propertyName: string | undefined): TcHmi.ControlAttributeDescription | null;
        /**
         * Get UserControl attribute section from Description.json by PropertyName
         * @param ucConfigUrl
         * @param propertyName
         */
        getUserControlConfigAttributeByPropertyName(ucConfigUrl: string, propertyName: string): TcHmi.ControlAttributeDescription | null;
        /**
         * Get control attribute section from Description.json by SetterName
         * @param type control type name
         * @param propertySetterName
         */
        getDescriptionAttributeByPropertySetterName(type: string | undefined | null, propertySetterName: string): TcHmi.ControlAttributeDescription | null;
        /**
         * Get control attribute section from Description.json by SetterName
         * @param type control type name
         * @param propertyGetterName
         */
        getDescriptionAttributeByPropertyGetterName(type: string | undefined | null, propertyGetterName: string): TcHmi.ControlAttributeDescription | null;
        /**
         * Get control attribute section from Description.json by SetterName
         * @param type control type name
         */
        getDescriptionLanguages(type: string | undefined | null): ControlLanguages | null;
        /**
         * Gets attribute description by name of property and does not determine between description and usercontrol attributes.
         * @param control
         * @param propertyName
         */
        getAttributeByPropertyName(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string | undefined): TcHmi.ControlAttributeDescription | null;
        /**
         * Gets attribute description by name of property and does not determine between description and usercontrol attributes.
         * @param control
         * @param propertyName
         */
        getAttributeTypeByPropertyName(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): ControlAttributeType;
        /**
         * Gets attribute description by name of property setter and does not determine between description and usercontrol attributes.
         * @param control
         * @param propertySetterName
         */
        getAttributeByPropertySetterName(control: TcHmi.Controls.System.baseTcHmiControl, propertySetterName: string): TcHmi.ControlAttributeDescription | null;
        /**
         * Gets attribute description by name of property getter and does not determine between description and usercontrol attributes.
         * @param control
         * @param propertyGetterName
         */
        getAttributeByPropertyGetterName(control: TcHmi.Controls.System.baseTcHmiControl, propertyGetterName: string): TcHmi.ControlAttributeDescription | null;
        /**
         * Gets inherited access of a control
         * @param type control type name
         * @param name name of the control right to fetch
         */
        getDescriptionAccessByName(type: string, name: string): TcHmi.Controls.ControlAccessDescription | null;
    }
    namespace ControlManager {
        interface CompileResult<C extends TcHmi.Controls.System.baseTcHmiControl> extends IResultObject {
            control?: C | undefined;
        }
        /** Geometric data of a control */
        interface ControlGeoData {
            ctrl: TcHmi.Controls.System.baseTcHmiControl;
            layoutData: ControlLayoutData;
            /** Detected some changes which could change rendered size. So recheck it. */
            isDirty: boolean;
            /** This or parent control is/was collapsed. */
            isCollapsed: boolean;
        }
        /** A move can be Local and Global or if the container was moved Global only */
        const enum ControlMoveType {
            None = 0,
            Local = 1,
            Global = 2
        }
        interface InheritanceHierarchyEntry {
            controlType: string;
            children: InheritanceHierarchyEntry[];
        }
        interface InitialElementCacheEntry {
            controlId: string;
            /** outerHtml from first compile of this control (runtime data) */
            outerHtml: string;
            /** html attributes from first compile. key: lowercase attribute names (beware: html is lowercase only) (no runtime data!) */
            htmlAttributeMap: Map<string, {
                type: 'static' | 'injected' | 'binding' | 'delayed';
                attribute?: ControlAttribute;
            }>;
            /** Inner attribute values from first compile. Lowercase attribute names (beware: html is lowercase only) (runtime data) */
            injectedAttributeMap: Map<string, any>;
            /** parsed html attributes from first compile. (no runtime data!) */
            attributeList: IResolveAttributesResultObject;
        }
    }
}
declare namespace TcHmi.System.Diagnostics {
    /**
     * Provides functionality for diagnostics of framework to server communication.
     */
    class Server {
        /**
         * Starts the diagnostics logging.
         * @param lazy If set to true TCHMI_DIAGNOSTICS_SERVER has to be set to true or diagnostics will not be initialized.
         *             If set to false or if it is not defined TCHMI_DIAGNOSTICS_SERVER will be forced to true.
         */
        static start(lazy?: boolean): void;
        /**
         * Stops the diagnostics logging.
         */
        static stop(): void;
        /**
         * Called from TcHmi.System.ServerManager if a request is registered.
         * Do not call this function manually.
         * @param request
         */
        static requestRegistered(request: ServerManager.IRequestEntry): void;
        /**
         * Called from TcHmi.System.ServerManager if a request is queued.
         * Do not call this function manually.
         * @param request
         */
        static requestQueued(request: ServerManager.IRequestEntry): void;
        /**
         * Called from TcHmi.System.ServerManager if a request is send via websocket.
         * Do not call this function manually.
         * @param request
         */
        static requestSent(request: ServerManager.IRequestEntry): void;
        /**
         * Called from TcHmi.System.ServerManager if a request response was received via websocket.
         * Do not call this function manually.
         * @param request
         * @param response
         */
        static requestReceived(request: ServerManager.IRequestEntry, response: TcHmi.Server.IMessage): void;
        /**
         * Called from TcHmi.System.ServerManager if a request is removed from the requests queue.
         * Do not call this function manually.
         * @param request
         */
        static requestUnqueued(request: ServerManager.IRequestEntry): void;
        /**
         * Called from TcHmi.System.ServerManager if a pending queue requests is done.
         * Do not call this function manually.
         * @param request
         */
        static requestPendingDone(request: ServerManager.IRequestEntry): void;
        /**
         * Called from TcHmi.System.ServerManager if a request is unregistered.
         * Do not call this function manually.
         * @param request
         */
        static requestUnregistered(request: ServerManager.IRequestEntry): void;
        /**
         * Deletes collected diagnostics data.
         * @param request
         */
        static clear(): void;
        /**
         * Resets collected diagnostics data.
         * @param request
         */
        static reset(): void;
        /**
         * Evaluates ellapsed times based on given timestamps.
         * @param requestDiag
         */
        private static evalTimes;
        /**
         * Generates a dump of current diagnostics data.
         * @param request
         */
        static dump(): void;
        /**
         * Starts cyclic dump generation.
         * @param request
         */
        static cyclicDump(interval: number): void;
        /**
         * Aborts cyclic dump generation.
         * @param request
         */
        static cyclicDumpAbort(): void;
        /**
         * Download current diagnostics data dumps as json file.
         */
        static download(): void;
        /**
         * Print current diagnostics data to the console.
         */
        static print(): void;
    }
    namespace Server {
        interface IDiagnosticsData {
            requestsHistory: Map<TcHmi.System.ServerManager.IRequestEntry, IRequestDiagnosticsEntry>;
            requestsCache: Map<TcHmi.System.ServerManager.IRequestEntry, IRequestDiagnosticsEntry>;
            requestsQueue: Map<TcHmi.System.ServerManager.IRequestEntry, IRequestDiagnosticsEntry>;
            requestsQueuePendingRequest: {
                request: TcHmi.System.ServerManager.IRequestEntry;
                requestDiag: IRequestDiagnosticsEntry;
            } | null;
            dumps: IRequestDiagnosticsDumps;
        }
        interface IRequestDiagnosticsEntry {
            message?: TcHmi.Server.IMessage;
            responseFirst?: {
                timestampReceived: number;
                message?: TcHmi.Server.IMessage;
            };
            responsesLast?: {
                timestampReceived: number;
                message?: TcHmi.Server.IMessage;
            }[];
            timestampRegistered?: number;
            timestampQueued?: number;
            timestampSent?: number;
            timestampReceived?: number;
            timestampUnqueued?: number;
            timestampUnregistered?: number;
            timestampQueuePendingBegin?: number;
            timestampQueuePendingEnd?: number;
            timeRegistered?: number;
            timeInQueue?: number;
            timeQueuePending?: number;
            timeServer?: number;
        }
        interface IRequestDiagnosticsDumps {
            lastDumpDate: string | null;
            lastDumpTimestamp: number;
            data: IRequestDiagnosticsDump[];
        }
        interface IRequestDiagnosticsDump {
            requestsHistory: IRequestDiagnosticsEntry[];
            requestsCache: IRequestDiagnosticsEntry[];
            requestsQueue: IRequestDiagnosticsEntry[];
            requestsQueuePendingRequest: IRequestDiagnosticsEntry | null;
        }
        interface IRequestDiagnosticsDumpEvalData {
            requestsByTime?: IRequestDiagnosticsEntry[] | null;
            requestsByServerTime?: IRequestDiagnosticsEntry[] | null;
            requestsByQueueTime?: IRequestDiagnosticsEntry[] | null;
            requestsByQueuePendingTime?: IRequestDiagnosticsEntry[] | null;
        }
    }
}
declare namespace TcHmi.System {
    class DialogManager {
        /**
         */
        constructor();
        /**
         * Change visibility of dialog and set its DialogType when showing
         * @param dialogOwner Caller Id to prevent overwriting forreign dialogs. null overrides this check
         * @param bVisibility
         * @param dialogType
         * @returns returns false if the dialog could not be opened
         */
        showDialog(dialogOwner: string | null, bVisibility: boolean, dialogType?: DialogManager.DialogType, options?: TcHmi.DialogManager.DialogOptions): boolean;
        /**
         * Changes the output content of the dialog to a new value.
         * Will always target DialogType.Overlay. Use updateTextEx if you want to target a specific DialogType.
         * The default DialogSeverity is Info.
         * @param dialogOwner Caller Id to prevent overwriting forreign dialogs. null overrides this check
         * @param dialogType
         * @param newHtmlContent
         * @param severity
         */
        updateText(dialogOwner: string | null, newHtmlContent: string, severity?: DialogManager.DialogSeverity): boolean;
        /**
         * Changes the output content of the dialog for a specific DialogType.
         * The default DialogType is Overlay
         * The default DialogSeverity is Info.
         * @param dialogOwner Caller Id to prevent overwriting forreign dialogs. null overrides this check
         * @param newHtmlContent
         * @param options
         */
        updateTextEx(dialogOwner: string | null, newHtmlContent: string, options?: {
            dialogType?: TcHmi.DialogManager.DialogType;
            severity?: TcHmi.DialogManager.DialogSeverity;
            /** Attach a button for reload? Defaults to false.  */
            buttonReload?: boolean;
        }): boolean;
        /**
         * Returns the current dialog owner.
         * null if we have no current owner (probably no open dialog).
         */
        getDialogOwner(): string | null;
    }
}
declare namespace TcHmi.System {
    class SplashScreen {
        /**
         */
        constructor();
        isVisible(): boolean;
        updateVersionInfo(message: string): void;
        updateStageInfo(message: string): void;
        updateStageProgress(progress: number): void;
        show(): void;
        hide(): void;
    }
}
declare namespace TcHmi.System {
    class Filter {
        private constructor();
        /**
         * Smallest such that 1.0 + floatEpsilon != 1.0. See https://en.wikipedia.org/wiki/Machine_epsilon
         * We use single precision here because the often used PLC type REAL is single precision.
         */
        private static readonly __floatEpsilon;
        /**
         * Converts a filter to an expression tree.
         * @param data The filter to convert
         */
        static parse(data: TcHmi.Filter | null, schema?: TcHmi.JsonSchema | null): Filter;
        /**
         * Determine whether the given candidate matches this filter.
         * @param candidate The candidate to test.
         */
        test(candidate: any, key?: string | number): boolean;
        /**
         * Resolves an equals comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveEquals;
        /**
         * Resolves an equals not comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveEqualsNot;
        /**
         * Resolves a less than comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveLessThan;
        /**
         * Resolves a greater than comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveGreaterThan;
        /**
         * Resolves a less than or equals comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveLessThanOrEquals;
        /**
         * Resolves a greater than or equals comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveGreaterThanOrEquals;
        /**
         * Resolves a contains comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveContains;
        /**
         * Resolves a contains not comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveContainsNot;
        /**
         * Resolves an equals ignore case comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveEqualsIgnoreCase;
        /**
         * Resolves an equals not ignore case comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveEqualsNotIgnoreCase;
        /**
         * Resolves a contains ignore case comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveContainsIgnoreCase;
        /**
         * Resolves a contains not ignore case comparison.
         * @param left The datum to test.
         * @param right The comparison value to test against.
         */
        private __resolveContainsNotIgnoreCase;
    }
    namespace Filter {
        interface Comparison extends TcHmi.Comparison {
            originalValue?: string | number | boolean | Date | null;
        }
    }
}
declare namespace TcHmi.System {
    class KeyboardManager {
        constructor();
        /**
         * document and eventprovider events will be registered on first need.
         * No need to clear because on focusin we reread config.
         */
        private __eventsRegistered;
        /** Used to be able to close or reconfig the active one */
        private __activeProvider;
        /**
         * The name of the system keyboard provider.
         */
        private __providerName;
        private __autoOpen;
        /**
         * The layout of the system keyboard.
         */
        private __systemKeyboardLayout;
        /**
         * A map of locale codes mapped to a Map of input mode mapped to the keyboard URL
         */
        private __projectKeyboardMapping;
        /** Observe new html text elements */
        refreshConfig(): void;
        /**
         * Closes the system keyboard.
         */
        close(): void;
        /**
         * Get the provider name of the system keyboard.
         */
        getProviderName(): string;
        /**
         * Set the provider name of the system keyboard.
         * @param providerName Name of the system keyboard provider.
         */
        setProviderName(providerName: string): void;
        /**
         * Gets if the system keyboard should open on focus of a textarea or input element.
         */
        getAutoOpen(): boolean;
        /**
         * Sets if the system keyboard should open on focus of a textarea or input element.
         * @param newState new value
         */
        setAutoOpen(newState: boolean): void;
        /**
         * Get the keyboard layout according to the requested input mode and the current localization.
         * @param requestedInputMode
         */
        getLayoutFileFromInputMode(requestedInputMode: string): TcHmi.Keyboard.LayoutResult;
        /**
         * Returns the project keyboard mapping. The project keyboard mapping maps pairs of input mode and keyboard layout urls to locale strings.
         */
        getProjectKeyboardMapping(): Dictionary<Keyboard.InputModeMapping>;
        /**
         * Sets the project keyboard mapping. The project keyboard mapping maps pairs of input mode and keyboard layout urls to locale strings.
         * @param projectKeyboardMapping
         */
        setProjectKeyboardMapping(projectKeyboardMapping: Dictionary<Keyboard.InputModeMapping>): void;
        /**
         * Gets the layout object of the system keyboard container.
         */
        getContainerLayout(): Keyboard.ContainerLayout | null;
        /**
         * Sets the layout object of the system keyboard container.
         * @param newLayout
         */
        setContainerLayout(newLayout: Keyboard.ContainerLayout): void;
    }
}
/**
 * Used to execute eval in isolated scope.
 * @param s The eval expression.
 * {@link resSE} This object will be used inside the eval.
 * {@link resFCE} This object will be used inside the eval.
 */
declare function gIsolatedEval_TcHmi_System_FunctionExpression_Results(s: string, resSE: any[], resFCE: any[]): any;
/**
 * Used to execute eval in isolated scope.
 * @param s The eval expression.
 */
declare function gIsolatedEval_TcHmi_System_FunctionExpression(s: string): any;
declare namespace TcHmi.System {
    class FunctionExpression {
        /**
         * @param functionExpression The expression... Example: 1 + 1 , Example: MyFunction(%s%PLC1.MAIN.nTest%/s%) + 1 + 1
         * @param enableWatchMode Defines if symbols within the FunctionExpression should be resolved based on a symbol watch or by explicit calls to each symbol which is the default.
         * @param forcedSymbolOptions Defines symbol options which are forced to any symbol read, write or watch call of every symbol.
         */
        constructor(functionExpression: string, options?: {
            enableWatchMode?: boolean;
            forcedSymbolOptions?: TcHmi.Symbol.IOptions | null;
        });
        /**
         * If skipCallbackWithSyncValue is set, returns sync value if known.
         * Async success and errors are always handled via CTX object.
         * @param skipCallbackWithSyncValue false will call the ctx.success in any case. true will not call success if value is known sync
         */
        execute(ctx: SelectableRequired<TcHmi.FunctionExpressionContext, 'success' | 'error'>, skipCallbackWithSyncValue: true): FunctionExpression.IFunctionResultHandled | FunctionExpression.IFunctionResultValue;
        /**
         * Sync and Async success and errors are always handled via CTX object.
         */
        execute(ctx: SelectableRequired<TcHmi.FunctionExpressionContext, 'success' | 'error'>): FunctionExpression.IFunctionResultHandled;
        watch(callback: (this: void, data: TcHmi.System.FunctionExpression.IWatchResultObject) => void): DestroyFunction;
        /**
         * Resolved the processed wait mode of the function expression.
         * Even if a called function provides a synchronous wait mode it may be processed asynchronous if asynchronous working symbols
         * are added as parameter because parameters are resolved before the underlying function is called.
         */
        private __resolveProcessedWaitMode;
        /**
         * Returns true if the function expression will be processed asynchronous and false if not.
         * Even if a called function provides a synchronous wait mode it may be processed asynchronous if asynchronous working symbols
         * are added as parameter because parameters are resolved before the underlying function is called.
         */
        isProcessedAsync(): boolean;
        destroy(): void;
    }
    namespace FunctionExpression {
        /** Meta data of synbol expression used during processing. */
        interface ISymbolExpressionMetaData {
            options: ISymbolExpressionArgumentOptions;
            value?: any;
        }
        /** Options of symbol expression based on function description argument settings. */
        interface ISymbolExpressionArgumentOptions {
            passAsSymbol: boolean;
            allowSymbolReferenceWatchDelegation: boolean;
        }
        /** Result handling will be NOT handled via CTX object. The caller is responsible for the value! */
        interface IFunctionResultValue extends TcHmi.IResultObject {
            /** Errors.E_FUNCTION_HANDLED_VIA_RETURN_VALUE: Value of the FunctionExpression is known synchronous. The caller is responsible for the value! */
            error: Errors.E_FUNCTION_HANDLED_VIA_RETURN_VALUE;
            /** Value of the FunctionExpression is known synchronous. Error is Errors.NONE */
            value: any;
        }
        /** Result handling will be handled via CTX object. */
        interface IFunctionResultHandled extends TcHmi.IResultObject {
            /** Errors.NONE: Value of the FunctionExpression is handled by the CTX */
            error: Errors.NONE;
        }
        interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
    }
}
declare namespace TcHmi.System {
    class StyleManager {
        constructor();
        /** Legacy style api was used once */
        private __legacyEventsRegistered;
        /**
         * Writes all styles that are currently cached for the specified control into the head.
         * @param controlNames The target controls.
         */
        writeStylesFromCache(ctrls: readonly TcHmi.Controls.System.baseTcHmiControl[]): void;
        /**
         * Removes all styles for the specified control from the head and saves them in the cache.
         * @param controlName The target control name.
         */
        removeStylesFromDom(ctrls: readonly TcHmi.Controls.System.baseTcHmiControl[]): void;
        /**
         * Gets the existing style overwrites for a control.
         * @param controlName The name of the targeted Control.
         */
        getExistingStyleOverwrites(controlName: string): any;
        /**
         * Returns all styles set on a given element inside the specified control.
         * @param controlName The target control name.
         * @param selector The selector under which to find the style. Has to exactly match the selector that was used to set the style.
         */
        getStyle(controlName: string, selector: string): Dictionary<string[]> | undefined;
        /**
         * Returns an array of values for a given CSS property on a given element inside the specified control.
         * @param controlName The target control name.
         * @param selector The selector under which to find the style. Has to exactly match the selector that was used to set the style.
         * @param propertyName The CSS property to get. If this parameter is not provided, all styles will be returned.
         */
        getStyle(controlName: string, selector: string, propertyName: string): string[] | undefined;
        /**
         * Writes the styles to a style element inside the control.
         * @param controlName The name of the target control.
         * @param styles The styles to write.
         */
        writeStyles(controlName: string, styles: any): void;
        /**
         * Replaces "%id%" in all selector parts with a given prefix. If "%id%" could not be found in a selector part the prefix is added to the start of the selector."#" is automatically prepended to the prefix.
         * @param selector The selector to expand.
         * @param prefix The prefix to add to the selector.
         */
        expandSelector(selector: string, prefix: string): string;
        /**
         * Theme Processor for generic styles.
         * @param controlName The name of the target control.
         * @param selector The target CSS selector. %id% is automatically replaced by the control name. Pass an empty string to target the control root.
         * @param property The CSS property to process.
         * @param value The value for the CSS property.
         */
        processGenericStyle(controlName: string, selector: string, property: string, value: string | null): void;
        /**
         * Theme Processor for generic styles.
         * @param controlName The name of the target control.
         * @param selector The target CSS selector. %id% is automatically replaced by the control name. Pass an empty string to target the control root.
         * @param property The CSS property to process.
         * @param value An array of values for the CSS property. This is useful for providing vendor-prefixed values to ensure compatibility.
         */
        processGenericStyle(controlName: string, selector: string, property: string, value: string[] | null): void;
        /**
         * Theme Processor for generic styles.
         * @param controlName The name of the target control.
         * @param selector The target CSS selector. %id% is automatically replaced by the control name. Pass an empty string to target the control root.
         * @param styles A dictionary of property-value pairs. Can be used to set multiple styles simultaneously. The values can be strings or arrays of strings to provide vendor-prefixed values.
         */
        processGenericStyle(controlName: string, selector: string, styles: Dictionary<string | string[] | null> | null): void;
        processGenericStyle(controlName: string, selector: string, property: string | Dictionary<string | string[] | null> | null, value: string | string[] | null): void;
        /**
         * Theme Processor for background.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new value for the background.
         */
        processBackground(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: Partial<Background> | null | undefined): void;
        /**
         * Theme processor for SVG fill color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new fill color.
         */
        processFillColor(element: JQuery<SVGElement | HTMLElement> | Iterable<SVGElement> | SVGElement | undefined, valueNew: Color | null | undefined): void;
        /**
         * Theme processor for SVG stroke color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new stroke color.
         */
        processStrokeColor(element: JQuery<SVGElement | HTMLElement> | Iterable<SVGElement> | SVGElement | undefined, valueNew: SolidColor | null | undefined): void;
        /**
         * Theme processor for text color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new text color.
         */
        processTextColor(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: SolidColor | null | undefined): void;
        /**
         * Theme processor for border color.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border color.
         */
        processBorderColor(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: Color | null | undefined): void;
        /**
         * Theme processor for border width.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border widths.
         */
        processBorderWidth(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: Partial<BorderWidth> | null | undefined): void;
        /**
         * Theme processor for border radius.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border radii.
         */
        processBorderRadius(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: BorderRadius | null | undefined): void;
        /**
         * Theme processor for border style.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border styles.
         */
        processBorderStyle(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: BorderStyle | null | undefined): void;
        /**
         * Theme processor for box shadow.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new border styles.
         */
        processBoxShadow(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: readonly BoxShadow[] | null | undefined): void;
        /**
         * Theme processor for font family.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font family.
         */
        processFontFamily(element: Iterable<Element> | Element | undefined, valueNew: FontFamily | null | undefined): void;
        /**
         * Theme processor for font size.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font size.
         * @param unitNew The new font size unit. Defaults to "px".
         */
        processFontSize(element: Iterable<Element> | Element | undefined, valueNew: number | null | undefined, unitNew: FontSizeUnit): void;
        /**
         * Theme processor for font style.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font style. Allowed values are "Normal", "Italic" and "Oblique".
         */
        processFontStyle(element: Iterable<Element> | Element | undefined, valueNew: FontStyle | undefined | null): void;
        /**
         * Theme processor for font weight.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new font weight. Allowed values are "Normal" and "Bold".
         */
        processFontWeight(element: Iterable<Element> | Element | undefined, valueNew: FontWeight | undefined | null): void;
        /**
         * Theme processor for visibility.
         * Visibility also affects pointer events, i.e. a hidden element will not receive mouse click events.
         * Hidden still uses space in fluid calculations, collapsed is ignored there.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new visibility. Allowed values are "Visible", "Collapsed" and "Hidden". Hidden still uses space in fluid calculations, collapsed is ignored there.
         */
        processVisibility(element: Iterable<Element> | Element | undefined, valueNew: Visibility | null | undefined): void;
        /**
         * Theme processor for horizontal alignment. This aligns the content of the target element, not the target element itself.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new horizontal alignment. Allowed values are "Left", "Center" and "Right".
         */
        processContentHorizontalAlignment(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.HorizontalAlignment | null | undefined): void;
        /**
         * Theme processor for vertical alignment. This aligns the content of the target element, not the target element itself.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new vertical alignment. Allowed values are "Top", "Center" and "Bottom".
         */
        processContentVerticalAlignment(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: TcHmi.VerticalAlignment | null | undefined): void;
        /**
         * Theme processor for content padding.
         * Note: Percentages always refer to the width of the element, never its height (even for top and bottom).
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new content padding.
         */
        processContentPadding(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: Partial<FourSidedCss> | null | undefined): void;
        /**
         * Theme processor for transforms.
         * @param element The jQuery collection or HTML/SVG element(s) to operate with.
         * @param valueNew The new transform value or an array of transform values.
         * @param order If this parameter is passed, the transforms in valueNew will replace the transform at the specified place, instead of replacing all transforms. Note that origin and perspective are exempt from this.
         */
        processTransform(element: Iterable<HTMLElement> | HTMLElement | undefined, valueNew: Transform | Transform[] | null | undefined, order?: number): void;
        private __measurementCanvas;
    }
}
declare namespace TcHmi.System.Type {
    class SharedCache {
        static Raw: Map<Schema.SchemaSource, JsonSchema>;
        static Resolved: Map<string, JsonSchema>;
    }
    class TypeManager {
        constructor();
        /**
         * Watch definitions on server.
         */
        doWatchSchemaDefinitions(callback?: null | ((this: TypeManager, data: IResultObject) => void)): number | null | undefined;
        doForceSchemaDefinitions(callback?: null | ((this: TypeManager, data: IResultObject) => void)): void;
        /**
         * Returns the schema object for a type definition.
         * Can be used for example with 'tchmi:general#/definitions/String'
         * Returns null on error
         * @param id Name of the type reference (for example 'tchmi:general#/definitions/String')
         */
        getSchema(id: string): JsonSchema | null;
        /**
         * Returns the schema object for a type definition.
         * Result object includes an error code
         * Can be used for example with 'tchmi:general#/definitions/String'
         * @param id Name of the type reference (for example 'tchmi:general#/definitions/String')
         */
        getSchemaEx(id: string): TypeManager.ISchemaResultObject;
    }
    namespace TypeManager {
        interface ISchemaResultObject extends TcHmi.IResultObject {
            schema?: TcHmi.JsonSchema;
        }
        interface ISchemaPartResultObject extends TcHmi.IResultObject {
            part?: TcHmi.JsonSchema;
        }
        interface ISchemaRefUriPartsResultObject extends TcHmi.IResultObject {
            parts?: Schema.Helper.ISchemaRefUriParts;
        }
    }
    class Schema {
        /**
         * Resolves all $ref within a schema.
         * @param schema
         */
        static resolveRefs(schema: TcHmi.JsonSchema, source?: TcHmi.System.Type.Schema.SchemaSource | null): undefined | TcHmi.JsonSchema;
        /**
         * Generates a Javascript object or data primitive from the default values of a schema object.
         * The result contains cloned content. Feel free to to what you like with it.
         * @param schema
         */
        static resolveDefault(schema: TcHmi.JsonSchema): unknown;
    }
    namespace Schema {
        class Helper {
        }
        namespace Helper {
            interface ISchemaRefUriParts {
                isRelative: boolean;
                source?: TcHmi.System.Type.Schema.SchemaSource | null | undefined;
                path: string;
                pathTokens: (keyof JsonSchema)[];
            }
        }
        type SchemaSource = 'general' | 'server' | 'framework' | 'project';
    }
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
}
declare namespace TcHmi.System {
    enum SymbolState {
        Invalid = 0,
        Ready = 10,
        Destroyed = 20
    }
    /**
     * @template ST Type of the value in the symbol.
     */
    class Symbol<ST = any> {
        /**
         * Throws SyntaxError if called with no valid symbol expression.
         * @param expression
         */
        constructor(expression: string | SymbolExpression);
        /**
         * Throws SyntaxError if called with no valid arguments object.
         * @param expressionObject
         */
        constructor(expressionObject: {
            expression: string | SymbolExpression;
            ctx?: Context;
        });
        constructor(expressionOrExpressionObject: string | SymbolExpression | {
            expression: string | SymbolExpression;
            ctx?: Context;
        });
        getDiagGUID(): string;
        getExpression(): TcHmi.SymbolExpression;
        getState(): SymbolState;
        getReferenceDelegation(): TcHmi.Symbol.ReferenceDelegation | null;
        getContext(): Context<any> | undefined;
        isDestroyed(): boolean;
        isReady(): boolean;
        /**
         * Determines if this symbol will be processed asynchronous or synchronous. Returns true if processed asynchronous.
         */
        isProcessedAsync(): boolean;
        private __printExpression;
        destroy(): void;
        /**
         * Resolves the expression.
         * @param callback
         */
        resolveExpression(callback: (this: Symbol, data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void): DestroyFunction;
        /**
         * Watches the expression.
         * @param callback
         */
        watchExpression(callback: (this: Symbol, data: TcHmi.Symbol.IReadResultObject<TcHmi.SymbolExpression>) => void, reason?: string): DestroyFunction;
        /**
         * Resolves the schema of the current symbol.
         * @param callback
         */
        resolveSchema(callback?: (data: TcHmi.Symbol.ISchemaResultObject) => void): void;
        /**
         * Resolves a dictionary of attributes from the underlying schema.
         * @param callback
         */
        resolveAttributes(callback?: (this: this, data: TcHmi.Symbol.IAttributesResultObject) => void): void;
        /**
         * Resolves an attribute by name from the underlying schema.
         * @param name
         * @param callback
         */
        resolveAttribute(name: string, callback?: (this: this, data: TcHmi.Symbol.IAttributeResultObject) => void): void;
        /**
         * Resolves a list of available versions of the symbol.
         * @param callback
         */
        resolveVersions(callback?: (this: this, data: TcHmi.Symbol.IVersionsResultObject) => void): void;
        /**
         * Resolves a list of available versions of the symbol.
         * @param callback
         */
        private __resolveVersions;
        /**
         * Watches the list of available versions of the symbol.
         * @param callback
         */
        watchVersions(callback?: (this: this, data: TcHmi.Symbol.IVersionsResultObject) => void): () => void;
        /**
         * Watches the list of available versions of the symbol.
         * @param callback
         */
        private __watchVersions;
        /**
         * Resolves the symbols meta data.
         * @param callback
         */
        resolveMetaData(callback?: (this: this, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): void;
        /**
         * Resolves the symbols meta data.
         * @param callback
         */
        private __resolveMetaData;
        /**
         * Watches the symbols meta data.
         * @param callback
         */
        watchMetaData(callback?: (this: this, data: TcHmi.Symbol.IServerSymbolMetaDataResultObject) => void): DestroyFunction;
        /**
         * Watches the symbols meta data.
         * @param callback
         */
        private __watchMetaData;
        /**
         * Reads a value of the symbol and raises a callback with a copy of it
         * @param callback
         * @template T Type of the read value. Falls back to type of the symbol.
         */
        read<T = ST>(callback: (this: this, data: TcHmi.Symbol.IReadResultObject<T> | TcHmi.Symbol.IServerReadResultObject<T>) => void): DestroyFunction | null;
        /**
         * Reads a value of the symbol and raises a callback with a copy of it
         * @param options
         * @param callback
         * @template T Type of the read value. Falls back to type of the symbol.
         */
        readEx<T = ST>(options: TcHmi.Symbol.IOptions | null, callback: (this: this, data: TcHmi.Symbol.IReadResultObject<T> | TcHmi.Symbol.IServerReadResultObject<T>) => void): DestroyFunction | null;
        /**
         * @param value
         * @param callback
         * @template T Type of the write value. Falls back to type of the symbol.
         */
        write<T = ST>(value: T, callback?: (this: this, data: TcHmi.Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void): DestroyFunction;
        /**
         * @param value
         * @param dirtyPaths
         * @param callback
         * @template T Type of the write value. Falls back to type of the symbol.
         */
        writeEx<T = ST>(value: T, dirtyPaths?: string[] | null, callback?: (this: this, data: TcHmi.Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void): DestroyFunction | null;
        /**
         * @param value
         * @param options
         * @param dirtyPaths
         * @param callback
         * @template T Type of the write value. Falls back to type of the symbol.
         */
        writeEx2<T = ST>(value: T, options?: TcHmi.Symbol.IOptions | null, dirtyPaths?: string[] | null, callback?: (this: this, data: TcHmi.Symbol.IWriteResultObject<T> | TcHmi.Symbol.IServerWriteResultObject<T>) => void): DestroyFunction | null;
        /**
         * @param value
         * @param options
         * @param dirtyPaths
         * @param callback
         * @template T Type of the write value. Falls back to type of the symbol.
         */
        private __write;
        /**
         * Starts a watch on a symbol
         * @param callback
         * @template T Type of the value to watch. Falls back to type of the symbol.
         */
        watch<T = ST>(callback: (this: this, data: TcHmi.Symbol.IWatchResultObject<T> | TcHmi.Symbol.IServerWatchResultObject<T>) => void): DestroyFunction;
        /**
         * Starts a watch on a symbol
         * @param options
         * @param callback callback will be called after success or failure
         * @template T Type of the value to watch. Falls back to type of the symbol.
         */
        watchEx<T = ST>(options: TcHmi.Symbol.IOptions | null, callback: (this: this, data: TcHmi.Symbol.IWatchResultObject<T> | TcHmi.Symbol.IServerWatchResultObject<T>) => void, reason?: string): DestroyFunction;
        /**
         * Starts a watch on a symbol
         * @param options
         * @param callback callback will be called after success or failure
         * @template T Type of the value to watch. Falls back to type of the symbol.
         */
        private __watch;
        static isServerSymbol(checkSymbol: Symbol): boolean;
        static isInternalSymbol(checkSymbol: Symbol): boolean;
        static isLocalizedTextSymbol(checkSymbol: Symbol): boolean;
        static isPartialParamSymbol(checkSymbol: Symbol): boolean;
        static isTemplateParamSymbol(checkSymbol: Symbol): boolean;
        static isFunctionSymbol(checkSymbol: Symbol): boolean;
        static isControlSymbol(checkSymbol: Symbol): boolean;
        static isContextSymbol(checkSymbol: Symbol): boolean;
        static isThemedSymbol(checkSymbol: Symbol): boolean;
        /**
         * Returns true if the symbol can be read without any error. Otherwise it will reutrn false.
         * @param callback
         */
        exists(callback?: (this: this, data: TcHmi.Symbol.IExistsResultObject) => void): void;
    }
}
declare namespace TcHmi.System {
    class SymbolEventHandler {
        constructor();
        private __destroyFnOfEntry;
        private __handleRegister;
        private __handleDestroy;
    }
}
declare namespace TcHmi.System {
    /**
     */
    class SymbolExpressionFromText {
        /**
         */
        constructor(text: string);
        /**
         * Resolves all expressions of type from the given text.
         * Will resolve nested symbol expressions too.
         * @param type
         */
        resolveExpressionsBySymbolType(type: SymbolType): TcHmi.SymbolExpression[];
        /**
         * Resolves all expressions from the given text.
         * Will resolve nested symbol expressions too.
         * @returns
         */
        resolveExpressions(): TcHmi.SymbolExpression[];
    }
}
declare namespace TcHmi.System {
    enum ScaleMode {
        None = 0,
        ScaleToFit = 1,
        ScaleToFitWidth = 2,
        ScaleToFitHeight = 3,
        ScaleToFill = 4
    }
    /**
     */
    class ViewManager {
        #private;
        /**
         */
        constructor();
        private __offsetAnimationFrameId;
        private __handlePosition;
        checkBrowserFeatures(): void;
        /**
         * Sets the scalemode.
         * @param scaleMode
         */
        setScaleMode(scaleModeStr: ScaleModeString): void;
        /**
         * Returns the current view control object
         */
        getView(): Controls.System.baseTcHmiControl | null;
        /**
         * Loads a new view into the dom.
         * @param url
         * @param callback
         */
        loadView(url: string, callback?: null | ((this: ViewManager, data: TcHmi.IResultObject) => void)): void;
        /**
         * The callback will have the ViewManager as this
         * @param view
         * @param callback
         */
        loadViewObject(view: TcHmi.Controls.System.baseTcHmiControl, callback?: null | ((this: ViewManager, data: IResultObject) => void)): void;
        /**
         * List of all viewparts
         * Starts with top, ends with bottom
         * center are somewhere in between
         */
        private __registeredViewportElements;
        /**
         * Adds a viewport element such as header or footer or over main.
         * */
        addViewportElement(element: HTMLElement, options: {
            /** Friendly name. */
            name?: string;
            /** Target area for the element. */
            area: 'header' | 'main' | 'footer';
        }): IErrorDetails;
        private __renderViewParts;
        /**
         * Removes a viewport element such as the header or footer.
         * @param element
         */
        removeViewportElement(element: HTMLElement): IErrorDetails;
        /**
         * Returns a DOMRect object providing information about the size of an
         * hmi viewport area (or main area) and its position relative to the viewport.
         */
        getViewportElementDimension(area: 'header' | 'main' | 'footer'): DOMRect | null;
    }
}
declare namespace TcHmi.System {
    class TcSpeechManager {
        constructor();
        /**
         * (Re-)Starts the rtc connection to tcspeech.
         * @param options This option can override all setting from tchmiconfig.json and more
         * @param callback Gets notification when opening connection failed.
         */
        openConnection(options?: TcHmi.TcSpeech.ConnectionOptions & Partial<TcHmi.TcSpeech.BaseConfig>, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
        /**
         * Closes an active connection to TcSpeech.
         * @param options Can target a specific remote tcspeech engine
         * @param callback A callback to get feedback
         */
        closeConnection(options?: {
            remoteSocketId?: number;
        }, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
        /**
         * Sets the volume (between 0 and 1) of speech output on this device.
         * @param newValue new volume. Will be capped between 0 and 1.
         */
        setVolume(newValue: number): void;
        /**
         * Add a new used trigger. This is transported to the speech engine after 50 ms when no other registration postpones it.
         * @param eventname new event name.
         */
        __addUsedSpeechTrigger(eventname: string): void;
        /**
         * Remove a used trigger. This is transported to the speech engine after 50 ms when no other registration postpones it.
         * @param eventname the event name to remove.
         */
        __removeUsedSpeechTrigger(eventname: string): void;
        /**
         * Starting output of text. The connection must be open at this point and we have to have enableSpeaker.
         * The callback will get a guid which can be used to stop or request status of the speech synthesis.
         * @param text Text to be synthesized
         * @param options
         * @param callback The callback will get a guid which can be used to stop or request status of the speech synthesis.
         */
        speechSynthesisStart(text: string, options?: {
            priority?: TcHmi.TcSpeech.AudioEntityPriority;
        }, callback?: null | ((this: void, data: TcHmi.TcSpeech.SpeechSynthesisResult) => void)): void;
        /**
         * Request the state (queued, playing, stopped) of a given speech synthesis call.
         * @param guid guid for the request. Can be fetched from the callback of speechSynthesisStart
         * @param callback The callback will get the state of the speech synthesis
         */
        speechSynthesisGetStatus(guid: string, callback?: null | ((this: void, data: TcHmi.TcSpeech.SpeechSynthesisResult) => void)): void;
        /**
         * Stops a given speech synthesis call.
         * @param guid guid for the request. Can be fetched from the callback of speechSynthesisStart
         * @param callback The callback will get the state of the speech synthesis
         * @preserve (Part of the public API)
         */
        speechSynthesisStop(guid: string, callback?: null | ((this: void, data: TcHmi.TcSpeech.SpeechSynthesisResult) => void)): void;
    }
    namespace TcSpeechManager {
        const enum ClientState {
            INITIAL_VALUE = 0,
            IDLE = 1,
            INITIALIZE_CONNECTION = 2,
            REGISTER_CLIENT_CONFIG = 3,
            REQUEST_AUDIO_STREAM = 4,
            REQUEST_RTC_OFFER = 5,
            FIND_REGISTERED_SPEECH_SERVICES = 6,
            SEND_OFFER = 7,
            CONNECTED = 8,
            DISCONNECTED = 9,
            GOT_ERROR = 10
        }
        const enum DomainWatchState {
            NO = 0,
            WAITING = 102,
            WATCHACTIVE = 200
        }
        interface IVersionedSpeechCommand {
            /** Socket id of the peer starting the signaling connection. */
            SocketId: number;
            /** Socket id of the remote peer. */
            RemoteSocketId: number;
            SpeechApiVersion: 1;
        }
        /** Register call for the Speech Registry */
        interface IClientRegisterEntry extends IVersionedSpeechCommand {
            RegisterDate: string;
            /** This client can provide an audio source. */
            AudioSource: boolean;
            /** This client can consume an audio stream. */
            AudioSink: boolean;
            /** This client can start a WebRTC call. */
            CanOffer: boolean;
            /** This client can answer a WebRTC call. */
            CanAnswer: boolean;
            /** Version string of the client. */
            Version: string;
            PotentialLocales: string[];
            State: 'available' | 'busy' | 'offline';
        }
        interface ISignalingCommand {
            /** SDP for the peer or empty if deactivated */
            SDP: string;
        }
        /** WebRTC Offer data of the Client. */
        interface IOfferCommand extends ISignalingCommand {
            /** Type of the command */
            Type: 'Offer';
        }
        /** WebRTC Answer data of the Speech Service. */
        interface IAnswerCommand extends ISignalingCommand {
            /** Type of the command */
            Type: 'Answer';
        }
        interface IIceCandidates {
            /** Type of the command */
            Type: 'IceCandidates';
            /** List of candidates */
            Candidates: RTCIceCandidateInit[];
        }
        interface IClientConfig extends IVersionedSpeechCommand {
            CurrentCommands: string[];
            CurrentLocales: string[];
        }
        interface IBaseCommand {
            /** Type of the command */
            Type: string;
        }
        interface IDetectedCommand extends IBaseCommand {
            /** Type of the command */
            Type: 'DetectedCommand';
            /** Recognition Tag of the active SRGS file which was detected. */
            DetectedCommand: string;
            /**
             * A relative measure of the certainty of correct recognition of a phrase.
             * The value is from 0.0 to 1.0, for low to high confidence, respectively. */
            Confidence: number;
            /** Parameter which was detected by speech recognition. */
            Parameter: unknown;
        }
        interface ILogOnClientCommand extends IBaseCommand {
            /** Type of the command */
            Type: 'LogOnClientCommand';
            /** Number as enum: None = 0, Error = 1, Warning = 2, Info = 3, Debug = 4 */
            Severity: TcHmi.LOG_LEVEL;
            /** The messages to display in TcHmi.Log. Multiple values will be displayed in one log entry in a nice way: ['Got this', {'Hello': 'World'}] */
            MessageParts: any[];
        }
        interface ISpeechSynthesisStart extends IBaseCommand {
            Type: 'SpeechSynthesisStart';
            /** Text to generate audio from. */
            Text: string;
            /** Priority of the text. */
            Priority: TcHmi.TcSpeech.AudioEntityPriority;
            /** GUID for this request. */
            Guid: string;
        }
        interface ISpeechSynthesisStop extends IBaseCommand {
            Type: 'SpeechSynthesisStop';
            /** GUID for this request. */
            Guid: string;
        }
        interface ISpeechSynthesisGetStatus extends IBaseCommand {
            Type: 'SpeechSynthesisGetStatus';
            /** GUID for this request. */
            Guid: string;
        }
        /** Answer to SpeechSynthesisGetStatus */
        interface ISpeechSynthesisStatus extends IBaseCommand {
            Type: 'SpeechSynthesisStatus';
            /** GUID for this request. */
            Guid: string;
            State: 'Queued' | 'Playing' | 'Stopped';
        }
        interface IPayloadContainer<T = unknown> extends IVersionedSpeechCommand {
            /** Command itself */
            Command: T;
        }
    }
}
declare namespace TcHmi.System {
    /**
     * Handles the implicit values of a control
     * Values of a control are defined:
     *
     * initial only: Value explicit in the HTML
     * defined in the project: Value implicit defined for a control class
     * defined in the project: Value implicit defined for a theme for a control type
     *
     * defined by the control: Value implicit defined for a theme for a control type
     * defined by the control: Value implicit defined from the defaultValueInternal of a control type (with resolved inheritance)
     */
    class ThemeManager {
        constructor();
        /**
         * Inits the local file caches
         */
        __clearProjectThemeUrl(cleanPath: string): void;
        /**
         * Gets the active Theme
         */
        getTheme(): string;
        /**
         * Sets a new Theme
         * @param valueNew
         */
        setTheme(valueNew: string, processTheme: boolean): Errors;
        /**
         * @param controlDescr
         */
        registerControlThemeFiles(controlDescr: ControlDescription): void;
        /**
         * Fill missing values in all themes files when the inheritance parent has it set
         * Note: no harm is done with multiple calls to this file
         */
        private __resolveControlInheritance;
        /**
         * Do we have an active json async fetch active?
         */
        __asyncJsonLoadCount: number;
        /**
         * Disables inactive theme
         * Load and activate control and project theme
         */
        processActiveTheme(callback?: (this: void, data: TcHmi.IResultObject) => void, options?: {
            /** Do not load css files from (not loaded?) packages */
            ignorePackageModules?: boolean;
        }): void;
        /**
         * Retrigger usercontrols
         */
        retriggerUserControls(): void;
        /**
         * Parses every source of implicit properties and returns this or null
         * Can have different value after the event onThemeDataChanged.
         * The order of resources are
         * 1) control class
         * 2) theme definition of the control type in project
         * 3) theme definition in control
         * 4) defaultValueInternal in Description.json of the control
         * @param control
         * @param propertyName
         * @template T Type of the default value.
         */
        getDefaultPropertyValue<T>(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): TcHmi.Theme.Resource<T>;
        /**
         * Gets a themed resource.
         * Parses every source of properties and returns this or null
         * Can have different value after the event onThemeDataChanged.
         * The order of resources are
         * 1) control class
         * 2) theme definition of the control type in project
         * 3) theme definition in control
         *
         * @param control Control which needs the resource
         * @param resourceName name of the resource
         * @returns returns the resource or null
         * @template T Type of the value.
         */
        getThemeResource<T>(control: TcHmi.Controls.System.baseTcHmiControl, resourceName: string): TcHmi.Theme.Resource<T>;
        /**
         * @param control
         * @param propertyName
         */
        watchAttributeDefaults(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): void;
        /**
         * Start watcher to remove a theme lock on manual variable set
         * @param control
         */
        startAttributeSetterWatcher(control: TcHmi.Controls.System.baseTcHmiControl): void;
        /**
         * @param control
         * @param propertyName
         */
        unwatchAttributeDefaults(control: TcHmi.Controls.System.baseTcHmiControl, propertyName: string): void;
        /**
         * Process the themed resources of project and control level and call existing callbacks.
         */
        processThemedResources(): void;
        /**
         * Get a the value of a themed resource.
         * @param name Name of the themed resource
         * @param namespaceTokens Namespace of the themed resource.
         */
        getThemedResource(name: string, namespaceTokens: string[]): any;
        /**
         * Get the type of a themed resource
         * @param name
         * @param namespaceTokens
         * @param callback
         */
        getThemedResourceType(name: string, namespaceTokens: string[], callback: (this: ThemeManager, data: ThemeManager.ITypeResultObject) => void): void;
        /**
         * Watch a themed resource by namespace and name
         * @param name The name of the themed resource.
         * @param namespaceTokens The namespace of the themed resource.
         * @param callback The function call when the themed resources value has changed.
         */
        watchThemedResource<T = any>(name: string, namespaceTokens: string[], callback: (this: void, data: TcHmi.System.ThemeManager.IWatchResultObject<T>) => void): DestroyFunction;
    }
    namespace ThemeManager {
        interface IThemedResource {
            /** The value of the themed resource for a specific theme. Can be undefined if the themed resource has no value defined for a theme. */
            value: any;
            dirtyPaths?: string[];
            callbacks: IThemedResourceEntryCallback[];
        }
        interface IThemedResourceEntryCallback {
            callback: ((this: void, data: TcHmi.System.ThemeManager.IWatchResultObject) => void) | null;
            destroy: DestroyFunction;
        }
        interface ITypeResultObject extends TcHmi.IResultObject {
            type?: string;
        }
        interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            dirtyPaths?: string[];
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
    }
}
declare namespace TcHmi.System {
    /**
     * Provides a layer to show elements above the normal visualization
     */
    class TopMostLayer {
        /**
         */
        constructor();
        private readonly __containerDivs;
        /**
         * Appends the elements to the top layer above the normal visualization
         * A reference to the element should be kept to be able to call remove() function
         * The parent element will be a div with style="width:<browserwindowwidth>;height:<browserwindowheight>;"
         * Your element could have style="min-width:50%;min-height:50%;"
         * @param origin control which requests this or null if from codebehind
         * @param element HTML element or jQuery Collection with exactly one element which should be moved to TopMostLayer
         * @param options Optional options
         * @returns boolean success of the add
         */
        add(origin: TcHmi.Controls.System.baseTcHmiControl | typeof globalThis, element: HTMLElement | JQuery | undefined | null, options?: TcHmi.TopMostLayer.IOptions | TcHmi.TopMostLayer.IOptionsEx): boolean;
        /**
         * Removes the element from the top layer and returns it for later use by the caller
         * If the element is not inside the TopMostLayer it will be returned without change.
         * @param origin control which requests this or null if from codebehind
         * @param element HTML element or jQuery Collection with the element which should be removed from TopMostLayer
         * @returns The HTML element or jQuery Collection which was removed.
         */
        remove<E extends HTMLElement | JQuery>(_origin: TcHmi.Controls.System.baseTcHmiControl | typeof globalThis, element: E, cancel: boolean): E;
    }
    namespace TopMostLayer {
        /** all options and css backup of an element */
        interface ICtrlMetaData<E extends HTMLElement | JQuery> extends TcHmi.TopMostLayer.IOptions<E> {
            resizeCb?: ((this: TcHmi.Controls.System.baseTcHmiControl | typeof globalThis, data: TcHmi.TopMostLayer.IResizeResultObject<E>) => void) | null;
            removeCb?: ((this: TcHmi.Controls.System.baseTcHmiControl | typeof globalThis, data: TcHmi.TopMostLayer.IElemRemoveResultObject<E>) => void) | null;
            styleBackup?: Pick<CSSStyleDeclaration, 'left' | 'top' | 'position'>;
            /** control which requests this or null if from codebehind */
            origin: TcHmi.Controls.System.baseTcHmiControl | typeof globalThis;
            container: HTMLElement;
            elementsAbove: Set<Node>;
            justAboveReference?: Node;
            wantsToBeBottomMost: boolean;
            originalElement: E;
        }
    }
}
declare namespace TcHmi.System {
    namespace Locale {
        /**
         * Used to access framework related localization content.
         */
        class Framework extends TcHmi.Locale.Localization {
            /**
             *
             * Constructor
             * @param control
             */
            constructor();
        }
    }
}
declare namespace TcHmi.System {
    class LocalizationManager {
        /**
         * Key is the url.
         * Property is null when system is initialized to disable the cache.
         */
        private __fileFetchPromises;
        /**
         * The current locale string for texts or undefined if no localized Symbol is available.
         * @returns The current locale identifier.
         */
        getLocale(options?: {
            level?: TcHmi.Locale.Level;
        }): string | undefined;
        /**
         * Returns the current fallback locale string for texts or undefined if no localized Symbol is available.
         * @returns The current fallback locale identifier.
         */
        getLocaleFallback(options?: {
            level?: TcHmi.Locale.Level;
        }): string | undefined;
        /**
         * Returns the content of the current loaded locale file.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         */
        getLocaleData(namespace: string, options?: {
            level?: TcHmi.Locale.Level;
        }): ILocalization | undefined;
        /**
         * Set a namespaces locale data and merges data if we have file overrides.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param data
         * @param options
         */
        setLocaleData(namespace: string, data: ILocalization, fileurl: string, options?: {
            level?: TcHmi.Locale.Level;
        }): void;
        /**
         * Returns the data of the current loaded fallback locale file.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         */
        getLocaleFallbackData(namespace: string, options?: {
            level?: TcHmi.Locale.Level;
        }): ILocalization | undefined;
        /**
         * Set a namespaces fallback locale data and merges data if we have file overrides.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param data
         * @param options
         */
        setLocaleFallbackData(namespace: string, data: ILocalization, fileurl: string, options?: {
            level?: TcHmi.Locale.Level;
        }): void;
        /**
         *  Change locale of current user in server. AccessManager will handle locale change and force locale processing in LocalizationManager.
         */
        loadLocale(locale: string | null, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
        /**
         * Process localization file content.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param data content
         */
        processLocalizationData(namespace: string, data?: ILocalization, fallback?: ILocalization, options?: {
            level?: TcHmi.Locale.Level;
        }): TcHmi.Errors;
        /**
         * Loads a new locale for a specific localization namespace.
         * @param newLocale
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param callback
         */
        private __processLocaleForNamespace;
        /**
         * Loads a new locale after a server locale change or system init
         * @param locale The locale to load
         */
        processLocale(newLocale: string | null | undefined, options?: {
            level?: TcHmi.Locale.Level;
        }, callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
        processPendingEntryWatches(): void;
        processLocalizationWatches(namespace: string | string[], options?: {
            level?: TcHmi.Locale.Level;
        }): void;
        /**
         * Register a application level language file. Existing locales will be replaced.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param locale
         * @param pathOrPathArray
         */
        registerLocalizationFile(namespace: string, locale: string, pathOrPathArray: TcHmi.LanguageFileMapEntry): void;
        /**
         * Unregister a application level language file.
         * Only removals for same type (string vs string[]) as registered with registerLocalizationFile are supported
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param locale
         * @param pathOrPathArray
         */
        unregisterLocalizationFile(namespace: string, locale: string, pathOrPathArray: TcHmi.LanguageFileMapEntry): void;
        /**
         * Resolves the inheritation of control related localization files and creates a merged localization file.
         */
        resolveControlLocalizationFileInheritation(): void;
        /**
         * Register fallback locale
         * @param fallback
         */
        setFallbackLocale(fallback: string | undefined | null): void;
        /**
         * Resets the current fallback locale data and processes locale again.
         * @param callback
         */
        resetFallbackLocale(callback?: null | ((this: void, data: TcHmi.IResultObject) => void)): void;
        /**
         * Clears the file fetch cache.
         */
        clearFileFetchCache(): void;
        /**
         * Get registered file path strings by a cascaded Map with keys:
         * 1) namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * 2) locale
         */
        getFiles(): Map<string, Map<string, TcHmi.LanguageFileMapEntry>>;
        /**
         * Gets all localized text of a namespace.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         */
        get(namespace: string, options?: {
            level?: TcHmi.Locale.Level;
        }): TcHmi.Locale.LocalizationReader;
        /**
         * Watches all localized text of a namespace.
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         */
        watch(namespace: string, options: {
            level?: TcHmi.Locale.Level;
        } | undefined, callback: (this: void, data: TcHmi.Locale.IWatchResultObject) => void): DestroyFunction;
        /**
         * Get a localized text of a namespace by key
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param key
         */
        getText(namespace: string, key: string, options?: {
            level?: TcHmi.Locale.Level;
        }): string;
        /**
         * Watch a localized text of a namespace by key
         * @param namespace For example "TcHmi.System.Localization.Control<TcHmi.Controls.Beckhoff.TcHmiRadialGauge>"
         * @param key
         * @param options
         * @param callback
         */
        watchText(namespace: string, key: string, options: {
            level?: TcHmi.Locale.Level;
        } | undefined, callback: (this: void, data: TcHmi.Locale.IWatchTextResultObject) => void): DestroyFunction;
    }
    namespace LocalizationManager {
        interface LocalizedText {
            /** Key */
            key: string;
            /** Text in the current locale. */
            text?: string;
            /** Determines if the current instance is based on fallback data. */
            fallback: boolean;
            /** Determines if the current instance is a dummy without data for delayed callback handling if data becomes available. */
            dummy: boolean;
            /** Callbacks associated with the current instance. */
            callbacks: ILocalizationTextCallback[];
        }
        interface ILocalizationTextCallback {
            callback?: (this: void, data: TcHmi.Locale.IWatchTextResultObject) => void;
            destroy: DestroyFunction;
        }
        interface ILocalizationCallback {
            callback: (this: void, data: TcHmi.Locale.IWatchResultObject) => void;
            destroy: DestroyFunction;
        }
    }
}
declare namespace TcHmi.System {
    class ServerManager {
        constructor();
        /**
         * Key is in the following format: SYMBOLNAME_SUBSCRIPTION-REQUEST-ID
         * Use this to find an entry for a server response.
         * Example: MySymbolA_1234
         */
        private __symbolWatchEntryCacheById;
        /**
         * Key is the System.Symbol reference that holds the watch
         */
        private __symbolWatchEntryCacheByRef;
        /**
         * Key is in the following format: INTERVAL=VALUE_TIMEOUT=VALUE_GROUP=VALUE
         * Use this to find a map of watch symbol entries which will be grouped together when registering a subscription.
         * Example: INTERVAL=DEFAULT_TIMEOUT=DEFAULT_GROUP=5
         * Example: INTERVAL=500_TIMEOUT=10000_GROUP=5
         */
        private __symbolWatchEntryGroups;
        /** Fallback value if the request and tchmiconfig does not provide a value */
        static RECONNECT_INTERVAL: number;
        private __checkLicenseSubscriptionId;
        /**
         * Watches .../Config/ServerState
         */
        private watchServerState;
        /**
         * Unwatch .../Config/ServerState
         */
        private unwatchServerState;
        /**
         * Request ServerState
         */
        private resolveServerState;
        /**
         * Request and handle ServerState
         */
        private resolveHandleServerState;
        /**
         * Opens the websocket and starts the watcher interval.
         */
        open(callback?: (this: void, data: ServerManager.IConnectionResultObject) => void): void;
        /**
         * Closes the websocket and stops the watcher interval.
         */
        close(): void;
        /**
         */
        getFreeRequestId(): number | null;
        /**
         * Set Server Address
         * @param host
         * @param port
         * @param protocol
         */
        setServerAddress(protocol: string, host: string, port?: string | number): void;
        /**
         * Registers an event callback.
         * @param reqId
         * @param callback
         */
        registerEventCallback(reqId: number, callback: (this: void, data: Server.IResultObject) => void): number | null;
        /**
         * Watch a server symbol from Tchmi.System.Symbol
         * This function should only be called from TcHmi.System.Symbol!
         * @param expression
         * @param callback
         * @template T Type of the value to watch
         */
        watch<T = any>(symbol: TcHmi.System.Symbol, expression: TcHmi.SymbolExpression, options: TcHmi.Symbol.IOptions | null, callback: (this: void, data: TcHmi.System.ServerManager.IServerWatchResultObject<T>) => void, reason?: string): DestroyFunction;
        /**
         * Sends a request to the server.
         * @param requestObj The request object to send
         * @param callback Callback function reference
         * @template W Type of the write value. Use any (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use any (or omit) if this contains multiple different types.
         */
        request<W = any, R = W>(requestObj: Server.IMessage<W, R>, callback?: null | ((this: void, data: Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Sends a request to the server.
         * @param requestObj The request object to send
         * @param options Request options
         * @param callback Callback function reference
         * @template W Type of the write value. Use any (or omit) if this contains multiple different types.
         * @template R Type of the read value. Use any (or omit) if this contains multiple different types.
         */
        requestEx<W = any, R = W>(requestObj: Server.IMessage<W, R>, options?: ServerManager.IRequestOptions | null, callback?: null | ((this: void, data: Server.IResultObject<W, R>) => void)): number | null;
        /**
         * Releases a request and associated resources like callbacks.
         * @param id Id of the request to release.
         */
        releaseRequest(id: number | null): void;
        /**
         * Returns the current readyState value of the underlying websocket which is connected to the TwinCAT HMI Server. Returns null when system is not ready.
         * Use constants like WebSocket.CLOSED or WebSocket.OPEN for comparison.
         */
        getWebsocketReadyState(): number | null;
        /**
         * Returns true if the websocket is ready, handshakes are done and server is ready for general application communication.
         */
        isReady(): boolean;
        /**
         * Login into a TcHmiServer, reloads the page on success, call of a callback after login
         * @param username String with the username
         * @param password String with the password
         * @param persistent boolean Should the session be valid even after browser restart
         * @param reload Reload hmi after session login.
         * @param options
         * @param callback This callback is called after the request was sent
         * @returns returns a boolean if the login was called
         */
        login(username: string, password: string, persistent: boolean | undefined, reload: boolean | undefined, options: Server.IRequestOptions | null, callback?: null | ((this: void, data: IResultObject) => void)): boolean;
        /**
         * Logout from a TcHmiServer, reloads the page on success, call of a callback after logout
         * @param reload Reload hmi after session logout
         * @param options Request options
         * @param callback This callback is called after the request was sent
         * @returns returns a boolean if the logout was called
         */
        logout(reload?: boolean, options?: Server.IRequestOptions | null, callback?: null | ((this: void, data: IResultObject) => void)): boolean;
        /**
         * Logout all users with a specific username or all users from a TcHmiServer
         * @param username username to logout.
         * If empty string or null is provided, all users are logged out.
         * The authentication domain can be specified by using 'Domain::UserName'. If no domain is specified all users with the given name will be logged out.
         * 'Domain::' will logout every user from this domain
         * @param options Request options
         * @param callback This callback is called after the request was sent
         * @returns returns a boolean if the logout was called
         */
        forceLogout(username: string | Server.IForceLogoutTarget | null, options: Server.IRequestOptions | null, callback?: null | ((this: void, data: Server.IResultObject) => void)): boolean;
        /**
         * @param callback
         */
        refreshSubscriptions(callback?: (this: void, data: TcHmi.IResultObject) => void): void;
        /**
         * Returns the framework related api version of the server in the form x.x.x.x and null if the current server version does not support this information yet.
         * You can use the global tchmi_compare_version function to compare the result against a specific version.
         */
        getApiVersion(): string | null;
        /**
         * Processes the results of watchServerSymbolMetaData/resolveServerSymbolMetaData.
         * @param results List of results of Server.IResultObject
         * @returns
         */
        private __processServerSymbolMetaData;
        /**
         * Resolves server symbol meta data from  TcHmi.System.Data.Caches.serverSymbolMetaDataCache
         * and adds it to  TcHmi.System.Data.Caches.serverSymbolInteractiveWriteMetaDataCache.
         * Make sure to run resolveServerSymbolMetaDataCache before.
         * @param callback
         */
        private __resolveServerSymbolInteractiveWriteMetaDataCache;
        /**
         * Resolves server symbol meta data, writes it to TcHmi.System.Data.Caches.serverSymbolMetaDataCache on demand.
         * @param callback
         */
        resolveServerSymbolMetaData(callback: (this: void, data: TcHmi.IResultObject) => void): void;
        /**
         * Resolves server symbol meta data, writes it to TcHmi.System.Data.Caches.serverSymbolMetaDataCache
         * and responds only once to callback.
         * This function is meant to be called only once from init state machine in Main.ts.
         * @param callback
         */
        watchServerSymbolMetaData(callback: (this: void, data: TcHmi.IResultObject) => void): void;
    }
    namespace ServerManager {
        /**
         * Custom Websocket close codes should be in the range 3000-4999.
         * TcHmiSrv generates codes derived from the http codes.
         */
        const enum TcHmiWebsocketStatusCode {
            /** Server shutting down */
            Ok = 4200,
            Permanent_Redirect = 4308,
            Bad_Request = 4400,
            Unauthorized = 4401,
            Payment_Required = 4402,
            Forbidden = 4403,
            Not_Found = 4404,
            Method_Not_Allowed = 4405,
            Request_Timeout = 4408,
            Gone = 4410,
            Length_Required = 4411,
            Precondition_Failed = 4412,
            Request_Payload_too_Large = 4413,
            Range_Not_Satisfiable = 4416,
            Expectation_Failed = 4417,
            Upgrade_Required = 4426,
            Too_Many_Requests = 4429,
            Custom_License_Expired = 4460,
            Custom_Login_Timeout = 4461,
            Custom_Too_Many_Connections = 4463,
            Custom_Server_Starting = 4464,
            Custom_License_Limit_Exceeded = 4465,
            Custom_Missing_Parameter = 4466,
            Internal_Server_Error = 4500,
            Not_Implemented = 4501,
            Service_Unavailable = 4503,
            Version_not_Supported = 4505,
            Custom_Extension_not_Loaded = 4520,
            Custom_Syntax_Error = 4521,
            Custom_Forced_Disconnect = 4522
        }
        const enum ConnectState {
            UNCONNECTED = 0,
            ERROR = 1,
            COMMAND_ERROR = 2,
            CONNECTED = 3,
            UNLOAD = 4,
            ACCESS_MISSING = 5,
            LICENSE_MISSING = 6
        }
        const enum RequestType {
            INVALID = 0,
            READWRITE = 100,
            SUBSCRIPTION = 200,
            EVENT = 300
        }
        interface IRequestEntry {
            id: number;
            type: ServerManager.RequestType;
            message?: Server.IMessage;
            deletionPending: boolean;
            timeoutTimer: number;
            timeoutCallback: null | ((this: void) => void);
            timeout: number | null;
            /** Minimal time the subscription ticks will be fired on symbol changes. If not set the default of the project will be used */
            interval?: number | null;
            callbacks: ((this: void, data: Server.IResultObject) => void)[];
            responseCallback: null | ((this: void, data: ServerManager.IResponseResultObject) => void);
            /** Request in queue waiting for processing. If queuePending is set to true too the request was sent to the server and is waiting for response. */
            queue: boolean;
            /** Request in queue was sent to the server and is waiting for response. */
            queuePending: boolean;
            /**
             *  Request from SymbolWatches = managed/true;
             *  Everything else = unmanaged/false; */
            managed: boolean;
            /** When set to true and this is a subscription it will ignored when refreshSubscriptions is called. */
            refreshLock: boolean;
            /** TcHmi.Symbol reference which has caused the request when request was caused by TcHmi.Symbol. */
            symbol?: TcHmi.System.Symbol;
        }
        interface IInteractiveWriteRequestEntry {
            id: number;
            destroy: DestroyFunction;
        }
        interface IServerSymbolWatchEntry {
            name: string;
            interval: number | null;
            timeout: number | null;
            group: string | null;
            version: number | null;
            start: number | null;
            end: number | null;
            clientMode: 'ClientPoll' | 'ClientWriteConfirm' | null;
            clientPollInterval: number;
            clientWriteConfirmTimeout: number;
            clientPendingReadWriteCount: number;
            resetClientPollInterval: () => void;
            options: Server.ICommandOptions[];
            reqId: number | null;
            commandIndex: number | null;
            refs: number;
            value: any;
            response?: Server.IMessage;
            /** The time the command processing has started as iso 8601 string. */
            processedStart?: string;
            /** The time the command processing has ended as iso 8601 string. */
            processedEnd?: string;
            callbacks: IServerSymbolWatchEntryCallbackObj[];
        }
        interface IServerSymbolWatchEntryCallbackObj {
            callback: (this: void, data: TcHmi.System.ServerManager.IServerWatchResultObject) => void;
            symbol: TcHmi.System.Symbol;
            dirty: boolean;
            refreshLock: boolean;
            destroy: DestroyFunction;
        }
        interface IServerSymbolWatchEntryGroup {
            watchEntries: Map<string, ServerManager.IServerSymbolWatchEntry>;
        }
        /** provides the url of the request */
        interface IConnectionResultObject extends TcHmi.IResultObject {
            url: string;
        }
        interface IResponseResultObject extends TcHmi.IResultObject {
            response: TcHmi.SelectableRequired<Server.IMessage, 'apiVersion' | 'id' | 'sessionId' | 'commands'>;
        }
        interface ILicenseCheckResultObject extends TcHmi.IResultObject {
            connectState: ServerManager.ConnectState;
        }
        interface IServerStateInfo {
            creatorMode: boolean;
            endpoints: string[];
            forceAuthEndpoints: string[];
            pid: number;
            productVersion: string;
            projectName: string;
            projectVersion: string;
            publishInProgress: boolean;
            serviceMode: boolean;
            state: number;
            version: string;
            timedClient?: IServerStateTimedClientInfo;
            maintenanceMode?: IServerStateMaintenanceMode;
            serverTime?: string;
            frameworkApiVersion?: string;
        }
        interface IServerStateTimedClientInfo {
            isTimed: boolean;
            expiration?: string;
            availableAgain?: string;
        }
        interface IRequestOptions extends Server.IRequestOptions {
            symbol?: System.Symbol;
        }
        interface IRequestGroup {
            id: string;
            requestId: number;
            options: ServerManager.IRequestGroupOptions;
            requests: IRequestGroupRequest[];
        }
        interface IRequestGroupRequest {
            message: Server.IMessage;
            options: undefined | null | Server.IRequestOptions;
            callback: undefined | null | ((this: void, data: Server.IResultObject) => void);
        }
        interface IRequestGroupOptions {
            parallel?: boolean;
            timeout?: number;
            refresh?: boolean;
        }
        interface IServerStateMaintenanceMode {
            isActive: true;
            isAllowed: true;
            isMaintenanceUser: true;
            timer: string;
        }
        interface IWatchResultObject<T = any> extends TcHmi.IResultObject {
            value?: T;
            processedStart?: string;
            processedEnd?: string;
            /** A destroy function to remove the watch. Only set if there is no error. */
            destroy?: TcHmi.DestroyFunction;
        }
        interface IServerWatchResultObject<T = any> extends IWatchResultObject<T> {
            response?: TcHmi.Server.IMessage<T>;
        }
    }
}
declare namespace TcHmi.System {
    class ServerEventManager {
        constructor();
        /**
         * Sends a request to the server to confirm an alarm.
         * @param alarm The raw data of the alarm to confirm.
         */
        confirmAlarm(alarm: TcHmi.Server.Events.RawServerAlarm, callback?: (this: void, data: TcHmi.IResultObject) => void): void;
        /**
         * Requests a list containing all events matching the specified filter from the server.
         * @param filter The filter which events have to match.
         * @param callback The callback function to handle the received events.
         */
        listEvents(filter: TcHmi.Filter | null, callback: (this: void, data: ServerEventManager.ListResult) => void): void;
        /**
         * Subscribe to events coming from the server.
         * @param filter The filter the events have to match.
         * @param eventCallback The callback function to handle received events.
         * @param doneCallback The callback that is called when the subscription has been registered.
         */
        subscribe(filter: TcHmi.Filter | null, eventCallback: (this: void, data: ServerEventManager.SubscriptionResult) => void, doneCallback?: (this: void, data: TcHmi.IResultObject) => void): number | null;
        /**
         * Unsubscribe from events.
         * @param id The subscription id.
         * @param callback The callback that is called when the subscription has been deregistered.
         */
        unsubscribe(id: number, callback?: (this: void, data: IResultObject) => void): void;
        /**
         * Update the filter of an event subscription.
         * @param id The id of the subscription to update.
         * @param filter The new filter for the subscription.
         * @param callback The callback that is called when the subscription has been updated.
         */
        updateSubscription(id: number, filter: TcHmi.Filter | null, callback?: (this: void, data: IResultObject) => void): void;
    }
    namespace ServerEventManager {
        interface SubscriptionInfo {
            responseId: number;
            callback?: (this: void, data: SubscriptionResult) => any;
        }
        interface ListResult extends TcHmi.IResultObject {
            events?: TcHmi.Server.Events.RawServerEvent[];
        }
        interface SubscriptionResult extends TcHmi.IResultObject {
            event?: TcHmi.Server.Events.RawServerEvent;
        }
        /**
         * Deprecated: Use public type from TcHmi.Server.Events instead
         * @deprecated Use public type from TcHmi.Server.Events instead
         */
        type RawServerEvent = TcHmi.Server.Events.RawServerEvent;
        /**
         * Deprecated: Use public type from TcHmi.Server.Events instead
         * @deprecated Use public type from TcHmi.Server.Events instead
         */
        type RawServerMessage = TcHmi.Server.Events.RawServerMessage;
        /**
         * Deprecated: Use public type from TcHmi.Server.Events instead
         * @deprecated Use public type from TcHmi.Server.Events instead
         */
        type RawServerAlarm = TcHmi.Server.Events.RawServerAlarm;
        /**
         * Deprecated: Use public type from TcHmi.Server.Events instead
         * @deprecated Use public type from TcHmi.Server.Events instead
         */
        type ServerAlarmChangeType = TcHmi.Server.Events.ServerAlarmChangeType;
    }
}
/**
 * Used to execute eval in isolated scope.
 * @param ctx Context object
 * @param s The eval expression.
 * {@link ctx} This object will be used inside the eval.
 */
declare function gIsolatedEval_TcHmi_System_TriggerManager_JavaScriptAction(ctx: TcHmi.SelectableRequired<TcHmi.Context, 'success' | 'error' | 'args'>, s: string): any;
/**
 * Used to execute eval in isolated scope.
 * @param s The eval expression.
 * {@link results} This object will be used inside the eval.
 */
declare function gIsolatedEval_TcHmi_System_TriggerManager_ConditionExpressionsResult(s: string, results: {
    expression: TcHmi.Trigger.Expression;
    result: {
        compare1: any;
        compare2: any;
    };
}[]): any;
declare namespace TcHmi.System {
    /**
     */
    class TriggerManager {
        /**
         */
        constructor();
        /**
         * Registers all triggers defined in the triggerArr array.
         * @param triggerArr Array that contains events to register and actions to perform when those events are raised.
         */
        register(triggerArr: TcHmi.Trigger[] | null | undefined): DestroyFunction;
    }
}
declare namespace TcHmi.System {
    namespace Init {
        function printGeneralLogInformation(): void;
        function printForcedLogInformation(): void;
        let __initStep: Init.INIT_STATE;
        /**
         * Use control and project data from indexedDb.
         * Could be set to false if last user was different, because file access rights could be different.
         */
        let __fetchFromIndexedDb: boolean;
        /**
         * First load after publish should clear data because the data could be invalid
         * for the current project config.
         */
        let __firstLoadAfterPublish: boolean;
        function prepare(): void;
        function run(initStep: Init.INIT_STATE): void;
    }
    namespace Init {
        const enum INIT_STATE {
            INVALID = 0,
            IDLE = 1,
            CHECK_BROWSER_FEATURES = 2,
            BASE_CONFIGURATION = 3,
            BASE_DESCRIPTION = 4,
            BASE_PACKAGE_LOAD = 5,
            LOCALIZATION_EARLY = 6,
            THEME_MANAGER_EARLY = 7,
            CACHE_LOADING = 8,
            SYSTEM_PREPARATION = 9,
            PACKAGES_MANIFEST_LOAD = 10,
            CONTROLS_DESCRIPTION_LOAD = 11,
            CONTROLS_DESCRIPTION_RESOLVE = 12,
            LOCALIZATION_FINAL = 13,
            THEME_MANAGER_FINAL = 14,
            CONTROLS_TEMPLATES_LOAD = 15,
            PACKAGES_FUNCTION_DESCRIPTION_LOAD = 16,
            USER_FUNCTION_DESCRIPTION_LOAD = 17,
            OPEN_ENGINEERING_CONNECTION = 18,
            REGISTRATION_CHECK = 19,
            OPEN_SERVER_CONNECTION = 20,
            TYPEDEFINITIONS = 21,
            SERVER_SYMBOL_META_DATA_CACHE = 22,
            AUDIT_TRAIL_INIT = 23,
            VALIDATION = 24,
            USERCONTROL_LOAD = 25,
            CONTENT_LOAD = 26,
            VIEW_LOAD = 27,
            CONTENT_COMPILE = 28,
            VIEW_COMPILE = 29,
            PRELOAD_BINDINGS = 30,
            FINAL = 1000,
            ERROR = 10000
        }
    }
}
//# sourceMappingURL=TcHmiFramework.d.ts.map