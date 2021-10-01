var TcHmi;!function(TcHmi){let Controls;!function(Controls){let Beckhoff;!function(Beckhoff){class TcHmiRadioButton extends TcHmi.Controls.System.TcHmiControl{constructor(element,pcElement,attrs){super(element,pcElement,attrs),this.__textNode=null,this.__onPressedEventDestroyEvent=null,this.__onResizedEventDestroyEvent=null,this.__onRadioGroupToggledEventDestroyEvent=null,this.__destroyStateSymbolWatch=null,this.__state=!1,this.__onPressed=()=>{!0===TcHmi.Access.checkAccess(this,"operate")&&this.getIsEnabled()&&(this.__state||this.__processState(!0,!0,"userInteraction"))},this.__onResized=()=>{let width=this.getRenderedWidth();if(!width)return;let height=this.getRenderedHeight();height&&(this.__borderWidth&&this.__borderStyle&&("None"!==this.__borderStyle.left&&(width-=this.__borderWidth.left),"None"!==this.__borderStyle.right&&(width-=this.__borderWidth.right)),this.__borderWidth&&this.__borderStyle&&("None"!==this.__borderStyle.top&&(height-=this.__borderWidth.top),"None"!==this.__borderStyle.bottom&&(height-=this.__borderWidth.bottom)),this.__element[0].style.setProperty("--square-size",Math.min(width,height)+"px"))},this.__onRadioGroupToggled=(evt,data)=>{data&&data.activeElementId&&data.activeElementId!==this.__id&&(this.__stateSymbol&&this.__stateSymbol.getExpression().toString()===data.source||this.__processState(!1,!0,"radioGroup"))},this.__onStateSymbolWatch=data=>{data.error===TcHmi.Errors.NONE?!1!==data.value&&!0!==data.value||this.__processState(data.value,!1,this.__stateSymbol.getExpression().toString()):data.details&&TCHMI_CONSOLE_LOG_LEVEL>=1&&TcHmi.Log.error("[Source=Control, Module=TcHmi.Controls.Beckhoff.TcHmiRadioButton, Id="+this.getId()+", Property=StateSymbol, "+(this.__stateSymbol?"Symbol = "+this.__stateSymbol.getExpression().toString():"")+"] "+TcHmi.Log.buildMessage(data.details))},this.__onResolverForRadioStateIconColorWatchCallback=data=>{!this.__isAttached&&data.destroy&&data.destroy(),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__radioStateIconColor)||(this.__radioStateIconColor=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"RadioStateIconColor"}),this.__processRadioStateIconColor()):TCHMI_CONSOLE_LOG_LEVEL>=1&&TcHmi.Log.error("[Source=Control, Module=TcHmi.Controls.Beckhoff.TcHmiRadioButton, Id="+this.getId()+", Attribute=RadioStateIconColor] Resolving symbols from object failed with error: "+TcHmi.Log.buildMessage(data.details))},this.__onResolverForTextColorWatchCallback=data=>{!this.__isAttached&&data.destroy&&data.destroy(),data.error===TcHmi.Errors.NONE?tchmi_equal(data.value,this.__textColor)||(this.__textColor=data.value,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextColor"}),this.__processTextColor()):TCHMI_CONSOLE_LOG_LEVEL>=1&&TcHmi.Log.error("[Source=Control, Module=TcHmi.Controls.Beckhoff.TcHmiRadioButton, Id="+this.getId()+", Attribute=TextColor] Resolving symbols from object failed with error: "+TcHmi.Log.buildMessage(data.details))}}__previnit(){super.__previnit(),this.__elementTemplateRoot=this.__element.find(".TcHmi_Controls_Beckhoff_TcHmiRadioButton-template")}__init(){super.__init()}__attach(){super.__attach(),this.__onPressedEventDestroyEvent=TcHmi.EventProvider.register(this.__id+".onPressed",this.__onPressed),this.__onResizedEventDestroyEvent=TcHmi.EventProvider.register(this.__id+".onResized",this.__onResized),this.__stateSymbol&&!this.__destroyStateSymbolWatch&&(this.__destroyStateSymbolWatch=this.__stateSymbol.watch(this.__onStateSymbolWatch))}__detach(){super.__detach(),null!==this.__onPressedEventDestroyEvent&&(this.__onPressedEventDestroyEvent(),this.__onPressedEventDestroyEvent=null),null!==this.__onResizedEventDestroyEvent&&(this.__onResizedEventDestroyEvent(),this.__onResizedEventDestroyEvent=null),this.__destroyStateSymbolWatch&&(this.__destroyStateSymbolWatch(),this.__destroyStateSymbolWatch=null)}destroy(){this.__keepAlive||(null!==this.__onRadioGroupToggledEventDestroyEvent&&(this.__onRadioGroupToggledEventDestroyEvent(),this.__onRadioGroupToggledEventDestroyEvent=null),super.destroy())}setRadioGroup(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("RadioGroup")),convertedValue!==this.__radioGroup&&(this.__radioGroup=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"RadioGroup"}),this.__processRadioGroup())}getRadioGroup(){return this.__radioGroup}__processRadioGroup(){null!==this.__onRadioGroupToggledEventDestroyEvent&&(this.__onRadioGroupToggledEventDestroyEvent(),this.__onRadioGroupToggledEventDestroyEvent=null),null!==this.__radioGroup&&(this.__onRadioGroupToggledEventDestroyEvent=TcHmi.EventProvider.register(this.__radioGroup+".onRadioToggled",this.__onRadioGroupToggled))}__setRadioState(valueNew,forwardStateSymbol,process){let convertedValue=TcHmi.ValueConverter.toToggleState(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("RadioState")),convertedValue!==this.__radioState&&(this.__radioState=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"RadioState"}),TcHmi.EventProvider.raise(this.__id+".onRadioStateChanged"),process&&this.__processRadioState(forwardStateSymbol))}setRadioState(valueNew){this.__setRadioState(valueNew,!0,!0)}getRadioState(){return this.__radioState}__processRadioState(forwardStateSymbol=!0){this.__processState("Active"===this.__radioState,forwardStateSymbol,"attribute")}setStateSymbol(valueNew){let newSymbol=valueNew;if(null===newSymbol){let symbolExpression=this.getAttributeDefaultValueInternal("StateSymbol");symbolExpression&&(newSymbol=new TcHmi.Symbol(symbolExpression))}this.__stateSymbol!==newSymbol&&(this.__destroyStateSymbolWatch&&(this.__destroyStateSymbolWatch(),this.__destroyStateSymbolWatch=null),newSymbol instanceof TcHmi.Symbol?(this.__stateSymbol=newSymbol,this.__destroyStateSymbolWatch=this.__stateSymbol.watch(this.__onStateSymbolWatch)):void 0===this.__stateSymbol?this.__stateSymbol=null:(this.__stateSymbol=null,this.__processState(!1,!1,"attribute")),TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"StateSymbol"}))}getStateSymbol(){return this.__stateSymbol}__processState(state,forwardStateSymbol,source){this.__state!==state&&(this.__state=state,this.__element[0].classList.toggle("TcHmi_Controls_Beckhoff_TcHmiRadioButton-active",this.__state),TcHmi.EventProvider.raise(this.getId()+".onStateChanged",{control:this,state:this.__state,stateOld:!this.__state}),this.__setRadioState(this.__state?"Active":"Normal",forwardStateSymbol,!1),this.__state&&null!==this.__radioGroup&&TcHmi.EventProvider.raise(this.__radioGroup+".onRadioToggled",{activeElementId:this.__id,source:source}),this.__stateSymbol&&forwardStateSymbol&&this.__stateSymbol.write(this.__state,data=>{data.error!==TcHmi.Errors.NONE&&data.details&&TCHMI_CONSOLE_LOG_LEVEL>=1&&TcHmi.Log.error("[Source=Control, Module=TcHmi.Controls.Beckhoff.TcHmiRadioButton, Id="+this.getId()+", Property=StateSymbol, "+(this.__stateSymbol?"Symbol = "+this.__stateSymbol.getExpression().toString():"")+"] "+TcHmi.Log.buildMessage(data.details))}))}setRadioStateIconColor(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("RadioStateIconColor"));let resolverInfo=this.__objectResolvers.get("radioStateIconColor");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue);this.__objectResolvers.set("radioStateIconColor",{resolver:resolver,watchCallback:this.__onResolverForRadioStateIconColorWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForRadioStateIconColorWatchCallback)})}getRadioStateIconColor(){return this.__radioStateIconColor}__processRadioStateIconColor(){this.__element[0].style.setProperty("--radio-state-icon-color",this.__radioStateIconColor?this.__radioStateIconColor.color:"")}setText(valueNew){let convertedValue=TcHmi.ValueConverter.toString(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("Text")),convertedValue!==this.__text&&(this.__text=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"Text"}),this.__processText())}getText(){return this.__text}__processText(){let text=tchmi_decode_control_characters(this.__text);this.__textNode?this.__textNode.data=text:(this.__textNode=document.createTextNode(text),this.__element[0].appendChild(this.__textNode))}setTextPosition(valueNew){let convertedValue=TcHmi.ValueConverter.toEnum(valueNew,{Left:"Left",Right:"Right"},null);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextPosition")),convertedValue!==this.__textPosition&&(this.__textPosition=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextPosition"}),this.__processTextPosition())}getTextPosition(){return this.__textPosition}__processTextPosition(){switch(this.__textPosition){case"Left":this.__element[0].classList.add("text-left");break;case"Right":default:this.__element[0].classList.remove("text-left")}}setTextHorizontalAlignment(valueNew){let convertedValue=TcHmi.ValueConverter.toHorizontalAlignment(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextHorizontalAlignment")),convertedValue!==this.__textHorizontalAlignment&&(this.__textHorizontalAlignment=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextHorizontalAlignment"}),this.__processTextHorizontalAlignment())}getTextHorizontalAlignment(){return this.__textHorizontalAlignment}__processTextHorizontalAlignment(){switch(this.__textHorizontalAlignment){case"Left":default:this.__element[0].style.justifyItems="start",this.__element[0].style.textAlign="start";break;case"Center":this.__element[0].style.justifyItems="center",this.__element[0].style.textAlign="center";break;case"Right":this.__element[0].style.justifyItems="end",this.__element[0].style.textAlign="end"}}setTextVerticalAlignment(valueNew){let convertedValue=TcHmi.ValueConverter.toVerticalAlignment(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextVerticalAlignment")),convertedValue!==this.__textVerticalAlignment&&(this.__textVerticalAlignment=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextVerticalAlignment"}),this.__processTextVerticalAlignment())}getTextVerticalAlignment(){return this.__textVerticalAlignment}__processTextVerticalAlignment(){switch(this.__textVerticalAlignment){case"Top":this.__element[0].style.alignItems="start",this.__element[0].style.alignContent="start";break;case"Center":default:this.__element[0].style.alignItems="center",this.__element[0].style.alignContent="center";break;case"Bottom":this.__element[0].style.alignItems="end",this.__element[0].style.alignContent="end"}}setTextFontFamily(valueNew){let convertedValue=TcHmi.ValueConverter.toFontFamily(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextFontFamily")),convertedValue!==this.__textFontFamily&&(this.__textFontFamily=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextFontFamily"}),this.__processTextFontFamily())}getTextFontFamily(){return this.__textFontFamily}__processTextFontFamily(){TcHmi.StyleProvider.processFontFamily(this.__element,this.__textFontFamily)}setTextFontSize(valueNew){let convertedValue=TcHmi.ValueConverter.toNumber(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextFontSize")),convertedValue!==this.__textFontSize&&(this.__textFontSize=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextFontSize"}),this.__processTextFontSize())}getTextFontSize(){return this.__textFontSize}__processTextFontSize(){TcHmi.StyleProvider.processFontSize(this.__element,this.__textFontSize,this.__textFontSizeUnit)}setTextFontSizeUnit(valueNew){let convertedValue=TcHmi.ValueConverter.toFontSizeUnit(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextFontSizeUnit")),convertedValue!==this.__textFontSizeUnit&&(this.__textFontSizeUnit=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextFontSizeUnit"}),this.__processTextFontSizeUnit())}getTextFontSizeUnit(){return this.__textFontSizeUnit}__processTextFontSizeUnit(){this.__processTextFontSize()}setTextFontStyle(valueNew){let convertedValue=TcHmi.ValueConverter.toFontStyle(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextFontStyle")),convertedValue!==this.__textFontStyle&&(this.__textFontStyle=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextFontStyle"}),this.__processTextFontStyle())}getTextFontStyle(){return this.__textFontStyle}__processTextFontStyle(){TcHmi.StyleProvider.processFontStyle(this.__element,this.__textFontStyle)}setTextFontWeight(valueNew){let convertedValue=TcHmi.ValueConverter.toFontWeight(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextFontWeight")),convertedValue!==this.__textFontWeight&&(this.__textFontWeight=convertedValue,TcHmi.EventProvider.raise(this.__id+".onPropertyChanged",{propertyName:"TextFontWeight"}),this.__processTextFontWeight())}getTextFontWeight(){return this.__textFontWeight}__processTextFontWeight(){TcHmi.StyleProvider.processFontWeight(this.__element,this.__textFontWeight)}setTextColor(valueNew){let convertedValue=TcHmi.ValueConverter.toObject(valueNew);null===convertedValue&&(convertedValue=this.getAttributeDefaultValueInternal("TextColor"));let resolverInfo=this.__objectResolvers.get("textColor");resolverInfo&&(resolverInfo.watchDestroyer&&resolverInfo.watchDestroyer(),resolverInfo.resolver.destroy());let resolver=new TcHmi.Symbol.ObjectResolver(convertedValue);this.__objectResolvers.set("textColor",{resolver:resolver,watchCallback:this.__onResolverForTextColorWatchCallback,watchDestroyer:resolver.watch(this.__onResolverForTextColorWatchCallback)})}getTextColor(){return this.__textColor}__processTextColor(){TcHmi.StyleProvider.processTextColor(this.__element,this.__textColor)}}Beckhoff.TcHmiRadioButton=TcHmiRadioButton}(Beckhoff=Controls.Beckhoff||(Controls.Beckhoff={}))}(Controls=TcHmi.Controls||(TcHmi.Controls={}))}(TcHmi||(TcHmi={})),TcHmi.Controls.registerEx("TcHmiRadioButton","TcHmi.Controls.Beckhoff",TcHmi.Controls.Beckhoff.TcHmiRadioButton);