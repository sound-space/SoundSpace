const router = require('express').Router();
const { Song } = require('../db/models');
module.exports = router;

//Post multiple songs
router.post('/', async (req, res, next) => {
  const songIds = req.body.songIds;
  const channelId = Number(req.body.channelId);
  const isSuggestion = req.body.isSuggestion;
  const songObjs = songIds.map((songId, i) => {
    return {
      songId,
      isLast: i === songIds.length - 1 && !isSuggestion,
      channelId,
    };
  });
  Song.bulkCreate(songObjs);
  res.send('Songs created successfully');
});
