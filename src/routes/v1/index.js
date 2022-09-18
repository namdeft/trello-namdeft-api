import express from 'express'

import { BoardRoutes } from './board.route.js'
import { ColumnRoutes } from './column.route.js'
import { CardRoutes } from './card.route.js'

const router = express.Router()

router.use('/boards', BoardRoutes)

router.use('/columns', ColumnRoutes)

router.use('/cards', CardRoutes)

export const apiV1 = router
