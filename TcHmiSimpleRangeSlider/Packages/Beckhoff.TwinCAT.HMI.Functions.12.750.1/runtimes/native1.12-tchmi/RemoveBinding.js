var TcHmi;!function(TcHmi){let Functions;!function(Functions){let Beckhoff;!function(Beckhoff){Beckhoff.RemoveBinding=function(control,propertyName){if(!control)throw new Error("Invalid value: '"+control+"' for parameter: 'control'.");if(!propertyName)throw new Error("Invalid value: '"+propertyName+"' for parameter: 'propertyName'.");TcHmi.Binding.removeEx2(null,propertyName,control)}}(Beckhoff=Functions.Beckhoff||(Functions.Beckhoff={}))}(Functions=TcHmi.Functions||(TcHmi.Functions={}))}(TcHmi||(TcHmi={})),TcHmi.Functions.registerFunctionEx("RemoveBinding","TcHmi.Functions.Beckhoff",TcHmi.Functions.Beckhoff.RemoveBinding);