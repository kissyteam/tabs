var ret = module.exports = function tab(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];
function func2(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n<span class="';
pos.line = 3;
var callRet3
callRet3 = callFnUtil(tpl, scope, {escape:1,params:['close']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet3);
buffer.data += '">close</span>\r\n';
return buffer;
}


buffer.data += '<div class="';
var callRet0
callRet0 = callFnUtil(tpl, scope, {escape:1,params:['content']}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet0);
buffer.data += '">';
var id1 = ((t=(affix.content)) !== undefined ? t:((t = data.content) !== undefined ? t :scope.resolveLooseUp(["content"])));
buffer = buffer.write(id1);
buffer.data += '</div>\r\n';
pos.line = 2;
pos.line = 2;
var id4 = ((t=(affix.closable)) !== undefined ? t:((t = data.closable) !== undefined ? t :scope.resolveLooseUp(["closable"])));
buffer = ifCommand.call(tpl, scope, {params:[id4],fn: func2}, buffer);
return buffer;
};
ret.TPL_NAME = module.id || module.name;