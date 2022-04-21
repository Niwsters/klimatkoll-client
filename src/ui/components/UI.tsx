import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppState } from '../../app'
import { AppConfig } from '../../root/app-config'
import { GameState } from '../../game/gamestate'
import { EventToAdd } from '../../event/event'
import { Menu } from './Menu/Menu'
import { StatusBar } from './StatusBar'
import { TextConfig } from '../../models/text-config'

interface Props {
  config: AppConfig
  text: TextConfig
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

function UIPage(
  currentPage: string,
  config: AppConfig,
  text: TextConfig,
  addEvent: (e: EventToAdd) => void,
  gamestate: GameState,
  width: number
): React.ReactElement {
  switch(currentPage) {
    case "menu": {
      return <Menu
        config={config}
        text={text}
        addEvent={addEvent}
        width={width}
        />;
    }
    case "game":
      return <StatusBar
        gamestate={gamestate}
        text={text}
        addEvent={addEvent}
        appWidth={width}
        />;
    default:
      return <div></div>;
  }
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
    const { config, addEvent, text } = this.props
    const { appstate, gamestate, width } = this.state

    if (!appstate)
      return "";

    const page = UIPage(appstate.currentPage, config, text, addEvent, gamestate, width)

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
