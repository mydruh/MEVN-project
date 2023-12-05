import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

import {registerValidation, loginValidation} from './main/validations/auth.js';
import { createValidation, deleteValidation } from './main/validations/post.js';
import checkAuth from './main/utils/checkAuth.js';

import * as authControllers from './main/controllers/authController.js'
import * as postControllers from './main/controllers/postController.js'
import handleValidationErrors from './main/utils/handleValidationErrors.js';

mongoose.connect(
    'mongodb+srv://Druh:556629@nodecluster.wpmc4lv.mongodb.net/blog?retryWrites=true&w=majority'
    ).then(() => {
        console.log('DB ok')
    }).catch((err) => {
        console.log('DB error', err)
    })

const PORT = process.env.PORT || 5000

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200, // некоторые браузеры 204
};
  
app.use(cors(corsOptions));


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'main/uploads')
    },
    filename: (req, file, cb) => {
        console.log(req)

        cb(null, file.originalname)
    },
});

const upload = multer({storage});

app.use(express.json())

app.use('/static', express.static('main/uploads'))

app.get('/', (req, res) => {
    res.send('Hello bro!')
})

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    req.file.originalname = `${req.body.id}.png`
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.post('/api/sign_in', loginValidation, handleValidationErrors, authControllers.signIn)

app.post('/api/sign_up', registerValidation, handleValidationErrors, authControllers.signUp)

app.get('/api/my_profile', checkAuth, authControllers.myProfile)

app.post('/api/post/create', checkAuth, createValidation, handleValidationErrors, postControllers.create)

app.post('/api/post/delete', checkAuth, deleteValidation, postControllers.deletePost)

app.post('/api/post/edit', checkAuth, handleValidationErrors, postControllers.update)

app.get('/api/post/list', checkAuth, postControllers.getAll)

app.get('/api/post/:id', checkAuth, postControllers.getPost)


app.listen(PORT, (err) =>{
    if(err){
        return console.log('SERVER DOWN')
    }

    console.log('Ok')
})