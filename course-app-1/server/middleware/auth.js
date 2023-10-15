const jwt = require("jsonwebtoken");
const SECRET = "sup3rs3cr3tsex"; 
 
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1]; 
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          res.status(403).json({message:"your session has expired"});
        }
        else {
          req.decrypted = decoded;
          next();
        }
      })
  
    } else {
      res.sendStatus(400);
    }
  };

  module.exports = {
    authenticateJwt,
    SECRET
  }
 