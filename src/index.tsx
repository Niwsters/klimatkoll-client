import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppComponent, AppConfig } from './App';
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
    const config = new AppConfig(devMode, lang, text);

    ReactDOM.render(
      <React.StrictMode>
        <div id="app">
          <div id="app-inner" style={{ display: "block", height: "100%" }}>
          </div>
          <canvas id="klimatkoll-canvas" />
          <link rel="stylesheet" href={config.httpServerURL + "/styles.css"} />
        </div>
      </React.StrictMode>,
      document.getElementById('climate-call')
    );

    const app = new App(config)

    ReactDOM.render(
      app.render(),
      document.getElementById('app-inner')
    )
  })
