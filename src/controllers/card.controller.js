import { CardService } from '../services/card.service.js'

import { httpStatusCode } from '../utilities/constants.js'

const createNew = async (req, res) => {
    try {
        const result = await CardService.createNew(req.body)
        res.status(httpStatusCode.OK).json(result)

        return result
    } catch (error) {
        res.status(httpStatusCode.INTERNAL_SERVER).json({
            error: error.message,
        })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    try {
        const result = await CardService.update(id, req.body)
        res.status(httpStatusCode.OK).json(result)

        return result
    } catch (error) {
        res.status(httpStatusCode.INTERNAL_SERVER).json({
            error: error.message,
        })
    }
}

export const CardController = { createNew, update }
