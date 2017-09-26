var system = require('system');
var fs = require('fs');
var page = require('webpage').create();
var scriptName = basename(system.args[0], true);
var render = true;
var renderDir = 'render';
var runInLoop = true;

phantom.onError = function (msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit(1);
};

function initPage(page) {
    //console.log('configuring page and default methods.');
    //console.log('offlineStoragePath is: ' + page.offlineStoragePath);

    page.clearCookies();

    page.onConsoleMessage = function (msg) {
        //console.log('CONSOLE: ' + msg);
    };

    page.onAlert = function (msg) {
        console.log('ALERT: ' + msg);
    };

    page.onConfirm = function (msg) {
        console.log('CONFIRM: ' + msg);
        return true;
    };

    page.onResourceReceived = function (response) {
        //log("onResourceRecieved: " + response.url);
        testCommon.resourceReceivedCount++;
        testCommon.resourceReceived.push(response.url);
    };

    page.onResourceError = function (response) {
        //log("onResourceError: " + JSON.stringify(response));
        testCommon.resourceError.push(response.url);
    };

    page.onLoadFinished = function (status) {
        testCommon.loadFinished = true;
    };

    page.viewportSize = { width: 1920, height: 1080 };

    page.onError = function (msg, trace) {
        //console.log('Page onerror:' + msg);
        trace.forEach(function (item) {
            //console.log('  ', item.file, ':', item.line);
        });
        phantom.exit(-1);
    };

    page.settings.userAgent = "Chrome/58.0.3029.110";
}

// better to use path.basename, but path module is not available
function basename(path, removeExtension) {
    var basename = path.split(/[\\/]/).pop();
    if (removeExtension) {
        basename = new String(basename).substring(0, basename.lastIndexOf('.'));
    }
    return basename;
}

var logError = function (message) {
    console.log(formatLogMessage('ERROR ' + message));
}

var log = function (message) {
    console.log(formatLogMessage(message));
};

var formatLogMessage = function (message) {
    var fromStart = (new Date() - testCommon.startTime) / 100;
    fromStart = Math.round(fromStart);
    fromStart = fromStart / 10;
    var fromStartStr = fromStart.toString();
    var i = 5;
    while (true) {
        if (fromStartStr.length < i) {
            fromStartStr = ' ' + fromStartStr;
        } else {
            break;
        }
    }
    //return fromStartStr + 's ' + message;
    return message;
}

var closePhantom = function (exitCode) {
    var t = Date.now() - testCommon.startTime;
    var url = page.url;
    
    if (exitCode) {
        phantom.exit(exitCode);
    } else {
        phantom.exit(0);
    }
};

var assertEquals = function (expectedValue, currentValue, msg) {
    if (currentValue !== expectedValue) {
        var m = 'Current value ' + currentValue + ' is different from expected value ' + expectedValue + '.';
        if (msg) {
            logError(m + ' ' + msg);
        } else {
            logError(m);
        }

        closePhantom(-1);
    }
};

var assertNotNull = function (value, msg) {
    if (value === undefined || value === null) {
        var m = 'Current value is not defined.';
        if (msg) {
            logError(m + ' ' + msg);
        } else {
            logError(m);
        }

        closePhantom(-1);
    }
};

var unfitData = {};
(function () {

    unfitData.currentUserName = '';

    unfitData.getNewUserName = function () {
        unfitData.currentUserName = 'phantom.user' + Date.now() + "@domain.com";
        return unfitData.currentUserName;
    };

})();

var testCommon = {};
(function () {

    testCommon.getHashUrl = function (page) {
        var currentUrl = page.evaluate(function () {
            return location.hash;
        });
        return decodeURIComponent(currentUrl);
    };

    testCommon.startTime = Date.now();

    testCommon.fireEvent = function (ElementId, EventName) {
        if (document.getElementById(ElementId) != null) {
            if (document.getElementById(ElementId).fireEvent) {
                document.getElementById(ElementId).fireEvent('on' + EventName);
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent(EventName, true, false);
                document.getElementById(ElementId).dispatchEvent(evObj);
            }
        }
    };

    testCommon.currentStep = -1;

    testCommon.repeatCurrentStep = false;

    testCommon.currentStepStartTime = 0;

    // max time is 60 seconds for one step
    testCommon.defaultMaxTimToExecutionStep = 60000;

    testCommon.createNextTask = function (steps, delay) {
        if (!testCommon.repeatCurrentStep) {
            testCommon.currentStep++;
            testCommon.currentStepStartTime = new Date();
        } else {
            var t = new Date();
            var maxTime = testCommon.defaultMaxTimToExecutionStep;
            if (steps[testCommon.currentStep].maxTimeToExecutionStep) {
                maxTime = steps[testCommon.currentStep].maxTimeToExecutionStep;
            }

            var url = page.url;
            
            if ((t - testCommon.currentStepStartTime) > maxTime) {
                closePhantom(-1);
                return;
            }
        }

        setTimeout(function () {
            var url = page.url;
            var msg = 'step-number= ' + testCommon.currentStep + '; ';

            if (steps[testCommon.currentStep].description) {
                msg += 'step-name= ' + steps[testCommon.currentStep].description + '; ';
            }
            //log(msg);

            if (render) {
                page.render(renderDir + '/' + scriptName + '_step' + testCommon.currentStep + '-begin.png');
            }

            steps[testCommon.currentStep].fn();

            if (render) {
                page.render(renderDir + '/' + scriptName + '_step' + testCommon.currentStep + '-end.png');
            }

            if (runInLoop && (testCommon.currentStep + 2 == steps.length)) {
                testCommon.currentStep = 0;
            }

            if (testCommon.currentStep + 1 < steps.length) {
                testCommon.createNextTask(steps, steps[testCommon.currentStep].delay);
            }
        }, delay);
    };

    testCommon.startTest = function (steps) {
        testCommon.createNextTask(steps, 0);
    };

    testCommon.waitForCondition = function (testFx) {
        if (testCommon.startTaskTime == null) {
            testCommon.startTaskTime = new Date();
        }

        condition = (typeof (testFx) === "string" ? eval(testFx) : testFx());

        if (condition) {
            var t = new Date();
            var url = page.url;
            testCommon.startTaskTime = null;
            testCommon.repeatCurrentStep = false;
        } else {
            testCommon.repeatCurrentStep = true;
        }
    }

    testCommon.waitForLoadingResource = function (resource) {
        if (testCommon.startTaskTime == null) {
            testCommon.startTaskTime = new Date();
        }

        if (testCommon.checkResourceError(resource)) {
            logError("Reading resource file " + resource + " failed.");
            closePhantom(-1);
        }

        // check if service was loaded that means we can continue
        if (testCommon.checkResourceLoaded(resource)) {
            var t = new Date();
            log('Loading page took ' + (t - testCommon.startTaskTime) + 'ms');
            testCommon.startTaskTime = null;
            testCommon.repeatCurrentStep = false;
        } else {
            testCommon.repeatCurrentStep = true;
        }
    };

    testCommon.startTaskTime = null;
    testCommon.resourceReceivedCount = 0;
    testCommon.resourceReceived = [];
    testCommon.resourceError = [];
    testCommon.loadFinished = false;

    testCommon.clearResourceLogs = function () {
        testCommon.resourceError = [];
        testCommon.resourceReceived = [];
        testCommon.resourceReceivedCount = 0;
    };

    testCommon.checkResourceLoaded = function (str) {
        for (var i = 0; i < testCommon.resourceReceived.length; i++) {
            if (testCommon.resourceReceived[i].indexOf(str) > -1) {
                return true;
            }
        }
        return false;
    };

    testCommon.checkResourceError = function (str) {

        for (var i = 0; i < testCommon.resourceError.length; i++) {
            if (testCommon.resourceError[i].indexOf(str) > -1) {
                return true;
            }
        }
        return false;
    }

    testCommon.loadPageByRepetition = function () {
        if (testCommon.startTaskTime == null) {
            testCommon.startTaskTime = new Date();
        }

        if (testCommon.loadFinished) {
            var t = new Date();
            log('Loading page took ' + (t - testCommon.startTaskTime) + 'ms');
            testCommon.startTaskTime = null;
            testCommon.repeatCurrentStep = false;
            testCommon.loadFinished = false;
        } else {
            testCommon.repeatCurrentStep = true;
        }

    };

})();

initPage(page);

var steps = [
    {
        'fn': function () {
            var pageUrl = "http://localhost:4200/";
            
            page.open(pageUrl, function (status) {
            });
        },
        'delay': 100,
        'description': 'Opening home page'
    },
    {
        'fn': function () {
            testCommon.waitForCondition(function () {
                return page.evaluate(function () {
                    var loginButton = document.getElementById("seemoreBtn");
                    return loginButton != null;
                });
            });
        },
        'delay': 100,
        'description': 'Home page loaded',
        'maxTimeToExecutionStep': 30000
    },
    {
        'fn': function () {
                        
            page.evaluate(function () {
                
                function fireEvent(element, EventName) {
                    if (element.fireEvent) {
                        element.fireEvent('on' + EventName);
                    }
                    else {
                        var evObj = document.createEvent('Events');
                        evObj.initEvent(EventName, true, false);
                        element.dispatchEvent(evObj);
                    }
                };

                var loginLink = document.getElementById("menuBtn")
                fireEvent(loginLink, 'click');
            });
        },
        'delay': 100,
        'description': 'Clicking menu link',
    },
    {
        'fn': function () {
            testCommon.waitForCondition(function () {
                return page.evaluate(function () {
                    var loginButton = document.getElementById("signupBtn");
                    return loginButton != null;
                });
            });
        },
        'delay': 100,
        'description': 'Unfit menu page loaded',
        'maxTimeToExecutionStep': 30000
    },
    {
        'fn': function () {
                    
            page.evaluate(function () {

                function fireEvent(element, EventName) {
                    if (element.fireEvent) {
                        element.fireEvent('on' + EventName);
                    }
                    else {
                        var evObj = document.createEvent('Events');
                        evObj.initEvent(EventName, true, false);
                        element.dispatchEvent(evObj);
                    }
                };

                fireEvent(document.getElementById('signupBtn'), 'click');
            });
        },
        'delay': 100,
        'description': 'Clicking signup link',
    },
    {
        'fn': function () {
            testCommon.waitForCondition(function () {
                return page.evaluate(function () {
                    var addButton = document.getElementById('signupBtn2');
                    return addButton != null;
                });
            });
        },
        'delay': 100,
        'description': 'Sign up page loaded',
        'maxTimeToExecutionStep': 30000
    },
    {
        'fn': function () {
                        
            page.evaluate(function () {
                
                function fireEvent(element, EventName) {
                    if (element.fireEvent) {
                        element.fireEvent('on' + EventName);
                    }
                    else {
                        var evObj = document.createEvent('Events');
                        evObj.initEvent(EventName, true, false);
                        element.dispatchEvent(evObj);
                    }
                };

                var loginLink = document.getElementById("menuBtn")
                fireEvent(loginLink, 'click');
            });
        },
        'delay': 100,
        'description': 'Clicking Login link',
    },
    {
        'fn': function () {
            testCommon.waitForCondition(function () {
                return page.evaluate(function () {
                    var loginButton = document.getElementById("loginBtn");
                    return loginButton != null;
                });
            });
        },
        'delay': 100,
        'description': 'Login page loaded',
        'maxTimeToExecutionStep': 30000
    },
    {
        'fn': function () {
                    
            page.evaluate(function () {

                function fireEvent(element, EventName) {
                    if (element.fireEvent) {
                        element.fireEvent('on' + EventName);
                    }
                    else {
                        var evObj = document.createEvent('Events');
                        evObj.initEvent(EventName, true, false);
                        element.dispatchEvent(evObj);
                    }
                };

                fireEvent(document.getElementById('loginBtn'), 'click');
            });
        },
        'delay': 100,
        'description': 'Clicking login menu link',
    },
    {
        'fn': function () {
            testCommon.waitForCondition(function () {
                return page.evaluate(function () {
                    var addButton = document.getElementById('loginBtn2');
                    return addButton != null;
                });
            });
        },
        'delay': 100,
        'description': 'Login page loaded',
        'maxTimeToExecutionStep': 30000
    },
    {
        'fn': function () {
            closePhantom(0);
        },
        'delay': 0,
        'description': 'Script End. Exiting phantomjs.'
    }
];

// start test
testCommon.startTest(steps);