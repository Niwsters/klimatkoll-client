import { Factory } from './test-factory'
import { Event } from '../event/event'
import { spec } from './spec'
import { AppState } from '../app'

export default function main() {
  const test = spec()
    .when(() => Factory.GameState())

  // Sets default page to menu
  test
    .expect(app => app.currentPage)
    .toEqual('menu')

  // Sets page to game when room joined
  test
    .when(app => AppState.room_joined(app, new Event(1, "room_joined", { roomID: "blargh" })))
    .expect(app => app.currentPage).toEqual('game')
}
