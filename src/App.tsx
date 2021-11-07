import React, { Component } from 'react'
import { TextConfig } from './models/text-config'
import { GameSocket } from './socket/game-socket'
import { Event, EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Menu } from './ui/Menu'
import { AppConfig } from './config'

interface Props {
  language: string,
  devMode: boolean,
  text: TextConfig
}

interface State {}

class App extends Component<Props, State> {
  socket!: GameSocket
  eventStream: EventStream
  config: AppConfig

  constructor(props: Props) {
    super(props)
    const devMode = props.devMode
    const language = props.language
    const text = props.text

    this.config = new AppConfig(devMode, language, text)
    this.eventStream = new EventStream()

    this.state = {}
  }

  componentDidMount() {
    const config = this.config
    const eventStream = this.eventStream

    // Hook up socket to the event stream
    // Make sure to do this in componentDidMount instead of constructor to avoid reconnecting due to ReactJS stuff
    this.socket = new GameSocket(config)
    this.socket.events$.subscribe((event: Event) => eventStream.next(event))

    eventStream.subscribe((e: Event) => console.log("Event stream:", e))
  }

  addEvent(event: EventToAdd): void {
    this.eventStream.next(event)
  }

  render() {
    const config = this.config

    return (
      <div id="app">
        <div style={{ display: "block", height: "100%" }}>
          <Menu
            config={config}
            addEvent={this.addEvent.bind(this)} />
        </div>
        <link rel="stylesheet" href={config.httpServerURL + "/styles.css"} />
      </div>
    );
  }
}

export default App;
