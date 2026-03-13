import { Handler } from 'express'
import { _createVisit, _getAllUniqueVisits, _getAllVisits, _getVisitsCount } from '../service/visit.service'
import { GetAllVisitsQuery } from '../schemas/visit.schemas';
import { HttpError } from '../utils/httpError'

export const createVisit: Handler = async (req, res) => {
    try {
        if (!req.ip)
            throw new HttpError('Could not determine client IP address.', 201);

        const id = await _createVisit(req.ip);
        console.log(`Logged visit with ID: ${id} from IP: ${req.ip}`);
        res.sendStatus(200);
    } catch (err: unknown) {
        const error = HttpError.fromUnkown(err);
        console.error('Error creating visit:', error);
        res.status(error.statusCode).json({ error: error.message });
    }
}

export const getAllVisits: Handler = async (req, res) => {
    try {
        const {unique, count} = req.query as any as GetAllVisitsQuery;
        let result: any = {
            visits: [],
            count: 0,
        }
        if(count) {
            console.log(`Counting ${unique ? 'unique' : 'total'} visits...`);
            result.count = await _getVisitsCount(unique);
        }else {
            console.log(`Retrieving ${unique ? 'unique' : 'all'} visits from the database...`);
            const visits = unique ? await _getAllUniqueVisits() : await _getAllVisits();
            result.visits.push(...visits);
            console.log(`Retrieved ${visits.length} visits from the database.`);
        }

        res.status(200).json(result);
    } catch (err: unknown) {
        const error = HttpError.fromUnkown(err);
        console.error('Error creating visit:', error);
        res.status(error.statusCode).json({ error: error.message });
    }
}
