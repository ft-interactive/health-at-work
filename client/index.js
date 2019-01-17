import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Modernizr from './modernizr';
import App from './components/app';

const data = JSON.parse(document.getElementById('data').textContent);
const reactApp = <App data={data} />;

ReactDOM.render(reactApp, document.getElementById('react-app'));
