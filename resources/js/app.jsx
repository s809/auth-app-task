
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from "./app/App";

// Select the root element from the DOM
const rootElement = document.getElementById('root');

// Create a React root
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
