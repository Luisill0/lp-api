import { Sequelize } from "sequelize";
import path from "path";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.resolve(process.cwd(), "localdb.sqlite.db"),
	logging: false,
});
