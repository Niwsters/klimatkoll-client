import { App } from './app';
import { mountRoot } from './root'

async function start() {
  const root = await mountRoot()
  new App(root)
}

start()
