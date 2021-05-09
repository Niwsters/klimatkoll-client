import { Card, transpose } from './card'
import { ANIMATION_DURATION_MS } from './constants'

describe('Card', () => {
  describe('constructor', () => {
    it('sets isSpace to true if name is space', () => {
      const card = new Card(3, "space", "emissions-line")
      expect(card.isSpace).toEqual(true)
    })
  })
  
  describe('getRectangle()', () => {
    it('calculates rectangle coordinates based on card scale', () => {
      const card =  new Card(3, "blargh", "hand")
      let expected = [
        [-61.18750000000001, -90.2],
        [61.18750000000001, 90.2]
      ]

      expect(Card.getRectangle(card)).toEqual(expected)

      card.scale = 1.5*Card.DEFAULT_SCALE
      expected = expected.map(a => [a[0]*1.5, a[1]*1.5])

      expect(Card.getRectangle(card)).toEqual(expected)
    })
  })

  describe('transpose()', () => {
    it('transposes card attributes over time', () => {
      const card =  new Card(3, "blargh", "hand")
      card.position = [1, 1]
      card.rotation = 15
      card.addedRotation = 5
      card.scale = 1.0

      const goal = {
        position: [2, 2],
        rotation: 30,
        addedRotation: 10,
        scale: 2.1
      }

      let transposed = Card.transpose(card, goal, 0)
      expect(transposed).toEqual(card)

      let timePassed = ANIMATION_DURATION_MS/2
      transposed = Card.transpose(card, goal, timePassed)

      let expected = {
        ...card,
        position: [
          transpose(card.position[0], 2, timePassed),
          transpose(card.position[1], 2, timePassed)
        ],
        rotation: transpose(card.rotation, 30, timePassed),
        addedRotation: transpose(card.addedRotation, 10, timePassed),
        scale: transpose(card.scale, 2.1, timePassed)
      }
      expect(transposed).toEqual(expected)
    })
  })
})

describe('transpose()', () => {
  it('transposes number', () => {
    expect(transpose(1, 3, ANIMATION_DURATION_MS/2)).toEqual(2.5)
  })
})
