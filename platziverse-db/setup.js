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
      returnconsole.log(`${chalk.blue('Nothing happend :)')}`)
    }
  }

  // const answer = await prompt([
  //   {
  //     type: 'confirm',
  //     name: 'setup',
  //     message: 'This will destroy tour database, are you sure?'
  //   }
  // ])

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
    // operatorsAliases: {
    //   $and: Op.and,
    //   $or: Op.or,
    //   $eq: Op.eq,
    //   $gt: Op.gt,
    //   $lt: Op.lt,
    //   $lte: Op.lte,
    //   $like: Op.like
    // }
  }

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
