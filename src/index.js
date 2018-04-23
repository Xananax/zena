import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import typography from './utils/typography'
//import { TypographyStyle, GoogleFont } from 'react-typography'

//typography.toString()
typography.injectStyles()


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
