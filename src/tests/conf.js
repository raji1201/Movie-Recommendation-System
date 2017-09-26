exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		'browserName': 'chrome', // or 'safari'
		 "count": 1
	},
  specs: ['SeleniumTest.js']
};