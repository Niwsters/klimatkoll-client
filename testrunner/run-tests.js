import esbuild from 'esbuild'
import { execSync } from 'child_process'
import { onFileChange } from './file-watcher.js'

function build() {
  esbuild.buildSync({
    entryPoints: ['./src/tests/tests.ts'],
    bundle: true,
    outfile: './dist-tests/tests.js',
    sourcemap: true,
    platform: 'node'
  })
}

function run() {
  console.clear()
  build()
  try {
    execSync('node --enable-source-maps ./dist-tests/tests.js', { stdio: 'inherit' })
  } catch (e) {
    console.log(e.trace)
  }
}

run()
onFileChange(() => {
  console.time('Ran all tests in')
  run()
  console.timeEnd('Ran all tests in')
})
