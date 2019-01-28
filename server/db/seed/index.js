'use strict';

const db = require('../db');
const { User, Channel } = require('../models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      name: 'Eric',
      spotifyId: '34',
    }),
    User.create({
      name: 'Mike',
      spotifyId: '515',
    }),
    User.create({
      name: 'Justin',
      spotifyId: '581',
    }),
    User.create({
      name: 'Dimtry',
      spotifyId: '820',
    }),
  ]);

  const channels = await Promise.all([
    Channel.create({
      name: 'Rock',
    }),
    Channel.create({
      name: 'Pop',
    }),
    Channel.create({
      name: 'Alternative',
    }),
    Channel.create({
      name: 'Instrumental',
    }),
  ]);

  await users[0].setChannels([channels[1].id]);
  await users[1].setChannels([channels[0].id]);
  await users[2].setChannels([channels[1].id]);
  await users[3].setChannels([channels[2].id]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${channels.length} channels`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
