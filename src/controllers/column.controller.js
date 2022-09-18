import { ColumnService } from '../services/column.service.js'

import { httpStatusCode } from '../utilities/constants.js'

const createNew = async (req, res) => {
    try {
        const result = await ColumnService.createNew(req.body)
        res.status(httpStatusCode.OK).json(result)
    } catch (error) {
        res.status(httpStatusCode.INTERNAL_SERVER).json({
            error: error.message,
        })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    try {
        const result = await ColumnService.update(id, req.body)
        res.status(httpStatusCode.OK).json(result)
    } catch (error) {
        console.log(error)
        res.status(httpStatusCode.INTERNAL_SERVER).json({
            error: error.message,
        })
    }
}

export const ColumnController = { createNew, update }
