import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  watch: true,
  outfile: './dist/bundle.js'
}).catch(reason => {
  console.log(reason)
  process.exit()
})
