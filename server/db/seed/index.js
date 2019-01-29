'use strict';

const db = require('../db');
const { User, Channel, Song } = require('../models');

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
      currentlyPlaying: '123',
      currPlayingStartTime: Date.now(),
    }),
    Channel.create({
      name: 'Pop',
      currentlyPlaying: '123',
      currPlayingStartTime: Date.now(),
    }),
    Channel.create({
      name: 'Alternative',
      currentlyPlaying: '123',
      currPlayingStartTime: Date.now(),
    }),
    Channel.create({
      name: 'Instrumental',
      currentlyPlaying: '123',
      currPlayingStartTime: Date.now(),
    }),
  ]);

  const songs = await Promise.all([
    Song.create({
      songId: '3HMrMZ56giBGJYcCMSRijs', //Johnny B Goode
      votes: 2,
      played: true,
    }),
    Song.create({
      songId: '2GCFcbxm61rSA8gzsDk6NJ', //Hammer to Fall
      votes: 3,
      played: true,
    }),
    Song.create({
      songId: '4DhbiXEuV7JxSR0wuqetTa', //Free Ride
      votes: 1,
      played: true,
    }),
    //Not played yet!
    Song.create({
      songId: '2pZsQqXFgcY03vRyZxSQhU', //HMOTU
      isLast: true,
    }),
  ]);

  await users[0].setChannels([channels[1].id]);
  await users[1].setChannels([channels[0].id]);
  await users[2].setChannels([channels[1].id]);
  await users[3].setChannels([channels[2].id]);

  await songs[0].setChannel(channels[1].id);
  await songs[1].setChannel(channels[1].id);
  await songs[2].setChannel(channels[1].id);
  await songs[3].setChannel(channels[1].id);

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
