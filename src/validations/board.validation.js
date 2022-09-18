import Joi from 'joi'

import { httpStatusCode } from '../utilities/constants.js'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20).trim(),
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            error: error,
        })
    }
}

const update = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(1).max(16).trim(),
        columnOrder: Joi.array().items(Joi.string()),
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
        next()
    } catch (error) {
        console.log(error)
        res.status(httpStatusCode.BAD_REQUEST).json({
            error: error.message,
        })
    }
}

export const BoardValidation = { createNew, update }
