var libVars = require("./vars"),
	libInternal = require("./internal");

function Interspell(arg) {
	var thisInterspell = this;

	if (arg) {
		libInternal.intervalSet(arg, thisInterspell);
	}

	var _value = 0,
		_format = libVars.DEFAULT_FORMAT,
		_publicTokens = null;

	Object.defineProperties(thisInterspell, {
		value: {
			enumerable: true,
			configurable: false,
			get: function () {
				return _value;
			},
			set: function (arg) {
				_value = parseInt(arg, 10) || 0;
				updateTokenValues();
			}
		},
		format: {
			enumerable: true,
			configurable: false,
			get: function () {
				return _format;
			},
			set: function (arg) {
				var format = libVars.FORMATS[arg];
				if (!format) {
					throw new Error("Unknown format: " + arg);
				}
				_format = format;
				updateTokenProperties();
				updateTokenValues();
			}
		}
	});

	function updateTokenProperties() {
		if (_publicTokens) {
			_pu
		}
	}

	function updateTokenValues() {

	}
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