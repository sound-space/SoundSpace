const router = require('express').Router();
const { User, Channel, Song } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    // if (req.user) {
    const channels = await Channel.findAll();
    res.json(channels);
    // }
    // else {
    //   res.send('You must be logged in to see channels')
    // }
  } catch (error) {
    next(error);
  }
});

router.get('/:channelId', async (req, res, next) => {
  try {
    if (req.user) {
      const channel = await Channel.findById(req.params.channelId);
      res.json(channel);
    } else {
      res.send('You must be logged in to see channel');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:channelId/user', async (req, res, next) => {
  try {
    if (req.user) {
      const channelUsers = await Channel.findOne({
        where: {
          id: req.params.channelId,
        },
        include: [{ model: User }],
      });
      res.json(channelUsers);
    } else {
      res.send('You must be logged in to see users in the channel');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:channelId/recommendations', async (req, res, next) => {
  //Query Songs model for most popular songs, except the song that is currently playing, to get a seed
  //Drop all rows in Songs model that have this channel's ID, except the song that is currently playing
  //Set the row that isPlaying to be isLast = false
  //Use this seed to request Spotify API for recommendations
  //Add all songs from the result to the Songs model, and choose one to be isLast = true
  console.log('Getting recommendations from Spotify...');
});

router.post('/', async (req, res, next) => {
  try {
    if (req.user && !req.channel.name) {
      const newChannel = await Channel.create(req.body.name);
      res.json(newChannel);
    } else if (req.user && req.channel.name === req.body.name) {
      res.send('Channel already exists!');
    } else {
      res.send('You must be logged in to create a new channel');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (req.user && req.channel.name) {
      const channel = await Channel.findById(req.param.id);
      await channel.update({
        name: req.body.name || channel.name,
      });
      res.json(channel);
    } else {
      res.send('You must be logged in to create a new channel');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:channelId/votes', async (req,res,next) => {
  try {
    const songToVoteOn = await Song.findOne({
      where: {
        channelId: req.params.channelId,
        isPlaying: true
      }
    })
    if(songToVoteOn) {
      songToVoteOn.votes += req.body.vote
      await songToVoteOn.save()
      res.status(204).send('Successfully voted on song!')
    }
    else {
      res.status(404).send('That song was not found, cannot register vote.')
    }
  }
  catch(err) {
    console.error(err)
    next(err)
  }
})
