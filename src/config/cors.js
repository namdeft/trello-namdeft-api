import { whiteList } from '../utilities/constants.js'

export const corsOptionsDelegate = function (req, callback) {
    var corsOptions
    if (whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
