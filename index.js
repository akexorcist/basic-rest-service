const _ = require('lodash')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

let users = [
  {
    name: 'Ake Exorcist',
    job: 'Android Developer',
    age: 18,
    id: 549202173591
  },
  {
    name: 'Devahoy',
    job: 'Full Stack Web Developer',
    age: 19,
    id: 507997833294
  }
]

app.listen(3333, () => console.log('Basic RESTful Service listening on port 3333!'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/v1/users', (req, res) => {
  let maxCount = req.query.maxCount || 10
  let slicedUsers = _.slice(users, [(start = 0)], [(end = maxCount)])
  res.send({
    users: slicedUsers
  })
})

app.get('/api/v1/users/:id', (req, res) => {
  let id = +req.params.id
  let user = findUserById(id) || {}
  res.send(user)
})

app.post('/api/v1/users', (req, res) => {
  let user = req.body
  if (!user.name || !user.age || !user.job) {
    res.status(400).send({
      message: 'Incorrect user format',
      status: 'INCORRECT_USER_FORMAT'
    })
    return
  }
  if (findUserByName(user.name)) {
    res.status(400).send({
      message: 'User already exist',
      status: 'USER_ALREADY_EXIST'
    })
    return
  }
  let id = undefined
  while (!id || findUserById(id)) {
    id = generateId()
  }
  user.id = id
  users.push(user)
  res.send({
    message: 'User was added',
    status: 'USER_WAS_ADDED',
    addedUser: user
  })
})

app.delete('/api/v1/users/:id', (req, res) => {
  let id = +req.params.id
  let removedUser = _.remove(users, user => {
    return id == user.id
  })
  if (!removedUser || _.isEmpty(removedUser)) {
    res.status(400).send({
      message: 'User not found',
      status: 'USER_NOT_FOUND'
    })
    return
  }
  res.send({
    message: 'User was removed',
    status: 'USER_WAS_REMOVED',
    removedUser: removedUser[0]
  })
})

app.put('/api/v1/users/:id', (req, res) => {
  let id = +req.params.id
  let body = req.body
  if (!body.name || !body.age || !body.job) {
    res.status(400).send({
      message: 'Some user data is missing',
      status: 'USER_DATA_MISSING'
    })
    return
  }
  let user = _.find(users, { id })
  if (!user) {
    res.status(400).send({
      message: 'User not found',
      status: 'USER_NOT_FOUND'
    })
    return
  }
  user.name = body.name
  user.age = body.age
  user.job = body.job
  res.send({
    message: 'User was updated',
    status: 'USER_WAS_UPDATED',
    updatedUser: user
  })
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000000000)
}

const findUserById = id => {
  return _.find(users, { id })
}

const findUserByName = name => {
  return _.find(users, { name })
}
