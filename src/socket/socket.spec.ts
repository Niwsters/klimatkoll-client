import { Socket } from './socket'
import { AppConfig } from '../App'
import { CreateGameEvent } from '../event/event'

describe('Socket', () => {
  let socket: Socket
  let config: AppConfig
  beforeEach(() => {
    config = new AppConfig(true, "blargh", "honk")
    socket = new Socket(config)
  })

  describe('constructor', () => {
    it('initialises WebSocket instance', () => {
      expect(socket.websocket).toEqual(new WebSocket(config.wsServerURL, config.language))
    })
  })

  describe('create_game', () => {
    it('forwards event to server', () => {
      const event = new CreateGameEvent("blargh")
      expect(Socket.create_game(event)).toEqual([event])
    })
  })
})
