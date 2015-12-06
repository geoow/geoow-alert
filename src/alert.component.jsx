if (typeof define !== 'function') {
    var GeoowComponents = GeoowComponents || {};
    var define = (depName, dep) => GeoowComponents[depName] = dep();
}

define('Alert', function () {
    'use strict';

    const TIMEOUT = 10 * 1000;

    const BACKGROUND_COLORS = {
        error: 'rgba(206, 6, 30, 0.9)',
        regular: 'rgba(0, 156, 255, 0.9)',
        success: 'rgba(94, 255, 132, 0.9)'
    };

    const style = {
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
    const h1Style = {
        fontFamily: '\'Slabo 27px\', serif',
        fontSize: '1.8rem',
        color: '#fff'
    };
    const innerStyle = {
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: '0',
        right: '0',
        height: '100px',
        marginTop: '-50px',
        textAlign: 'center'
    };

    let timeout = null;

    return React.createClass({
        displayName         : '',
        getInitialState     : getInitialState,
        componentDidMount   : componentDidMount,
        onClick             : hide,
        render              : render
    });

    function getInitialState ()
    {
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

    function componentDidMount ()
    {
        alert._setWatcher(this.setState.bind(this));
    }

    /**
     * Render the alert component
     * @returns {XML}
     */
    function render ()
    {
        if (this.state.visible === true) {
            timeout = setTimeout(hide.bind(this), TIMEOUT);
        }

        setStateStyleOptions(this.state);

        return (
            <div onClick={this.onClick} style={this.state.style}>
                <div style={this.state.innerStyle}>
                    <h1 style={this.state.h1Style}>{this.state.title}</h1>
                    <p style={{ marginTop: '10px' }}>{this.state.message}</p>
                </div>
            </div>
        );
    }

    function setStateStyleOptions (state)
    {
        setColorOptions();

        state.style.display = getStyleDisplay(state);
        state.style.background = getBackgroundColorForType(state.type);
    }

    function setColorOptions ()
    {
        let options = alert.OPTIONS;

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

    function getStyleDisplay (state)
    {
        if (state.visible === true) {
            return 'block';
        }
        else {
            return 'none';
        }
    }

    /**
     * Get the background color for the alert type
     * @returns {string}
     */
    function getBackgroundColorForType (type)
    {
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
    function hide ()
    {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        this.setState({
            visible: false
        });
    }
});