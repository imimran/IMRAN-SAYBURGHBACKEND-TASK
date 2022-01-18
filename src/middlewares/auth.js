import passport from "passport";
import PassportAuth from "./passport";
PassportAuth(passport);

const auth = passport.authenticate("jwt", { session: false });

export default auth;