import { Request, Response, NextFunction } from "express";

type Location = 'query' | 'body' | 'params';
type Type = 'boolean' | 'number';
type Params = Array<[string, Type]>;

export const paramsTo = (location: Location, params: Params) => {
    return (req: Request, _: Response, next: NextFunction) => {
        Object.defineProperty(req, location, {
            ...Object.getOwnPropertyDescriptor(req, location),
            value: req[location] || {},
            writable: true
        });
        for (const [key, type] of params) {
            if (req[location][key] !== undefined) {
                switch (type) {
                    case 'boolean':
                        console.log(`Converting ${location}.${key} to boolean. Original value: ${req[location][key]}`);
                        req[location][key] = req[location][key] === 'true';
                        break;
                    case 'number':
                        try {
                            req[location][key] = Number(req[location][key]);
                        } catch (err) {
                            console.warn(`Failed to convert ${location}.${key} to number. Value: ${req[location][key]}`);
                        }
                        break;
                }
            }
        }
        next();
    }
}