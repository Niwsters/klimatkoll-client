import esbuild from 'esbuild'

esbuild.buildSync({
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  outfile: './dist/bundle.js'
})
