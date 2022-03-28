import React from 'react'

export function TextInput(placeholder: string, onChangeInput: (e: string) => void) {
  function onChange(event: any) {
    onChangeInput(event.target.value)
  }

  const style: any = {
    'display': 'block',
    'border': 'none',
    'border-radius': 0,
    'padding': '0.52vw 1.04vw',
    'width': '27.1vw',
    'box-sizing': 'border-box',
    'margin-top': '1.04vw',
    'font-family': "'Poppins', sans-serif",
    'font-size': '2.1vw',
  }

  return <input type="text" placeholder={placeholder} onChange={onChange} style={style} />
}
