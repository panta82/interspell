var Interspell = require("../lib/interspell");

describe("Interspell", function () {

	function testFormat(formatName, intervals) {
		it("can detect and print " + formatName + " format", function (done) {
			intervals.forEach(testInterval);

			done();
		});

		function testInterval(interval) {
			var source = interval.src || interval.txt;
			var i = new Interspell(source);
			Object.keys(interval.ob).forEach(function (token) {
				expect(i[token]).toEqual(interval.ob[token]);
			});
			expect(i.toString(formatName)).toEqual(interval.txt);
		}
	}

	testFormat("condensed", [
		{
			txt: "5d12h1m34ms",
			ob: {
				day: 5,
				hour: 12,
				min: 1,
				ms: 34
			}
		}, {
			src: "5y, 12d 35minutes 0s 456ms",
			txt: "5y12d35m456ms",
			ob: {
				year: 5,
				day: 12,
				min: 35,
				ms: 456
			}
		}
	]);

	testFormat("short", [
		{
			txt: "1yr 2day 7hr 12min 45sec",
			ob: {
				year: 1,
				day: 2,
				hour: 7,
				min: 12,
				sec: 45
			}
		}
	]);

	testFormat("default", [
		{
			txt: "1 year, 2 days, 7 hours, 12 min, 45 sec",
			ob: {
				year: 1,
				day: 2,
				hour: 7,
				min: 12,
				sec: 45
			}
		}
	]);

	testFormat("full", [
		{
			txt: "1 year, 2 days, 7 hours, 12 minutes and 45 seconds",
			ob: {
				year: 1,
				day: 2,
				hour: 7,
				min: 12,
				sec: 45
			}
		}
	]);

	testFormat("iso", [
		{
			txt: "P1Y3M12DT13H42M12S",
			ob: {
				year: 1,
				month: 3,
				day: 12,
				hour: 13,
				min: 42,
				sec: 12
			}
		}
	]);
});
