import React from 'react'
import { TextConfig } from '@shared/models'
import { SetRoute } from '../set-route'
import { Button } from '@shared/components'

type Props = {
  text: TextConfig,
  setRoute: SetRoute
}

export function GoBackBtn(props: Props): React.ReactElement {
  const { setRoute } = props

  return <Button
    color="pink"
    label="Tillbaka"
    onClick={() => setRoute("/")}
  />
}
