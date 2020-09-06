/**
 * Run some commands with `.env` file loaded to `process.env`
 */
const {spawnSync} = require('child_process')
const dotenv = require('dotenv')
const expand = require('dotenv-expand')

const env = dotenv.config()
expand(env)

const args = process.argv.slice(2)
spawnSync(args[0], args.slice(1), {
  env: process.env,
  stdio: 'inherit'
})
