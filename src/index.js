import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
