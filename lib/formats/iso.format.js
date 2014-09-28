function isoStringifyTokenFilter(interval, token, res) {
	if (res === "T" && !interval.hour && !interval.min && !interval.sec) {
		return false;
	}
	return true;
}

var ISO_DETECT_REGEX = /^P([0-9,.]+Y)?([0-9,.]+M)?([0-9,.]+W)?([0-9,.]+D)?T?([0-9,.]+H)?([0-9,.]+M)?([0-9,.]+S)?$/;

function isoCustomRecognizer(txt) {
	var match = ISO_DETECT_REGEX.exec(txt);
	if (!match) {
		return false;
	}

	throw "Not implemented";
	return {};
}

module.exports = {
	year: "Y",
	month: "M",
	week: "W",
	day: "D",
	hour: "H",
	min: "M",
	sec: "S",
	tokenFormat: "%d%s",
	stringify: {
		tokens: ["P", "year", "month", "week", "day", "T", "hour", "min", "sec"],
		tokenFilter: isoStringifyTokenFilter,
		delimiter: ""
	},
	recognize: {
		priority: 100,
		custom: isoCustomRecognizer
	}
};