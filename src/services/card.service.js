import { CardModel } from '../models/card.model.js';
import { ColumnModel } from '../models/column.model.js';

const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data);
        await ColumnModel.pushCardOrder(newCard.columnId, newCard._id.toString());

        return newCard;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now(),
        };
        if (updateData._id) delete updateData._id;

        const updatedCard = await CardModel.update(id, updateData);

        return updatedCard;
    } catch (error) {
        throw new Error(error);
    }
};

export const CardService = { createNew, update };
