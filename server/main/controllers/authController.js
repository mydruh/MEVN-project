import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.js';

export const signUp = async (req, res) => {
    try{
    
        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(pass, salt);
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: passHash,
            avatarUrl: req.body.avatarUrl,        
        })
    
        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 
        'secretKeyNode',
        {
            expiresIn: '30d'
        })
    
        res.json({
            success: true,
            user: user.email,
            token
        })
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const signIn = async (req, res) => {
    try{
        const user = await UserModel.findOne({ email: req.body.email })

        if(!user){
            return res.status(404).json({
                status: false,
                message: 'Пользователь не найден'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(401).json({
                status: false,
                message: 'Введенный пароль не верный'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 
        'secretKeyNode',
        {
            expiresIn: '30d'
        })
    
        res.json({
            success: true,
            user: user.email,
            token
        })
    }catch(err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const myProfile = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден'
            })
        }else{
            return res.json({
                success: true,
                user
            })
        }
    }catch(err){
        console.log(err)
    }
}