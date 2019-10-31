import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import WebFont from 'webfontloader';
import App from './js/components/App';

// Load fonts
WebFont.load({
    google: {
        families: ['Merriweather Sans:400,400i,700,800', 'Merriweather:400,400i,700'],
    },
});

ReactDOM.render(<App />, document.getElementById('root'));
