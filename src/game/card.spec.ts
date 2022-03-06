import { Card, transpose } from './card'
import { ANIMATION_DURATION_MS } from './constants'

describe('Card', () => {
  let card: Card
  const currentTime = 1337
  beforeEach(() => {
    card = new Card(3, "blargh", "hand")
  })

  describe('constructor', () => {
    it('sets isSpace to true if name is space', () => {
      const card = new Card(3, "space", "emissions-line")
      expect(card.isSpace).toEqual(true)
    })
  })
  
  describe('getRectangle()', () => {
    it('calculates rectangle coordinates based on card scale', () => {
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

  describe("move()", () => {
    const [x, y] = [2, 3]
    const goal = {
      timestamp: currentTime,
      position: [x, y] 
    }

    beforeEach(() => {
      card = Card.move(card, x, y, currentTime)
    })

    it("adds transposition goal with position", () => {
      expect(card).toEqual({
        ...card,
        positionGoal: goal
      })
    })

    it("doesn't add goal if goal already exists", () => {
      card = Card.move(card, x, y, currentTime)
      expect(card).toEqual({
        ...card,
        positionGoal: goal
      })
    })
  })

  describe("rotateGlobal()", () => {
    const rotation = 100
    const goal = {
      timestamp: 1337,
      rotation: rotation 
    }

    beforeEach(() => {
      card = Card.rotateGlobal(card, rotation, currentTime)
    })

    it("adds transition goal with rotation", () => {
      expect(card).toEqual({
        ...card,
        rotationGoal: goal,
      })
    })

    it("doesn't add goal if goal already exists", () => {
      card = Card.rotateGlobal(card, rotation, currentTime)
      expect(card).toEqual({
        ...card,
        rotationGoal: goal,
      })
    })
  })

  describe("rotateLocal()", () => {
    const rotation = 100
    const goal = {
      timestamp: currentTime,
      addedRotation: rotation 
    }

    beforeEach(() => {
      card = Card.rotateLocal(card, rotation, currentTime)
    })

    it("adds transition goal with addedRotation", () => {
      expect(card).toEqual({
        ...card,
        addedRotationGoal: goal,
      })
    })

    it("doesn't add goal if goal already exists", () => {
      card = Card.rotateLocal(card, rotation, currentTime)
      expect(card).toEqual({
        ...card,
        addedRotationGoal: goal,
      })
    })
  })

  describe("scale()", () => {
    const scale = 0.5
    const currentTime = 1337
    const goal = {
      timestamp: 1337,
      scale: scale
    }

    beforeEach(() => {
      card = Card.scale(card, scale, currentTime)
    })

    it("adds transition goal with scale", () => {
      expect(card).toEqual({
        ...card,
        scaleGoal: goal
      })
    })

    it("doesn't add transition goal if goal already exists", () => {
      card = Card.scale(card, scale, currentTime)
      expect(card).toEqual({
        ...card,
        scaleGoal: goal
      })
    })
  })

  describe('update()', () => {
    let card: Card
    beforeEach(() => {
      card = new Card(3, "blargh", "hand")
    })

    it('moves card', () => {
      card.position = [0, 0]
      card = Card.move(card, 1337, 1337, 0)
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.position).toEqual([1337, 1337])
    })

    it('rotates card', () => {
      card.rotation = 0
      card = Card.rotateGlobal(card, 1337, 0)
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.rotation).toEqual(1337)
    })

    it('rotates card locally', () => {
      card.addedRotation = 0
      card = Card.rotateLocal(card, 1337, 0)
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.addedRotation).toEqual(1337)
    })

    it('scales card', () => {
      card.scale = 0
      card = Card.scale(card, 1337, 0)
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.scale).toEqual(1337)
    })
  })
})

describe('transpose()', () => {
  it('transposes number', () => {
    expect(transpose(1, 3, ANIMATION_DURATION_MS/2)).toEqual(2.5)
  })
})
