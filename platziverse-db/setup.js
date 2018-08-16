'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  if (process.argv.pop() !== '--y') {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])
    if (!answer.setup) {
      return console.log(`${chalk.blue('Nothing happend :)')}`)
    }
  }

  // const answer = await prompt([
  //   {
  //     type: 'confirm',
  //     name: 'setup',
  //     message: 'This will destroy tour database, are you sure?'
  //   }
  // ])

  const config = require('./config-db')()

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
