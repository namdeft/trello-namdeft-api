import { httpStatusCode } from '../utilities/constants.js'

import { BoardService } from '../services/board.service.js'

const createNew = async (req, res) => {
    try {
        const result = await BoardService.createNew(req.body)
        res.status(httpStatusCode.OK).json(result)
    } catch (error) {
        res.status(httpStatusCode.INTERNAL_SERVER).json({
            error: error.message,
        })
    }
}

const getBoard = async (req, res) => {
    const { id } = req.params
    try {
        const result = await BoardService.getBoard(id)
        res.status(httpStatusCode.OK).json(result)
    } catch (error) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            error: error.message,
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await BoardService.update(id, req.body)
        res.status(httpStatusCode.OK).json(result)
    } catch (error) {
        console.log(error)
        res.status(httpStatusCode.INTERNAL_SERVER).json({
            error: error.message,
        })
    }
}

export const BoardController = { createNew, getBoard, update }
