import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import typography from './utils/typography'
//import { TypographyStyle, GoogleFont } from 'react-typography'

//typography.toString()
typography.injectStyles()


ReactDOM.render( <Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
