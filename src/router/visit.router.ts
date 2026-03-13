import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { createVisit, getAllVisits } from '../controller/visit.controller';
import { getAllVisitsSchema } from '../schemas/visit.schemas';
import { handleValidationErrors } from '../middleware/handleValidationErrors';
import { paramsTo } from '../middleware/convertParams';

const router = Router();

router.post('/', createVisit);
router.get('/all',
    checkSchema(getAllVisitsSchema, ['query']),
    handleValidationErrors,
    paramsTo('query', [['count', 'boolean'], ['unique', 'boolean']]),
    getAllVisits
);

export default router;