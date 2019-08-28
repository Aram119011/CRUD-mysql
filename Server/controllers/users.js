const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User')

module.exports.register = (req,res)=>{
        const today = new Date();
        const userData = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            created: today
        }
    console.log('user Data ',userData);
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(!user){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(userData.password, salt);
                userData.password = hash
                User.create(userData)
                .then(user => {
                    let token =jwt.sign({ userId : user.id.toString(), email : user.email.toString() }, process.env.SECRET_KEY,{
                        expiresIn: 1440
                    });
                    res.status(201).json({success: true, token : token })

                })
                .catch(err => {
                     res.status(500).json({success: false, error: err.message})
                })
            }else {
                res.status(409).json({error: 'User already exists '})

            }
        })
        .catch(err => {
            res.status(500).json({success: false, error: err.message})
        })

};

//LOGIN

module.exports.login = (req,res) =>{
    console.log(req.body)
    User.findOne({
        where: {
            email:req.body.email
        }
    })
    .then(user =>{
        if(bcrypt.compareSync(req.body.password, user.password)){
            let token =jwt.sign({ userId : user.id.toString(), email : user.email.toString() }, process.env.SECRET_KEY,{
                expiresIn: 1440
            });
            res.status(201).json({
                success : true,
                user : {
                    email : user.email
                },
                token: token
            })
        }else {
            // res.send('error: ' + 'User already exists ')
             res.status(409).json({error: 'User already exists '})
        }
    })
    .catch(err => {
        // res.send('error: ' + err)
        res.status(500).json({error: err.message})
    })
};

// PROFILE
module.exports.profile = (req,res)=>{
    let decoded =jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    Users.findOne({
        where: {
            id:decoded.id
        }
    })
        .then(user => {
            if(user) {
                res.json(user)
            }else {
                // res.send('User does not exist')
                res.status(409).json({error: 'User does not exist'})

            }
        })
        .catch(err => {
            // res.send('error: ' + err)
            res.status(500).json({error: err.message})
        });
}

// PROFILE
// users.get('/profile', (req,res)=> {
//     var decoded =jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
//
//     Users.findOne({
//         where: {
//             id:decoded.id
//         }
//     })
//     .then(user => {
//         if(user) {
//             res.json(user)
//         }else {
//             res.send('User does not exist')
//         }
//     })
//     .catch(err => {
//         res.send('error: ' + err)
//     })
// })
