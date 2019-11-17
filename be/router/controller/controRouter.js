const mysql = require('../model/mysql');
const md5 = require('md5');
const str_lock = require('../../tool/ser_lock');
const dateForamat = require('../../tool/date');
const jwt = require('jsonwebtoken');
// const passport = require('../../tool/passport');
var runSet = require('../../tool/getName');

const code = {
    200: "success",
    500: "failed"
}



function _Catch(err) {
    return err;
}
const routerContro = {
    // 登录请求
    loginPost: async (req, res, next) => {
        var uid = req.body.uid;
        var email = req.body.email;
        var password = md5(md5(req.body.password)) + str_lock;
        var selectEmail = "SELECT * from wechatuinfo where  email = " + "'" + email + "'" + "  AND " + " password=" + "'" + password + "'";
        var selectUid = "SELECT * from wechatuinfo where  uid = " + uid + "  AND " + " password=" + "'" + password + "'";


        if (uid == undefined) {
            console.log("查询的是邮箱路线")
            mysql.query(selectEmail, (error, data) => {
                if (error) {
                    error_Catch(email + error)
                    return res.json({ msg: escape("输入信息有误!"), code: code["500"] })
                } else if (data.length === 0) {
                    return res.json({ msg: escape("输入信息有误!"), code: code["500"] })

                } else {
                    // jwt.sign("规则","加密名字","过期时间","箭头函数")
                    const userId = data[0].id;
                    const userName = data[0].name
                    const userUid = data[0].uid;
                    console.log(userUid);
                    const rule = { id: userId, name: userName, uid: userUid }

                    jwt.sign(rule, "helloWorld", { expiresIn: 3600 * 8 }, (err, token) => {
                        if (err) throw err;
                        res.json({ msg: escape("输入信息正确"), code: code["200"], token: "Bearer " + token });

                    })


                }
            });
        } else if (email == undefined) {
            console.log("查询的是uid路线")
            mysql.query(selectUid, (error, data) => {
                if (error) {
                    throw (email + error)
                    return res.json({ msg: escape("输入信息有误!"), code: code["500"] })
                } else if (data.length === 0) {
                    return res.json({ msg: escape("输入信息有误!"), code: code["500"] })

                } else {
                    const userId = data[0].id;
                    const userName = data[0].name;
                    const userUid = data[0].uid;
                    const rule = { id: userId, name: userName, uid: userUid }

                    jwt.sign(rule, "helloWorld", { expiresIn: 3600 * 8 }, (err, token) => {
                        if (err) throw err;
                        res.json({ msg: escape("输入信息正确"), code: code["200"], token: "Bearer " + token });

                    })

                }
            });
        } else {
            return res.status(404).json({ msg: escape("系统错误,请重新输入！") })
        }





    },

    //注册请求
    registerPost: async (req, res, next) => {
        console.log(req.body.password)
        //前端不传 则默认昵称
        const uName = req.body.name || "Heisenberg_User";

        //三层加密 
        const uPwd = md5(md5(req.body.password)) + str_lock;
        //email 必须传递
        const uEmail = req.body.email;

        // 服务器 自动生成时间

        const time = dateForamat(new Date);

        //默认chat 随机  账号
        const uid = (() => {
            return ~~(Math.random() * 999999999 + 100);
        })();


        const insert = "insert into wechatuinfo (uid,name,email,password,time) values " + ["(" + "'" + uid + "'", "'" + uName + "'", "'" + uEmail + "'", "'" + uPwd + "'", "'" + time + "'" + ")"];

        mysql.query("select * from  wechatuinfo where email =?", [uEmail], (error, data) => {
            if (error) {
                //查询出错
                throw error;
            } else if (data.length === 0) {
                //    注册
                mysql.query(insert, (error, data) => {
                    if (error) {
                        throw error
                    } else {
                        res.json({ msg: escape("可以注册"), code: code[200], uid });
                    }
                })



            } else {
                //如果找到不提交数据 
                //返回前端提示信息

                res.json({ msg: escape("输入信息有误"), code: code[500] });

            }
        })





    },



    //私有 token 请求

    currentPost: async (req, res, next) => {
        let userArray = {
            name: req.user[0].name,
            email: req.user[0].email,
            uid: req.user[0].uid,
        }



        return res.json(userArray);
    },

    search: async (req, res, next) => {
        console.log(req.body.uid);
        var uid = req.body.uid;
        var select = `select * from wechatuinfo where uid = ${uid}`;
        var aFri = [];
        mysql.query(select, (err, data) => {
            if (err) throw err;
            else if (data.length == 0) {
                return res.status(200).json({ msg: "错误未知的号码", code: code["500"] });
            }
            else {
                aFri.push(data[0].uid, data[0].name);
                return res.status(200).json({ aFri });
            }




        })
    },


    addFri: async (req, res, next) => {
        var fid = req.body.fid;
        var mid = req.body.mid;


        var insert = `insert into wechatadd  (uid,fid,msg) values(${mid},${fid},'是否添加对方为好友')`;

        mysql.query(insert, (err, data) => {
            if (err) throw err;
            else {
                return res.status(200).json({ data });
            }
        });
    },

    addFris: async (req, res, next) => {
        var fid = req.params.id;

        var select = `select * from wechatAdd where fid = ${fid}`;
        mysql.query(select, (err, data) => {
            if (err) throw err;
            else {
                return res.status(200).json({ data });
            }
        })
    },


    //接收到同意服务并添加信息到双方好友表;
    addFricBoolean: async (req, res, next) => {
        var fid = req.body.uid;
        var ps = "好友"
        var boolean = req.body.boolean;
        console.log(boolean);
        // var id = req.body.id;

        // console.log(fid);
        if (boolean) {
            var select = `select * from wechatadd where fid =${fid} `;
            mysql.query(select, (err, data) => {
                if (err) throw err;
                else {
                    var mid = data[0].uid;
                    var id = data[0].id;
                    var time = dateForamat(new Date);
                    var relation = "friend"
                    var insert = `insert into wechatfinfo (uid,mid,time,relation,ps) values (${fid},${mid},'${time}','${relation}','${ps}')`;
                    var insert2 = `insert into wechatfinfo (uid,mid,time,relation,ps) values (${mid},${fid},'${time}','${relation}','${ps}')`;
                    console.log(insert);
                    mysql.query(insert, (err, data) => {
                        if (err) throw err;
                        else {
                            mysql.query(insert2, (err, data) => { if (err) throw err });
                            mysql.query(`delete from wechatadd where id =${id} `, (err, data) => {
                                if (err) throw err;
                            })
                            return res.status(200).json({ msg: "添加好友成功", code: 200 });
                        }
                    });
                }
            });
        }



    },

    //展示好友列表

    showMyfriend: async (req, res, next) => {
        //需要传递 当前登录人的 uid 
        const uid = req.body.uid;
        const select = `SELECT * From wechatfinfo where uid = ${uid}`;
        mysql.query(select, (err, data) => {
            if (err)
                throw err;
            else {
                return res.status(200).json({ data });
            }
        });
        // 执行查询  表  wechatfinfo  ==>  找到  uid  返回其所有朋友 





    },


    //发送消息 存储到数据库中,
    sendMsgContent: async (req, res, next) => {
        const uid = req.body.uid, fid = req.body.fid, content = req.body.content, stime = dateForamat(new Date);
        var insert = ` insert into   utofCmsg (uid,fid,content,stime) values (${uid},${fid},'${content}','${stime}')`;
        mysql.query(insert, (err, data) => {
            if (err) throw err;
            else {
                return res.status(200).json({ data });
            }
        });
    },
    getMsgContent: async (req, res, next) => {

        // ajax 长链接 获取 双方实时通信 的 内容 


        // 首先 是 发送的双方人是谁
        const uid = req.body.uid; //当前已经登录的用户
        const fid = req.body.fid; //当前聊天对方是谁
        const id = req.body.id;
        var num;
        var select = `select * from utofCmsg where uid=${fid} and fid = ${uid} ORDER BY stime desc`;
        //计录 对方 发送数据存储编号;
        function callNum(callback) {
            mysql.query(select, (err, data) => {
                if (err) throw err;
                else if (data.length != 0) {
                    num = data[0].id;
                    callback(num)
                }
            })
        } callNum(num => {


            if (id == null) {
                console.log("123")
                mysql.query(select, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    else if (data.length == 0) {

                        return res.status(200).json({ code: "nullMSG" });
                    } else if (data.length !== 0) {
                        var obj = {};
                        obj.id = data[0].id;
                        obj.content = data[0].content;
                        obj.stime = data[0].stime;
                        obj.show = false;
                        return res.status(200).json({ code: "SUCCESS_Msg", obj });
                    }
                });
            }

            if (id != null) {
                mysql.query(select, (err, data) => {
                    if (err) {
                        throw err;
                    } else if (id == num) {
                        return res.status(200).json({ code: "nullMSG" });
                    } else {
                        var obj = {};
                        obj.id = data[0].id;
                        obj.content = data[0].content;
                        obj.stime = data[0].stime;
                        obj.show = false;   
                        return res.status(200).json({ code: "SUCCESS_Msg", obj });
                    }
                })
            }







        });
















    },
    _saidWords: async (req, res, next) => {

        var text = req.body.text;
        var uid = req.body.uid;
        var stime = dateForamat(new Date)
        var insert = `insert into wechatpyq (uid,content,stime) values (${uid},'${text}','${stime}') `
        mysql.query(insert, (err, data) => {
            if (err) throw err;
            else {
                return res.json({ code: code[200] })
            }
        });
    },
    _getProfile: async (req, res, next) => {

        var uid = req.body.uid;

        var select = `select * from wechatpyq where uid = ${uid} Order By stime desc  `
        mysql.query(select, (err, data) => {
            if (err) throw err;
            else {
                return res.json({ code: code[200], data })
            }
        })
    },
    _vote: async (req, res, next) => {
        //处理点赞 
        var uid = req.body.uid;

        var textId = req.body.num;
        var stime = dateForamat(new Date);

        var insert = `insert into wechatpyqgood (friendPyqID,goodMan,stime) values (${textId},${uid},'${stime}')`;
        var select = `select good from wechatpyq where id = ${textId}`
        mysql.query(select, (err, data) => {
            if (err) throw err;
            else {

                var vote = data[0].good;
                vote += 1;
                mysql.query(`update wechatpyq  set good =${vote}  where id = ${textId}`, (err, data) => {
                    if (err) throw err;
                    else {
                        mysql.query(insert, (err, data) => {
                            if (err) throw err;
                            else {
                                return res.json({ data, code: code[200] });
                            }
                        })
                    }
                });
            }
        })

    },
    _unvote: async (req, res, next) => {
        var uid = req.body.uid;

        var textId = req.body.num;
        var del = `delete from  wechatpyqgood where  friendPyqID =${textId} and goodMan = ${uid}`
        var select = `select * from wechatpyq where uid = ${uid} and id = ${textId}`;

        if (uid != undefined) {
            mysql.query(select, (err, data) => {
                if (err) throw err;
                else {
                    var vote = data[0].good;
                    vote -= 1;
                    if (vote <= 0) {
                        vote = 0;
                    }
                    mysql.query(`update wechatpyq  set good =${vote}  where id = ${textId}`, (err, data) => {
                        if (err) throw err;
                        else {
                            mysql.query(del, (err, data) => {
                                if (err) throw err;
                                else {
                                    return res.json({ data, code: code[200], msg: "Yo.您已经取消喜欢这个朋友圈" });
                                }
                            })
                        }
                    });
                }
            })
        }
    },
    _getVote: async (req, res, next) => {
        var uid = req.query.uid;
        console.log(uid);
        if (uid != undefined) {
            var select = `select * from wechatpyqgood where goodMan= ${uid}  `;
            mysql.query(select, (err, data) => {
                if (err) throw err;
                else {
                    return res.json({ code: code[200], data });
                }
            })
        }

    },
    _pl: async (req, res, next) => {
        var uid = req.body.uid;
        var id = req.body.textID;
        var content = req.body.text_content;
        var fid = req.body.fid || "";
        var stime = dateForamat(new Date);

        var insert = `insert into wechatpyqpl (friendRoundID,pl,uid,stime,fid) values (${id},'${content}','${uid}','${stime}','${fid}')`
        if (uid !== undefined) {
            mysql.query(insert, (err, data) => {
                if (err) throw err;
                else {

                    return res.status(200).json({ code: code[200] });
                }
            })
        } else {
            return res.status(403).json({ code: code[500], msg: "Error!" })
        }
    },
    _getPl: async (req, res, next) => {
        var pl = [];
        var req_content = req.body;

        for (const key in req_content) {
            pl.push(req_content[key]);
        }

        if (pl.length !== 0) {
            mysql.query("select * from wechatpyqpl  where   friendRoundID=?", pl, (err, data) => {
                if (err) throw err;
                else {
                    return res.status(200).json({ data, code: code[200] });
                }
            })
        }
    },
    _delPyq: async (req, res, next) => {
        var id = req.body.id;
        if (id != undefined) {
            runSet.del("wechatpyq", "id", id, (err, data) => {
                if (err) throw err;
                else {
                    return res.status(200).json({ msg: "delSuccess" });
                }
            })

        }

    },
    _altName: async (req, res, next) => {
        var uid = req.body.uid;
        var fid = req.body.fid;
        var ps = req.body.newName;

        runSet.altName("wechatfinfo", "ps", [ps], uid, fid, (err, data) => {
            if (err) throw err;
            else {
                return res.status(200).json({ msg: "alt_Success" });
            }
        });
    },

    _getFriendsRound: async (req, res, next) => {
        var uid = req.params.id;

        var select = `SELECT * FROM wechatpyq where uid= ${uid}`;
        if (uid != undefined) {
            mysql.query(select, (err, data) => {
                if (err)
                    throw err;
                else {
                    return res.status(200).json({ data, code: "SUCCESS_THIS_FRIEND" });
                }
            })
        }
    },


}


module.exports = routerContro;