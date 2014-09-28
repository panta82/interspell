module.exports = {
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
		tokens: ["year", "day", "hour", "min", "sec", "ms"],
		delimiter: ", "
	},
	recognize: {
		priority: 50
	}
};