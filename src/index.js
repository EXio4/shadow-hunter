import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style.css'

ReactDOM.render(<React.Fragment>
    <App />
    <div className="version">
        {"shadowhunter-v0.1-dev"}
    </div>
    </React.Fragment>, document.getElementById('root'));
registerServiceWorker();
