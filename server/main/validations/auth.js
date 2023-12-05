import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно состоять минимум из 3 символов').isLength({ min: 3 }),
    body('avatarUrl', 'Не корректная ссылка').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Неверный формат почтыs').isEmail(),
    body('password', 'Пароль должен состоять минимум из 5 символов').isLength({ min: 5 }),
];