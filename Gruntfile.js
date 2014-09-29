module.exports = function (grunt) {
	require('time-grunt')(grunt);

	grunt.initConfig({

		browserify: {
			interspell: {
				options: {
					browserifyOptions: {
						standalone: "Interspell",
						derequire: true
					}
				},
				src: ["lib/interspell.js"],
				dest: "build/interspell.js"
			}
		},

		uglify: {
			interspell: {
				src: "build/interspell.js",
				dest: "build/interspell.min.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("build", ["browserify", "uglify"]);
	grunt.registerTask("default", ["build"]);

};