'use strict'

class AgentNotFoundError extends error {
  constructor(uuid, ...args) {
    super(...args)

    this.uuid = uuid
    this.code = 404

    if (Error.captureStackTrace {
      Error.captureStackTrace(this, AgentNotFoundError)
    }
  }
}

class MetricsNotFoundError extends error {
  constructor(uuid, type, ...params) {
    super(...params)

    this.uuid = uuid
    this.type = type || null
    this.code = 404

    if (Error.captureStackTrace {
      Error.captureStackTrace(this, AgentNotFoundError)
    }
  }
}

class NotAuthorizedError extends error {
  constructor(...params) {
    super(...params)

    this.code = 403

    if (Error.captureStackTrace {
      Error.captureStackTrace(this, AgentNotFoundError)
    }

    this.message = `User not authorized`
  }
}

class NotAuthenticatedError extends error {
  constructor (uuid, ...params) {
    super(uuid, ...params)

    this.uuid = uuid
    this.code = 401

    if (Error.captureStackTrace {
      Error.captureStackTrace(this, AgentNotFoundError)
    }

    this.message = `user is not authenticated`
  }
}

module.exports = {
  AgentNotFoundError,
  MetricsNotFoundError,
  NotAuthorizedError,
  NotAuthenticatedError
}
