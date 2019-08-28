const Post = require('../models/Post')
// const Customer

//GET
module.exports.getAll = (req, res)=> { 
    Post.findAll({})
    .then(result => {
            res.status(200).json({
                success: true,
                pages: result
            })        
    })
.catch(err => res.status(500).json({
    error: err
    }));
};

// module.exports.create = (req,res) => { 
// Customer.findById().then(custom => {
//     res.json(custom);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({msg:'error', details: err})
//     })
 
// }

//CREATE 
module.exports.create = (req,res) => {
    console.log(req.body);
    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        img: req.body.img
       
    }).save()
        .then( post => {
            res.status(201).json({status: 'Employee created'});
        })
        .catch(err => {res.status(409).json({
            message: err.message
        });
    });
}


//POST
module.exports.getOne = (req,res)=>{ 
  
    const post = Post.findOne({ _id: req.params.id })
    .then( data => {
        if(data) {
            res.status(200).json({
                success: true,
                post: post
            }) 
        } else {
            res.status(404).json({
                success: false,
                msg: "False post id"
            })
        }
    })
    .catch( err => {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    });
 };


//Update
module.exports.update = (req,res)=> { 
    const post = req.body;
    const id = req.params.id;
    Post.update(post, 
        {where: { id : id}}
        ).then( (result)=> {
            res.status(200).json({msg:"updated success fully a post with id = " + id});
        }).catch(err => {
            // console.log(err);
            res.status(500).json({msg: 'error', details: err})
        });
};

// //DELETE
module.exports.delete = (req, res)=>{ 
    const id = req.params.id
    Post.destroy({
        where: { id : id }
    }).then(()=> {
        res.status(200).json({msg:'deleted success fully a post with id = ' + id})
    }).catch(err=> {
        // console.log(err);
        res.status(500).json({msg: 'error', details: err})
    });
};

