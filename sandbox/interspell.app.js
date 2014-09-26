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

snippet(1, function () {
	var res = Interspell.format({hour: 1, min: 16, sec: 11, ms: 474 }, "full");
	console.log(res);
});

