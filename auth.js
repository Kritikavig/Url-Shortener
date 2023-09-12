// const sessionMap = new Map(); -> statefull tokens

const jwt = require("jsonwebtoken");
const secretKey = "Kritika@17"; //can be anything(stamp for verification)

/*set the sessionId for a user, using mapping
    function setUser(id, user){
        sessionMap.set(id,user);
    }

    get the sessionId for the current logged in user 
    function getUser(id){
        return sessionMap.get(id);
    }
*/

//JWT -> applying stateless auth

//make tokens, getting id, user from frontend
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

//verify user
function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
