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
	default: "default",
	full: "full",
	iso: "iso",
	postgres: "postgres"
};

exports.DEFAULT_FORMAT = exports.FORMATS.default;

exports.FORMAT_DEFS = {
	condensed: require("./formats/condensed.format"),
	short: require("./formats/short.format"),
	default: require("./formats/default.format"),
	full: require("./formats/full.format"),
	iso: require("./formats/iso.format"),
	postgres: require("./formats/postgres.format")
};

var CACHE = null;
function cache(recook) {
	if (recook) {
		CACHE = null;
	}
	if (!CACHE) {
		CACHE = {
			recognizers: libTools.cookRecognizers(exports.FORMAT_DEFS, exports.TOKENS_ORDER),
			tokensMap: libTools.cookTokensMap(exports.FORMAT_DEFS, exports.TOKENS_ORDER)
		};
	}
	return CACHE;
}
exports.cache = cache;