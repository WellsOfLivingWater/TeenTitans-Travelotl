const User = require('../models/User');
const createErr = require('../utils/createErr');

const friendsController = {
  // get all friends
  getFriends: async (req, res, next) => {
    try { 
      const friendIDs = await User.findById(req.user.id).select('friends');
      console.log('friendIDs ===>', friendIDs);
      const friends = await User.find({ _id: { $in: friendIDs.friends } }).select('firstName lastName');
      console.log('friends ===>', friends);
      res.locals.friends = friends;
      return next();
    } catch (err) { 
      return next(createErr({
        method: 'friendsController.getFriends',
        type: 'database',
        err
      }));
    }
  },

  // add a friend
  addFriend: async (req, res, next) => {
    try {
      const friend = req.body.friend;
      await User.findByIdAndUpdate(req.user.id, { $push: { friends: friend } });
      return next();
    } catch (err) {
      return next(createErr({
        method: 'friendsController.addFriend',
        type: 'database',
        err
      }));
    }
  },

  // delete a friend
  deleteFriend: async (req, res, next) => {
    try {
      const friend = req.body.friend;
      await User.findByIdAndUpdate(req.user.id, { $pull: { friends: friend } });
      return next();
    } catch (err) {
      return next(createErr({
        method: 'friendsController.deleteFriend',
        type: 'database',
        err
      }));
    }
  },
}

module.exports = friendsController;