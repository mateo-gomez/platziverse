'use strict'

const metric = {
  id: 1,
  agentId: 1,
  AgentUuid: 'yyy-yyy-yyy',
  type: 'memory',
  value: 'valor de mierda',
  createdAt: new Date(),
  updateAt: new Date()
}

const metrics = [
  metric,
  extend(metric, { id: 2, agentId: 1, value: 'caca', AgentUuid: 'xxx-xxx-xxx' }),
  extend(metric, { id: 3, agentId: 2, type: 'videoCard', value: 'otro valor de mierda', AgentUuid: 'zzz-zzz-zzz' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: metric,
  all: metrics,
  byAgentUuid: uuid => metrics.filter(m => m.AgentUuid === uuid).shift(),
  byTypeAgentUuid: (type, uuid) => metrics.filter(m => m.AgentUuid === uuid && m.type === type).shift()
}
