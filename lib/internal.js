var libTools = require("./tools"),
	libVars = require("./vars");

function intervalToMs(interval) {
	if (libTools.isString(interval)) {
		interval = intervalFromString(interval);
	}

	var sum = 0,
		token;
	for (var i = 0; i < libVars.TOKENS_ORDER.length; i++) {
		token = libVars.TOKENS_ORDER[i];
		sum += (interval[token] || 0) * libVars.TOKENS_MS[token];
	}
	return sum;
}
exports.intervalToMs = intervalToMs;

function intervalToString(interval, format) {
	if (!interval) {
		return "";
	}
	if (libTools.isString(interval)) {
		return interval;
	}

	format = format || libVars.DEFAULT_FORMAT;
	var formatDef = libVars.FORMAT_DEFS[format];
	if (!formatDef) {
		throw new Error("Unsupported format: " + format);
	}

	if (libTools.isNumber(interval)) {
		interval = intervalFromMs(interval);
	}

	var tokenFormats = formatDef.tokenFormat;
	if (libTools.isString(tokenFormats)) {
		tokenFormats = {
			default: tokenFormats
		};
	}

	var resultTokens = [];
	formatDef.stringify.tokens.forEach(function (token) {
		var tokenValue = interval[token];
		if (!tokenValue) {
			return;
		}

		var tokenText= formatDef[token];
		if (libTools.isArray(tokenText)) {
			if (tokenValue !== 1 && tokenText.length > 0) {
				tokenText = tokenText[1];
			} else {
				tokenText = tokenText[0];
			}
		}

		var format = tokenFormats[token] || tokenFormats.default;
		var resultToken = libTools.execFormatTemplate(format, tokenText, tokenValue);

		resultTokens.push(resultToken);
	});

	var res = resultTokens.join(formatDef.stringify.delimiter);
	return res;
}
exports.intervalToString = intervalToString;

function intervalFromMs(ms, target) {
	target = target || {};
	for (var i = 0; i < libVars.TOKENS_ORDER.length; i++) {
		peelOffToken(libVars.TOKENS_ORDER[i]);
	}
	return target;

	function peelOffToken(token) {
		var tokenMs = libVars.TOKENS_MS[token] || 0;
		var res = Math.floor(ms / tokenMs);
		ms = ms - res * tokenMs;
		if (res) {
			target[token] = res;
		}
	}
}
exports.intervalFromMs = intervalFromMs;

function intervalFromString(intStr, target) {
	target = target || {};
	var recognizers = libVars.cache().recognizers;

	libVars.TOKENS_ORDER.forEach(function (token) {
		var fns = recognizers[token],
			fnsLength = fns.length,
			match;
		for (var i = 0; i < fnsLength; i++) {
			match = fns[i].exec ? fns[i].exec(intStr) : fns[i](intStr);
			if (match) {
				target[token] = parseInt(match[1]);
				break;
			}var libTools = require("./tools"),
	libVars = require("./vars");

function intervalToMs(interval) {
	if (libTools.isString(interval)) {
		interval = intervalFromString(interval);
	}

	var sum = 0,
		token;
	for (var i = 0; i < libVars.TOKENS_ORDER.length; i++) {
		token = libVars.TOKENS_ORDER[i];
		sum += (interval[token] || 0) * libVars.TOKENS_MS[token];
	}
	return sum;
}
exports.intervalToMs = intervalToMs;

function intervalToString(interval, format) {
	if (!interval) {
		return "";
	}
	if (libTools.isString(interval)) {
		return interval;
	}

	format = format || libVars.DEFAULT_FORMAT;
	var formatDef = libVars.FORMAT_DEFS[format];
	if (!formatDef) {
		throw new Error("Unsupported format: " + format);
	}

	if (libTools.isNumber(interval)) {
		interval = intervalFromMs(interval);
	}

	var tokenFormats = formatDef.tokenFormat;
	if (libTools.isString(tokenFormats)) {
		tokenFormats = {
			default: tokenFormats
		};
	}

	var resultTokens = [];
	formatDef.stringify.tokens.forEach(function (token) {
		var tokenValue = interval[token];
		if (!tokenValue) {
			return;
		}

		var tokenText= formatDef[token];
		if (libTools.isArray(tokenText)) {
			if (tokenValue !== 1 && tokenText.length > 0) {
				tokenText = tokenText[1];
			} else {
				tokenText = tokenText[0];
			}
		}

		var format = tokenFormats[token] || tokenFormats.default;
		var resultToken = libTools.execFormatTemplate(format, tokenText, tokenValue);

		resultTokens.push(resultToken);
	});

	var res = resultTokens.join(formatDef.stringify.delimiter);
	return res;
}
exports.intervalToString = intervalToString;

function intervalFromMs(ms, target) {
	target = target || {};
	for (var i = 0; i < libVars.TOKENS_ORDER.length; i++) {
		peelOffToken(libVars.TOKENS_ORDER[i]);
	}
	return target;

	function peelOffToken(token) {
		var tokenMs = libVars.TOKENS_MS[token] || 0;
		var res = Math.floor(ms / tokenMs);
		ms = ms - res * tokenMs;
		if (res) {
			target[token] = res;
		}
	}
}
exports.intervalFromMs = intervalFromMs;

function intervalFromString(intStr, target) {
	target = target || {};
	var recognizers = libVars.cache().recognizers;

	libVars.TOKENS_ORDER.forEach(function (token) {
		var fns = recognizers[token],
			fnsLength = fns.length,
			match;
		for (var i = 0; i < fnsLength; i++) {
			match = (fns[i].exec || fns[i])(intStr);
			if (match) {
				target[token] = parseInt(match[1]);
				break;
			}
		}
	});

	return target;
}
exports.intervalFromString = intervalFromString;

function intervalSet(source, target) {
	target = target || {};

	if (libTools.isString(source)) {
		intervalFromString(source, target);
	}
	else if (libTools.isNumber(source)) {
		intervalFromMs(source, target);
	}
	else {
		libTools.shallowCopy(source, target, function (key) {
			return libVars.TOKENS[key] !== undefined;
		});
	}
	return target;
}
exports.intervalSet = intervalSet;
		}
	});

	return target;
}
exports.intervalFromString = intervalFromString;

function intervalSet(source, target) {
	target = target || {};

	if (libTools.isString(source)) {
		intervalFromString(source, target);
	}
	else if (libTools.isNumber(source)) {
		intervalFromMs(source, target);
	}
	else {
		libTools.shallowCopy(source, target, function (key) {
			return libVars.TOKENS[key] !== undefined;
		});
	}
	return target;
}
exports.intervalSet = intervalSet;