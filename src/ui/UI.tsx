import React from 'react'
import { UIComponent } from './components/UI'
import ReactDOM from 'react-dom'
import { Stream } from '../stream'
import { Page } from '../router'

export class UI {
  constructor(
    uiElem: HTMLElement,
    page$: Stream<Page>
  ) {
    ReactDOM.render(
      <UIComponent 
        page$={page$}
        />,
      uiElem
    )
  }
}
