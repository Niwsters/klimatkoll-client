import React from 'react'

type OnClick = () => void

type Props = {
  label: string,
  onClick: OnClick,
  backgroundColor: string
}

type State = {
  hover: boolean
}

class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hover: false }
  }

  private setHover(hover: boolean) {
    this.setState({ hover })
  }

  private get color(): string {
    const { backgroundColor } = this.props
    const hoverColor = "#cef0ea"
    return this.state.hover ? hoverColor : backgroundColor
  }

  private get style() {
    return {
      "background-color": this.color,
      'width': '100%',
      'display': 'block',
      'border': 'none',
      'border-radius': 0,
      'padding': '0.52% 1.04%',
      'box-sizing': 'border-box',
      'font-family': "'Poppins', sans-serif",
      'font-size': '1em',
    }
  }

  render() {
    const { onClick, label } = this.props
    const hover = () => this.setHover(true)
    const unhover = () => this.setHover(false)
    const style = this.style

    return <button onClick={onClick} style={style} onMouseEnter={hover} onMouseLeave={unhover}>{ label }</button>
  }
}

export function PinkButton(label: string, onClick: () => void) {
  return <Button label={label} onClick={onClick} backgroundColor="#f4ccc5" />
}

export function YellowButton(label: string, onClick: () => void) {
  return <Button label={label} onClick={onClick} backgroundColor="#fdd76b" />
}
