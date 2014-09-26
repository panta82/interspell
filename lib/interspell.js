var libVars = require("./vars"),
	libInternal = require("./internal");

function Interspell(arg) {
	var thisInterspell = this;

	if (arg) {
		libInternal.intervalSet(arg, thisInterspell);
	}

	Object.defineProperty(thisInterspell, "value", {
		enumerable: true,
		configurable: false,
		get: function () {
			return libInternal.intervalToMs(thisInterspell);
		},
		set: function (arg) {
			libInternal.intervalSet(arg, arg);
		}
	});
}

Interspell.prototype.toString = function toString(format) {
	return libInternal.intervalToString(this, format);
};

Interspell.prototype.set = function set(arg) {
	libInternal.intervalSet(arg, this);
};

Interspell.value = libInternal.intervalToMs;
Interspell.format = libInternal.intervalToString;
Interspell.TOKENS = libVars.TOKENS;
Interspell.FORMATS = libVars.FORMATS;

module.exports = Interspell;