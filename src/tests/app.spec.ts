import { Factory } from './test-factory'
import { Event } from '../event/event'
import { spec } from './spec'

const test = spec('Join room')
  .when(() => Factory.AppState())

// Sets default page to menu
test
  .expect(app => app.currentPage)
  .toEqual('menu')

test
  .when(app => app.room_joined(new Event(1, "room_joined", { roomID: "blargh" })))
  .expect(app => app.currentPage).toEqual('game')

describe('', () => it('', () => {}))
