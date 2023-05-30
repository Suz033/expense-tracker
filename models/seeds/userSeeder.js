// files
const User = require('../user')
const db = require('../../config/mongoose')

// add data to db
db.once('open', () => {
  const user = [
    {
      name: 'user1',
      email: 'user1@example.com',
      password: 'a'
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: 'a'
    }
  ]
  Promise.all(
    user.map((ele) => {
      return User.create({ name: ele.name, email: ele.email, password: ele.password })
    })
  )
  .then(() => {
    console.log('userSeeder script added.')
    process.exit()
  })
  .catch((err) => {
    console.error(err)
    process.exit()
  })
})