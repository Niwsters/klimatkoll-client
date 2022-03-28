import React, { ReactElement } from "react"

function ButtonWrapper(button: ReactElement) {
  const style: any = {
    'margin-top': '1.04vw',
  }

  return <div style={style}>{button}</div>
}

export function ButtonLayout(props: { children: ReactElement[] }) {
  const style: any = {
    'width': '27.1vw',
    'margin': '0 auto',
    'font-family': "'Poppins', sans-serif",
  }

  const children = props.children.map(ButtonWrapper)

  return <div style={style}>
    { children }
  </div>
}
