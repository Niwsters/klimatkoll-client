import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TextConfig } from './models/text-config'

const rootElem = document.getElementById('climate-call')
if (!rootElem) throw new Error("Can't find element with id 'climate-call'")

const lang = rootElem.getAttribute('lang') || 'sv'
const devModeAttr = rootElem.getAttribute('devmode')
const devMode =
  devModeAttr !== undefined &&
  devModeAttr !== null ? true : false

const url = devMode ? "http://localhost:3000" : "https://spela.kortspeletklimatkoll.se"

fetch(`${url}/${lang}/text.json`)
  .then(response => response.json())
  .then((text: TextConfig) => {
    ReactDOM.render(
      <React.StrictMode>
        <App language={lang} devMode={devMode} text={text} />
      </React.StrictMode>,
      document.getElementById('climate-call')
    );
  })
