import logger from "../logger";
import User from "../models/user";


//passport strategy
const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['accessToken'];
    }
    return token;
};

export default function (passport) {
    console.log("yes");
    
  var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = "jwtPrivateKey";
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        
      User.findOne({ _id: jwt_payload.id }, (err, user) => {
        logger.info(jwt_payload)
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);

        }
      });
    })
  );
}
