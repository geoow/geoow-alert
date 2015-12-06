# Geoow Alert
The alert reinvented with react.js

## Set up
* Add the dependency to your project and include it to your vendors
```
npm install geoow-alert
```

* Use Google webfonts (optional)
```
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:100,400|Slabo+27px">
```

* Add the <Alert /> component to your main component
```
const Alert = use('Alert');

function render ()
{
    return (    
        <App>
            ...
            <Alert></Alert>
        </App>
    );
}
```

Note: if geoow-dependency-injection is not included replace `use('Alert')` by `GeoowComponents.Alert`

## The alert Service
just use `alert('message');` as you know it

### alert()
* message (optional): The message you want to show
* title (optional): The title of the message
* type (optional): Which type of notification?
    * alert.TYPES.SUCCESS
    * alert.TYPES.ERROR
    * alert.TYPES.REGULAR (default)
    
### alert.setOptions()
Configure different colors etc.
Available options:
* options.successBackground
* options.errorBackground
* options.background

Example:
```
// Reconfigure the background color
// The next regular alert will have a yellow background
alert.setOptions({ background: 'yellow');
```

## alert.setOption(optionName, optionValue)
Configure one option

## alert.native()
This lib overwrites alert, but you still want to trigger a regular old-school alert?
Use alert.native

Example:
```
alert.native('90s style');
```

## License
GPL-3.0