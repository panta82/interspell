exports.isString = function isString(x) {
	return typeof(x) === "string";
};

exports.isNumber = function isNumber(x, nanIsNumber, infinityIsNumber) {
	return typeof(x) === "number" && (nanIsNumber || !isNaN(x)) && (infinityIsNumber || isFinite(x));
};