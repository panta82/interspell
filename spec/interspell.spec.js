var Interspell = require("../lib/interspell");

describe("Interspell", function () {

	describe("when used as constructor", function () {

		it("can be instantiated", function (done) {
			var i = new Interspell(1000 * 90);
			expect(i).toBeTruthy();
			expect(i.min).toEqual(1);
			expect(i.sec).toEqual(30);
			expect(i.ms).toBeUndefined();
			expect(i.hour).toBeUndefined();
			expect(i.value).toEqual(1000 * 90);

			done();
		});

		it("can be modified", function (done) {
			var i = new Interspell(1000 * 90);
			i.set(i.value + 1000 * 180);
			expect(i.min).toEqual(4);
			expect(i.sec).toEqual(30);
			expect(i.ms).toBeUndefined();
			expect(i.hour).toBeUndefined();
			expect(i.value).toEqual(1000 * 270);

			done();
		});

		it("can be used with strings", function (done) {
			var i = new Interspell("1 minute and 30 seconds");
			expect(i.toString(Interspell.FORMATS.condensed)).toEqual("1m30s");

			done();
		});
	});
});
