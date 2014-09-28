exports.isObject = function isObject(x, nullIsObject, arrayIsObject) {
	return typeof(x) === "object" && (nullIsObject || x !== null) && (arrayIsObject || !exports.isArray(x));
};

exports.isFunction = function isFunction(x) {
	return typeof(x) === "function";
};

exports.isString = function isString(x) {
	return typeof(x) === "string";
};

exports.isNumber = function isNumber(x, nanIsNumber, infinityIsNumber) {
	return typeof(x) === "number" && (nanIsNumber || !isNaN(x)) && (infinityIsNumber || isFinite(x));
};

exports.isArray = function isArray(x) {
	return Object.prototype.toString.call(x) === '[object Array]';
};

exports.shallowCopy = function shallowCopy(source, destination, fnFilter) {
	if (exports.isFunction(destination)) {
		fnFilter = destination;
		destination = {};
	}
	fnFilter = fnFilter || function () { return true; };
	destination = destination || {};
	if (!exports.isObject(source)) {
		return destination;
	}
	Object.keys(source).forEach(function (key) {
		var value = source[key];
		if (fnFilter(key, value, destination[key])) {
			destination[key] = value;
		}
	});
	return destination;
};

exports.execFormatTemplate = function execFormatTemplate(template, s, d) {
	return template.replace(/\%[sd]/g, function (str) {
		switch (str[1]) {
			case "s": return s;
			case "d": return d;
			default: return str[1];
		}
	});
};

exports.cookRecognizers = function cookRecognizers(FORMAT_DEFS, TOKENS_ORDER) {
	var autoFormats = [],
		customFormats = [];
	for (var formatName in FORMAT_DEFS) {
		//noinspection JSUnfilteredForInLoop
		var format = FORMAT_DEFS[formatName];
		if (format.recognize && format.recognize.custom) {
			customFormats.push(format);
		} else {
			autoFormats.push(format);
		}
	}

	autoFormats.sort(compareByPriority);
	customFormats.sort(compareByPriority);

	var recognizers = {};

	recognizers.custom = customFormats.map(function (format) {
		return format.recognize.custom;
	});

	TOKENS_ORDER.forEach(function (token) {
		var regexes = [];
		autoFormats.forEach(function (format) {
			var strings = format[token];
			if (!strings) {
				return;
			}
			if (!exports.isArray(strings)) {
				strings = [strings];
			}
			strings.forEach(function (string) {
				var regexStr = exports.execFormatTemplate(format.tokenFormat + "\\b", string, "([0-9]+)");
				regexes.push(new RegExp(regexStr, "i"));
			});
		});
		recognizers[token] = regexes;
	});
	return recognizers;

	function compareByPriority(a, b) {
		var A = -1, B = 1;
		if (!a.recognize || a.recognize.priority === undefined) {
			return B;
		}
		if (!b.recognize || b.recognize.priority === undefined) {
			return A;
		}
		if (a.recognize.priority > b.recognize.priority) {
			return A;
		}
		else if (a.recognize.priority < b.recognize.priority) {
			return B;
		}
		return 0;
	}
};