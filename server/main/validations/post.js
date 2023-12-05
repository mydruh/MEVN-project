import {body} from 'express-validator';

export const createValidation = [
    body('title', 'Заголовок должен состоять минимум из 3 символов').isLength({ min: 3 }).isString(),
    body('description', 'Описание должно состоять минимум из 10 символов').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тегов (Необходим массив)').isArray(),
    body('imageUrl', 'Не корректная ссылка').optional().isURL(),
];

export const deleteValidation = [
    body('id', 'Поле id обязатально').isLength({ min: 1 })
]