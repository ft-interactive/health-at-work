import React from 'react';
import ReactDOM from 'react-dom';
import Select from './components/select/index.jsx';

function App() {
  return <Select />;
}

const reactApp = <App />;

ReactDOM.render(reactApp, document.getElementById('react-app'));
