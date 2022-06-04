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

function StatusInfo(props: { cardsLeft: number }) {
  const style: Style = {
    "flex-grow": "1"
  }

  return (
    <div style={style}>
      Cards left: { props.cardsLeft }
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
        <StatusInfo cardsLeft={this.state.spState.deck.length}/>
        <Button color="pink" onClick={this.props.leaveGame}>Leave game</Button>
      </Container>
    )
  }
}
