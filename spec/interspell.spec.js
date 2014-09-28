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

		it("can work with string formats", function (done) {
			var i = new Interspell("1 minute and 30 seconds");
			expect(i.toString(Interspell.FORMATS.condensed)).toEqual("1m30s");

			done();
		});
	});

	describe("when used as library", function () {

		it("can convert object into milliseconds", function (done) {
			var res = Interspell.value({hour: 1, min: 16, sec: 11, ms: 474 });
			expect(res).toEqual(474 + 11 * 1000 + 16 * 60 * 1000 + 1 * 60 * 60 * 1000);

			done();
		});

		it("can convert strings into milliseconds", function (done) {
			var res = Interspell.value("1 hour and 14 seconds");
			expect(res).toEqual(14 * 1000 + 1 * 60 * 60 * 1000);

			done();
		});

		it("can stringify an object", function (done) {
			var res = Interspell.format({hour: 1, min: 16, sec: 11, ms: 474 }, "full");
			expect(res).toEqual("1 hour, 16 minutes, 11 seconds and 474 milliseconds");

			done();
		});

		it("can stringify milliseconds", function (done) {
			var res = Interspell.format(16346);
			expect(res).toEqual("16 sec, 346 ms");

			done();
		});
	});
});
