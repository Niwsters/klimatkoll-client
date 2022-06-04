import { SPState } from "../sp-state"
import { Style } from "./style"
import React from 'react'

type Props = {
  spState: SPState
}

function cardsLeft(spState: SPState): number {
  return spState.deck.length + spState.hand.length
}

function correctCards(spState: SPState): number {
  return spState.emissionsLine.length - 1
}

function isGameOver(spState: SPState): boolean {
  return cardsLeft(spState) === 0
}

function Info(props: Props): React.ReactElement {
  return (
    <div>
      <div>
        Cards left: { cardsLeft(props.spState) }
      </div>
      <br />
      <div>
        Correct placements: { correctCards(props.spState) }
      </div>
    </div>
  )
}

function GameOver(props: Props): React.ReactElement {
  return (
    <div>
      Game over! You placed { correctCards(props.spState) } cards correctly
    </div>
  )
}

function StatusMessage(props: Props): React.ReactElement {
  switch (isGameOver(props.spState)) {
    case true:
      return <GameOver spState={props.spState} />
    case false:
      return <Info spState={props.spState} />
  }
}

export function StatusInfo(props: Props): React.ReactElement {
  const style: Style = {
    "flex-grow": "1",
    "padding": "1em"
  }

  return (
    <div style={style}>
      <StatusMessage spState={props.spState} />
    </div>
  )
}
