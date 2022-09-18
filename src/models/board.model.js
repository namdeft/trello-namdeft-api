import Joi from 'joi'
const { ObjectId } = pkg
import pkg from 'mongodb'

import { getDB } from '../config/mongodb.js'
import { ColumnModel } from '../models/column.model.js'
import { CardModel } from '../models/card.model.js'

const boardCollectionName = 'boards'

const boardCollectionSchema = Joi.object({
    title: Joi.string().min(1).max(16).required().trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
    return boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(boardCollectionName).insertOne(value)

        return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(boardId) },
                { $push: { columnOrder: columnId } },
                { returnOriginal: false }
            )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getBoard = async (id) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .aggregate([
                {
                    $match: {
                        _id: ObjectId(id),
                        _destroy: false,
                    },
                },
                {
                    $lookup: {
                        from: ColumnModel.columnCollectionName,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns',
                    },
                },
                {
                    $lookup: {
                        from: CardModel.cardCollectionName,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'cards',
                    },
                },
            ])
            .toArray()
        return result[0]
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: data }, { returnOriginal: false })

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { createNew, getBoard, pushColumnOrder, update }
