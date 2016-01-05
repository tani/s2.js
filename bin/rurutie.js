function tokenize(str) {
    var operator = /("(?:\\"|[^"])*"|,@|[,'`()]|\s)/;
    return str.split(operator).filter( (e) => { return /[^\s]/.test(e); });
}

function parse(exp,tokens) {
    var cnt = 1,end = 0;
    if(tokens[0] === "'") {
	if(tokens[1] === '('){
	    end++;
	    while(cnt > 0) {
		end++;
		if(tokens[end] === '(') {
		    cnt++;
		}
		if(tokens[end] === ')') {
		    cnt--;
		}
	    }
	    exp.push(['ir::quote',parse([], tokens.slice(2,end))]);
	    if (tokens.length - 1 === end) {
		return exp;
	    } else {
		return parse(exp,tokens.slice(end + 1));
	    }
	} else {
	    exp.push(['ir::quote',tokens[1]]);
	    if (tokens.length <= 2) {
		return exp;
	    } else {
		return parse(exp, tokens.slice(2));
	    }
	}
    }

    if(tokens[0] === "`") {
	if(tokens[1] === '('){
	    end++;
	    while(cnt > 0) {
		end++;
		if(tokens[end] === '(') {
		    cnt++;
		}
		if(tokens[end] === ')') {
		    cnt--;
		}
	    }
	    exp.push(['ir::backquote',parse([], tokens.slice(2,end))]);
	    if (tokens.length - 1 === end) {
		return exp;
	    } else {
		return parse(exp,tokens.slice(end + 1));
	    }
	} else {
	    exp.push(['ir::backquote',tokens[1]]);
	    if (tokens.length <= 2) {
		return exp;
	    } else {
		return parse(exp, tokens.slice(2));
	    }
	}
    }
    if(tokens[0] === ",") {
	if(tokens[1] === '('){
	    end++;
	    while(cnt > 0) {
		end++;
		if(tokens[end] === '(') {
		    cnt++;
		}
		if(tokens[end] === ')') {
		    cnt--;
		}
	    }
	    exp.push(['ir::unquote',parse([], tokens.slice(2,end))]);
	    if (tokens.length - 1 === end) {
		return exp;
	    } else {
		return parse(exp,tokens.slice(end + 1));
	    }
	} else {
	    exp.push(['ir::unquote',tokens[1]]);
	    if (tokens.length <= 2) {
		return exp;
	    } else {
		return parse(exp, tokens.slice(2));
	    }
	}
    }

    if(tokens[0] === ",@") {
	if(tokens[1] === '('){
	    end++;
	    while(cnt > 0) {
		end++;
		if(tokens[end] === '(') {
		    cnt++;
		}
		if(tokens[end] === ')') {
		    cnt--;
		}
	    }
	    exp.push(['ir::splice',parse([], tokens.slice(2,end))]);
	    if (tokens.length - 1 === end) {
		return exp;
	    } else {
		return parse(exp,tokens.slice(end + 1));
	    }
	} else {
	    exp.push(['ir::splice',tokens[1]]);
	    if (tokens.length <= 2) {
		return exp;
	    } else {
		return parse(exp, tokens.slice(2));
	    }
	}
    }

    if(tokens[0] === '(') {
	while(cnt > 0) {
	    end++;
	    if(tokens[end] === '(') {
		cnt++;
	    }
	    if(tokens[end] === ')') {
		cnt--;
	    }
	}
	exp.push(parse([], tokens.slice(1,end)));
	if (tokens.length - 1 === end) {
	    return exp;
	} else {
	    return parse(exp,tokens.slice(end + 1));
	}
    } else {
	if (tokens.length !== 0) {
	    exp.push(tokens[0]);
	}
	if (tokens.length <= 1) {
	    return exp;
	} else {
	    return parse(exp, tokens.slice(1));
	}
    }
}

var macros = {};
function generateJS(exp) {
    var args,statements,statement,statement1,name;
    var statement2,results,macro,variable,value,tag;
    var condition,init,final,error,array,key,func;
    if (!Array.isArray(exp)){
	return exp;
    } else {
	if(typeof exp[0] == 'string')
	    func = exp[0].replace(/ir::/,'');
	else
	    func = generateJS(exp[0]);
	switch (exp[0]) {
	case undefined  : return [];
	case 'ir::function' :
	case 'ir::function*': 
	    args = exp[1].map(generateJS);
	    statement = generateJS(exp[2]);
	    return '('+func+'('+args.join(',')+')'+statement+')';
	case 'ir::var':
	case 'ir::let':
	case 'ir::const':
	    if (exp.length === 3) {
		variable = generateJS(exp[1]);
		value = generateJS(exp[2]);
		return func + ' ' + variable + ' = ' + value;
	    } else {
		variable = generateJS(exp[1]);
		return func + ' ' + variable;
	    }
	case 'ir::if':
	    if (exp.length === 4) {
		condition = generateJS(exp[1]);
		statement1 = generateJS(exp[2]);
		statement2 = generateJS(exp[3]);
		return 'if('+condition+')'+statement1+'else'+statement2;
	    } else {
		condition = generateJS(exp[1]);
		statement = generateJS(exp[2]);
		return 'if(' + condition + ')' + statement;
	    }
	case 'ir::do':
	    statement = generateJS(exp[1]);
	    condition = generateJS(exp[3]);
	    return 'do ' + statement+ ' while(' + condition + ');';
	case 'ir::for':
	    init = generateJS(exp[1]);
	    condition = generateJS(exp[2]);
	    final = generateJS(exp[3]);
	    statement = generateJS(exp[4]);
	    return 'for('+init+';'+condition+';'+final+')'+statement;
	case 'ir::while':
	    condition = generateJS(exp[1]);
	    statement = generateJS(exp[2]);
	    return 'while(' +  condition + ')' + statement;
	case 'ir::block':
	    statements = exp.slice(1).map(generateJS);
	    return '{\n' + statements.join(';\n') + ';\n}';
	case 'ir::named-block':
	    tag = generateJS(exp[1]);
	    statements = exp.slice(2).map(generateJS);
	    return 'try{'+statements.join(';\n')+';\n}'
		+'catch(err){\n'
		+'if(err === "'+tag+'"){\n'
		+'return result;\n'
		+'}else{\n'
		+'throw err;\n'
		+'}}';
	case 'ir::return-from':
	    tag = generateJS(exp[1]);
	    value = generateJS(exp[2]);
	    return 'result = ' + value + ';throw "' + tag + '"';
	case 'ir::return':
	case 'ir::typeof':
	case 'ir::break':
	case 'ir::continue':
	case 'ir::yield':
	case 'ir::delete':
	    return exp.length === 1 ?
		func :
		func + ' ' + generateJS(exp[1]);
	case 'ir::instanceof':
	case 'ir::in':
	case 'ir::===':
	case 'ir::==':
	case 'ir::&&':
	case 'ir::||':
	case 'ir::+':
	case 'ir::-':
	case 'ir::*':
	case 'ir::/':
	case 'ir::%':
	case 'ir::>':
	case 'ir::<':
	case 'ir::>=':
	case 'ir::<=':
	case 'ir::<<':
	case 'ir::>>':
	case 'ir::>>>':
	case 'ir::&':
	case 'ir::|':
	case 'ir::^':
	    return '(' + exp.slice(1).map(generateJS).join(' ' + func + ' ') + ')';
	case 'ir::++':
	case 'ir::--':
	    return func + generateJS(exp[1]); 
	case 'ir::!':
	case 'ir::~':
	case 'ir::new':
	    return func + ' ' + generateJS(exp[1]);
	case 'ir::nth':
	    array = generateJS(exp[1]); 
	    key   = generateJS(exp[2]);
	    return array + '[' + key + ']';
	case 'ir::set':
	    variable = generateJS(exp[1]);
	    value = generateJS(exp[2]);
	    return variable + ' = ' + value;
	case 'ir::hash':
	    args = exp.slice(1).map(generateJS);
	    results = [];
	    for(key = 0; key < args.length; key = key + 2)
		results.push(args[key] + ': ' + args[key + 1]);
	    return '{' + results.join(' , ') + '}';
	case 'ir::array':
	    array = exp.slice(1).map(generateJS);
	    return '[' + array.join(' , ') + ']';
	case 'ir::dot':
	    args = exp.map(generateJS).slice(1);
	    return args.join('.');
	case 'ir::dot':
	    args = exp.map(generateJS).slice(1);
	    return args.join('.');
	case 'ir::intern':
	    return generateJS(exp[1]).slice(1,-1);
	case 'ir::defmacro':
	    name = generateJS(exp[1]);
	    args = exp[2].map(generateJS);
	    statements = exp.slice(3).map(generateJS);
	    macro = '(function ('+args.join(',')+') {\n'+statements.join(';\n')+';\n})';
	    console.log(macro);
	    macros[name] = eval(macro);
	    return '/* MACRO: '+name+' */'; 
	case 'ir::quote':
	    value = exp[1];
	    return JSON.stringify(value);
	case 'ir::backquote':
	    return '[]'+macroExpand(exp[1]);
	default:
	    if(exp[0] in macros) {
		args = exp.slice(1);
		return generateJS(macros[exp[0]].apply(this,args));
	    } else if (func[0] === '.') {
		variable = generateJS(exp[1]);
		args = exp.slice(2).map(generateJS);
		return variable + func + '(' + args.join(',')+ ')';
	    }else {
		args = exp.slice(1).map(generateJS);
		return func + '(' + args.join(',') + ')';
	    }
	}
    }
}

function macroExpand(exp) {
    if(!Array.isArray(exp)) {
	return "'"+exp+"'";
    } else if(exp.length === 0) {
	return '';
    } else if (Array.isArray(exp[0]) && exp[0][0] === 'ir::unquote') {
	return '.concat(['+generateJS(exp[0][1])+'])'+macroExpand(exp.slice(1));
    } else if (Array.isArray(exp[0]) && exp[0][0] === 'ir::splice') {
	return '.concat('+generateJS(exp[0][1])+')'+macroExpand(exp.slice(1));
    } else {
	if(Array.isArray(exp[0]))
	    return '.concat(['+'[]'+macroExpand(exp[0])+'])'+macroExpand(exp.slice(1));
	else
	    return '.concat(['+macroExpand(exp[0])+'])'+macroExpand(exp.slice(1));
    }
}

function main() {
    var file = process.argv[process.argv.length - 1];
    var fs = require('fs');
    fs.readFile(file,'utf8',function(err,src){
	var code = [['ir::function',[],['ir::block'].concat(parse([],tokenize(src)))]];
	var js   = generateJS(code);
	var config ='#!/usr/bin/env node\n';
	console.log(config + js);
    });
}

main();
