import { loadEnvFile } from "process";
loadEnvFile(".env");

import { app } from "./src/app";
import { sequelize } from "./src/config/db";

if (!process.env.PORT) {
    console.log("PORT environment variable is not set. Please set it in the .env file.");
    throw new Error("ENV_ERROR");
}

const init = async () => {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}

init();