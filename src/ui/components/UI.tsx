import React from 'react'
import { Page } from '../../router'
import { Stream } from '../../stream'

interface Props {
  page$: Stream<Page>
}

interface State {
  page: React.ReactElement
}

export class UIComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      page: <div></div>
    }
  }

  componentDidMount() {
    this.props.page$.subscribe(page => this.setState({ page: page.component }))
  }

  render() {
    return this.state.page
  }
}
