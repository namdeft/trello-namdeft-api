import express from 'express'

import cors from 'cors'
import { corsOptionsDelegate } from './config/cors.js'

import { connectDB } from './config/mongodb.js'
import { env } from './config/environment.js'

import { apiV1 } from './routes/v1/index.js'

connectDB()
    .then(() => console.log('connected to database'))
    .then(() => bootServer())
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })

const bootServer = async () => {
    const app = express()

    app.use(cors(corsOptionsDelegate))

    // body-parser json data
    app.use(express.json())

    // APIs v1
    app.use('/v1', apiV1)

    app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
        console.log(`App is running at host:${process.env.PORT}`)
    })
}
