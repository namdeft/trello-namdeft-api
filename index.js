import express from 'express'

import cors from 'cors'
import { corsOptionsDelegate } from './src/config/cors.js'

import { connectDB } from './src/config/mongodb.js'
import { env } from './src/config/environment.js'

import { apiV1 } from './src/routes/v1/index.js'

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

    app.listen(env.APP_PORT || 8080, () => {
        console.log(`App is running at host:${env.APP_PORT}`)
    })
}
