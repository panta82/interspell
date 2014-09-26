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

exports.DEFAULT_TOKEN_ORDER = ["year", "day", "hour", "min", "sec", "ms"];

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
	minimal: "short",
	short: "medium",
	normal: "normal",
	full: "long"
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
		format: ["%{year}${year}", "%{day}${day}", "%{min}${min}", "%{sec}${sec}", "%{ms}${ms}"],
		delimiter: ""
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
		format: ["%{year}${year}", "%{day}${day}", "%{min}${min}", "%{sec}${sec}", "%{ms}${ms}"],
		delimiter: " "
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
		format: ["%{year}${year}", "%{day}${day}", "%{min}${min}", "%{sec}${sec}", "%{ms}${ms}"],
		delimiter: ", "
	},
	full: {
		year: ["year", "years"],
		month: ["moth", "months"],
		week: ["week", "weeks"],
		day: ["day", "days"],
		hour: ["hour", "hours"],
		min: ["minute", "minutes"],
		sec: ["second", "seconds"],
		ms: ["millisecond", "milliseconds"]
	}
};