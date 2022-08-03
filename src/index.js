import React from 'react';
import ReactDOM from 'react-dom/client';
import 'macro-css';
import './index.scss';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='*' element={<App />} />
            </Routes>
        </Router>
    </React.StrictMode>
);


