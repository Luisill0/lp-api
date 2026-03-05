import { v6 as uuidv6 } from 'uuid';
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize'

import { sequelize } from '../config/db'

export class Visit extends Model<
    InferAttributes<Visit>,
    InferCreationAttributes<Visit>
> {
    declare id?: string;
    declare ip: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

Visit.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv6,
            primaryKey: true,
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Visit',
        freezeTableName: false,
        timestamps: true,
    }
)