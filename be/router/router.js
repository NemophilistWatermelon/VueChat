const router = require('express').Router();
const contro =require('./controller/controRouter');

const passport = require('passport');

//接口
router.post("/login", contro.loginPost);
router.post("/register", contro.registerPost);

router.post("/login/userAll", passport.authenticate("jwt",{session:false}), contro.currentPost);
router.post("/searchFri",contro.search);
router.post("/addFri",contro.addFri);
router.get("/addFri/:id", contro.addFris);

router.post("/addFricBoolean", contro.addFricBoolean);
router.post("/PostMyFriend", contro.showMyfriend);

router.post("/sendMsg", contro.sendMsgContent);
router.post("/getMsgContent", contro.getMsgContent);

router.post("/said_words", contro._saidWords);
router.post("/said", contro._getProfile);
// 朋友圈点赞
router.post("/vote", contro._vote);//确定点赞
router.post("/unvote", contro._unvote);//取消点赞
router.get("/getVote", contro._getVote);//获取点赞

router.post("/pl", contro._pl);//获取点赞

router.post("/pl/getPl", contro._getPl);

router.post("/delPyq", contro._delPyq)


router.post("/resetName", contro._altName)
// _getFriendsRound

//朋友的圈
router.get("/myfriend/:id", contro._getFriendsRound);






module.exports = router;