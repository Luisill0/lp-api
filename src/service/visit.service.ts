import { Visit } from "../model/visit"

export const _createVisit = async (ip: string) => {
    const visit = await Visit.create({ip});
    return visit.id;
}

export const _getAllVisits = async () => {
    const visits = await Visit.findAll({ order: [['createdAt', 'DESC']] });
    return visits;
}
