import React from 'react';
import ReactDOM from 'react-dom';
import Modernizr from './modernizr';
import Select from './components/select/index.jsx';

const data = JSON.parse(document.getElementById('data').textContent);

function App() {
  return <Select data={data} />;
}

const reactApp = <App />;

ReactDOM.render(reactApp, document.getElementById('react-app'));
