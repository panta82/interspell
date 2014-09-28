module.exports = {
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
		tokens: ["year", "day", "hour", "min", "sec", "ms"],
		delimiter: " "
	},
	recognize: {
		priority: 40
	}
};