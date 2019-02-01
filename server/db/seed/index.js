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

  const rockChannel = await Channel.create({
    name: 'Rock',
    timestamp: Date.now(),
    description: 'Our channel is all about the latest rock music.',
  });
  const popChannel = await Channel.create({
    name: 'Pop',
    timestamp: Date.now(),
    // imageURL: './assets/dj.jpg'
    description: 'The most popular music in the world!',
  });
  const rapChannel = await Channel.create({
    name: 'Rap',
    timestamp: Date.now(),
    // imageURL: './assets/words.jpg',
    description: 'Come for the coolest lyrics around.',
  });

  // Rock
  const johnny = await Song.create({
    songId: '3HMrMZ56giBGJYcCMSRijs', // Johnny B Goode
    votes: 2,
  });
  const hammer = await Song.create({
    songId: '2GCFcbxm61rSA8gzsDk6NJ', // Hammer to Fall
    votes: 3,
    isLast: true,
  });
  const romance = await Song.create({
    songId: '5P5cGNzqh6A353N3ShDK6Y', // Bad Romance
  });
  const funk = await Song.create({
    songId: '32OlwWuMpZ6b0aN2RZOeMS', // Uptown Funk
    isLast: true,
  });
  const famous = await Song.create({
    songId: '19a3JfW8BQwqHWUMbcqSx8', // Famous
    isLast: true,
  });

  await johnny.setChannel(rockChannel.id);
  await hammer.setChannel(rockChannel.id);
  await romance.setChannel(popChannel.id);
  await funk.setChannel(popChannel.id);
  await famous.setChannel(rapChannel.id);
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
