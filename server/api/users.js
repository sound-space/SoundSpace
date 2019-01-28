const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.id)) {
      const user = await User.findById(req.params.id)
      res.json(user)
    } else {
      res.send('Access Denied')
    }
  } catch (error) {
    next(error)
  }
})
