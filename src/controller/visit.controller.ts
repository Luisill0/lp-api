import { Handler } from 'express'
import { _createVisit, _getAllVisits } from '../service/visit.service'
import { HttpError } from '../utils/httpError'

export const createVisit: Handler = async (req, res) => {
    try {
        if (!req.ip)
            throw new HttpError('Could not determine client IP address.', 201)

        const id = await _createVisit(req.ip)
        console.log(`Logged visit with ID: ${id} from IP: ${req.ip}`);
        res.sendStatus(200)
    } catch (err: unknown) {
        const error = HttpError.fromUnkown(err)
        console.error('Error creating visit:', error)
        res.status(error.statusCode).json({ error: error.message })
    }
}

export const getAllVisits: Handler = async (req, res) => {
    try {
        const visits = await _getAllVisits()
        console.log(`Retrieved ${visits.length} visits from the database.`, visits);
        res.status(200).json(visits)
    } catch (err: unknown) {
        const error = HttpError.fromUnkown(err)
        console.error('Error creating visit:', error)
        res.status(error.statusCode).json({ error: error.message })
    }
}
