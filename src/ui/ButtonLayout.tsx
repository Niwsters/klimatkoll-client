import React, { ReactElement } from "react"

function ButtonWrapper(button: ReactElement, appWidth: number) {
  const style: any = {
    'margin-top': 0.0104*appWidth,
  }

  return <div style={style}>{button}</div>
}

export function ButtonLayout(props: { children: ReactElement[], appWidth: number }) {
  const { appWidth } = props

  const style: any = {
    'width': 0.271 * appWidth,
    'margin': '0 auto',
    'font-family': "'Poppins', sans-serif",
  }

  const children = props.children.map(elem => ButtonWrapper(elem, appWidth))

  return <div style={style}>
    { children }
  </div>
}
