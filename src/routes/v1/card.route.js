import express from 'express'

import { CardValidation } from '../../validations/card.validation.js'
import { CardController } from '../../controllers/card.controller.js'

const router = express.Router()

router.route('/').post(CardValidation.createNew, CardController.createNew)

router.route('/:id').put(CardValidation.update, CardController.update)

export const CardRoutes = router
