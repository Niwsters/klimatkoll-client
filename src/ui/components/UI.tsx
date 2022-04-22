import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppState } from '../../app'
import { GameState } from '../../game/gamestate'
import { EventToAdd } from '../../event/event'
import { TextConfig } from '../../models/text-config'
import { Stream } from '../../stream'
import { Resolution } from '../../root'
import { UIPage } from './UIPage'
import { Environment } from '../../root/environment'

interface Props {
  environment: Environment
  text: TextConfig
  state$: BehaviorSubject<AppState>
  gamestate$: BehaviorSubject<GameState>
  resolution$: Stream<Resolution>
  addEvent: (e: EventToAdd) => void
  router$: Stream<React.ReactElement>
}

interface State {
  appstate: AppState,
  gamestate: GameState,
  width: number
  page: React.ReactElement
}

export class UIComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      appstate: props.state$.value,
      gamestate: props.gamestate$.value,
      width: 0,
      page: <div></div>
    }
  }

  componentDidMount() {
    this.props.state$.subscribe(appstate => {
      this.setState({ appstate: appstate })
    })

    this.props.gamestate$.subscribe(gamestate => {
      this.setState({ gamestate: gamestate })
    })

    this.props.resolution$.subscribe(
      resolution => this.setState({ width: resolution.width })
    )

    this.props.router$.subscribe(page => this.setState({ page }))
  }

  render() {
    //return this.state.page
    const { addEvent, text, environment } = this.props
    const { appstate, gamestate, width } = this.state

    if (!appstate)
      return "";

    const page = UIPage(
      appstate.currentPage,
      environment.httpServerURL,
      text,
      addEvent,
      gamestate,
      width
    )

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
