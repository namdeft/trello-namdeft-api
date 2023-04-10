import Joi from 'joi';

const { ObjectId } = pkg;
import pkg from 'mongodb';

import { getDB } from '../config/mongodb.js';

const cardCollectionName = 'cards';

const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().min(1).max(30).required().trim(),
    cover: Joi.string().default(null),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
    try {
        const validateValue = await validateSchema(data);
        const insertValue = {
            ...validateValue,
            boardId: ObjectId(validateValue.boardId),
            columnId: ObjectId(validateValue.columnId),
        };
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue);

        return result.ops[0];
    } catch (error) {
        throw new Error(error);
    }
};

const deleteManyCard = async (ids) => {
    const tranformIds = ids.map((item) => ObjectId(item));
    try {
        const result = await getDB()
            .collection(cardCollectionName)
            .updateMany({ _id: { $in: tranformIds } }, { $set: { _destroy: true } });

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    const updatedData = {
        ...data,
        boardId: ObjectId(data.boardId),
        columnId: ObjectId(data.columnId),
    };
    try {
        const result = await getDB()
            .collection(cardCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: updatedData },
                { returnOriginal: false }
            );

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const CardModel = { createNew, cardCollectionName, deleteManyCard, update };
