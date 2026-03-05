import { Router } from 'express'
import { createVisit, getAllVisits } from '../controller/visit.controller'

const router = Router()

router.post('/', createVisit)
router.get('/all', getAllVisits)

export default router;