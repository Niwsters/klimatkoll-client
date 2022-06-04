import React from "react";
import { Button } from '@shared/components'
import { SPState } from "../sp-state";

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

type Style = {[key: string]: string}

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

function StatusInfo(props: { cardsLeft: number, correctCards: number }) {
  const style: Style = {
    "flex-grow": "1",
    "padding": "1em"
  }

  return (
    <div style={style}>
      <div>
        Cards left: { props.cardsLeft }
      </div>
      <br />
      <div>
        Correct placements: { props.correctCards }
      </div>
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
          cardsLeft={this.state.spState.deck.length}
          correctCards={this.state.spState.emissionsLine.length - 1}
        />
        <Button color="pink" onClick={this.props.leaveGame}>Leave game</Button>
      </Container>
    )
  }
}
