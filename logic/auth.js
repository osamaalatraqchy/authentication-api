const AUTH = require('../model/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
signup : async (req, res) => {
    const user = await AUTH.find({email : req.body.email});
    if(user.length >= 1){
        return res.status(409).json({message : "email is already exist"});
    } else {
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if(error) {
                return res.status(500).json({error : error});
            } else {
                const auth =  await new AUTH({
                    name : req.body.name,
                    email : req.body.email,
                    password : hash,
                    type : req.body.type
                }).save();
                res.json({
                    message : "user has been created .....",
                    email : auth.email,
                    password : auth.password,
                    type : auth.type
                });
            }
        })
    }
},

login : async (req, res) => {
const user = await AUTH.find({email : req.body.email});
if(user.length < 1) {
   return res.status(401).json({message : "user not exist ...."});
} else {
    bcrypt.compare(req.body.password, user[0].password, async (error , result) => {
          if(error) {
              return res.status(401).json({
                  message : error
              })
          }
          if(result) {
              if(user[0].type == 0) {
                  const token = jwt.sign({email : user[0].email, id : user[0].id}, "USER");
                  return res.status(200).json({
                    message: "user success",
                    email: user[0].email,
                    id: user[0]._id,
                    token: token,
                    name : user[0].name,
                    type: user[0].type,
                  });
    
              } else {
                const token = jwt.sign({email : user[0].email, id : user[0].id}, "ADMIN");
                return res.status(200).json({
                    message: "admin success",
                    email: user[0].email,
                    id: user[0]._id,
                    token: token,
                    name : user[0].name,
                    type: user[0].type,
                  });
              }
          } else {
              return res.status(401).json({message : "auth faild...pppp."});
          }
    });
}
}
}