var __runInitializers=this&&this.__runInitializers||function(thisArg,initializers,value){for(var useValue=arguments.length>2,i=0;i<initializers.length;i++)value=useValue?initializers[i].call(thisArg,value):initializers[i].call(thisArg);return useValue?value:void 0},__esDecorate=this&&this.__esDecorate||function(ctor,descriptorIn,decorators,contextIn,initializers,extraInitializers){function accept(f){if(void 0!==f&&"function"!=typeof f)throw new TypeError("Function expected");return f}for(var _,kind=contextIn.kind,key="getter"===kind?"get":"setter"===kind?"set":"value",target=!descriptorIn&&ctor?contextIn.static?ctor:ctor.prototype:null,descriptor=descriptorIn||(target?Object.getOwnPropertyDescriptor(target,contextIn.name):{}),done=!1,i=decorators.length-1;i>=0;i--){var context={};for(var p in contextIn)context[p]="access"===p?{}:contextIn[p];for(var p in contextIn.access)context.access[p]=contextIn.access[p];context.addInitializer=function(f){if(done)throw new TypeError("Cannot add initializers after decoration has completed");extraInitializers.push(accept(f||null))};var result=(0,decorators[i])("accessor"===kind?{get:descriptor.get,set:descriptor.set}:descriptor[key],context);if("accessor"===kind){if(void 0===result)continue;if(null===result||"object"!=typeof result)throw new TypeError("Object expected");(_=accept(result.get))&&(descriptor.get=_),(_=accept(result.set))&&(descriptor.set=_),(_=accept(result.init))&&initializers.unshift(_)}else(_=accept(result))&&("field"===kind?initializers.unshift(_):descriptor[key]=_)}target&&Object.defineProperty(target,contextIn.name,descriptor),done=!0};const TcHmi=window.TcHmi,{CallbackMethod,EventHandler}=TcHmi;
/**
 * Base class for all TwinCAT HMI Controls
 * Check out
 * https://infosys.beckhoff.com/content/1031/te2000_tc3_hmi_engineering/3845361931.html?id=3265481440996758836
 * for an API reference.
 * @preserve (Part of the public API)
 */
let TcHmiControl=(()=>{let ___onFunctionResultChanged_decorators,___onPropertyChanged_decorators,___onResolverForClassNamesWatchCallback_decorators,___onResolverForAccessConfigWatchCallback_decorators,___onResolverForVirtualControlRightMappingsWatchCallback_decorators,___onResolverForTransformWatchCallback_decorators,___onResolverForBackgroundColorWatchCallback_decorators,___onResolverForBackgroundImagePaddingWatchCallback_decorators,___onResolverForBorderColorWatchCallback_decorators,___onResolverForBorderWidthWatchCallback_decorators,___onResolverForBorderRadiusWatchCallback_decorators,___onResolverForBorderStyleWatchCallback_decorators,___onResolverForBoxShadowWatchCallback_decorators,_classSuper=TcHmi.Controls.System.baseTcHmiControl,_instanceExtraInitializers=[];return class TcHmiControl extends _classSuper{static{const _metadata="function"==typeof Symbol&&Symbol.metadata?Object.create(_classSuper[Symbol.metadata]??null):void 0;___onFunctionResultChanged_decorators=[EventHandler()],___onPropertyChanged_decorators=[EventHandler()],___onResolverForClassNamesWatchCallback_decorators=[CallbackMethod],___onResolverForAccessConfigWatchCallback_decorators=[CallbackMethod],___onResolverForVirtualControlRightMappingsWatchCallback_decorators=[CallbackMethod],___onResolverForTransformWatchCallback_decorators=[CallbackMethod],___onResolverForBackgroundColorWatchCallback_decorators=[CallbackMethod],___onResolverForBackgroundImagePaddingWatchCallback_decorators=[CallbackMethod],___onResolverForBorderColorWatchCallback_decorators=[CallbackMethod],___onResolverForBorderWidthWatchCallback_decorators=[CallbackMethod],___onResolverForBorderRadiusWatchCallback_decorators=[CallbackMethod],___onResolverForBorderStyleWatchCallback_decorators=[CallbackMethod],___onResolverForBoxShadowWatchCallback_decorators=[CallbackMethod],__esDecorate(this,null,___onFunctionResultChanged_decorators,{kind:"method",name:"__onFunctionResultChanged",static:!1,private:!1,access:{has:obj=>"__onFunctionResultChanged"in obj,get:obj=>obj.__onFunctionResultChanged},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onPropertyChanged_decorators,{kind:"method",name:"__onPropertyChanged",static:!1,private:!1,access:{has:obj=>"__onPropertyChanged"in obj,get:obj=>obj.__onPropertyChanged},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForClassNamesWatchCallback_decorators,{kind:"method",name:"__onResolverForClassNamesWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForClassNamesWatchCallback"in obj,get:obj=>obj.__onResolverForClassNamesWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForAccessConfigWatchCallback_decorators,{kind:"method",name:"__onResolverForAccessConfigWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForAccessConfigWatchCallback"in obj,get:obj=>obj.__onResolverForAccessConfigWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForVirtualControlRightMappingsWatchCallback_decorators,{kind:"method",name:"__onResolverForVirtualControlRightMappingsWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForVirtualControlRightMappingsWatchCallback"in obj,get:obj=>obj.__onResolverForVirtualControlRightMappingsWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForTransformWatchCallback_decorators,{kind:"method",name:"__onResolverForTransformWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForTransformWatchCallback"in obj,get:obj=>obj.__onResolverForTransformWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBackgroundColorWatchCallback_decorators,{kind:"method",name:"__onResolverForBackgroundColorWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBackgroundColorWatchCallback"in obj,get:obj=>obj.__onResolverForBackgroundColorWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBackgroundImagePaddingWatchCallback_decorators,{kind:"method",name:"__onResolverForBackgroundImagePaddingWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBackgroundImagePaddingWatchCallback"in obj,get:obj=>obj.__onResolverForBackgroundImagePaddingWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBorderColorWatchCallback_decorators,{kind:"method",name:"__onResolverForBorderColorWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBorderColorWatchCallback"in obj,get:obj=>obj.__onResolverForBorderColorWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBorderWidthWatchCallback_decorators,{kind:"method",name:"__onResolverForBorderWidthWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBorderWidthWatchCallback"in obj,get:obj=>obj.__onResolverForBorderWidthWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBorderRadiusWatchCallback_decorators,{kind:"method",name:"__onResolverForBorderRadiusWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBorderRadiusWatchCallback"in obj,get:obj=>obj.__onResolverForBorderRadiusWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBorderStyleWatchCallback_decorators,{kind:"method",name:"__onResolverForBorderStyleWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBorderStyleWatchCallback"in obj,get:obj=>obj.__onResolverForBorderStyleWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),__esDecorate(this,null,___onResolverForBoxShadowWatchCallback_decorators,{kind:"method",name:"__onResolverForBoxShadowWatchCallback",static:!1,private:!1,access:{has:obj=>"__onResolverForBoxShadowWatchCallback"in obj,get:obj=>obj.__onResolverForBoxShadowWatchCallback},metadata:_metadata},null,_instanceExtraInitializers),_metadata&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:_metadata})}static#tchmiFQN="TcHmi.Controls.System."+this.name;get[globalThis.Symbol.toStringTag](){return this.getType()?.split(".").pop()??"Object"}
/**
         * Constructor of the control
         * @param element Element from HTML (internal, do not use)
         * @param pcElement precompiled Element (internal, do not use)
         * @param attrs Attributes defined in HTML in a special format (internal, do not use)
         * @preserve (Part of the public API)
         */constructor(element,pcElement,attrs){super(),this.__element=element,this.__attrs=attrs,this.__pcElement=pcElement,this.__parent=null,this.__children=[];let attrType=attrs["data-tchmi-type"].value,module=TcHmi.System.Data.Modules.controls.map.get(attrType);if(!module)throw new Error("Unknown control type: "+attrType);if(module.error!==TcHmi.Errors.NONE)throw new Error('Control type: "'+attrType+'" module contains errors: '+TcHmi.Log.buildMessage(module.errorDetails));let descr=module.description;if(!descr)throw new Error('Control type "'+attrType+'" module contains no description.');this.__type=TcHmi.System.resolveQualifiedName(descr.name,descr.namespace),this.version=descr.version,this.__id=attrs.id.value,this.__isInitialized=!1,this.__isDestroyed=!1,this.__isAttached=!1,this.__attributesInitialized=!1,this.__isContainerControl=!1,this.__keepAlive=!1,this.__accessConfig=[],this.__virtualControlRightMappings=[];const itypes=TcHmi.System.Services.controlManager.getDescriptionTypes(this.__type);this.__element[0].classList.add("tchmi-box",...itypes.map((type=>type.replace(/\./g,"_")))),this.__localization=new TcHmi.Locale.ControlLocalization(this.__type),this.__destroyOnDestroy.push(TcHmi.EventProvider.register(this.__id+".onFunctionResultChanged",this.__onFunctionResultChanged),TcHmi.EventProvider.register(this.__id+".onPropertyChanged",this.__onPropertyChanged))}__destroyOnDetach=(__runInitializers(this,_instanceExtraInitializers),[]);__destroyOnDestroy=[];__destroyTriggerAttach=null;__destroyTriggerNonAttach=null;__passThroughEvents=[{tcHmiEvent:"onMouseRightClick",domEvent:"contextmenu",destroyers:null},{tcHmiEvent:"onMouseDoubleClick",domEvent:"dblclick",destroyers:null},{tcHmiEvent:"onMouseEnter",domEvent:"mouseenter",destroyers:null},{tcHmiEvent:"onMouseMove",domEvent:"mousemove",destroyers:null},{tcHmiEvent:"onMouseOut",domEvent:"mouseout",destroyers:null},{tcHmiEvent:"onMouseLeave",domEvent:"mouseleave",destroyers:null},{tcHmiEvent:"onMouseDown",domEvent:"mousedown",destroyers:null},{tcHmiEvent:"onMouseUp",domEvent:"mouseup",destroyers:null},{tcHmiEvent:"onMouseOver",domEvent:"mouseover",destroyers:null},{tcHmiEvent:"onMouseClick",domEvent:"click",destroyers:null},{tcHmiEvent:"onMousewheel",domEvent:"wheel",destroyers:null},{tcHmiEvent:"onTouchStart",domEvent:"touchstart",destroyers:null},{tcHmiEvent:"onTouchMove",domEvent:"touchmove",destroyers:null},{tcHmiEvent:"onTouchEnd",domEvent:"touchend",destroyers:null},{tcHmiEvent:"onTouchCancel",domEvent:"touchcancel",destroyers:null}];__syntheticEvents=[{syntheticEvent:"onPressed",baseEvent:"onMouseClick",action:eventRegistrationData=>{TcHmi.EventProvider.raiseEx(eventRegistrationData.event)},destroyers:null},{syntheticEvent:"onMouseDownLeft",baseEvent:"onMouseDown",action:(eventRegistrationData,_baseEvent,domEvent)=>{0===domEvent.button&&TcHmi.EventProvider.raiseEx(eventRegistrationData.event,domEvent)},destroyers:null},{syntheticEvent:"onMouseDownRight",baseEvent:"onMouseDown",action:(eventRegistrationData,_baseEvent,domEvent)=>{2===domEvent.button&&TcHmi.EventProvider.raiseEx(eventRegistrationData.event,domEvent)},destroyers:null},{syntheticEvent:"onMouseUpLeft",baseEvent:"onMouseUp",action:(eventRegistrationData,_baseEvent,domEvent)=>{0===domEvent.button&&TcHmi.EventProvider.raiseEx(eventRegistrationData.event,domEvent)},destroyers:null},{syntheticEvent:"onMouseUpRight",baseEvent:"onMouseUp",action:(eventRegistrationData,_baseEvent,domEvent)=>{2===domEvent.button&&TcHmi.EventProvider.raiseEx(eventRegistrationData.event,domEvent)},destroyers:null}];
/**
         * Version
         * @preserve (Part of the public API)
         */
version;__element;__pcElement;__attrs;__id;__type;__gridRowIndex;__gridColumnIndex;__isEnabled;__isAttached;__isInitialized;__attributesInitialized;__isDestroyed;__keepAlive;__parent;__children;__isContainerControl;__accessConfig;__virtualControlRightMappings;__classNames;__objectResolvers=new Map;__localization;__zindex;__width;__widthUnit;__widthMode;__height;__heightUnit;__intHeight=null;__heightMode;__top;__topUnit;__left;__leftUnit;__bottom;__bottomUnit;__right;__rightUnit;__minWidth;__minWidthUnit;__maxWidth;__maxWidthUnit;__minHeight;__minHeightUnit;__maxHeight;__maxHeightUnit;__opacity;__visibility;__transform;__borderColor;__borderWidth;__borderRadius;__borderStyle;__boxShadow;__trigger;__triggerNonAttachList=[];__triggerAttachList=[];__tooltip;__background={};__accessAndEnableState={enabled:void 0,observeDisallowed:!1,operateDisallowed:!1};static __asyncWorkAnimationFrameId=0;static __asyncWorkControls=new Set;__asyncWorkData={"System.TcHmiControl.layoutData":{}};__renderedSizeCache={left:null,top:null,right:null,bottom:null,width:null,height:null,viewportLeft:null,viewportTop:null};__isDetaching=!1;__setLifeCycleState(doNotCallThisApi){switch(doNotCallThisApi){case 15:this.__attributesInitialized=!0;break;case 30:this.__isAttached=!0;break;case 40:this.__isAttached=!1;break;case 36:this.__isDetaching=!0;break;case 37:this.__isDetaching=!1}}getLifeCycleState(){return{initialized:this.__isInitialized,attached:this.__isAttached,detaching:this.__isDetaching,destroyed:this.__isDestroyed}}getChildren(){return this.__children}
/**
         * Is raised before control attribute setters are called to allow initialization based on current attribute values.
         * @preserve (Part of the public API)
         */__previnit(){}
/**
         * Is raised after control attribute setters have been called to allow initialization based on current attribute values.
         * @preserve (Part of the public API)
         */__init(){0===this.__accessConfig.length&&this.__processAccessConfig(),this.__processAllBackground();for(const passThroughEvent of this.__passThroughEvents)this.__destroyOnDestroy.push(TcHmi.EventProvider.watchEventRegistration(`${this.getId()}.${passThroughEvent.tcHmiEvent}`,(data=>{if(data.error===TcHmi.Errors.NONE)switch(data.type){case TcHmi.EventProvider.EventRegWatchType.REGISTER:passThroughEvent.destroyers??=new Map,passThroughEvent.destroyers.set(data.event.id,TcHmi.EventProvider.registerDomEvent(this.getElement(),passThroughEvent.domEvent,(event=>{!0===TcHmi.Access.checkAccess(this,"operate")&&this.getIsEnabled()&&TcHmi.EventProvider.raiseEx(data.event,event)}),data.event.options??{passive:!1}));break;case TcHmi.EventProvider.EventRegWatchType.DESTROY:passThroughEvent.destroyers?.get(data.event.id)?.(),passThroughEvent.destroyers?.delete(data.event.id)}})));for(const syntheticEvent of this.__syntheticEvents)this.__destroyOnDestroy.push(TcHmi.EventProvider.watchEventRegistration(`${this.getId()}.${syntheticEvent.syntheticEvent}`,(data=>{if(data.error===TcHmi.Errors.NONE)switch(data.type){case TcHmi.EventProvider.EventRegWatchType.REGISTER:syntheticEvent.destroyers??=new Map,syntheticEvent.destroyers.set(data.event.id,TcHmi.EventProvider.register(`${this.getId()}.${syntheticEvent.baseEvent}`,syntheticEvent.action.bind(this,data),data.event.options));break;case TcHmi.EventProvider.EventRegWatchType.DESTROY:syntheticEvent.destroyers?.get(data.event.id)?.(),syntheticEvent.destroyers?.delete(data.event.id)}})));this.__isInitialized=!0,TcHmi.EventProvider.raise("System.onControlInitialized",this),TcHmi.EventProvider.raise(this.__id+".System.onInitialized",this),TcHmi.EventProvider.raise("onControlInitialized",this),TcHmi.EventProvider.raise(this.__id+".onInitialized",this)}
/**
         * Is called of control is attached to the dom.
         * @preserve (Part of the public API)
         */__attach(){TCHMI_DESIGNER||TCHMI_SINGLECONTROL||this.__parent||"TcHmi.Controls.System.TcHmiView"===this.__type||this.__element[0].classList.contains("tchmi-in-topmostlayer")||this.__element[0].classList.contains("tchmi-in-specialviewport")||TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,"Missing logical parent.\nIf the control was dynamically generated by help of the TcHmi.ControlFactory on application level make sure to use the API addChild()/removeChild() from the parent control.\nIf the control was dynamically generated by help of the TcHmi.ControlFactory on control level make sure to forward a reference of the parent control while creating the control.");for(const resolverInfo of this.__objectResolvers.values())resolverInfo.watchDestroyer||(resolverInfo.watchDestroyer=resolverInfo.resolver.watch(resolverInfo.watchCallback));this.__destroyTriggerAttach=TcHmi.System.Services.triggerManager.register(this.__triggerAttachList.map((trigger=>{const copy={...trigger};return copy.ctx=copy.ctx&&"object"==typeof copy.ctx?tchmi_clone_object(copy.ctx):{},copy.ctx.owner=this,copy}))),TcHmi.EventProvider.raise("System.onControlAttached",this),TcHmi.EventProvider.raise(this.__id+".System.onAttached",this),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"IsAttached"}),TcHmi.EventProvider.raise("onControlAttached",this),TcHmi.EventProvider.raise(this.__id+".onAttached",this)}
/**
         * Is called if control is detached from the dom.
         * @preserve (Part of the public API)
         */__detach(){this.__setLifeCycleState(37);for(const resolverInfo of this.__objectResolvers.values())resolverInfo.watchDestroyer&&(resolverInfo.watchDestroyer(),resolverInfo.watchDestroyer=null);for(const destroy of this.__destroyOnDetach)destroy();this.__destroyOnDetach=[],TcHmi.EventProvider.raise("System.onControlDetached",this),TcHmi.EventProvider.raise(this.__id+".System.onDetached",this),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"IsAttached"}),TcHmi.EventProvider.raise("onControlDetached",this),TcHmi.EventProvider.raise(this.__id+".onDetached",this),this.__destroyTriggerAttach&&(this.__destroyTriggerAttach(),this.__destroyTriggerAttach=null)}
/**
         * Destroy the current control instance.
         * Will be called automatically if system destroys control!
         * @preserve (Part of the public API)
         */destroy(){if(this.__keepAlive)return;if(this.__isDestroyed)return;for(const destroy of this.__destroyOnDestroy)destroy();if(this.__destroyOnDestroy=[],this.__isAttached){this.__element.detach(),this.__parent&&(this.__parent.__removeChild(this),this.__parent=null),this.__setLifeCycleState(40),TcHmi.EventProvider.raise("System.onPrevControlDetached",this),TcHmi.EventProvider.raise(this.__id+".System.onPrevDetached",this);try{this.__detach()}catch(e){TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,"An uncaught exception occurred while detaching the control:\n",e)}TcHmi.EventProvider.raise("System.onPrevControlsDetached",[this])}else{for(const destroy of this.__destroyOnDetach)destroy();this.__destroyOnDetach=[],this.__parent&&(this.__parent.__removeChild(this),this.__parent=null)}for(const resolverInfo of this.__objectResolvers.values())resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy();TcHmiControl.__asyncWorkControls.delete(this),this.__objectResolvers.clear();for(const passThroughEvent of this.__passThroughEvents)passThroughEvent.destroyers?.forEach((destroy=>{destroy()})),passThroughEvent.destroyers=null;for(const syntheticEvent of this.__syntheticEvents)syntheticEvent.destroyers?.forEach((destroy=>{destroy()})),syntheticEvent.destroyers=null;let cicount=0;for(;this.__children.length>0;){if(cicount++,cicount>=32768){TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,"Maximum loop iteration in children destroy reached! Breaking loop!");break}try{this.__children[0].getIsDestroyed()||this.__children[0].destroy()}catch(e){TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,"An uncaught exception occurred while destroying the control:\n",e)}}TcHmi.EventProvider.raise(this.__id+"onPrevDestroyed",this),TcHmi.EventProvider.raise("System.onPrevControlDestroyed",this),TcHmi.EventProvider.raise("onPrevControlDestroyed",this);let bindings=TcHmi.System.Services.bindingManager.getBindingsByControl(this);if(void 0!==bindings)for(const propertyName of bindings.keys())TcHmi.System.Services.bindingManager.removeBinding(propertyName,this,!1);TcHmi.System.Services.controlManager.destruct(this),this.__isDestroyed=!0,TcHmi.EventProvider.raise("System.onControlDestroyed",this),TcHmi.EventProvider.raise("onControlDestroyed",this),TcHmi.EventProvider.raise(this.__id+".onDestroyed",this),this.__destroyTriggerNonAttach&&(this.__destroyTriggerNonAttach(),this.__destroyTriggerNonAttach=null),this.__destroyTriggerAttach&&(this.__destroyTriggerAttach(),this.__destroyTriggerAttach=null)}__suspendObjectResolver(key){let resolverInfo=this.__objectResolvers.get(key);resolverInfo&&resolverInfo.watchDestroyer&&(resolverInfo.watchDestroyer(),resolverInfo.watchDestroyer=null)}
/**
         * Returns the configured defaultInternalValue of the control property
         * @param propertyName
         * @template T Type of the default value
         * @preserve (Part of the public API)
         */getAttributeDefaultValueInternal(propertyName){if(!propertyName)return null;const attr=TcHmi.System.Services.controlManager.getDescriptionAttributeByPropertyName(this.__type,propertyName);if(!attr)return null;if(void 0===attr.defaultValueInternal){let schema=TcHmi.Type.getSchema(attr.type);return schema?TcHmi.Type.Schema.resolveDefault(schema):null}return tchmi_clone_object(attr.defaultValueInternal)}__onFunctionResultChanged(_event,data,dataEx){if(dataEx)for(let i=0,ii=dataEx.length;i<ii;i++){let d=dataEx[i];d&&!0!==d.noLegacyForwarding&&(TcHmi.EventProvider.count(this.__id+".onPropertyChanged")>1&&TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:d.propertyName,noLegacyForwarding:!0}),TcHmi.EventProvider.has(this.__id+".onPropertyChanged<"+d.propertyName+">")&&TcHmi.EventProvider.raise(this.__id+".onPropertyChanged<"+d.propertyName+">",d.dirtyPaths&&d.dirtyPaths.length>0?{propertyName:d.propertyName,dirtyPaths:d.dirtyPaths,noLegacyForwarding:!0}:{propertyName:d.propertyName,noLegacyForwarding:!0}))}else if(data)for(let i=0,ii=data.length;i<ii;i++){let d=data[i];if(!d)continue;let attr=TcHmi.System.Services.controlManager.getAttributeByPropertyGetterName(this,d);attr&&(TcHmi.EventProvider.count(this.__id+".onPropertyChanged")>1&&TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:attr.propertyName,noLegacyForwarding:!0}),TcHmi.EventProvider.has(this.__id+".onPropertyChanged<"+attr.propertyName+">")&&TcHmi.EventProvider.raise(this.__id+".onPropertyChanged<"+attr.propertyName+">",{propertyName:attr.propertyName,noLegacyForwarding:!0}))}}__onPropertyChanged(_event,data){if(data&&!0!==data.noLegacyForwarding&&(TcHmi.EventProvider.raise(this.__id+".onPropertyChanged<"+data.propertyName+">",data),TcHmi.EventProvider.count(this.__id+".onFunctionResultChanged")>1)){let attr=TcHmi.System.Services.controlManager.getAttributeByPropertyName(this,data.propertyName);attr&&TcHmi.EventProvider.raise(this.__id+".onFunctionResultChanged",[attr.propertyGetterName],data.dirtyPaths&&data.dirtyPaths.length>0?[{propertyName:attr.propertyName,noLegacyForwarding:!0,dirtyPaths:data.dirtyPaths}]:[{propertyName:attr.propertyName,noLegacyForwarding:!0}])}}
/**
         * Control Id
         * @preserve (Part of the public API)
         */
getId(){return this.__id}
/**
         * Type of the control
         * @preserve (Part of the public API)
         */getType(){return this.__type}
/**
         * Main HTML Element of the Control as jQuery object.
         * @preserve (Part of the public API)
         */getElement(){return this.__element}
/**
         * Precompiled copy of main JQuery element defining this control.
         * @preserve (Part of the public API)
         */getPcElement(){return this.__pcElement}__setPcElement(value){this.__pcElement=$(value)}
/**
         * List of attributes defined in html.
         * @preserve (Part of the public API)
         */getAttrs(){return this.__attrs}
/**
         * Returns a boolean determining if the control was already destroyed.
         * @preserve (Part of the public API)
         */getIsDestroyed(){return this.__isDestroyed}
/**
         * List of classes of the control.
         * @preserve (Part of the public API)
         */getClassNames(){return this.__classNames}setClassNames(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("ClassNames")),!Array.isArray(convertedValue))return void TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"ClassNames"},"Non array value is not supported.");let resolverInfo=this.__objectResolvers.get("classNames");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("classNames",{resolver,watchCallback:this.__onResolverForClassNamesWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForClassNamesWatchCallback)})}__onResolverForClassNamesWatchCallback(data){if(this.__isAttached||this.__suspendObjectResolver("classNames"),data.error!==TcHmi.Errors.NONE)return void TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"ClassNames"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`);if(!data.value)return;for(let index=0;index<data.value.length;index++)if("string"!=typeof data.value[index])return;if(tchmi_equal(data.value,this.__classNames))return;const valueOld=this.__classNames;this.__classNames=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"ClassNames"}),TcHmi.EventProvider.raise("System.onControlClassNamesChanged",{control:this,oldClassNames:valueOld,newClassName:data.value}),this.__processClassNames()}__processClassNames(){let oldClassArray=Array.from(this.__element[0].classList);for(const iterClassName of oldClassArray)iterClassName.startsWith("tchmi-class-")&&this.__element[0].classList.remove(iterClassName);if(this.__classNames)for(const newClassName of this.__classNames)this.__element[0].classList.add("tchmi-class-"+newClassName)}
/**
         * AccessConfig
         * @preserve (Part of the public API)
         */getAccessConfig(){return this.__accessConfig}
/**
         * Sets the new AccessConfig
         * @param valueNew
         * @preserve (Part of the public API)
         */setAccessConfig(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("AccessConfig")),!Array.isArray(convertedValue))return void TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"AccessConfig"},"Non array values are not supported.");let resolverInfo=this.__objectResolvers.get("accessConfig");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("accessConfig",{resolver,watchCallback:this.__onResolverForAccessConfigWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForAccessConfigWatchCallback)})}__onResolverForAccessConfigWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("accessConfig"),data.error===TcHmi.Errors.NONE?data.value&&(tchmi_equal(data.value,this.__accessConfig)||(this.__accessConfig=data.value,TcHmi.EventProvider.raise("System.AccessConfigChanged",this),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"AccessConfig"}),this.__processAccessConfig())):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"AccessConfig"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processAccessConfig(){if(!this.__parent){if(!this.__element||0===this.__element.length)return;if(this.__element[0].classList.contains("tchmi-in-topmostlayer")||this.__element[0].classList.contains("tchmi-in-specialviewport"));else if(TCHMI_SINGLECONTROL);else if(TCHMI_DESIGNER&&"TcHmi.Controls.System.TcHmiContent"===this.__type);else if(TCHMI_DESIGNER&&"TcHmi.Controls.System.TcHmiUserControl"===this.__type);else if("TcHmi.Controls.System.TcHmiView"!==this.__type)return}!0===TcHmi.Access.checkAccess(this,"observe")?(this.__accessAndEnableState.observeDisallowed&&(this.__element[0].classList.remove("TcHmi_Controls_System_TcHmiControl-observe-disallowed","tchmi-control-observe-disallowed"),this.__accessAndEnableState.observeDisallowed=!1,this.__processWidth(this),this.__processHeight(this)),!0===TcHmi.Access.checkAccess(this,"operate")?this.__accessAndEnableState.operateDisallowed&&(this.__element[0].classList.remove("TcHmi_Controls_System_TcHmiControl-operate-disallowed","tchmi-control-operate-disallowed"),this.__accessAndEnableState.operateDisallowed=!1):this.__accessAndEnableState.operateDisallowed||(this.__element[0].classList.add("TcHmi_Controls_System_TcHmiControl-operate-disallowed","tchmi-control-operate-disallowed"),this.__accessAndEnableState.operateDisallowed=!0)):this.__accessAndEnableState.observeDisallowed||(this.__element[0].classList.add("TcHmi_Controls_System_TcHmiControl-observe-disallowed","tchmi-control-observe-disallowed"),this.__accessAndEnableState.observeDisallowed=!0);for(let i=0,ii=this.__children.length;i<ii;i++)try{this.__children[i].__processAccessConfig()}catch(e){TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"AccessConfig"},`An uncaught exception occurred while processing attribute=AccessConfig of child control with id=${this.__children[i].getId()}`,e)}}setTrigger(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Trigger")),!tchmi_equal(convertedValue,this.__trigger)){if(this.__destroyTriggerAttach&&(this.__destroyTriggerAttach(),this.__destroyTriggerAttach=null),this.__destroyTriggerNonAttach&&(this.__destroyTriggerNonAttach(),this.__destroyTriggerNonAttach=null),this.__trigger=convertedValue,this.__triggerNonAttachList=[],this.__triggerAttachList=[],this.__trigger){const nonAttachEventList=[this.__id+".onInitialized",this.__id+".onDestroyed","%ctx%owner::Id|EventRegistrationMode=Resolve%/ctx%.onInitialized","%ctx%owner::Id|EventRegistrationMode=Resolve%/ctx%.onDestroyed"];for(const triggerEntry of this.__trigger)nonAttachEventList.includes(triggerEntry.event)?this.__triggerNonAttachList.push(triggerEntry):this.__triggerAttachList.push(triggerEntry)}TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Trigger"}),this.__processTrigger()}}getTrigger(){return this.__trigger}__processTrigger(){this.__destroyTriggerNonAttach=TcHmi.System.Services.triggerManager.register(this.__triggerNonAttachList.map((trigger=>{const copy={...trigger};return copy.ctx=copy.ctx&&"object"==typeof copy.ctx?tchmi_clone_object(copy.ctx):{},copy.ctx.owner=this,copy}))),this.__isAttached&&(this.__destroyTriggerAttach=TcHmi.System.Services.triggerManager.register(this.__triggerAttachList.map((trigger=>{const copy={...trigger};return copy.ctx=copy.ctx&&"object"==typeof copy.ctx?tchmi_clone_object(copy.ctx):{},copy.ctx.owner=this,copy}))))}
/**
         * Returns the VirtualControlRightMapping so it can react on parent control virtual rights.
         * @preserve (Part of the public API)
         */getVirtualControlRightMappings(){return this.__virtualControlRightMappings}
/**
         * Sets the new VirtualControlRightMapping so it can react on parent control virtual rights.
         * @param valueNew
         * @preserve (Part of the public API)
         */setVirtualControlRightMappings(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("VirtualControlRightMappings")),!Array.isArray(convertedValue))return void TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"VirtualControlRightMappings"},"Non array values are not supported.");let resolverInfo=this.__objectResolvers.get("virtualControlRightMappings");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("virtualControlRightMappings",{resolver,watchCallback:this.__onResolverForVirtualControlRightMappingsWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForVirtualControlRightMappingsWatchCallback)})}__onResolverForVirtualControlRightMappingsWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("virtualControlRightMappings"),data.error===TcHmi.Errors.NONE?data.value&&(tchmi_equal(data.value,this.__virtualControlRightMappings)||(this.__virtualControlRightMappings=data.value,TcHmi.EventProvider.raise("System.AccessConfigChanged",this),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"VirtualControlRightMappings"}),this.__processVirtualControlRightMappings())):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"VirtualControlRightMappings"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processVirtualControlRightMappings(){this.__processAccessConfig()}getIsEnabled(){return this.__accessAndEnableState.enabled??!1}
/**
         * Sets the isEnabled attribute and calls the associated process function (processIsEnabled).
         * @preserve (Part of the public API)
         */setIsEnabled(valueNew){let convertedValue=TcHmi.ValueConverter.toBoolean(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("IsEnabled")),convertedValue!==this.__isEnabled&&(this.__isEnabled=convertedValue,this.__processIsEnabled())}__processIsEnabled(){if(!this.__parent){if(!this.__element||0===this.__element.length)return;if(this.__element[0].classList.contains("tchmi-in-topmostlayer")||this.__element[0].classList.contains("tchmi-in-specialviewport"));else if(TCHMI_SINGLECONTROL);else if(TCHMI_DESIGNER&&"TcHmi.Controls.System.TcHmiContent"===this.__type);else if(TCHMI_DESIGNER&&"TcHmi.Controls.System.TcHmiUserControl"===this.__type);else if("TcHmi.Controls.System.TcHmiView"!==this.__type)return}const oldEnabled=this.__accessAndEnableState.enabled;this.__accessAndEnableState.enabled=this.__isEnabled;let iteratorParentControl=this;do{if(this.__accessAndEnableState.enabled=iteratorParentControl.getIsEnabled(),!this.__accessAndEnableState.enabled)break;iteratorParentControl=iteratorParentControl.getParent()}while(iteratorParentControl);oldEnabled!==this.__accessAndEnableState.enabled&&TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"IsEnabled"}),this.__accessAndEnableState.enabled?(this.__element[0].classList.contains("TcHmi_Controls_System_TcHmiControl-disabled")&&this.__element[0].classList.remove("TcHmi_Controls_System_TcHmiControl-disabled"),this.__element[0].classList.contains("tchmi-control-disabled")&&this.__element[0].classList.remove("tchmi-control-disabled")):(this.__element[0].classList.contains("TcHmi_Controls_System_TcHmiControl-disabled")||this.__element[0].classList.add("TcHmi_Controls_System_TcHmiControl-disabled"),this.__element[0].classList.contains("tchmi-control-disabled")||this.__element[0].classList.add("tchmi-control-disabled"));for(let i=0,ii=this.__children.length;i<ii;i++)try{this.__children[i].__processIsEnabled()}catch(e){TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"IsEnabled"},`An uncaught exception occurred while processing attribute=IsEnabled of child control with id=${this.__children[i].getId()}`,e)}}
/**
         * Returns the Row index of the Control inside a TcHmiGrid Container.
         * @preserve (Part of the public API)
         */getGridRowIndex(){return this.__gridRowIndex}
/**
         * Sets a new GridRow index
         * @param valueNew
         * @preserve (Part of the public API)
         */setGridRowIndex(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("GridRowIndex")),convertedValue!==this.__gridRowIndex&&(this.__gridRowIndex=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"GridRowIndex"}),TcHmi.EventProvider.raise("System.onControlGridRowIndexChanged",this),this.__processGridRowIndex())}__processGridRowIndex(){}
/**
         * Returns the Column index of the Control inside a TcHmiGrid Container.
         * @preserve (Part of the public API)
         */getGridColumnIndex(){return this.__gridColumnIndex}
/**
         * Sets a new GridColumn index
         * @param valueNew
         * @preserve (Part of the public API)
         */setGridColumnIndex(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("GridColumnIndex")),convertedValue!==this.__gridColumnIndex&&(this.__gridColumnIndex=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"GridColumnIndex"}),TcHmi.EventProvider.raise("System.onControlGridColumnIndexChanged",this),this.__processGridColumnIndex())}__processGridColumnIndex(){}
/**
         * Returns a boolean determining if the control is initialized.
         * @preserve (Part of the public API)
         */getIsInitialized(){return this.__isInitialized}
/**
         * Returns a boolean determining if the control is attached to the dom.
         * @preserve (Part of the public API)
         */getIsAttached(){return this.__isAttached}
/**
         * Returns a boolean determining if the control should not be destroyed.
         * @preserve (Part of the public API)
         */getKeepAlive(){return this.__keepAlive}__setKeepAlive(value){this.__keepAlive=value}__getKeepAlive(){return this.__keepAlive}
/**
         * Returns a boolean determining if the control is a container control.
         * @preserve (Part of the public API)
         */getIsContainerControl(){return this.__isContainerControl}
/**
         * Parent control or null if there is (till now?) no parent control.
         * @preserve (Part of the public API)
         */getParent(){return this.__parent}__setParent(value){this.__parent=value,TcHmi.EventProvider.raise("System.ParentChanged",this),this.__attributesInitialized&&(this.__processIsEnabled(),this.__processAccessConfig())}__addChild(control,pos){this.__children.includes(control)||(control.__setParent(this),null==pos||pos<0?this.__children.push(control):this.__children.splice(pos,0,control),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Children"}))}__removeChild(control){let pos=null;for(let i=0,ii=this.__children.length;i<ii;i++)if(this.__children[i].getId()===control.getId()){pos=i;break}null!==pos&&(control.getElement().detach(),this.__children[pos].__setParent(null),this.__children.splice(pos,1),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Children"}))}
/**
         * Returns the current width of the Control.
         * @preserve (Part of the public API)
         */
getWidth(){return this.__width}
/**
         * Returns the current width unit of the Control.
         * @preserve (Part of the public API)
         */getWidthUnit(){return this.__widthUnit}
/**
         * Returns the current width mode of the control.
         * @preserve (Part of the public API)
         */getWidthMode(){return this.__widthMode}
/**
         * Returns if inner widths depends on child controls.
         * @preserve (Part of the public API)
         */innerWidthDependsOnChilds(){return!1}
/**
         * Updates the inner dimension depending on child controls.
         * @preserve (Part of the public API)
         */updateInnerWidthDependingOnChilds(){}
/**
         * Returns the current height of the Control.
         * @preserve (Part of the public API)
         */getHeight(){return this.__height}
/**
         * Returns the current height mode of the control.
         * @preserve (Part of the public API)
         */getHeightMode(){return this.__heightMode}
/**
         * Returns if inner heights depends on child controls.
         * @preserve (Part of the public API)
         */innerHeightDependsOnChilds(){return!1}
/**
         * Updates the inner dimension depending on child controls.
         * @preserve (Part of the public API)
         */updateInnerHeightDependingOnChilds(){}getHeightUnit(){return this.__heightUnit}
/**
         * Returns the current top coordinate of the Control.
         * @preserve (Part of the public API)
         */getTop(){return this.__top}
/**
         * Returns the current top coordinate unit of the Control.
         * @preserve (Part of the public API)
         */getTopUnit(){return this.__topUnit}
/**
         * Returns the current left coordinate of the Control.
         * @preserve (Part of the public API)
         */getLeft(){return this.__left}
/**
         * Returns the current left coordinate unit of the Control.
         * @preserve (Part of the public API)
         */getLeftUnit(){return this.__leftUnit}
/**
         * Returns the current bottom coordinate of the Control.
         * @preserve (Part of the public API)
         */getBottom(){return this.__bottom}
/**
         * Returns the current bottom coordinate unit of the Control.
         * @preserve (Part of the public API)
         */getBottomUnit(){return this.__bottomUnit}
/**
         * Returns the current right coordinate of the Control.
         * @preserve (Part of the public API)
         */getRight(){return this.__right}
/**
         * Returns the current right coordinate unit of the Control.
         * @preserve (Part of the public API)
         */getRightUnit(){return this.__rightUnit}
/**
         * Returns the current minwidth value.
         * @preserve (Part of the public API)
         */getMinWidth(){return this.__minWidth}
/**
         * Returns the current minwidth unit.
         * @preserve (Part of the public API)
         */getMinWidthUnit(){return this.__minWidthUnit}
/**
         * Returns the current minheight value.
         * @preserve (Part of the public API)
         */getMinHeight(){return this.__minHeight}
/**
         * Returns the current minheight unit.
         * @preserve (Part of the public API)
         */getMinHeightUnit(){return this.__minHeightUnit}
/**
         * Returns the current maxwidth value.
         * @preserve (Part of the public API)
         */getMaxWidth(){return this.__maxWidth}
/**
         * Returns the current maxwidth unit.
         * @preserve (Part of the public API)
         */getMaxWidthUnit(){return this.__maxWidthUnit}
/**
         * Returns the current maxheight value.
         * @preserve (Part of the public API)
         */getMaxHeight(){return this.__maxHeight}
/**
         * Returns the current maxheight unit.
         * @preserve (Part of the public API)
         */getMaxHeightUnit(){return this.__maxHeightUnit}
/**
         * Returns the current rendered left value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */getRenderedLeft(){return TcHmi.System.Services.controlManager.checkControlGeometryByControl(this),this.__renderedSizeCache.left}
/**
         * Returns the current rendered top value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */getRenderedTop(){return TcHmi.System.Services.controlManager.checkControlGeometryByControl(this),this.__renderedSizeCache.top}
/**
         * Returns the current rendered right value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */getRenderedRight(){return TcHmi.System.Services.controlManager.checkControlGeometryByControl(this),this.__renderedSizeCache.right}
/**
         * Returns the current rendered bottom value in pixel. Value is relative to parent element.
         * @preserve (Part of the public API)
         */getRenderedBottom(){return TcHmi.System.Services.controlManager.checkControlGeometryByControl(this),this.__renderedSizeCache.bottom}
/**
         * Returns the current rendered width value in pixel.
         * @preserve (Part of the public API)
         */getRenderedWidth(){return TcHmi.System.Services.controlManager.checkControlGeometryByControl(this),this.__renderedSizeCache.width}
/**
         * Returns the current rendered height value in pixel.
         * @preserve (Part of the public API)
         */getRenderedHeight(){return TcHmi.System.Services.controlManager.checkControlGeometryByControl(this),this.__renderedSizeCache.height}__injectRenderedDimensions(doNotCallThisApi){const layoutData=doNotCallThisApi;this.__asyncWorkData["System.TcHmiControl.layoutData"]=layoutData,this.__renderedSizeCache.viewportLeft=layoutData.bounds.leftGlobal,this.__renderedSizeCache.viewportTop=layoutData.bounds.topGlobal;for(const[currentStyleName,renderedDimension]of Object.entries(layoutData.computedStyles)){let pixelValue=null;if(renderedDimension&&renderedDimension.includes("px")&&(pixelValue=parseFloat(renderedDimension),isNaN(pixelValue)&&(pixelValue=null)),pixelValue!==this.__renderedSizeCache[currentStyleName]){this.__renderedSizeCache[currentStyleName]=pixelValue;const propertyName="Rendered"+currentStyleName.charAt(0).toUpperCase()+currentStyleName.slice(1);TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName})}}}__doAsyncWork(timestamp){this.__isDestroyed}__requestAsyncWork(){TcHmiControl.__asyncWorkControls.add(this),0===TcHmiControl.__asyncWorkAnimationFrameId&&(TcHmiControl.__asyncWorkAnimationFrameId=window.requestAnimationFrame((timestamp=>{const oldControlList=TcHmiControl.__asyncWorkControls;TcHmiControl.__asyncWorkControls=new Set,TcHmiControl.__asyncWorkAnimationFrameId=0;for(const ctrl of oldControlList){try{ctrl.__doAsyncWork(timestamp)}catch(ex){}let layoutData=ctrl.__asyncWorkData["System.TcHmiControl.layoutData"];layoutData.resized=!1,layoutData.moved=!1,layoutData.movedLocal=!1}})))}
/**
         * Sets the value of the width attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setWidth(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Width")),convertedValue!==this.__width&&(this.__width=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Width"}),this.__processWidth())}__processWidth(callerControl){const widthMode=this.getWidthMode();null!==this.__width&&void 0!==this.__width&&void 0!==this.__widthUnit&&"Value"===widthMode?this.__element[0].style.width=this.__width+this.__widthUnit:"Value"!==widthMode&&"Parent"!==widthMode||(this.__element[0].style.width=""),null===this.__parent||callerControl&&this.__parent===callerControl||(this.__parent.innerWidthDependsOnChilds()&&this.__parent.updateInnerWidthDependingOnChilds(),"Content"===this.__parent.getWidthMode()&&this.__parent.__processWidth(this))}
/**
         * Sets the unit of the width attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setWidthUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("WidthUnit")),convertedValue!==this.__widthUnit&&(this.__widthUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"WidthUnit"}),this.__processWidthUnit())}__processWidthUnit(){this.__processWidth()}
/**
         * Sets the value of the width mode attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setWidthMode(valueNew){let convertedValue=TcHmi.ValueConverter.toSizeMode(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("WidthMode")),convertedValue!==this.__widthMode&&(this.__widthMode=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"WidthMode"}),this.__processWidthMode())}__processWidthMode(){this.__processWidth()}
/**
         * Sets the value of the height attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setHeight(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Height")),convertedValue!==this.__height&&(this.__height=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Height"}),this.__processHeight())}__processHeight(callerControl){const heightMode=this.getHeightMode();null!==this.__height&&void 0!==this.__height&&void 0!==this.__heightUnit&&"Value"===heightMode?this.__intHeight=this.__height+this.__heightUnit:"Value"!==heightMode&&"Parent"!==heightMode||(this.__intHeight=null),null!==this.__intHeight?(this.__element[0].style.height=this.__intHeight,this.__element[0].removeAttribute("data-tchmi-control-height-forced")):"Content"!==heightMode&&"Parent"!==heightMode||null!==this.__top&&null!==this.__bottom?(this.__element[0].style.height="",this.__element[0].removeAttribute("data-tchmi-control-height-forced")):(this.__element[0].style.height="0",this.__element[0].setAttribute("data-tchmi-control-height-forced","true")),null===this.__parent||callerControl&&this.__parent===callerControl||(this.__parent.innerHeightDependsOnChilds()&&this.__parent.updateInnerHeightDependingOnChilds(),"Content"===this.__parent.getHeightMode()&&this.__parent.__processHeight(this))}
/**
         * Sets the value of the height mode attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setHeightMode(valueNew){let convertedValue=TcHmi.ValueConverter.toSizeMode(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("HeightMode")),convertedValue!==this.__heightMode&&(this.__heightMode=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"HeightMode"}),this.__processHeightMode())}__processHeightMode(){this.__processHeight()}
/**
         * Sets the unit of the height attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setHeightUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("HeightUnit")),convertedValue!==this.__heightUnit&&(this.__heightUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"HeightUnit"}),this.__processHeightUnit())}__processHeightUnit(){this.__processHeight()}__getContentWidth(){if("Collapsed"===this.__visibility)return null;if(this.__accessAndEnableState.observeDisallowed)return null;let currentWidth=null;return null!==this.__width&&void 0!==this.__width&&"px"===this.__widthUnit&&"Value"===this.getWidthMode()&&(currentWidth=this.__width),TcHmi.Controls.limitPixelDimensionToControlBound(this,"width",currentWidth)}__getContentHeight(){if("Collapsed"===this.__visibility)return null;if(this.__accessAndEnableState.observeDisallowed)return null;let currentHeight=null;return null!==this.__height&&void 0!==this.__height&&"px"===this.__heightUnit&&"Value"===this.getHeightMode()&&(currentHeight=this.__height),TcHmi.Controls.limitPixelDimensionToControlBound(this,"height",currentHeight)}
/**
         * Sets the value of the top attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setTop(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Top")),convertedValue!==this.__top&&(this.__top=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Top"}),this.__processTop())}__processTop(){null!==this.__top&&void 0!==this.__top&&void 0!==this.__topUnit?this.__element[0].style.top=this.__top+this.__topUnit:this.__element[0].style.top="",this.__processHeight(),null!==this.__parent&&(this.__parent.innerHeightDependsOnChilds()&&this.__parent.updateInnerHeightDependingOnChilds(),"Content"===this.__parent.getHeightMode()&&this.__parent.__processHeight())}
/**
         * Sets the unit of the top attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setTopUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TopUnit")),convertedValue!==this.__topUnit&&(this.__topUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TopUnit"}),this.__processTopUnit())}__processTopUnit(){this.__processTop()}
/**
         * Sets the value of the left attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setLeft(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Left")),convertedValue!==this.__left&&(this.__left=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Left"}),this.__processLeft())}__processLeft(){null!==this.__left&&void 0!==this.__left&&void 0!==this.__leftUnit?this.__element[0].style.left=this.__left+this.__leftUnit:this.__element[0].style.left="",null!==this.__parent&&(this.__parent.innerWidthDependsOnChilds()&&this.__parent.updateInnerWidthDependingOnChilds(),"Content"===this.__parent.getWidthMode()&&this.__parent.__processWidth())}
/**
         * Sets the unit of the left attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setLeftUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("LeftUnit")),convertedValue!==this.__leftUnit&&(this.__leftUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"LeftUnit"}),this.__processLeftUnit())}__processLeftUnit(){this.__processLeft()}
/**
         * Sets the value of the bottom attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBottom(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Bottom")),convertedValue!==this.__bottom&&(this.__bottom=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Bottom"}),this.__processBottom())}__processBottom(){null!==this.__bottom&&void 0!==this.__bottom&&void 0!==this.__bottomUnit?this.__element[0].style.bottom=this.__bottom+this.__bottomUnit:this.__element[0].style.bottom="",this.__processHeight(),null!==this.__parent&&(this.__parent.innerHeightDependsOnChilds()&&this.__parent.updateInnerHeightDependingOnChilds(),"Content"===this.__parent.getHeightMode()&&this.__parent.__processHeight())}
/**
         * Sets the unit of the bottom attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBottomUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BottomUnit")),convertedValue!==this.__bottomUnit&&(this.__bottomUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BottomUnit"}),this.__processBottomUnit())}__processBottomUnit(){this.__processBottom()}
/**
         * Sets the value of the right attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setRight(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Right")),convertedValue!==this.__right&&(this.__right=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Right"}),this.__processRight())}__processRight(){null!==this.__right&&void 0!==this.__right&&void 0!==this.__rightUnit?this.__element[0].style.right=this.__right+this.__rightUnit:this.__element[0].style.right="",null!==this.__parent&&(this.__parent.innerWidthDependsOnChilds()&&this.__parent.updateInnerWidthDependingOnChilds(),"Content"===this.__parent.getWidthMode()&&this.__parent.__processWidth())}
/**
         * Sets the unit of the right attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setRightUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("RightUnit")),convertedValue!==this.__rightUnit&&(this.__rightUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"RightUnit"}),this.__processRightUnit())}__processRightUnit(){this.__processRight()}
/**
         * Sets the value of the minwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMinWidth(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MinWidth")),convertedValue!==this.__minWidth&&(this.__minWidth=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MinWidth"}),this.__processMinWidth())}__processMinWidth(){null!==this.__minWidth&&void 0!==this.__minWidth&&void 0!==this.__minWidthUnit?this.__element[0].style.minWidth=this.__minWidth+this.__minWidthUnit:this.__element[0].style.minWidth=""}
/**
         * Sets the unit of the minwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMinWidthUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MinWidthUnit")),convertedValue!==this.__minWidthUnit&&(this.__minWidthUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MinWidthUnit"}),this.__processMinWidthUnit())}__processMinWidthUnit(){this.__processMinWidth()}
/**
         * Sets the value of the minheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMinHeight(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MinHeight")),convertedValue!==this.__minHeight&&(this.__minHeight=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MinHeight"}),this.__processMinHeight())}__processMinHeight(){null!==this.__minHeight&&void 0!==this.__minHeight&&void 0!==this.__minHeightUnit?this.__element[0].style.minHeight=this.__minHeight+this.__minHeightUnit:this.__element[0].style.minHeight="",this.__processHeight()}
/**
         * Sets the unit of the minheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMinHeightUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MinHeightUnit")),convertedValue!==this.__minHeightUnit&&(this.__minHeightUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MinHeightUnit"}),this.__processMinHeightUnit())}__processMinHeightUnit(){this.__processMinHeight()}
/**
         * Sets the value of the maxwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMaxWidth(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MaxWidth")),convertedValue!==this.__maxWidth&&(this.__maxWidth=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MaxWidth"}),this.__processMaxWidth())}__processMaxWidth(){null!==this.__maxWidth&&void 0!==this.__maxWidth&&void 0!==this.__maxWidthUnit?this.__element[0].style.maxWidth=this.__maxWidth+this.__maxWidthUnit:this.__element[0].style.maxWidth=""}
/**
         * Sets the unit of the maxwidth attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMaxWidthUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MaxWidthUnit")),convertedValue!==this.__maxWidthUnit&&(this.__maxWidthUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MaxWidthUnit"}),this.__processMaxWidthUnit())}__processMaxWidthUnit(){this.__processMaxWidth()}
/**
         * Sets the value of the maxheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMaxHeight(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MaxHeight")),convertedValue!==this.__maxHeight&&(this.__maxHeight=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MaxHeight"}),this.__processMaxHeight())}__processMaxHeight(){null!==this.__maxHeight&&void 0!==this.__maxHeight&&void 0!==this.__maxHeightUnit?this.__element[0].style.maxHeight=this.__maxHeight+this.__maxHeightUnit:this.__element[0].style.maxHeight=""}
/**
         * Sets the unit of the maxheight attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setMaxHeightUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("MaxHeightUnit")),convertedValue!==this.__maxHeightUnit&&(this.__maxHeightUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"MaxHeightUnit"}),this.__processMaxHeightUnit())}__processMaxHeightUnit(){this.__processMaxHeight()}getZindex(){return this.__zindex}
/**
         * Sets the value of the zindex attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setZindex(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Zindex")),convertedValue!==this.__zindex&&(this.__zindex=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Zindex"}),this.__processZindex())}__processZindex(){null===this.__zindex||void 0===this.__zindex||this.__zindex<0?this.__element[0].style.zIndex="0":this.__element[0].style.zIndex=this.__zindex.toString()}
/**
         * Returns the current opacity value.
         * Sets the value of the zindex attribute.
         * @preserve (Part of the public API)
         */getOpacity(){return this.__opacity}
/**
         * Sets the value of the opacity attribute. The value must be between 0 (0%) and 1 (100%).
         * @param valueNew
         * @preserve (Part of the public API)
         */setOpacity(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Opacity")),convertedValue!==this.__opacity&&(this.__opacity=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Opacity"}),this.__processOpacity())}__processOpacity(){"Hidden"!==this.__visibility&&(null===this.__opacity||void 0===this.__opacity||this.__opacity>=1?this.__element[0].style.opacity="":this.__element[0].style.opacity=this.__opacity.toString())}setVisibility(valueNew){let convertedValue=TcHmi.ValueConverter.toVisibility(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Visibility")),convertedValue!==this.__visibility&&(this.__visibility=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Visibility"}),TcHmi.EventProvider.raise("System.onControlVisibilityChanged",this),this.__processVisibility(),null!==this.__parent&&(this.__parent.innerHeightDependsOnChilds()&&this.__parent.updateInnerHeightDependingOnChilds(),"Content"===this.__parent.getHeightMode()&&this.__parent.__processHeight(),this.__parent.innerWidthDependsOnChilds()&&this.__parent.updateInnerWidthDependingOnChilds(),"Content"===this.__parent.getWidthMode()&&this.__parent.__processWidth()))}getVisibility(){return this.__visibility}__processVisibility(){switch(this.__visibility){case"Collapsed":this.__element[0].style.display="none",this.__element[0].style.opacity="";break;case"Hidden":this.__element[0].style.display="",this.__element[0].style.opacity="0";break;default:this.__element[0].style.display="",null===this.__opacity||void 0===this.__opacity||this.__opacity>=1?this.__element[0].style.opacity="":this.__element[0].style.opacity=this.__opacity.toString()}}
/**
         * Returns the current transform value.
         * @preserve (Part of the public API)
         */getTransform(){return this.__transform}
/**
         * Sets the value of the transform attribute.
         * @param valueNew
         * @preserve (Part of the public API)
         */setTransform(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Transform")),convertedValue&&!Array.isArray(convertedValue))return void TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"Transform"},"Non array values are not supported.");let resolverInfo=this.__objectResolvers.get("transform");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("transform",{resolver,watchCallback:this.__onResolverForTransformWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForTransformWatchCallback)})}__onResolverForTransformWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("transform"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__transform)||(this.__transform=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Transform"}),this.__processTransform()):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"Transform"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processTransform(){TcHmi.StyleProvider.processTransform(this.__element,this.__transform)}__processAllBackground(){this.__attributesInitialized&&TcHmi.StyleProvider.processBackground(this.__element,this.__background)}
/**
         * Returns the current background value.
         * @preserve (Part of the public API)
         */getBackgroundColor(){return this.__background.color}
/**
         * Sets the background value and calls the associated process function (processBackground).
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundColor(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundColor"));let resolverInfo=this.__objectResolvers.get("backgroundColor");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("backgroundColor",{resolver,watchCallback:this.__onResolverForBackgroundColorWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBackgroundColorWatchCallback)})}__onResolverForBackgroundColorWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("backgroundColor"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__background.color)||(this.__background.color=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundColor"}),this.__processBackgroundColor()):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BackgroundColor"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processBackgroundColor(){this.__processAllBackground()}
/**
         * Returns the current value of the member variable backgroundImage.
         * @preserve (Part of the public API)
         */getBackgroundImage(){return this.__background.image}
/**
         * Sets the value of the member variable "backgroundImage" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImage) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImage(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImage")),convertedValue!==this.__background.image&&(this.__background.image=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImage"}),this.__processBackgroundImage())}__processBackgroundImage(){this.__processAllBackground()}
/**
         * Returns the current value of the member variable backgroundImagePadding.
         * @preserve (Part of the public API)
         */getBackgroundImagePadding(){return this.__background.imagePadding}
/**
         * Sets the value of the member variable "backgroundImagePadding" if the new value is not equal to the current value
         * and calls the associated process function (processBackgroundImagePadding) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImagePadding(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImagePadding"));let resolverInfo=this.__objectResolvers.get("backgroundImagePadding");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("backgroundImagePadding",{resolver,watchCallback:this.__onResolverForBackgroundImagePaddingWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBackgroundImagePaddingWatchCallback)})}__onResolverForBackgroundImagePaddingWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("backgroundImagePadding"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__background.imagePadding)||(this.__background.imagePadding=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImagePadding"}),this.__processBackgroundImagePadding()):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BackgroundImagePadding"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processBackgroundImagePadding(){this.__processAllBackground()}
/**
         * Returns the current value of the member variable backgroundImageWidth.
         * @preserve (Part of the public API)
         */getBackgroundImageWidth(){return this.__background.imageWidth}
/**
         * Sets the value of the member variable "backgroundImageWidth" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageWidth) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImageWidth(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImageWidth")),convertedValue!==this.__background.imageWidth&&(this.__background.imageWidth=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImageWidth"}),this.__processBackgroundImageWidth())}__processBackgroundImageWidth(){this.__processAllBackground()}
/**
         * Returns the current value of the member variable backgroundImageWidthUnit.
         * @preserve (Part of the public API)
         */getBackgroundImageWidthUnit(){return this.__background.imageWidthUnit}
/**
         * Sets the value of the member variable "backgroundImageWidthUnit" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageWidthUnit) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImageWidthUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImageWidthUnit")),convertedValue!==this.__background.imageWidthUnit&&(this.__background.imageWidthUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImageWidthUnit"}),this.__processBackgroundImageWidthUnit())}__processBackgroundImageWidthUnit(){this.__processBackgroundImageWidth()}
/**
         * Returns the current value of the member variable backgroundImageHeight.
         * @preserve (Part of the public API)
         */getBackgroundImageHeight(){return this.__background.imageHeight}
/**
         * Sets the value of the member variable "backgroundImageHeight" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageHeight) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImageHeight(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImageHeight")),convertedValue!==this.__background.imageHeight&&(this.__background.imageHeight=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImageHeight"}),this.__processBackgroundImageHeight())}__processBackgroundImageHeight(){this.__processAllBackground()}
/**
         * Returns the current value of the member variable backgroundImageHeightUnit.
         * @preserve (Part of the public API)
         */getBackgroundImageHeightUnit(){return this.__background.imageHeightUnit}
/**
         * Sets the value of the member variable "backgroundImageHeightUnit" if the new value is not equal to the current value.
         * and calls the associated process function (processBackgroundImageHeightUnit) after that.
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImageHeightUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toDimensionUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImageHeightUnit")),convertedValue!==this.__background.imageHeightUnit&&(this.__background.imageHeightUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImageHeightUnit"}),this.__processBackgroundImageHeightUnit())}__processBackgroundImageHeightUnit(){this.__processBackgroundImageHeight()}
/**
         * Returns the current value of horizontalBackgroundImageAligment.
         * @preserve (Part of the public API)
         */getBackgroundImageHorizontalAlignment(){return this.__background.imageHorizontalAlignment}
/**
         * Sets the backgroundImageHorizontalAlignment value and calls the associated process function (processBackgroundImageHorizontalAlignment).
         * @preserve (Part of the public API)
         */setBackgroundImageHorizontalAlignment(valueNew){let convertedValue=TcHmi.ValueConverter.toHorizontalAlignment(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImageHorizontalAlignment")),convertedValue!==this.__background.imageHorizontalAlignment&&(this.__background.imageHorizontalAlignment=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImageHorizontalAlignment"}),this.__processBackgroundImageHorizontalAlignment())}__processBackgroundImageHorizontalAlignment(){this.__processAllBackground()}
/**
         * Returns the current value of backgroundImageVerticalAlignment.
         * @preserve (Part of the public API)
         */getBackgroundImageVerticalAlignment(){return this.__background.imageVerticalAlignment}
/**
         * Sets the backgroundImageVerticalAlignment value and calls the associated process function (processBackgroundImageVerticalAlignment).
         * @param valueNew
         * @preserve (Part of the public API)
         */setBackgroundImageVerticalAlignment(valueNew){let convertedValue=TcHmi.ValueConverter.toVerticalAlignment(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BackgroundImageVerticalAlignment")),convertedValue!==this.__background.imageVerticalAlignment&&(this.__background.imageVerticalAlignment=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BackgroundImageVerticalAlignment"}),this.__processBackgroundImageVerticalAlignment())}__processBackgroundImageVerticalAlignment(){this.__processAllBackground()}
/**
         * Returns the current border-color value.
         * @preserve (Part of the public API)
         */
getBorderColor(){return this.__borderColor}
/**
         * Sets the border-color attribute value and calls the associated process function (processBorderColor).
         * @param valueNew
         * @preserve (Part of the public API)
         */setBorderColor(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BorderColor"));let resolverInfo=this.__objectResolvers.get("borderColor");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("borderColor",{resolver,watchCallback:this.__onResolverForBorderColorWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBorderColorWatchCallback)})}__onResolverForBorderColorWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("borderColor"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__borderColor)||(this.__borderColor=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BorderColor"}),this.__processBorderColor()):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BorderColor"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processBorderColor(){TcHmi.StyleProvider.processBorderColor(this.__element,this.__borderColor)}
/**
         * Returns the current border-width value.
         * @preserve (Part of the public API)
         */getBorderWidth(){return this.__borderWidth}
/**
         * Sets the border-width attribute value and calls the associated process function (processBorderWidth).
         * @param valueNew
         * @preserve (Part of the public API)
         */setBorderWidth(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BorderWidth"));let resolverInfo=this.__objectResolvers.get("borderWidth");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("borderWidth",{resolver,watchCallback:this.__onResolverForBorderWidthWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBorderWidthWatchCallback)})}__onResolverForBorderWidthWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("borderWidth"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__borderWidth)||(this.__borderWidth=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BorderWidth"}),this.__processBorderWidth(),"Content"===this.getWidthMode()&&this.__processWidth(),"Content"===this.getHeightMode()&&this.__processHeight(),TcHmi.EventProvider.raise(this.__id+".onResized",this)):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BorderWidth"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processBorderWidth(){TcHmi.StyleProvider.processBorderWidth(this.__element,this.__borderWidth)}
/**
         * Returns the current border-radius value.
         * @preserve (Part of the public API)
         */getBorderRadius(){return this.__borderRadius}
/**
         * Sets the border-radius attribute value and calls the associated process function (processBorderRadius).
         * @param valueNew
         * @preserve (Part of the public API)
         */setBorderRadius(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BorderRadius"));let resolverInfo=this.__objectResolvers.get("borderRadius");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("borderRadius",{resolver,watchCallback:this.__onResolverForBorderRadiusWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBorderRadiusWatchCallback)})}__onResolverForBorderRadiusWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("borderRadius"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__borderRadius)||(this.__borderRadius=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BorderRadius"}),this.__processBorderRadius()):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BorderRadius"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processBorderRadius(){TcHmi.StyleProvider.processBorderRadius(this.__element,this.__borderRadius)}
/**
         * Returns the current border-style value.
         * @preserve (Part of the public API)
         */getBorderStyle(){return this.__borderStyle}
/**
         * Internal reference to the attribute "data-tchmi-border-type".
         * @param valueNew
         * @preserve (Part of the public API)
         */setBorderStyle(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BorderStyle"));let resolverInfo=this.__objectResolvers.get("borderStyle");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("borderStyle",{resolver,watchCallback:this.__onResolverForBorderStyleWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBorderStyleWatchCallback)})}__onResolverForBorderStyleWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("borderStyle"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__borderStyle)||(this.__borderStyle=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BorderStyle"}),this.__processBorderStyle(),"Content"===this.getWidthMode()&&this.__processWidth(),"Content"===this.getHeightMode()&&this.__processHeight(),TcHmi.EventProvider.raise(this.__id+".onResized",this)):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BorderStyle"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}__processBorderStyle(){TcHmi.StyleProvider.processBorderStyle(this.__element,this.__borderStyle)}
/**
         * Sets the internal reference to the attribute "data-tchmi-box-shadow".
         * @preserve (Part of the public API)
         */
setBoxShadow(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);if(null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("BoxShadow")),convertedValue&&!Array.isArray(convertedValue))return void TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BoxShadow"},"Non array values are not supported.");let resolverInfo=this.__objectResolvers.get("boxShadow");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue,this);this.__objectResolvers.set("boxShadow",{resolver,watchCallback:this.__onResolverForBoxShadowWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForBoxShadowWatchCallback)})}__onResolverForBoxShadowWatchCallback(data){this.__isAttached||this.__suspendObjectResolver("boxShadow"),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__boxShadow)||(this.__boxShadow=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"BoxShadow"}),this.__processBoxShadow()):TcHmi.Log.Controls.error(this,TcHmiControl.#tchmiFQN,{Attribute:"BoxShadow"},`Resolving symbols from object failed with error: ${TcHmi.Log.buildMessage(data.details)}`)}
/**
         * Returns the current box-shadow value.
         * @preserve (Part of the public API)
         */getBoxShadow(){return this.__boxShadow}__processBoxShadow(){TcHmi.StyleProvider.processBoxShadow(this.__element,this.__boxShadow)}
/**
         * Returns the current value of tooltip.
         * @preserve (Part of the public API)
         */getTooltip(){return this.__tooltip}
/**
         * Sets the tooltip attribute and calls the associated process function (processTooltip).
         * @param valueNew
         * @preserve (Part of the public API)
         */setTooltip(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Tooltip")),convertedValue!==this.__tooltip&&(this.__tooltip=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Tooltip"}),this.__processTooltip())}__processTooltip(){this.__tooltip?this.__element[0].setAttribute("title",tchmi_decode_control_characters(this.__tooltip)):this.__element[0].removeAttribute("title")}}})();export{TcHmiControl};TcHmi.Controls.registerEx("TcHmiControl","TcHmi.Controls.System",TcHmiControl,{injectInGlobalObject:!0});