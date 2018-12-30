import React from 'react';
import ReactDOM from 'react-dom';
import Modernizr from './modernizr';
import App from './components/app/index.jsx';

const data = JSON.parse(document.getElementById('data').textContent);
const reactApp = <App data={data} />;

ReactDOM.render(reactApp, document.getElementById('react-app'));
