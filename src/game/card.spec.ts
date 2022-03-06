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

  describe('transpose()', () => {
    it('adds transposition goal to card', () => {
      const goal = {
        position: [2, 2],
        rotation: 30,
        addedRotation: 10,
        scale: 2.1,
        timestamp: 1337
      }

      let transposed = Card.transpose(card, goal)
      expect(transposed).toEqual({
        ...card,
        transpositions: [goal]
      })
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
        transpositions: [goal]
      })
    })

    it("doesn't add goal if goal already exists", () => {
      card = Card.move(card, x, y, currentTime)
      expect(card).toEqual({
        ...card,
        transpositions: [goal]
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
        transpositions: [goal]
      })
    })

    it("doesn't add goal if goal already exists", () => {
      card = Card.rotateGlobal(card, rotation, currentTime)
      expect(card).toEqual({
        ...card,
        transpositions: [goal]
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
        transpositions: [goal]
      })
    })

    it("doesn't add goal if goal already exists", () => {
      card = Card.rotateLocal(card, rotation, currentTime)
      expect(card).toEqual({
        ...card,
        transpositions: [goal]
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

    it('applies transposition position on card', () => {
      card.position = [0, 0]
      card = Card.transpose(card, {
        position: [1337, 1337],
        timestamp: 0
      })
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.position).toEqual([1337, 1337])
    })

    it('applies transposition rotation on card', () => {
      card.rotation = 0
      card = Card.transpose(card, {
        rotation: 1337,
        timestamp: 0
      })
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.rotation).toEqual(1337)
    })

    it('applies transposition addedRotation on card', () => {
      card.addedRotation = 0
      card = Card.transpose(card, {
        addedRotation: 1337,
        timestamp: 0
      })
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.addedRotation).toEqual(1337)
    })

    it('applies transposition scale on card', () => {
      card.scale = 0
      card = Card.scale(card, 1337, 0)
      card = Card.update(card, ANIMATION_DURATION_MS)
      expect(card.scale).toEqual(1337)
    })

    it('removes transpositions that are finished', () => {
      card = Card.transpose(card, {
        scale: 1337,
        timestamp: ANIMATION_DURATION_MS
      })
      card = Card.update(card, ANIMATION_DURATION_MS*2.1)
      expect(card.transpositions).toEqual([])
    })
  })
})

describe('transpose()', () => {
  it('transposes number', () => {
    expect(transpose(1, 3, ANIMATION_DURATION_MS/2)).toEqual(2.5)
  })
})
