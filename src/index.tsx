import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElem = document.getElementById('climate-call')
if (!rootElem) throw new Error("Error: Can't find element with id 'climate-call'")

const lang = rootElem.getAttribute('lang') || 'sv'
const devMode = rootElem.getAttribute('devmode') ? true : false

ReactDOM.render(
  <React.StrictMode>
    <App language={lang} devMode={devMode} />
  </React.StrictMode>,
  document.getElementById('climate-call')
);
