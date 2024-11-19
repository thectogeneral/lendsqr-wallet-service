import * as Knex from "knex";
import dotenv from "dotenv";

// local imports
import KnexConfig from "../knex";
import { Logger } from "../src/utils";

dotenv.config();

export const createKnexConnection = async () => {
    Logger.info("Creating knex connection...");
    try {
        const knex = Knex.default(
            KnexConfig["development"]
        );

        const dbHandshake = await knex.raw("SELECT VERSION()");
        
        
        if (dbHandshake) {
            Logger.success("Knex connection created successfully!");
        }
        //Logger.success(knex);
        return knex;
    } catch (error: any) {
        Logger.error("An error occured: " + error);
        // throw new Error(error);
    }
};
