var Interspell = require("../lib/interspell");

function snippet(enabled, fn) {
	if (!enabled) {
		return;
	}
	fn();
}

snippet(1, function () {
	var i = new Interspell("1 minute and 30 seconds");
	console.log(i.toString(Interspell.FORMATS.condensed));
});