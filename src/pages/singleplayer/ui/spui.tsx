import React from "react";
import { Button } from '@shared/components'
import { SPState } from "../sp-state";
import { StatusInfo } from './status-info'

function Container(props: any): React.ReactElement {
  const style = {
    "display": "flex",
    "flex-direction": "column",
    "background": "#F3EFEC",
    "width": "11.4em",
    "height": "26.75em"
  }

  return (
    <div style={style}>
      { props.children }
    </div>
  )
}

function Instructions() {
  const style = {
    "padding": "1em"
  }

  return (
    <div style={style}>
      Try to play as many cards as you can
    </div>
  )
}

type Props = {
  leaveGame: () => void
  getState: () => SPState
}

type State = {
  spState: SPState
}

export class SPUI extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      spState: props.getState()
    }

    setInterval(() => this.setState({ spState: props.getState() }), 100)
  }

  render() {
    return (
      <Container>
        <Instructions />
        <StatusInfo
          spState={this.state.spState}
        />
        <Button color="pink" onClick={this.props.leaveGame}>Leave game</Button>
      </Container>
    )
  }
}
