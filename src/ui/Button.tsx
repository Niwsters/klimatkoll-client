import React from 'react'

function Button(label: string, onClick: () => void, backgroundColor: string) {
  const style: any = {
    "background-color": backgroundColor,
    'display': 'block',
    'margin': '0 auto',
    'border': 'none',
    'border-radius': 0,
    'padding': '0.52vw 1.04vw',
    'width': '27.1vw',
    'box-sizing': 'border-box',
    'margin-top': '1.04vw',
    'font-family': "'Poppins', sans-serif",
    'font-size': '2.1vw',
  }

  return <button onClick={onClick} style={style}>{label}</button>
}

export function PinkButton(label: string, onClick: () => void) {
  return Button(label, onClick, "#f4ccc5")
}

export function YellowButton(label: string, onClick: () => void) {
  return Button(label, onClick, "#fdd76b")
}
