import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppState } from '../../app'
import { AppConfig } from '../../app-config'
import { GameState } from '../../game/gamestate'
import { EventToAdd } from '../../event/event'
import { Menu } from './Menu/Menu'
import { StatusBar } from './StatusBar'

interface Props {
  config: AppConfig
  state$: BehaviorSubject<AppState>
  gamestate$: BehaviorSubject<GameState>
  appWidth$: BehaviorSubject<number>
  addEvent: (e: EventToAdd) => void
}

interface State {
  appstate: AppState,
  gamestate: GameState,
  width: number
}

export class UIComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      appstate: props.state$.value,
      gamestate: props.gamestate$.value,
      width: 0
    }
  }

  componentDidMount() {
    this.props.state$.subscribe(appstate => {
      this.setState({ appstate: appstate })
    })

    this.props.gamestate$.subscribe(gamestate => {
      this.setState({ gamestate: gamestate })
    })

    this.props.appWidth$.subscribe(width => this.setState({ width }))
  }

  render() {
    const props = this.props
    const config = props.config
    const addEvent = props.addEvent
    const state = this.state.appstate
    const gamestate = this.state.gamestate
    const width = this.state.width

    if (!state)
      return "";

    let page: any = ""
    let statusBar: any = ""
    switch(state.currentPage) {
      case "menu": {
        page = <Menu
          config={config}
          addEvent={addEvent}
          width={width}
          />;
        break;
      }
      case "game":
        page = <StatusBar
          gamestate={gamestate}
          config={config}
          addEvent={addEvent}
          appWidth={width}
          />
        break;
    }

    const style = {
      "height": 0.5625 * width
    }

    return (
      <div style={style}>
        { page }
      </div>
    );
  }
}
