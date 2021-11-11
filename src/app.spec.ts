import { Factory } from './test-factory'
import { AppState } from './AppState'
import { Event } from './event/event'

describe('AppState', () => {
  let app: AppState
  beforeEach(() => {
    app = Factory.AppState.create()
  })

  describe('constructor', () => {
    it('sets currentPage to menu', () => {
      expect(app.currentPage).toEqual('menu')
    })
  })

  describe('new', () => {
    it('returns new copy of itself', () => {
      expect(app.new()).toEqual(app)
      expect(app.room_joined).toBeDefined()
    })
  })

  describe('room_joined', () => {
    it('Changes current page to game', () => {
      app = app.room_joined(new Event(1, "room_joined", { roomID: "blargh" }))
      expect(app.currentPage).toEqual('game')
    })
  })
})
