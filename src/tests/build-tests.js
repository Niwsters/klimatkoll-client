import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/tests/tests.ts'],
  bundle: true,
  outfile: './dist-tests/tests.js',
  sourcemap: true,
  platform: 'node'
}).catch(() => process.exit(1))
