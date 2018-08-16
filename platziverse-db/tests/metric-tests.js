'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const metricFixtures = require('./fixtures/metric')

let config = {
  logging: function () {}
}

let AgentStub = {
  hasMany: sinon.spy()
}

let uuid = 'yyy-yyy-yyy'

let uuidArgs = {
  where: {
    uuid: 'yyy-yyy-yyy'
  }
}

let db = null
let sandbox = null
let MetricStub = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  MetricStub = {
    belongsTo: sandbox.spy()
  }

  // Model findAll Stub
  MetricStub.findAll = sandbox.stub()
  MetricStub.findAll.withArgs(uuidArgs).returns(Promise.resolve(metricFixtures.byAgentUuid(uuid)))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('metric', t => {
  t.truthy(db.Metric, 'Metric service should be exist')
})

test.serial('Setup', t => {
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'argument should be the AgentModel')
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'argument should be the MetricModel')
})

test.serial('Metric#findByAgentUuid', async t => {
  let metrics = await db.Metric.findByAgentUuid(uuid)

  t.deepEqual(metrics, metricFixtures.byAgentUuid(uuid), 'should be the same')
})
