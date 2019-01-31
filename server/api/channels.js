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

router.post('/', async (req, res, next) => {
  const { name, description, imageURL } = req.body
  try {
    // if (req.user) {
      const [newChannel, isNew] = await Channel.findOrCreate({
        name,
        description,
        imageURL
      })
      if(isNew) {
        res.json(newChannel)
      }
      else {
        res.status(409).json({error: 'Channel already exists'})
      }
    // } else if (req.user && req.channel.name === req.body.name) {
    //   res.send('Channel already exists!');
    // } else {
    //   res.send('You must be logged in to create a new channel');
    // }
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

router.put('/:channelId/votes', async (req, res, next) => {
  try {
    const channelId = Number(req.params.channelId);
    const songToVoteOn = await Song.findOne({
      where: {
        channelId,
        isPlaying: true,
      },
    });
    if (songToVoteOn) {
      songToVoteOn.votes += Number(req.body.vote);
      await songToVoteOn.save();
      res.status(204).send('Successfully voted on song!');
    } else {
      res.status(404).send('That song was not found, cannot register vote.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
