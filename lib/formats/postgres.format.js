module.exports = {
	year: ["year", "years"],
	month: ["moth", "months"],
	day: ["day", "days"],
	hour: ["hour", "hours"],
	min: ["minute", "minutes"],
	sec: ["second", "seconds"],
	tokenFormat: "%d %s",
	stringify: {
		tokens: ["year", "month", "day", "hour", "min", "sec"],
		delimiter: " "
	},
	recognize: {
		priority: 60
	}
};