#!/usr/bin/env node
(function(){
/** "src/libstd.l" **/{
/* MACRO: ir::rest-args
(function(rest,start){
return [].concat(['ir::block']).concat([[].concat(['ir::var']).concat([rest]).concat([[].concat(['ir::array'])])]).concat([[].concat(['ir::for']).concat([[].concat(['ir::var']).concat(['i']).concat([start])]).concat([[].concat(['ir::<']).concat(['i']).concat([[].concat(['ir::dot']).concat(['arguments']).concat(['length'])])]).concat([[].concat(['ir::set']).concat(['i']).concat([[].concat(['ir::+']).concat(['i']).concat(['1'])])]).concat([[].concat(['ir::block']).concat([[].concat(['.push']).concat([rest]).concat([[].concat(['ir::nth']).concat(['arguments']).concat(['i'])])])])]);
})
 */;
/* MACRO: defmacro
(function(name,args){
{
var body = [];
for(var i = 2;(i < arguments.length);i = (i + 1)){
body.push(arguments[i]);
};
};
var bodypos = args.indexOf(":rest");
if((0 <= bodypos)){
return [].concat(['defmacro']).concat([name]).concat([args.slice(0,bodypos)]).concat([[].concat(['ir::rest-args']).concat([args[(bodypos + 1)]]).concat([bodypos])]).concat(body);
};
return [].concat(['ir::defmacro']).concat([name]).concat([args]).concat([[].concat(['ir::named-block']).concat([name]).concat(body)]);
})
 */;
/* MACRO: return
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::return']).concat(['val']);
}catch(err){
if(err === 'return'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: return
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::return']).concat(args);
}catch(err){
if(err === 'return'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: def
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::var']).concat(args);
}catch(err){
if(err === 'def'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: block
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::named-block']).concat(args);
}catch(err){
if(err === 'block'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: return-from
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::return-from']).concat(args);
}catch(err){
if(err === 'return-from'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: return
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::return']).concat(args);
}catch(err){
if(err === 'return'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: typeof
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::typeof']).concat(args);
}catch(err){
if(err === 'typeof'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: yield
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::yield']).concat(args);
}catch(err){
if(err === 'yield'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: throw
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::throw']).concat(args);
}catch(err){
if(err === 'throw'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: break
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::break']).concat(args);
}catch(err){
if(err === 'break'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: continue
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::continue']).concat(args);
}catch(err){
if(err === 'continue'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: member
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::in']).concat(args);
}catch(err){
if(err === 'member'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: eql
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::===']).concat(args);
}catch(err){
if(err === 'eql'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: eq
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::==']).concat(args);
}catch(err){
if(err === 'eq'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: not
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::!']).concat(args);
}catch(err){
if(err === 'not'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: and
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::&&']).concat(args);
}catch(err){
if(err === 'and'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: or
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::||']).concat(args);
}catch(err){
if(err === 'or'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: +
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::+']).concat(args);
}catch(err){
if(err === '+'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: ++
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::++']).concat(args);
}catch(err){
if(err === '++'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: -
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::-']).concat(args);
}catch(err){
if(err === '-'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: --
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::--']).concat(args);
}catch(err){
if(err === '--'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: *
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::*']).concat(args);
}catch(err){
if(err === '*'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: /
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::/']).concat(args);
}catch(err){
if(err === '/'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: mod
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::%']).concat(args);
}catch(err){
if(err === 'mod'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: >
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::>']).concat(args);
}catch(err){
if(err === '>'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: <
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::<']).concat(args);
}catch(err){
if(err === '<'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: >=
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::>=']).concat(args);
}catch(err){
if(err === '>='){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: <=
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::<=']).concat(args);
}catch(err){
if(err === '<='){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: new
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::new']).concat(args);
}catch(err){
if(err === 'new'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: nth
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::nth']).concat(args);
}catch(err){
if(err === 'nth'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: set
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::set']).concat(args);
}catch(err){
if(err === 'set'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: hash
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::hash']).concat(args);
}catch(err){
if(err === 'hash'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: list
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::array']).concat(args);
}catch(err){
if(err === 'list'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: @
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::dot']).concat(args);
}catch(err){
if(err === '@'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: quote
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::quote']).concat(args);
}catch(err){
if(err === 'quote'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: instanceof
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::instanceof']).concat(args);
}catch(err){
if(err === 'instanceof'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: .at
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::nth']).concat(args);
}catch(err){
if(err === '.at'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: .length
(function(){
{
try{
{
var args = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
args.push(arguments[i]);
};
};
return [].concat(['ir::dot']).concat(args).concat(['length']);
}catch(err){
if(err === '.length'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: if
(function(condition){
{
try{
{
var statements = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
statements.push(arguments[i]);
};
};
return [].concat(['ir::if']).concat([condition]).concat(statements.map((function(s){
return [].concat(['ir::block']).concat([s]);
})));
}catch(err){
if(err === 'if'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: when
(function(condition){
{
try{
{
var statements = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
statements.push(arguments[i]);
};
};
return [].concat(['ir::if']).concat([condition]).concat([[].concat(['ir::block']).concat(statements)]);
}catch(err){
if(err === 'when'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: unless
(function(condition){
{
try{
{
var statements = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
statements.push(arguments[i]);
};
};
return [].concat(['ir::if']).concat([[].concat(['not']).concat([condition])]).concat([[].concat(['ir::block']).concat(statements)]);
}catch(err){
if(err === 'unless'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: lambda
(function(args){
{
try{
{
var body = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
body.push(arguments[i]);
};
};
var restpos = args.indexOf(":rest");
if((0 <= restpos)){
var rest = args[(restpos + 1)];
args = args.slice(0,restpos).concat(args.slice((restpos + 2)));
return [].concat(['lambda']).concat([args]).concat([[].concat(['ir::rest-args']).concat([rest]).concat([[].concat(['.length']).concat(['args'])])]).concat(body);
};
var namedpos = args.indexOf(":named");
if((0 <= namedpos)){
var tag = args[(namedpos + 1)];
args = args.slice(0,namedpos).concat(args.slice((namedpos + 2)));
return [].concat(['lambda']).concat([args]).concat([[].concat(['block']).concat([tag]).concat(body)]);
};
return [].concat(['ir::function']).concat([args]).concat([[].concat(['ir::block']).concat(body)]);
}catch(err){
if(err === 'lambda'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: defun
(function(name,args){
{
try{
{
var body = [];
for(var i = 2;(i < arguments.length);i = (i + 1)){
body.push(arguments[i]);
};
};
return [].concat(['def']).concat([name]).concat([[].concat(['lambda']).concat([[].concat(args).concat([':named']).concat([name])]).concat(body)]);
}catch(err){
if(err === 'defun'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: for
(function(condition){
{
try{
{
var body = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
body.push(arguments[i]);
};
};
return [].concat(['ir::for']).concat([[].concat(['def']).concat(condition[0])]).concat(condition.slice(1)).concat([[].concat(['ir::block']).concat(body)]);
}catch(err){
if(err === 'for'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: while
(function(condition){
{
try{
{
var body = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
body.push(arguments[i]);
};
};
return [].concat(['ir::while']).concat([condition]).concat([[].concat(['ir::block']).concat(body)]);
}catch(err){
if(err === 'while'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: let
(function(defs){
{
try{
{
var body = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
body.push(arguments[i]);
};
};
var vars = defs.map((function(def){
return def[0];
}));
var vals = defs.map((function(def){
return def[1];
}));
return [].concat([[].concat(['lambda']).concat([vars]).concat(body)]).concat(vals);
}catch(err){
if(err === 'let'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: cond
(function(){
{
try{
{
var statements = [];
for(var i = 0;(i < arguments.length);i = (i + 1)){
statements.push(arguments[i]);
};
};
if((2 <= statements.length)){
return [].concat(['if']).concat([statements[0][0]]).concat([[].concat(['ir::block']).concat(statements[0].slice(1))]).concat([[].concat(['cond']).concat(statements.slice(1))]);
}else{
return [].concat(['if']).concat([statements[0][0]]).concat([[].concat(['ir::block']).concat(statements[0].slice(1))]);
};
}catch(err){
if(err === 'cond'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
/* MACRO: case
(function(variable){
{
try{
{
var statements = [];
for(var i = 1;(i < arguments.length);i = (i + 1)){
statements.push(arguments[i]);
};
};
(function(f){
__result__ = [].concat(['cond']).concat(statements.map(f));throw 'case';
})((function(s){
if((s[0] === "otherwise")){
return [].concat(['true']).concat(s.slice(1));
}else{
return [].concat([[].concat(['or']).concat(s[0].map((function(v){
return [].concat(['eql']).concat([v]).concat([variable]);
})))]).concat(s.slice(1));
};
}));
}catch(err){
if(err === 'case'){
return __result__;
}else{
throw err;
}
}
};
})
 */;
};
/** "src/read.l" **/{
/** "src/libstd.l" **/{
;
};
var tokenize = (function(str){
{
try{
(function(op){
var sub = (function(exp){
{
try{
(function(br){
__result__ = br.test(exp);throw 'sub';
})(new RegExp("[^\\s]"));
}catch(err){
if(err === 'sub'){
return __result__;
}else{
throw err;
}
}
};
});
__result__ = str.split(op).filter(sub);throw 'tokenize';
})(new RegExp("(\"(?:\\\\\"|[^\"])*\"|,@|[,'`()]|\\s)"));
}catch(err){
if(err === 'tokenize'){
return __result__;
}else{
throw err;
}
}
};
});
var readterm = (function(tokens){
{
try{
(function(result,cnt){
while(((tokens[0] === "'") || (tokens[0] === "`") || (tokens[0] === ",") || (tokens[0] === ",@"))){
result.push(tokens.shift());
};
if((tokens[0] === "(")){
result.push(tokens.shift());
while((0 < cnt)){
result.push(tokens.shift());
if((("(" === result[(result.length - 1)]))){
{
++cnt;
};
}else{
if(((")" === result[(result.length - 1)]))){
{
--cnt;
};
};
};
};
__result__ = result;throw 'readterm';
};
result.push(tokens.shift());
__result__ = result;throw 'readterm';
})([],1);
}catch(err){
if(err === 'readterm'){
return __result__;
}else{
throw err;
}
}
};
});
var parse = (function(tokens){
{
try{
if((0 === tokens.length)){
__result__ = [];throw 'parse';
};
(function(exp){
if((("'" === exp[0]))){
{
__result__ = [].concat([[].concat(['ir::quote']).concat(parse(exp.slice(1)))]).concat(parse(tokens));throw 'parse';
};
}else{
if((("`" === exp[0]))){
{
__result__ = [].concat([[].concat(['ir::backquote']).concat(parse(exp.slice(1)))]).concat(parse(tokens));throw 'parse';
};
}else{
if((("," === exp[0]))){
{
__result__ = [].concat([[].concat(["ir::unquote"]).concat(parse(exp.slice(1)))]).concat(parse(tokens));throw 'parse';
};
}else{
if(((",@" === exp[0]))){
{
__result__ = [].concat([[].concat(["ir::splice"]).concat(parse(exp.slice(1)))]).concat(parse(tokens));throw 'parse';
};
}else{
if((("(" === exp[0]))){
{
__result__ = [parse(exp.slice(1,-1))].concat(parse(tokens));throw 'parse';
};
}else{
if(true){
{
__result__ = [exp[0]].concat(parse(tokens));throw 'parse';
};
};
};
};
};
};
};
})(readterm(tokens));
}catch(err){
if(err === 'parse'){
return __result__;
}else{
throw err;
}
}
};
});
var read = (function(str){
{
try{
__result__ = parse(tokenize(str));throw 'read';
__result__ = parse(tokenize(str))[0];throw 'read';
}catch(err){
if(err === 'read'){
return __result__;
}else{
throw err;
}
}
};
});
};
/** "src/generate.l" **/{
/** "src/libstd.l" **/{
;
};
/** "src/expand.l" **/{
/** "src/libstd.l" **/{
;
};
/** "src/generate.l" **/{
;
};
var macroExpand = (function(exp){
{
try{
if(! Array.isArray(exp)){
{
__result__ = ("'" + exp + "'");throw 'macroExpand';
};
}else{
if((exp.length === 0)){
{
__result__ = "";throw 'macroExpand';
};
}else{
if((Array.isArray(exp[0]) && (exp[0][0] === "ir::unquote"))){
{
__result__ = (".concat([" + generateJS(exp[0][1]) + "])" + macroExpand(exp.slice(1)));throw 'macroExpand';
};
}else{
if((Array.isArray(exp[0]) && (exp[0][0] === "ir::splice"))){
{
__result__ = (".concat(" + generateJS(exp[0][1]) + ")" + macroExpand(exp.slice(1)));throw 'macroExpand';
};
}else{
if(true){
{
if(Array.isArray(exp[0])){
__result__ = (".concat([[]" + macroExpand(exp[0]) + "])" + macroExpand(exp.slice(1)));throw 'macroExpand';
}else{
__result__ = (".concat([" + macroExpand(exp[0]) + "])" + macroExpand(exp.slice(1)));throw 'macroExpand';
};
};
};
};
};
};
};
}catch(err){
if(err === 'macroExpand'){
return __result__;
}else{
throw err;
}
}
};
});
};
/** "src/include.l" **/{
/** "src/libstd.l" **/{
;
};
/** "src/read.l" **/{
;
};
var included = [];
var include = (function(file){
{
try{
if((0 <= included.indexOf(file))){
__result__ = [];throw 'include';
}else{
included.push(file);
};
(function(fs){
(function(src){
__result__ = read(src);throw 'include';
})(fs.readFileSync(file.slice(1,-1),"utf-8"));
})(require("fs"));
}catch(err){
if(err === 'include'){
return __result__;
}else{
throw err;
}
}
};
});
};
var macros = {};
var generateJS = (function(exp){
{
try{
if(! Array.isArray(exp)){
__result__ = exp;throw 'generateJS';
};
if(("string" === typeof exp[0])){
var func = exp[0].replace(new RegExp("ir::"),"");
}else{
var func = generateJS(exp[0]);
};
if(((undefined === exp[0]))){
{
__result__ = [];throw 'generateJS';
};
}else{
if((("ir::function" === exp[0]) || ("ir::function*" === exp[0]))){
{
(function(args,statement){
__result__ = ("(" + func + "(" + args.join(",") + ")" + statement + ")");throw 'generateJS';
})(exp[1].map(generateJS),generateJS(exp[2]));
};
}else{
if((("ir::var" === exp[0]) || ("ir::let" === exp[0]) || ("ir::const" === exp[0]))){
{
(function(variable,value){
__result__ = (func + " " + variable + " = " + value);throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]));
};
}else{
if((("ir::if" === exp[0]))){
{
if((exp.length === 4)){
(function(condition,statement1,statement2){
__result__ = ("if(" + condition + ")" + statement1 + "else" + statement2);throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]),generateJS(exp[3]));
}else{
(function(condition,statement){
__result__ = ("if(" + condition + ")" + statement);throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]));
};
};
}else{
if((("ir::do" === exp[0]))){
{
(function(statement,condition){
__result__ = ("do" + statement + "while(" + condition + ")");throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[3]));
};
}else{
if((("ir::for" === exp[0]))){
{
(function(init,condition,final,statement){
__result__ = ("for(" + init + ";" + condition + ";" + final + ")" + statement);throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]),generateJS(exp[3]),generateJS(exp[4]));
};
}else{
if((("ir::while" === exp[0]))){
{
(function(condition,statement){
__result__ = ("while(" + condition + ")" + statement);throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]));
};
}else{
if((("ir::block" === exp[0]))){
{
(function(statements){
__result__ = ("{\n" + statements.join(";\n") + ";\n}");throw 'generateJS';
})(exp.slice(1).map(generateJS));
};
}else{
if((("ir::named-block" === exp[0]))){
{
(function(tag,statements){
__result__ = ("{\n" + "try{\n" + statements.join(";\n") + ";\n}" + "catch(err){\n" + "if(err === '" + tag + "'){\n" + "return __result__;\n" + "}else{\n" + "throw err;\n" + "}\n}\n}");throw 'generateJS';
})(generateJS(exp[1]),exp.slice(2).map(generateJS));
};
}else{
if((("ir::return-from" === exp[0]))){
{
(function(tag,value){
__result__ = ("__result__ = " + value + ";throw '" + tag + "'");throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]));
};
}else{
if((("ir::return" === exp[0]) || ("ir::break" === exp[0]) || ("ir::continue" === exp[0]) || ("ir::yield" === exp[0]) || ("ir::delete" === exp[0]) || ("ir::typeof" === exp[0]))){
{
if((exp.length === 1)){
__result__ = func;throw 'generateJS';
}else{
__result__ = (func + " " + generateJS(exp[1]));throw 'generateJS';
};
};
}else{
if((("ir::instanceof" === exp[0]) || ("ir::in" === exp[0]) || ("ir::===" === exp[0]) || ("ir::==" === exp[0]) || ("ir::&&" === exp[0]) || ("ir::||" === exp[0]) || ("ir::+" === exp[0]) || ("ir::-" === exp[0]) || ("ir::*" === exp[0]) || ("ir::/" === exp[0]) || ("ir::%" === exp[0]) || ("ir::>" === exp[0]) || ("ir::>=" === exp[0]) || ("ir::<" === exp[0]) || ("ir::<=" === exp[0]) || ("ir::<<" === exp[0]) || ("ir::>>" === exp[0]) || ("ir::>>>" === exp[0]) || ("ir::&" === exp[0]) || ("ir::|" === exp[0]) || ("ir::^" === exp[0]))){
{
(function(args){
__result__ = ("(" + args.join((" " + func + " ")) + ")");throw 'generateJS';
})(exp.slice(1).map(generateJS));
};
}else{
if((("ir::++" === exp[0]) || ("ir::--" === exp[0]))){
{
(function(obj){
__result__ = (func + obj);throw 'generateJS';
})(generateJS(exp[1]));
};
}else{
if((("ir::!" === exp[0]) || ("ir::~" === exp[0]) || ("ir::new" === exp[0]))){
{
(function(obj){
__result__ = (func + " " + obj);throw 'generateJS';
})(generateJS(exp[1]));
};
}else{
if((("ir::nth" === exp[0]))){
{
(function(array,key){
__result__ = (array + "[" + key + "]");throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]));
};
}else{
if((("ir::set" === exp[0]))){
{
(function(variable,value){
__result__ = (variable + " = " + value);throw 'generateJS';
})(generateJS(exp[1]),generateJS(exp[2]));
};
}else{
if((("ir::hash" === exp[0]))){
{
(function(args,results){
for(var key = 0;(key < args.length);key = (key + 2)){
results.push((args[key] + ":" + args[(key)]));
};
__result__ = ("{" + results.join(" , ") + "}");throw 'generateJS';
})(exp.slice(1).map(generateJS),[]);
};
}else{
if((("ir::array" === exp[0]))){
{
(function(array){
__result__ = ("[" + array.join(" , ") + "]");throw 'generateJS';
})(exp.slice(1).map(generateJS));
};
}else{
if((("ir::dot" === exp[0]))){
{
(function(arg){
__result__ = arg.join(".");throw 'generateJS';
})(exp.slice(1).map(generateJS));
};
}else{
if((("ir::defmacro" === exp[0]))){
{
(function(name,args,statements){
(function(macro){
macros[name] = eval(macro);
__result__ = ("/* MACRO: " + name + "\n" + macro + "\n */");throw 'generateJS';
})(("(function(" + args.join(",") + "){\n" + statements.join(";\n") + ";\n})"));
})(generateJS(exp[1]),exp[2].map(generateJS),exp.slice(3).map(generateJS));
};
}else{
if((("ir::quote" === exp[0]))){
{
(function(arg){
__result__ = JSON.stringify(arg);throw 'generateJS';
})(exp[1]);
};
}else{
if((("ir::backquote" === exp[0]))){
{
__result__ = ("[]" + macroExpand(exp[1]));throw 'generateJS';
};
}else{
if((("ir::include" === exp[0]))){
{
(function(module){
__result__ = ("/** " + module + " **/{\n" + include(module).map(generateJS).join(";\n") + ";\n}");throw 'generateJS';
})(generateJS(exp[1]));
};
}else{
if(true){
{
if((exp[0] in macros)){
{
__result__ = generateJS(macros[exp[0]].apply(this,exp.slice(1)));throw 'generateJS';
};
}else{
if((func[0] === ".")){
{
(function(variable,args){
__result__ = (variable + func + "(" + args.join(",") + ")");throw 'generateJS';
})(generateJS(exp[1]),exp.slice(2).map(generateJS));
};
}else{
if(true){
{
__result__ = (func + "(" + exp.slice(1).map(generateJS).join(",") + ")");throw 'generateJS';
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
};
}catch(err){
if(err === 'generateJS'){
return __result__;
}else{
throw err;
}
}
};
});
};
var main = (function(){
{
try{
(function(fs,file,config){
(function(src){
(function(js){
console.log((config + js));
})(generateJS(read(("(ir::function () (ir::block" + src + "))"))));
})(fs.readFileSync(file,"utf-8"));
})(require("fs"),process.argv[(process.argv.length - 1)],"#!/usr/bin/env node\n");
}catch(err){
if(err === 'main'){
return __result__;
}else{
throw err;
}
}
};
});
main();
})()
