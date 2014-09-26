var libVars = require("./vars"),
	libInternal = require("./internal");

function Interspell(arg) {
	var thisInterspell = this;

	if (arg) {
		libInternal.intervalSet(arg, this);
	}

	Object.defineProperty(this, "value", {
		enumerable: true,
		configurable: false,
		writable: false,
		get: function get() {
			return libInternal.intervalToMs(thisInterspell);
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
Interspell.FORMATS = libVars.FORMATS.

module.exports = Interspell;