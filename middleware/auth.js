const { getUser } = require("../auth");

/* Logic, for maintaining and handling sessions
async function restrictToLoggedin(req,res,next){

    const sessionid = req.cookies?.sessionid;    //get cookie id of user

    //if user is not logged in 
    if(!sessionid)  return res.render("/login");

    const user = getUser(sessionid);    //check sessionid of user
    if(!user)   return res.render("/login");

    req.user = user;
    next();
}

//check if authenticated or not 
async function checkAuth(req,res,next){

    const sessionid = req.cookies?.sessionid;    //get cookie id of user
    const user = getUser(sessionid);            //check sessionid of user
    req.user = user;
    next();
 } */

//Middleware for authentication and authorization

function checkForAuth(req, res, next) {
  const tokenCookie = req.cookies?.token; //token, name of cookie
  req.user = null;

  if (!tokenCookie) return next();

  //user have tokenCookie
  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function Authorization(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    //accessing page not meant for you
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

module.exports = {
  checkForAuth,
  Authorization,
};
