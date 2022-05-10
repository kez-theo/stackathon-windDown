'use strict'

const {db, models: {User, Activity} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', bedtime: '21:30' }),
    User.create({ username: 'murphy', password: '123', bedtime: '22:30' }),
    User.create({ username: 'timmy', password: '123'}),
  ]);
  const activities = await Promise.all([
    Activity.create({ activityName: 'read', duration: '30', time: 0}),
    Activity.create({ activityName: 'prep for tomorrow', duration: '45', time: 0}),
    Activity.create({ activityName: 'listen to music', duration: '15', time: 0}),
    Activity.create({ activityName: 'tend to plants', duration: '30', time: 0}),
    Activity.create({ activityName: 'meditate', duration: '30', time: 0}),
    Activity.create({ activityName: 'stretch', duration: '30', time: 0}),
  ]);
  const [
    cody,
    murphy,
    timmy,
  ] = users;
  const [
    read,
    prep,
    music,
    plants,
    meditate,
    stretch
  ] = activities;
  // await read.setUser(murphy)
  // await prep.setUser(cody)
  // await music.setUser(murphy)
  // await plants.setUser(murphy)
  // await meditate.setUser(cody)
  // await stretch.setUser(murphy)
  // await stretch.setUser(cody)
  
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${activities.length} activities`)
  console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[1],
  //     murphy: users[2],
  //     timmy: users[3]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
