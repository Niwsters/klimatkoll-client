import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppConfig, AppState } from '../App̈́'
import { GameState } from '../game/gamestate'
import { EventToAdd } from '../event/event'
import { Menu } from './Menu'
import { StatusBar } from './StatusBar'

interface Props {
  config: AppConfig
  state$: BehaviorSubject<AppState>
  gamestate$: BehaviorSubject<GameState>
  addEvent: (e: EventToAdd) => void
}

interface State {
  appstate: AppState,
  gamestate: GameState
}

export class UIComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      appstate: props.state$.value,
      gamestate: props.gamestate$.value
    }
  }

  componentDidMount() {
    this.props.state$.subscribe(appstate => {
      this.setState({ appstate: appstate })
    })

    this.props.gamestate$.subscribe(gamestate => {
      this.setState({ gamestate: gamestate })
    })
  }

  render() {
    const props = this.props
    const config = props.config
    const addEvent = props.addEvent
    const state = this.state.appstate
    const gamestate = this.state.gamestate

    const canvas = document.getElementById('klimatkoll-canvas')
    if (!canvas)
      throw new Error("Can't find canvas with ID: klimatkoll-canvas")

    if (!state)
      return "";

    let page: any = ""
    let statusBar: any = ""
    switch(state.currentPage) {
      case "menu": {
        canvas.style.display = 'none'
        page = <Menu
          config={config}
          addEvent={addEvent} />;
        break;
      }
      case "game":
        page = ''
        canvas.style.display = 'block'
        statusBar = <StatusBar
          gamestate={gamestate}
          config={config}
          addEvent={addEvent} />
        break;
    }

    return (
      <div id="app">
        <div style={{ display: "block", height: "100%" }}>
          { page }
        </div>
        { statusBar }
      </div>
    );
  }
}
