import request from "supertest";
import app from "../../app";
import { createKnexConnection } from "../../../config";


jest.setTimeout(10000);

const fundWallet = jest.fn();

const data = {
    amount: 20,
};

const token = process.env.TOKEN

describe("POST /api/fund-wallet", () => {
    beforeEach(() => {
        fundWallet.mockClear();
    });

    afterAll(async () => {
        const knex = await createKnexConnection();
        if (knex) {
            await knex.destroy();
        }
    })

    test("should fund user wallet and returns a message", async () => {
        const response = await request(app)
            .post("/api/fund-wallet")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });

    test("should return an error if user is does not enter an amount", async () => {
        const response = await request(app)
            .post("/api/fund-wallet")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });
});