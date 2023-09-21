import { DataTypes, Model  } from "sequelize";
import db from '../config/database.config';

export interface TodoAttributes {
    id:string;
    description: string;
    completed: boolean;
    userId:string;
}

export class TodoInstance extends Model<TodoAttributes> {}

TodoInstance.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUIDV4,
    }
}, {
    sequelize: db,
    tableName: "User"
})