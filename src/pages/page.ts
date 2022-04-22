import React from 'react'
import { Card } from '../game/card'

export interface Page {
  readonly component: React.ReactElement
  readonly cards: Card[]
}
