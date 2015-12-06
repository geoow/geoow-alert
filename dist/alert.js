'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function () {
    'use strict';

    var TYPES = {
        REGULAR: 'regular',
        ERROR: 'error',
        SUCCESS: 'success'
    };

    var OPTIONS = {};

    var watcher = null;
    var originalAlertMethod = (function (alertMethod) {
        return function () {
            alertMethod.apply(undefined, arguments);
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
    function Alert() {
        var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var type = arguments.length <= 2 || arguments[2] === undefined ? TYPES.REGULAR : arguments[2];

        if (watcher === null) {
            originalAlertMethod(message);
        } else {
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

    function _setWatcher(method) {
        watcher = method;
    }

    /**
     * Set options of the alert
     * @param {Object} options
     * @param  {String} [options.successBackground]
     * @param  {String} [options.errorBackground]
     * @param  {String} [options.background]
     */
    function setOptions(options) {
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || options === null) {
            throw new Error('Please provide an options Object');
        }

        Object.keys(options).forEach(function (optionName) {
            return setOption(optionName, options[optionName]);
        });
    }

    /**
     * Set a specific option
     * @param {String} optionName
     * @param {String} optionValue
     */
    function setOption(optionName, optionValue) {
        if (typeof optionName !== 'string' || typeof optionValue !== 'string') {
            throw new Error('Please provide a valid string as optionName for setOption method');
        }

        OPTIONS[optionName] = optionValue;
    }
})();
'use strict';

if (typeof define !== 'function') {
    var GeoowComponents = GeoowComponents || {};
    var define = function define(depName, dep) {
        return GeoowComponents[depName] = dep();
    };
}

define('Alert', function () {
    'use strict';

    var TIMEOUT = 10 * 1000;

    var BACKGROUND_COLORS = {
        error: 'rgba(206, 6, 30, 0.9)',
        regular: 'rgba(0, 156, 255, 0.9)',
        success: 'rgba(94, 255, 132, 0.9)'
    };

    var style = {
        background: BACKGROUND_COLORS.regular,
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        padding: '25px',
        display: 'none',
        fontFamily: '\'Lato\', serif',
        fontSize: '1rem',
        color: '#fff'
    };
    var h1Style = {
        fontFamily: '\'Slabo 27px\', serif',
        fontSize: '1.8rem',
        color: '#fff'
    };
    var innerStyle = {
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: '0',
        right: '0',
        height: '100px',
        marginTop: '-50px',
        textAlign: 'center'
    };

    var timeout = null;

    return React.createClass({
        displayName: '',
        getInitialState: getInitialState,
        componentDidMount: componentDidMount,
        onClick: hide,
        render: render
    });

    function getInitialState() {
        return {
            style: style,
            innerStyle: innerStyle,
            h1Style: h1Style,

            title: '',
            message: '',
            type: alert.TYPES.regular,
            visible: false
        };
    }

    function componentDidMount() {
        alert._setWatcher(this.setState.bind(this));
    }

    /**
     * Render the alert component
     * @returns {XML}
     */
    function render() {
        if (this.state.visible === true) {
            timeout = setTimeout(hide.bind(this), TIMEOUT);
        }

        setStateStyleOptions(this.state);

        return React.createElement("div", { onClick: this.onClick, style: this.state.style }, React.createElement("div", { style: this.state.innerStyle }, React.createElement("h1", { style: this.state.h1Style }, this.state.title), React.createElement("p", { style: { marginTop: '10px' } }, this.state.message)));
    }

    function setStateStyleOptions(state) {
        setColorOptions();

        state.style.display = getStyleDisplay(state);
        state.style.background = getBackgroundColorForType(state.type);
    }

    function setColorOptions() {
        var options = alert.OPTIONS;

        if (typeof options.successBackground === 'string') {
            BACKGROUND_COLORS.success = options.successBackground;
        }

        if (typeof options.errorBackground === 'string') {
            BACKGROUND_COLORS.error = options.errorBackground;
        }

        if (typeof options.background === 'string') {
            BACKGROUND_COLORS.regular = options.background;
        }
    }

    function getStyleDisplay(state) {
        if (state.visible === true) {
            return 'block';
        } else {
            return 'none';
        }
    }

    /**
     * Get the background color for the alert type
     * @returns {string}
     */
    function getBackgroundColorForType(type) {
        switch (type) {
            case alert.TYPES.ERROR:
                return BACKGROUND_COLORS.error;
            case alert.TYPES.SUCCESS:
                return BACKGROUND_COLORS.success;
        }

        return BACKGROUND_COLORS.regular;
    }

    /**
     * Hide the alert
     */
    function hide() {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        this.setState({
            visible: false
        });
    }
});