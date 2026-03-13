import {col, fn} from "sequelize";
import { Visit } from "../model/visit"


export const _createVisit = async (ip: string) => {
    const visit = await Visit.create({ ip });
    return visit.id;
}

export const _getAllVisits = async () => {
    const visits = await Visit.findAll({ order: [['createdAt', 'DESC']] });
    return visits;
}

export const _getAllUniqueVisits = async () => {
    const visits = await Visit.findAll({
        attributes: ['ip', [fn('COUNT', col('ip')), 'count']],
        group: ['ip']
    });
    return visits;
}

export const _getVisitsCount = async (unique: boolean) => {
    if (unique) {
        const visits = await Visit.findAll({
            attributes: [[fn('COUNT', col('ip')), 'count']],
            group: ['ip']
        });
        return visits.length;
    } else {
        const visits = await Visit.findAll();
        return visits.length;
    }
};
