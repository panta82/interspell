module.exports = {
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
		tokens: ["year", "month", "day", "hour", "min", "sec", "ms"],
		delimiter: ", ",
		lastDelimiter: " and "
	},
	recognize: {
		priority: 60
	}
};