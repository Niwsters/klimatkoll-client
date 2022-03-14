import esbuild from 'esbuild'
import fs from 'fs'
import { findFiles } from './find-files.js'
import { execSync } from 'child_process'

function onFileChange(func) {
  for (const file of findFiles()) {
    fs.watchFile(file, { interval: 100 }, () => {
      console.log('change happened')
      func()
    })
  }
}

onFileChange(() => {
  console.time('test')
  esbuild.buildSync({
    entryPoints: ['./src/tests/tests.ts'],
    bundle: true,
    outfile: './dist-tests/tests.js',
    sourcemap: true,
    platform: 'node'
  })

  try {
    execSync('node --enable-source-maps ./dist-tests/tests.js', { stdio: 'inherit' })
  } catch (e) {
    console.log(e.trace)
  }
  console.timeEnd('test')
})
