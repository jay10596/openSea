import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/App.scss'

ReactDOM.render(
    <React.StrictMode >
        {/* Can't use Link without BrowserRoute i.e. can't move it in Router.js */}
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    
    document.getElementById('root')
);