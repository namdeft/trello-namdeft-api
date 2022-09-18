import MongoClient from 'mongodb/lib/mongo_client.js'
import { env } from './environment.js'

let dbInstance = null

export const connectDB = async () => {
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    // Connect client to sever
    await client.connect()

    dbInstance = client.db(env.DATABASE_NAME)
}

export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect database first')
    console.log(dbInstance)
    return dbInstance
}
