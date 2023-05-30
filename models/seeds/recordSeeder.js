// modules
const bcrypt = require('bcryptjs')

// files
const db = require('../../config/mongoose')
const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const record = require('./record.json').result
const SEED_USER = require('./user.json').result

const users = []
const user1Index = [0, 1, 2]
const user2Index = [3, 4]

// add to db
db.once('open', async () => {
  try {
    await Promise.all(
      SEED_USER.map(async (seedUser) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(seedUser.password, salt)
        const user = await User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
        users.push(user)
      })
    )

    const categoryList = await Category.find().lean()

    await Promise.all(
      record.map(async (seedRecord, index) => {
        const { name, date, amount, category } = seedRecord
        const referenceCategory = categoryList.find(data => data.name === category)
        seedRecord.categoryId = referenceCategory._id

        if (user1Index.includes(index)) {
          seedRecord.userId = users[0]._id
        }
        if (user2Index.includes(index)) {
          seedRecord.userId = users[1]._id
        }

        await Record.create({
          name,
          date,
          amount,
          userId: seedRecord.userId,
          categoryId: seedRecord.categoryId,
        })
      })
    )

    console.log('recordSeeder script added.')
    process.exit()

  } catch (err) {
    console.log(err)
  }
})