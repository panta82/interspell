module.exports = {
	year: "y",
	day: "d",
	hour: "h",
	min: "m",
	sec: "s",
	ms: "ms",
	tokenFormat: "%d%s",
	stringify: {
		tokens: ["year", "day", "hour", "min", "sec", "ms"],
		delimiter: ""
	},
	recognize: {
		priority: 30
	}
};