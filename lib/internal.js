var libTools = require("./tools"),
	libVars = require("./vars");

function intervalToMs(interval) {
	if (!interval) {
		return 0;
	}
	if (libTools.isString(interval)) {
		interval = intervalFromString(interval);
	}
	if (libTools.isNumber(interval)) {
		return interval;
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

	format = format || libVars.DEFAULT_FORMAT;
	var formatDef = libVars.FORMAT_DEFS[format];
	if (!formatDef) {
		throw new Error("Unsupported format: " + format);
	}
	if (libTools.isString(interval)) {
		interval = intervalFromString(interval);
	}
	if (libTools.isNumber(interval)) {
		interval = intervalFromMs(interval, formatDef.stringify.tokens);
	}

	var tokenFormats = formatDef.tokenFormat;
	if (libTools.isString(tokenFormats)) {
		tokenFormats = {
			default: tokenFormats
		};
	}

	var resultTokens = [];
	formatDef.stringify.tokens.forEach(function (token) {
		if (!libVars.TOKENS[token]) {
			resultToken = token;
		} else {
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
		}

		if (formatDef.stringify.tokenFilter) {
			var filterRes = formatDef.stringify.tokenFilter(interval, token, resultToken);
			if (filterRes === false) {
				return;
			}
			if (libTools.isString(filterRes)) {
				resultToken = filterRes;
			}
		}

		resultTokens.push(resultToken);
	});

	if (!resultTokens.length) {
		return "";
	}

	var res;
	if (formatDef.stringify.lastDelimiter) {
		if (resultTokens.length > 2) {
			res = resultTokens.slice(0, -1).join(formatDef.stringify.delimiter)
				+ formatDef.stringify.lastDelimiter
				+ resultTokens[resultTokens.length - 1];
		}
		else if (resultTokens.length === 2) {
			res = resultTokens[0] + formatDef.stringify.lastDelimiter + resultTokens[1];
		}
		else {
			res = resultTokens[0];
		}
	} else {
		res = resultTokens.join(formatDef.stringify.delimiter);
	}

	return res;
}
exports.intervalToString = intervalToString;


function intervalFromMs(ms, tokens, target) {
	target = target || {};
	for (var i = 0; i < libVars.TOKENS_ORDER.length; i++) {
		var token = libVars.TOKENS_ORDER[i];
		if (!tokens || tokens.indexOf(token) >= 0) {
			peelOffToken(token);
		}
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

function intervalFromString(str, target) {
	target = target || {};
	var recognizers = libVars.cache().recognizers;

	for (var i = 0; i < recognizers.custom.length; i++) {
		var recognized = recognizers.custom[i](str);
		if (libTools.isObject(recognized)) {
			return intervalSet(recognized, target);
		}
	}

	libVars.TOKENS_ORDER.forEach(function (token) {
		var fns = recognizers[token],
			fnsLength = fns.length,
			match;
		for (var i = 0; i < fnsLength; i++) {
			match = fns[i].exec ? fns[i].exec(str) : fns[i](str);
			if (match) {
				var value = parseInt(match[1], 10);
				if (value > 0) {
					target[token] = value;
				}
				break;
			}
		}
	});

	return target;
}
exports.intervalFromString = intervalFromString;

function intervalFromHash(hash, target) {
	target = target || {};

	var tokenMap = libVars.cache().tokensMap;

	for (var key in hash) {
		if (hash.hasOwnProperty(key)) {
			var token = tokenMap[key];
			if (token) {
				target[token] = hash[key];
			}
		}
	}

	return target;
}
exports.intervalFromHash = intervalFromHash;

function intervalSet(source, target) {
	target = target || {};

	if (libTools.isString(source)) {
		intervalFromString(source, target);
	}
	else if (libTools.isNumber(source)) {
		intervalFromMs(source, null, target);
	}
	else {
		intervalFromHash(source, target);
	}
	return target;
}
exports.intervalSet = intervalSet;