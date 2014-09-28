# Interspell

----

Very simple library to manipulate human-readable time intervals.

Install with:

```bash
npm install interspell
```

Then use like this:

```javascript
	var Interspell = require("interspell");

	// Use as a constructor	
	var i1 = new Interspell("2 hours, 24 minutes");
	
	// Use as a function
	var i2 = new Interspell(i1.value - Interspell.value("16min"));
	
	// Create strings using multiple formats	
	console.log(i2.toString("full")); // "2 hours and 8 minutes"
```

### Features

* Recognize interval from human readable string
* Print interval into string
* Provide raw value in ms
* Multiple formats, including ISO 8601

To see available formats and settings, check out [vars.js](lib/vars.js) file.

### Stability

This should be considered safe to use for the basic demonstrated functionality.

However, there are several missing features that will require some internal refactoring.
I don't expect any interface changes, but no promises.

Until the changes are completed, this library should be considered alpha.

**Use it on your own responsibility!**

----

### Licence

Apache v2. Read it [here](LICENSE).