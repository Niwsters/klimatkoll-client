import React from "react";
import { Button } from '@shared/components'

function Container(props: any): React.ReactElement {
  const style = {
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

type Props = {
  leaveGame: () => void
}

export function SPUI(props: Props): React.ReactElement {
  return (
    <Container>
      <div>:D</div>
      <Button color="pink" onClick={props.leaveGame}>Leave game</Button>
    </Container>
  )
}
