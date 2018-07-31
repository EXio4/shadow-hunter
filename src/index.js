import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style.css'
import Renderer from './render/Renderer'
import Tile from './render/Tile'

ReactDOM.render(<React.Fragment>
    <App />
    <div className="version">
        {"shadowhunter-"}{VERSION}
    </div>
    </React.Fragment>, document.getElementById('root'));
registerServiceWorker();
