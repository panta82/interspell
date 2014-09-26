var libTools = require("./tools"),
	libVars = require("vars");

var MS_IN_SECOND = 1000,
	MS_IN_MINUTE = MS_IN_SECOND * 60,
	MS_IN_HOUR = MS_IN_MINUTE * 60,
	MS_IN_DAY = MS_IN_HOUR * 24,
	MS_IN_YEAR = MS_IN_DAY * 365;

function intervalToMs(interval) {
	return (interval.milliseconds || 0)
		+ (interval.seconds || 0) * MS_IN_SECOND
		+ (interval.minutes || 0) * MS_IN_MINUTE
		+ (interval.hours || 0) * MS_IN_HOUR
		+ (interval.days || 0) * MS_IN_DAY
		+ (interval.years || 0) * MS_IN_YEAR
}
exports.intervalToMs = intervalToMs;

function intervalToString(interval, format) {
	if (!interval) {
		return "";
	}
	if (libTools.isString(interval)) {
		return interval;
	}
	format = format || libVars.DEFAULT_FORMAT;

	if (libTools.isNumber(interval)) {
		interval = intervalFromMs(interval);
	}

	var formatDef = libVars.FORMAT_DEFS[format];
	if (!formatDef) {
		throw new Error("Unsupported format: " + format);
	}



	var parts = [];
	tryAdd("years", "year");
	tryAdd("days", "day");
	tryAdd("hours", "hour");
	tryAdd("minutes", "minute");
	tryAdd("seconds", "second");
	tryAdd("milliseconds", "millisecond");

	return parts.join(", ");

	function tryAdd(member, singleForm) {
		var val = interval[member],
			finalForm = val === 1 ? singleForm : singleForm + "s";
		if (val) {
			parts.push(String(val) + " " + finalForm);
		}
	}
}
exports.intervalToString = intervalToString;

function intervalFromMs(ms, target) {
	target = target || {};
	intervalFromMsPeelOff(MS_IN_YEAR, libVars.TOKENS.year);
	intervalFromMsPeelOff(MS_IN_DAY, libVars.TOKENS.day);
	intervalFromMsPeelOff(MS_IN_HOUR, libVars.TOKENS.hour);
	intervalFromMsPeelOff(MS_IN_MINUTE, libVars.TOKENS.min);
	intervalFromMsPeelOff(MS_IN_SECOND, libVars.TOKENS.sec);
	if (ms) {
		target[libVars.TOKENS.ms] = ms;
	}
	return target;

	function intervalFromMsPeelOff(val, property) {
		var res = Math.floor(ms / val);
		ms = ms - res * val;
		if (res) {
			target[property] = res;
		}
		return res;
	}
}
exports.intervalFromMs = intervalFromMs;

var intervalFromStringFields = [
	{
		name: "years",
		regexes: [/([0-9]+)\s?y\b/i, /([0-9]+)\s?yr\b/i, /([0-9]+)\s?year\b/i, /([0-9]+)\s?years\b/i]
	}, {
		name: "days",
		regexes: [/([0-9]+)\s?d\b/i, /([0-9]+)\s?day\b/i, /([0-9]+)\s?days\b/i]
	}, {
		name: "hours",
		regexes: [/([0-9]+)\s?h\b/i, /([0-9]+)\s?hr\b/i, /([0-9]+)\s?hour\b/i, /([0-9]+)\s?hours\b/i]
	}, {
		name: "minutes",
		regexes: [/([0-9]+)\s?m\b/i, /([0-9]+)\s?min\b/i, /([0-9]+)\s?minute\b/i, /([0-9]+)\s?minutes\b/i]
	}, {
		name: "seconds",
		regexes: [/([0-9]+)\s?s\b/i, /([0-9]+)\s?sec\b/i, /([0-9]+)\s?second\b/i, /([0-9]+)\s?seconds\b/i]
	}, {
		name: "milliseconds",
		regexes: [/([0-9]+)\s?ms\b/i, /([0-9]+)\s?millisecond\b/i, /([0-9]+)\s?milliseconds\b/]
	}
];

function intervalFromString(intStr, target) {
	target = target || {};
	intervalFromStringFields.forEach(function (field) {
		var regex;
		for (var i = 0; i < field.regexes.length; i++) {
			regex = field.regexes[i];
			var match = regex.exec(intStr);
			if (match) {
				target[field.name] = parseInt(match[1], 10);
				break;
			}
		}
	});
	return target;
}
exports.intervalFromString = intervalFromString;

function loadInterval(source, target) {
	target = target || {};


}