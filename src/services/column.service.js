import { BoardModel } from '../models/board.model.js'
import { ColumnModel } from '../models/column.model.js'
import { CardModel } from '../models/card.model.js'

import pkg from 'lodash'
const { cloneDeep } = pkg

const createNew = async (data) => {
    try {
        let newColumn = await ColumnModel.createNew(data)
        newColumn.cards = []

        await BoardModel.pushColumnOrder(newColumn.boardId, newColumn._id.toString())
        return newColumn
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now(),
        }
        if (updateData._id) delete updateData._id
        // if (updateData.cards) delete updateData.cards

        const updatedColumn = await ColumnModel.update(id, updateData)

        if (updatedColumn._destroy) {
            CardModel.deleteManyCard(updatedColumn.cardOrder)
        }

        console.log(updatedColumn)

        return updatedColumn
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const ColumnService = { createNew, update }
