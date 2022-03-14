import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/tests/tests.ts'],
  bundle: true,
  outfile: './tests/tests.js',
  sourcemap: true,
  platform: 'node'
}).catch(() => process.exit(1))
