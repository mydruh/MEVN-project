import PostModel from '../models/post.js'

export const getAll = async (req, res) => {
    try{
        const list = await PostModel.find().populate('creator').exec();

        res.json({
            success: true,
            list
        })
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const getPost = async (req, res) => {
    try{
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        )
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Статья не найдена'
                });
            }
        
            res.json({
                success: true,
                message: doc
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Не удалось найти статью'
            });
        });
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: 'Не удалось найти статью'
        })
    }
}

export const deletePost = async (req, res) => {
    try{
        const postId = req.body.id

        PostModel.findOneAndDelete(
            { _id: postId }
        )
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Статья не найдена'
                });
            }
        
            res.json({
                success: true,
                message: 'Статья удалена'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Не удалось найти статью'
            });
        });
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: 'Не удалось найти статью'
        })
    }
}

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            creator: req.userId
        });

        const post = await doc.save();

        res.json({
            success: true,
            post
        })
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const update = async (req, res) => {
    try{
        const postId = req.body.id

        await PostModel.updateOne({
            _id: postId,
        },
        {
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            creator: req.userId
        })

        await PostModel.findById(
            { _id: postId }
        )
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Статья не найдена'
                });
            }
        
            res.json({
                success: true,
                message: doc
            });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                success: false,
                message: 'Не удалось найти статью'
            });
        });
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: err
        })
    }
}