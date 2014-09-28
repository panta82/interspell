var Interspell = require("../lib/interspell");

function snippet(enabled, fn) {
	if (!enabled) {
		return;
	}
	fn();
}

snippet(0, function () {
	var i = new Interspell("1 minute and 30 seconds");
	console.log(i.toString(Interspell.FORMATS.condensed));
});

snippet(0, function () {
	var res = Interspell.format({hour: 1, min: 16, sec: 11, ms: 474 }, "full");
	console.log(res);
});

snippet(0, function () {
	var res = Interspell.format({year: 2, month: 3, day: 13 }, "iso");
	console.log(res);
});

snippet(0, function () {
	var i = new Interspell("5d12h1m34ms");
	console.log(i);
});

snippet(0, function () {
	var i = new Interspell("D1Y3M12DT13H42M12S");
	console.log(i);
});

snippet(1, function () {
	var i1 = new Interspell("2 hours, 24 minutes");
	var i2 = new Interspell(i1.value - Interspell.value("16min"));

	console.log(i2.toString("full")); // "2 hours and 8 minutes"
});
