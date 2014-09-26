var libTools = require("./tools");

exports.TOKENS = {
	year: "year",
	month: "month",
	week: "week",
	day: "day",
	hour: "hour",
	min: "min",
	sec: "sec",
	ms: "ms"
};
exports.TOKENS_ORDER = ["year", "month", "week", "day", "hour", "min", "sec", "ms"];

exports.TOKENS_MS = {
	ms: 1,
	sec: 1000,
	min: 60000, // 60 * sec
	hour: 3600000, // 60 * 60 * sec
	day: 86400000, // 24 * hour
	week: 604800000, // 7 * day
	month: 2592000000, // 30 * day
	year: 31536000000 // 365 * day
};

exports.FORMATS = {
	condensed: "condensed",
	short: "short",
	normal: "normal",
	full: "full"
};

exports.DEFAULT_FORMAT = exports.FORMATS.normal;

exports.FORMAT_DEFS = {
	condensed: {
		year: "y",
		day: "d",
		hour: "h",
		min: "m",
		sec: "s",
		ms: "ms",
		tokenFormat: "%d%s",
		stringify: {
			tokens: ["year", "day", "min", "sec", "ms"],
			delimiter: ""
		},
		recognize: {
			order: 100
		}
	},
	short: {
		year: "yr",
		month: "mnth",
		week: "wk",
		day: "day",
		hour: "hr",
		min: "min",
		sec: "sec",
		ms: "ms",
		tokenFormat: "%d%s",
		stringify: {
			tokens: ["year", "day", "min", "sec", "ms"],
			delimiter: " "
		},
		recognize: {
			order: 80
		}
	},
	normal: {
		year: ["year", "years"],
		month: ["moth", "months"],
		week: ["week", "weeks"],
		day: ["day", "days"],
		hour: ["hour", "hours"],
		min: "min",
		sec: "sec",
		ms: "ms",
		tokenFormat: "%d %s",
		stringify: {
			tokens: ["year", "day", "min", "sec", "ms"],
			delimiter: ", "
		},
		recognize: {
			order: 60
		}
	},
	full: {
		year: ["year", "years"],
		month: ["moth", "months"],
		week: ["week", "weeks"],
		day: ["day", "days"],
		hour: ["hour", "hours"],
		min: ["minute", "minutes"],
		sec: ["second", "seconds"],
		ms: ["millisecond", "milliseconds"],
		tokenFormat: "%d %s",
		stringify: {
			tokens: ["year", "month", "day", "min", "sec", "ms"],
			delimiter: ", ",
			lastDelimiter: " and "
		},
		recognize: {
			order: 40
		}
	}
};

var CACHE = null;
function cache(recook) {
	if (recook) {
		CACHE = null;
	}
	if (!CACHE) {
		CACHE = cookCache();
	}
	return CACHE;

	function cookCache() {
		var formats = Object.keys(exports.FORMAT_DEFS)
			.map(function (formatName) {
				return exports.FORMAT_DEFS[formatName];
			});

		formats.sort(function (a, b) {
			if (!a.recognize || a.recognize.order === undefined) {
				return 1;
			}
			if (!b.recognize || b.recognize.order === undefined) {
				return -1;
			}
			if (a.recognize.order < b.recognize.order) {
				return -1
			}
			else if (a.recognize.order > b.recognize.order) {
				return 1;
			}
			return 0;
		});

		var res = {
			recognizers: {}
		};
		exports.TOKENS_ORDER.forEach(function (token) {
			var regexes = [];
			formats.forEach(function (format) {
				var strings = format[token];
				if (!libTools.isArray(strings)) {
					strings = [strings];
				}
				strings.forEach(function (string) {
					var regexStr = libTools.execFormatTemplate(format.tokenFormat + "\\b", string, "([0-9]+)");
					regexes.push(new RegExp(regexStr, "i"));
				});
			});
			res.recognizers[token] = regexes;
		});


		return res;
	}
}
exports.cache = cache;