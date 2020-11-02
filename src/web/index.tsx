import React from 'react';
import ReactDOM from 'react-dom';
import App from '@pages/App';
import { BrowserRouter } from 'react-router-dom';

const main = document.getElementById('main');
const renderMethod = main.innerHTML ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(<BrowserRouter><App /></BrowserRouter>, document.getElementById('main'));
