import React from 'react'
import { AddEventFunc, TextConfig } from '@shared/models'
import { Stream } from '../../../stream'
import { Resolution } from '../../../root'
import { Logo } from './Logo'
import { Router } from './Router'
import { MenuServices } from './menu-services'
import { EventToAdd } from '@shared/events'
import { Inbox } from 'inbox'

interface Props {
  httpServerURL: string
  text: TextConfig
  resolution$: Stream<Resolution>
  mpServer: Inbox<EventToAdd>
  addEvent: AddEventFunc
}

interface State {
  resolution: Resolution
}

export class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      resolution: { width: 0, height: 0 }
    }
  }

  componentDidMount() {
    this.props.resolution$.subscribe(resolution => this.setState({ resolution }))
  }

  render() {
    const { text, httpServerURL, mpServer, addEvent } = this.props
    const { resolution } = this.state
    const { width, height } = resolution

    const services: MenuServices = {
      appWidth: width,
      httpServerURL,
      text,
      mpServer,
      addEvent
    }

    const style = {
      'background': '#181543',
      'width': width + 'px',
      'height': height + 'px',
      'padding-top': 0.104 * width + 'px',
      'box-sizing': 'border-box',
    }

    return (
      <div style={style}>
        <Logo
          httpServerURL={httpServerURL}
          text={text}
          appWidth={width}
        />
        <Router services={services} />
      </div>
    )
  }
}
