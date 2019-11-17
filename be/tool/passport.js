var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'helloWorld';

const mysql = require("../router/model/mysql");
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_playload, done) => {
        // jwt_playload :token
        //done  回调函数
        mysql.query(`select * from wechatuinfo where id =${jwt_playload.id}`, (err, data) => {
            if (err) throw err;
            if (data.length > -1 ) {
                return done(null,data);
                // done ( null,user);
            }else{
                return done(null, false);
            }
        })
       
    }));
}