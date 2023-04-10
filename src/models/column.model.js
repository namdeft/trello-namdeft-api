import Joi from 'joi';
const { ObjectId } = pkg;
import pkg from 'mongodb';

import { getDB } from '../config/mongodb.js';

const columnCollectionName = 'columns';

const ColumnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().min(1).max(20).required().trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await ColumnCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
    try {
        const validateValue = await validateSchema(data);
        const insertValue = {
            ...validateValue,
            boardId: ObjectId(validateValue.boardId),
        };
        const result = await getDB().collection(columnCollectionName).insertOne(insertValue);

        return result.ops[0];
    } catch (error) {
        throw new Error(error);
    }
};

const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: columnId },
                { $push: { cardOrder: cardId } },
                { returnOriginal: false }
            );
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updatedData = {
            ...data,
            boardId: ObjectId(data.boardId),
        };

        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: updatedData },
                { returnOriginal: false }
            );

        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnModel = { createNew, update, columnCollectionName, pushCardOrder };
