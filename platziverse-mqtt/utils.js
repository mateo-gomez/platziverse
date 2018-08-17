'use strict'

function parsePayload (payload) {
  if (payload instanceof Buffer) {
    payload = payload.toString('utf8')
  }

  try {
    return payload = JSON.parse(payload)
  } catch (e) {
    return payload = null
  }

  return payload
}

module.exports = {
  parsePayload
}
