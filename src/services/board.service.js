import { BoardModel } from '../models/board.model.js'

import pkg from 'lodash'
const { cloneDeep } = pkg

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getBoard = async (id) => {
    try {
        const board = await BoardModel.getBoard(id)

        let boardClone = cloneDeep(board)

        boardClone.columns = boardClone.columns.filter((column) => !column._destroy)

        if (!boardClone || !boardClone.columns) {
            throw new Error('Board not found !')
        }

        boardClone.columns.forEach((column) => {
            column.cards = boardClone.cards.filter(
                (card) => card.columnId.toString() === column._id.toString()
            )
        })

        delete boardClone.cards

        return boardClone
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updatedData = {
            ...data,
            updateAt: Date.now(),
        }
        if (updatedData._id) delete updatedData._id
        if (updatedData.columns) delete updatedData.columns

        const updatedBoard = await BoardModel.update(id, updatedData)

        updatedBoard.columnOrder = data.columnOrder

        return updatedBoard
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const BoardService = { createNew, getBoard, update }
