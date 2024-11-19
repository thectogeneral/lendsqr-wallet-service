// import { destroy } from "knex/lib";

// local imports
import { createKnexConnection } from "../../config";


jest.setTimeout(10000);

describe("database connection", () => {
    beforeAll(async () => {
        await createKnexConnection();
    });

    afterAll(async () => {
        const knex = await createKnexConnection();
        if (knex) {
            await knex.destroy();
        }
    });

    it("should be able to connect to the database", async () => {
        const knex = await createKnexConnection();
        if (knex) {
            const result = await knex.raw("SELECT VERSION()");
        }
    });
});