exports.TOKENS = {
	year: "year",
	day: "day",
	hour: "hour",
	min: "min",
	sec: "sec",
	ms: "ms"
};
exports.TOKEN_ORDER = ["year", "day", "hour", "min", "sec", "ms"];

exports.FORMATS = {
	minimal: "short",
	short: "medium",
	normal: "normal",
	full: "long"
};

exports.FORMAT = {
	minimal: {
		year: "y",
		day: "d",
		hour: "h",
		min: "m",
		sec: "s",
		ms: "ms"
	},
	short: {
		year: "yr",
		day: "day",
		hour: "hr",
		min: "min",
		sec: "sec",
		ms: "ms"
	},
	normal: {
		year: ["year", "years"],
		day: ["day", "days"],
		hour: ["hour", "hours"],
		min: "min",
		sec: "sec",
		ms: "ms"
	},
	full: {
		year: ["year", "years"],
		day: ["day", "days"],
		hour: ["hour", "hours"],
		min: ["minute", "minutes"],
		sec: ["second", "seconds"],
		ms: ["millisecond", "milliseconds"]
	}
};