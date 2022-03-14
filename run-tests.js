import { exec } from 'child_process'
import mapstrace from 'mapstrace'

exec('node ./tests/tests.js', (err, stdout, stderr) => {
  mapstrace.build(err, true, result => {
    console.log(result)
  })
})
