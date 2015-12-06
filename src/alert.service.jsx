(function () {
    'use strict';

    const TYPES = {
        REGULAR: 'regular',
        ERROR: 'error',
        SUCCESS: 'success'
    };

    const OPTIONS = {};

    let watcher = null;
    let originalAlertMethod = (function (alertMethod) {
        return function () {
            alertMethod(...arguments);
        };
    })(window.alert);

    window.alert = Alert;
    Alert.TYPES = TYPES;
    Alert.OPTIONS = OPTIONS;
    Alert.setOption = setOption;
    Alert.setOptions = setOptions;
    Alert.native = originalAlertMethod;
    Alert._setWatcher = _setWatcher;

    /**
     * Alert service constructor
     * @param {String} message
     * @param {String} [title]
     * @param {String} [type]
     * @constructor
     */
    function Alert (message = '', title = '', type = TYPES.REGULAR)
    {
        if (watcher === null) {
            originalAlertMethod(message);
        }
        else {
            watcher({
                type: type,
                message: message,
                title: title,
                visible: true
            });
        }

        // Return this to enable cascading
        return this;
    }

    function _setWatcher (method)
    {
        watcher = method;
    }

    /**
     * Set options of the alert
     * @param {Object} options
     * @param  {String} [options.successBackground]
     * @param  {String} [options.errorBackground]
     * @param  {String} [options.background]
     */
    function setOptions (options)
    {
        if (typeof options !== 'object' || options === null) {
            throw new Error('Please provide an options Object');
        }

        Object.keys(options).forEach(optionName => setOption(optionName, options[optionName]));
    }


    /**
     * Set a specific option
     * @param {String} optionName
     * @param {String} optionValue
     */
    function setOption (optionName, optionValue)
    {
        if (typeof optionName !== 'string' || typeof optionValue !== 'string') {
            throw new Error('Please provide a valid string as optionName for setOption method');
        }

        OPTIONS[optionName] = optionValue;
    }
})();